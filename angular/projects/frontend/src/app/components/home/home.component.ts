import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../../../../tools/src/lib/api.service';
import { Post } from '../../../../../models/post.interface';
import { map, Subject, takeUntil } from 'rxjs';
import { Category } from '../../../../../models/category.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy{
  post: Post[] = [];
  cats: Category[] = [];
  sub$ = new Subject();

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}


  ngOnInit(): void {

    this.route.paramMap.pipe(
      takeUntil(this.sub$)
    ).subscribe(params => {
      const catTitle = params.get('title');

      if(this.router.url === `/post/category/${catTitle}`){
         this.apiService.getAllPosts()
         .pipe(
          map(posts => posts .filter(p => p.category.title ===catTitle)),
          takeUntil(this.sub$)
         ).subscribe(posts => this.post =posts);
      } else{
        this.apiService.getAllPosts()
        .pipe(
          takeUntil(this.sub$)
        ).subscribe(res =>this.post = res)
      }
    })




  }

  ngOnDestroy(): void {
    this.sub$.next
    this.sub$.complete();
  }

}
