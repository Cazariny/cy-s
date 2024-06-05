import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../../../../tools/src/lib/api.service';
import { Category } from '../../../../../models/category.interface';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit, OnDestroy {

  constructor(private apiService: ApiService){}
  cats: Category[] = [];
  sub$ = new Subject();


  ngOnInit(): void {
    this.apiService.getAllCategories()
    .pipe(
      takeUntil(this.sub$)
    ).subscribe(res =>this.cats = res)
  }
  ngOnDestroy(): void {
    this.sub$.next
    this.sub$.complete()
  }
}
