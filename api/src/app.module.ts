import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { AccessControlModule } from 'nest-access-control';
import { roles } from './auth/users-roles';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: '127.0.0.1',
    database: 'cys',
    username: 'marita',
    password: 'mC.d3098',
    port: 3306,
    entities:[__dirname + '/*/**/*.entity{.ts, .js}'],
    synchronize: true,
    autoLoadEntities: true,
  }),
  PostModule,
  CategoryModule,
  AuthModule,
  AccessControlModule.forRoles(roles)  
  ],
  controllers: [AppController],
  providers: [AppService],
  
  
})
export class AppModule {
  constructor(private dataSource: DataSource){

  }
}
