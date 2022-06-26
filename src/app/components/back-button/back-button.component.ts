import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'list-me-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
})
export class BackButtonComponent implements OnInit {

  @Output() onClick = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  goBackClick(): void {
    this.onClick.emit()
  }

}
