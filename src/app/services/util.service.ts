import { Injectable, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingComponent } from '../components/loading/loading.component';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  @ViewChild(LoadingComponent) public loadingModal: LoadingComponent;

  constructor(private router: Router) { }

  goToNextPage(route): void {
    this.router.navigateByUrl(route);
  }
}
