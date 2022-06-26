import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'list-me-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {

  @Input() buttonTitle: string;
  @Input() width = '150px';
  @Input() margin = '0px';
  @Input() padding = '15px';
  @Input() backgroundColor = '#0f3f6e';
  @Input() fontSize = '11pt';
  @Input() fontColor = '#fff';
  @Input() border = 'none';
  @Input() fontWeight = 'bold';

  @Output() onClick = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  clickFunction(): void {
    this.onClick.emit()
  }

}
