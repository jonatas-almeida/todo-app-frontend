import { Component, DoCheck, Input, OnInit } from '@angular/core';

@Component({
  selector: 'list-me-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {

  @Input() loadingText: string;
  @Input() open: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
