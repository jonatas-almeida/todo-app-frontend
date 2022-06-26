import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'list-me-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  @Input() key: any;

  constructor() { }

  ngOnInit() {}

}
