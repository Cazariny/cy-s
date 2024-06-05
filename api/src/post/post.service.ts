import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class PostService {
  constructor(@InjectRepository(Post) private readonly postRepository: Repository<Post>){

  }
  async createPost(createPostDto: CreatePostDto, user: User) {
    // const slug = createPostDto.title.split(" ").join('_').toLocaleLowerCase();
    const post = new Post();
    post.userId = user.id
    Object.assign(post, createPostDto); 

    this.postRepository.create(post);
    return await this.postRepository.save(post);
  }

  async findAll(query?: string) {
    const myQuery = this.postRepository.createQueryBuilder('post')
    .leftJoinAndSelect('post.category', 'category')
    .leftJoinAndSelect('post.user', 'user');

    //CHEK IF QUERY IS PRESENT OR NOT
    if(!(Object.keys(query).length ===0) && query.constructor === Object){
      const queryKeys = Object.keys(query); //GET THE KEYS OF THE QUERY STRING
      //CHECK IF TITLE KEY IS PRESENT
      if(queryKeys.includes('title')){
        myQuery.where('post.title LIKE: title', {title:`%${query['title']}%`})
      }
      //CHECK IF THE SORT KEY IS PRESENT, WE WILL SORT BY TITLE FIELD ONLY
      if(queryKeys.includes('sort')){
        myQuery.orderBy('post.title', query['sort'].toUpperCase()); // ASC OR DESC
      }

      //CHECK IF CATEGORY IS PRESENT, SHOW ONLY SELECTED CATEGORY ITEMS
      if(queryKeys.includes('category')){
        myQuery.andWhere('category.title = :cat', {cat: query["category"]});
      }
      return await myQuery.getMany();

    } else {
      return await myQuery.getMany();
    }
  }

  async findOne(id: number) {
    const post =await this.postRepository.findOne({
      where:{
        id:id
      }
    });
    if (!post){
      throw new BadRequestException('Post no encontrado')
    }
    return post
  }

  async findBySlug(slug: string) {
    try {
      const post = await this.postRepository.findOne({
        where:{
          slug:slug
        }
      });
      return post;
    } catch (err) {
      throw new BadRequestException(`Post con etiqueta ${slug} no encontrado`)
    }
  }

  async updatePost(slug: string, updatePostDto: UpdatePostDto) {
    const post = await this.postRepository.findOne({
      where: {
        slug:slug
      }
    });

    if (!post) {
      throw new BadRequestException('Post no encontrado')
    }
    post.modifiedOn = new Date(Date.now());
    post.category = updatePostDto.category;

    Object.assign(post, updatePostDto);
    return this.postRepository.save(post);
  } 

  async remove(id: number) {
    const post = await this.postRepository.findOne({
      where: {
        id:id
      }
    });
    if (!post) {
      throw new BadRequestException('Post no encontrado')
    }
    await this.postRepository.remove(post);
    return {success:true, post};
  }
}
