
import { ICourse } from "./course.interface";
import { Course } from "./course.model";
import { courseWeekDiffDuration } from "../../../utils/courseWeekDiffduration";

const createCourse = async (payload: ICourse) => {
    const diffInWeek = courseWeekDiffDuration(payload.startDate, payload.endDate);
    payload.durationInWeeks = diffInWeek

    const result = await Course.create(payload);
    return result;
};


export const CourseService = {
    createCourse
}