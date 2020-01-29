import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  dropdownClicked:boolean;
  constructor() { }

  ngOnInit() {
  }

  toggleMenu(event){
    this.dropdownClicked = !this.dropdownClicked;
  }
}
