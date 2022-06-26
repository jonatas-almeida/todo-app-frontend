import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'list-me-round-button',
  templateUrl: './round-button.component.html',
  styleUrls: ['./round-button.component.scss'],
})
export class RoundButtonComponent implements OnInit {

  @Input() width = '30px';
  @Input() height = '30px';
  @Input() icon = 'trash-outline';
  @Input() backgroundColor = 'red';
  @Input() iconColor = "#fff";
  @Input() position = 'absolute';
  @Input() top = '0px';
  @Input() right = '0px';

  @Output() onClick = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  onButtonClick(event): void {
    this.onClick.emit(event)
  }

}
