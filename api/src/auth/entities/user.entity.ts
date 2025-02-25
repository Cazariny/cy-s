import { Post } from "src/post/entities/post.entity";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcryptjs'
import { Exclude } from "class-transformer";
import { UserRoles } from "../users-roles";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string

    @Column()
    email: string;

    @Column({select: false})
    password: string;

    @Column({default: null})
    profilePic: string;

    @Column({type: 'enum', enum: UserRoles, default: UserRoles.Lector})
    roles: UserRoles

    @OneToMany(() => Post, (post) =>post.user)
    posts: Post[];

    @BeforeInsert()
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 10)
    }
}
