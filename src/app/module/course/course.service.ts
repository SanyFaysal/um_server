
import { ICourse, ICourseReviewResult } from "./course.interface";
import { Course } from "./course.model";
import { courseWeekDiffDuration } from "../../../helpers/courseWeekDiffduration";
import { Review } from "../review/review.model";
import { IReview } from "../review/review.interface";

const createCourse = async (payload: ICourse) => {
    const diffInWeek = courseWeekDiffDuration(payload.startDate, payload.endDate);
    payload.durationInWeeks = diffInWeek

    const result = await Course.create(payload);
    return result;
};
const getAllCourses = async (): Promise<ICourse[]> => {
    const result = await Course.find();
    return result;
};
const getSingleCourse = async (courseId: string): Promise<ICourse | null> => {
    const result = await Course.findOne({ _id: courseId });
    return result;
};
const getSingleCourseReview = async (courseId: string): Promise<ICourseReviewResult | null> => {
    const courseResult = await Course.findOne({ _id: courseId });
    const reviewsResult = await Review.find({ courseId })

    return { course: courseResult, reviews: reviewsResult };
};

const getBestCourse = async () => {
    const [{ averageRating, reviewCount, ...data }] = await Course.aggregate([
        {
            $lookup: {
                from: 'reviews',
                localField: '_id',
                foreignField: 'courseId',
                as: 'reviews'
            }
        },
        {
            $addFields: {
                averageRating: { $avg: '$reviews.rating' }
            }
        },
        {
            $addFields: {
                reviewCount: { $size: '$reviews' }
            }
        },
        {
            $sort: { averageRating: -1 }
        },
        {
            $project: {
                reviews: 0
            }
        },
        {
            $limit: 1
        }
    ]);


    return {
        course: data,
        averageRatings: Number(averageRating.toFixed(2)),
        reviewCount: reviewCount,
    };
};


const updateSingleCourse = async (courseId: string, payload: Partial<ICourse>) => {
    const updatedPayloadKeys: any = Object.keys(payload);


};

export const CourseService = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    getBestCourse,
    updateSingleCourse,
    getSingleCourseReview,
}