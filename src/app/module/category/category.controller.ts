import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { CategoryService } from "./category.service";
import sendResponse from "../../../utils/sendResponse";
import { ICategory } from "./category.interface";
import httpStatus from "http-status";

const createCategory = catchAsync(async (req: Request, res: Response) => {
    const data = req.body;
    const result = await CategoryService.createCategory(data);

    return sendResponse<ICategory>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Category created successful',
        data: result
    })
});
const getAllCategories = catchAsync(async (req: Request, res: Response) => {
    const result = await CategoryService.getAllCategories();
    return sendResponse<ICategory[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Category retrieve successful',
        data: result
    })
});

export const CategoryController = {
    createCategory,
    getAllCategories
}