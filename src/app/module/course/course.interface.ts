import { Model, Types } from "mongoose";
import { ICourseDetailsLevel } from "./course.constant";
import { IReview } from "../review/review.interface";

type ITag = {
    name: string;
    isDeleted: boolean;
}

export type ICourse = {
    title: string;
    instructor: string;
    categoryId: Types.ObjectId;
    price: number;
    tags: ITag[];
    startDate: string;
    endDate: string;
    language: string;
    provider: string;
    durationInWeeks: number;
    details: {
        level: ICourseDetailsLevel;
        description: string
    };

}

export type CourseModel = Model<ICourse, Record<string, unknown>>;

export type ICourseReviewResult = { course: ICourse | null, reviews: IReview[] }
