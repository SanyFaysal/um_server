import { ICategory } from "./category.interface";
import { Category } from "./category.model"

const createCategory = async (payload: ICategory): Promise<ICategory> => {
    const result = await Category.create(payload);
    return result;
}
const getAllCategories = async (): Promise<ICategory[]> => {
    const result = await Category.find();
    return result
}


export const CategoryService = {
    createCategory,
    getAllCategories
}