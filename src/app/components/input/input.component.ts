import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'list-me-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {


  @Input() ctrl = new FormControl('')
  @Input() formControlName: string;
  @Input() type: string;
  @Input() placeholder: string;
  @Input() minValue: number;
  @Input() maxValue: number;
  @Input() tabIndex: number;
  @Input() width = '100%';
  @Input() margin = '0px';
  @Input() padding = '10px';
  @Input() fontSize = '16px';
  @Input() userExists = true;

  @Output() onKeyDown = new EventEmitter();
  @Output() onBlur =  new EventEmitter();

  constructor() { }

  ngOnInit() {}

  onInputChange(event): void {
    this.onKeyDown.emit(event);
  }

  onInputOutFocus(event): void {
    this.onBlur.emit(event);
  }

}
