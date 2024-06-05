import { Post } from "src/post/entities/post.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    descripcion: string;

    @OneToMany(()=> Post, (post) => post.category)
    post: Post;
}
