import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'list-me-floating-button',
  templateUrl: './floating-button.component.html',
  styleUrls: ['./floating-button.component.scss'],
})
export class FloatingButtonComponent implements OnInit {

  @Input() icon = 'add-outline';
  @Input() backgroundColor = '#0f3f6e';

  @Output() onClick = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  onButtonClick(event): void {
    this.onClick.emit(event);
  }

}
