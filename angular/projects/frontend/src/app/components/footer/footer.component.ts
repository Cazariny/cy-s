import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent  implements OnInit{
  year: any;
  date = new Date()
  constructor(){}

  ngOnInit(): void {
    this.year = this.date.getFullYear()
  }


}
