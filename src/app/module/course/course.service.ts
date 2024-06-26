import { ICourse, ICourseReviewResult } from "./course.interface";
import { Course } from "./course.model";
import { courseWeekDiffDuration } from "../../../helpers/courseWeekDiffduration";
import { Review } from "../review/review.model";
import { IReview } from "../review/review.interface";
import buildQueryAggregation from "../../../builder/QueryBuilder";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

const createCourse = async (payload: ICourse) => {
  const diffInWeek = courseWeekDiffDuration(payload.startDate, payload.endDate);
  payload.durationInWeeks = diffInWeek;

  const result = await Course.create(payload);
  return result;
};
// const getAllCourses = async (): Promise<ICourse[]> => {
//     const result = await Course.find();
//     return result;
// };
const getAllCourses = async (query: Record<string, unknown>) => {
  const pipeline = buildQueryAggregation(query);

  const result = await Course.aggregate(pipeline);

  const courses = result[0].documents;
  const totalCount = result[0].totalCount.length;

  if (!totalCount) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Not Found",
      "No courses matches your search query"
    );
  }

  if (courses.length === 0) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "No more data",
      "No more data. Please go to the previous page"
    );
  }

  return { courses, totalCount };
};

const getSingleCourse = async (courseId: string): Promise<ICourse | null> => {
  const result = await Course.findOne({ _id: courseId });
  return result;
};
const getSingleCourseReview = async (
  courseId: string
): Promise<ICourseReviewResult | null> => {
  const courseResult = await Course.findOne({ _id: courseId });
  const reviewsResult = await Review.find({ courseId });

  return { course: courseResult, reviews: reviewsResult };
};

const getBestCourse = async () => {
  const [{ averageRating, reviewCount, ...data }] = await Course.aggregate([
    {
      $lookup: {
        from: "reviews",
        localField: "_id",
        foreignField: "courseId",
        as: "reviews",
      },
    },
    {
      $addFields: {
        averageRating: { $avg: "$reviews.rating" },
      },
    },
    {
      $addFields: {
        reviewCount: { $size: "$reviews" },
      },
    },
    {
      $sort: { averageRating: -1 },
    },
    {
      $project: {
        reviews: 0,
      },
    },
    {
      $limit: 1,
    },
  ]);

  return {
    course: data,
    averageRatings: Number(averageRating.toFixed(2)),
    reviewCount: reviewCount,
  };
};

const updateSingleCourse = async (courseId: string, payload: any) => {
  const { details, tags, ...data }: any = payload;

  if (details) {
    for (const item in details) data[`details.${item}`] = details[item];
  }
  if (tags && tags.length) {
    for (let index = 0; index < tags.length; index++) {
      const updateObject: any = {};
      if (tags[index]?.isDeleted) {
        updateObject["$pull"] = { tags: { name: tags[index].name } };
      } else {
        updateObject["$set"] = { [`tags.${index}`]: tags[index] };
      }
      await Course.findByIdAndUpdate(
        { _id: courseId, "tags.name": tags[index].name },
        updateObject
      );
    }
  }

  const result: any = Course.updateOne(
    { _id: courseId },
    { $set: data },
    { upsert: true }
  );
  return result;
};

export const CourseService = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  getBestCourse,
  updateSingleCourse,
  getSingleCourseReview,
};
