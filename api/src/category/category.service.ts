import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { Response } from 'express';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private readonly repo: Repository<Category>){
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const category = new Category();
    Object.assign(category, createCategoryDto);

    this.repo.create(category);
    return await this.repo.save(category)
  }

  async findAll() {
    return await this.repo.find()
  }

  async findOne(id: number) {
    const cat = await this.repo.findOne({
      where: {
        id:id
      }
    });
    if (!cat) {
      throw new BadRequestException('Categoria no Encontrada')
    }
    return cat;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.repo.findOne({
      where: {
        id:id
      }
    });
    if (!category) {
      throw new BadRequestException('Categoria No encontrada')
    }

    Object.assign(category, UpdateCategoryDto);
    return await this.repo.save(category);
  }

  async remove(id: number ,res: Response) {
    const category = await this.repo.findOne({
      where:{
        id: id
      }
    });
    if (!category) {
      throw new BadRequestException('Categoria No encontrada')
    }
    try{
      await this.repo.remove(category);
      return res.status(200).json({success: true, category: category})
    } catch(err){
      throw new BadRequestException('Operacion Fallida');
    }
  }
}
