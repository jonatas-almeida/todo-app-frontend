import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'list-me-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
})
export class BackButtonComponent implements OnInit {

  @Input() icon = 'arrow-back-outline';
  @Input() backgroundColor = "#222";
  @Input() iconColor = "#3cdda8";

  @Output() onClick = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  goBackClick(): void {
    this.onClick.emit()
  }

}
