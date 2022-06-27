import { Injectable, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingComponent } from '../components/loading/loading.component';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  @ViewChild(LoadingComponent) public loadingModal: LoadingComponent;

  constructor(private router: Router, private userService: UserService) { }

  goToNextPage(route): void {
    this.router.navigateByUrl(route);
    if(route === '/login') {
      this.userService.userToken = null;
    }
  }
}
