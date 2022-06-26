import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'list-me-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  @Input() modalTitle: string;
  @Input() isModalOpen: boolean;

  @Output() closeModal = new EventEmitter();

  constructor() { }

  ngOnInit() {}
}
