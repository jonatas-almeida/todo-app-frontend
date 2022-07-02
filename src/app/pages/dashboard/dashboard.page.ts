import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivitiesService } from 'src/app/services/activities.service';
import { UserService } from 'src/app/services/user.service';
import { UtilService } from 'src/app/services/util.service';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(
    private route: Router,
    private activityService: ActivitiesService,
    public utilService: UtilService,
    private userService: UserService
  ) { }

  activityForm: FormGroup;
  activityTitleCtrl = new FormControl('');
  activityDescriptionCtrl = new FormControl('');

  searchCtrl = new FormControl('');

  userName: string;
  userProfileName: string;
  activitiesList: any = [];
  openModal: boolean;

  ngOnInit() {
    if(this.userService.userToken) {
      this.initForm();
      this.getActivities();
      this.setUsernameOnInit();
    }
    else {
      this.route.navigateByUrl('/login')
    }
  }

  initForm(): void {
    this.activityForm = new FormGroup({
      activity_title: this.activityTitleCtrl,
      activity_description: this.activityDescriptionCtrl,
      search: this.searchCtrl
    })
  }

  setUsernameOnInit(): void {
    if(this.userService.userToken) {
      sessionStorage.setItem('token', this.userService.userToken);
      let decodedToken: any = jwtDecode(this.userService.userToken);

      this.userName = decodedToken.user_name.toString();
      this.userProfileName = decodedToken.user_full_name.toString();
    }
  }

  async getActivities(): Promise<void> {
    try {
      this.activityService.getAllActivities().subscribe((activity) => {
        if (activity.status === "success") {
          this.activitiesList = activity;
        }
        else {
          alert(activity.message);
        }
      }, err => {
        console.log(err)
      })
    } catch (error) {
      console.log(error)
    }
  }

  // Create new activity
  async createActivity(): Promise<void> {
    try {
      let decodedToken: any = jwtDecode(this.userService.userToken);

      const payload = {
        activity_title: this.activityTitleCtrl.value,
        activity_description: this.activityDescriptionCtrl.value,
        user: decodedToken.user_name
      }

      this.activityService.postActivity(payload).subscribe((response) => {
        // alert(response.message);
        this.limparDados();
        this.openModal = false;
        this.getActivities()
      }, err => {
        console.log(err)
      })
    } catch (error) {
      console.log(error)
    }   
  }

  // Delete an activity
  async deleteClickedActivity(activity): Promise<void> {
    const activityId = activity._id;
    const activityName = activity.activity_title;

    try {
      const message = confirm(`Do you want to delete '${activityName}'?`).valueOf()

      if (message) {
        this.activityService.deleteActivity(activityId).subscribe(
          (response) => {
            alert(response.message);
            this.getActivities();
          }, err => {
            console.log(err)
          }
        )
      }
    } catch (error) {
      console.log(error)
    }
  }

  async searchActivity(): Promise<void> {
    try {
      this.activityService.searchActivity(this.searchCtrl.value).subscribe((result) => {
        this.activitiesList = result
      })
    } catch (error) {
      console.log(error)
    }
  }

  async searchActivityTyping(): Promise<void> {
    setTimeout(() => {
      try {
        this.activityService.searchActivity(this.searchCtrl.value).subscribe((result) => {
          this.activitiesList = result
        })
      } catch (error) {
        console.log(error)
      }
    }, 500);
  }

  // Closes the modal component
  closeModal(event): void {
    if (event.close) {
      this.openModal = false;
      this.limparDados();
      this.getActivities();
    }
  }

  limparCampoBusca(): void {
    this.searchCtrl.setValue('');
    this.getActivities();
  }

  // Clean the modal fields
  limparDados(): void {
    this.activityTitleCtrl.setValue('')
    this.activityDescriptionCtrl.setValue('')
  }

}
