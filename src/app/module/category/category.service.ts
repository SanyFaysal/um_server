import { ICategory } from "./category.interface";
import { Category } from "./category.model"

const createCategory = async (payload: ICategory): Promise<ICategory> => {
    const result = await Category.create(payload);
    return result;
}


export const CategoryService = {
    createCategory
}