import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Category } from "src/category/entities/category.entity";

export class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    title: string;
    @IsNotEmpty()
    @IsString()
    content: string;
    @IsNumber()
    @IsOptional()
    categoryId: number;
    @IsNotEmpty()
    @IsString()
    mainImageUrl: string;

    @IsOptional()
    category: Category;
}
