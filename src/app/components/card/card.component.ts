import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'list-me-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  @Input() key: any;

  @Output() onClick = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  onCardClick(event): void {
    this.onClick.emit(event)
  }

}
