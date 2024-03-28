import { Schema, model } from "mongoose";
import { CourseModel, ICourse } from "./course.interface";
import { ICourseDetailsLevel } from "./course.constant";

const CourseSchema = new Schema<ICourse, CourseModel>({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    instructor: {
        type: String,
        required: true,
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    language: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    provider: {
        type: String,
        required: true,
    },

    durationInWeeks: {
        type: Number,
        default: 0,
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    tags: [
        {
            name: {
                type: String,
                required: true,
            },
            isDeleted: {
                type: Boolean,
                required: true
            }

        }],
    details: {
        level: {
            type: String,
            enum: ICourseDetailsLevel,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    },

},
    {
        timestamps: true
    }
);


export const Course = model<ICourse, CourseModel>('Course', CourseSchema)