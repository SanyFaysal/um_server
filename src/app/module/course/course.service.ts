
import { ICourse, ICourseReviewResult } from "./course.interface";
import { Course } from "./course.model";
import { courseWeekDiffDuration } from "../../../utils/courseWeekDiffduration";
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
const updateSingleCourse = async (courseId: string, payload: Partial<ICourse>): Promise<ICourse | null> => {
    const result = await Course.findOneAndUpdate({ _id: courseId }, { new: true });
    return result;
};

export const CourseService = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    updateSingleCourse,
    getSingleCourseReview,
}