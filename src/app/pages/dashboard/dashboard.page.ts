import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivitiesService } from 'src/app/services/activities.service';
import { UserService } from 'src/app/services/user.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(
    private activityService: ActivitiesService,
    public utilService: UtilService,
    private userService: UserService
  ) { }

  activityForm: FormGroup;
  activityTitleCtrl = new FormControl('');
  activityDescriptionCtrl = new FormControl('');

  activitiesList: any = [];
  openModal: boolean;

  ngOnInit() {
    this.getActivities();
    this.initForm();
  }

  initForm(): void {
    this.activityForm = new FormGroup({
      activity_title: this.activityTitleCtrl,
      activity_description: this.activityDescriptionCtrl
    })
  }

  async getActivities(): Promise<void> {
    try {
      this.activityService.getAllActivities({ token: this.userService.userToken }).subscribe((activity) => {
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
      const payload = {
        activity_title: this.activityTitleCtrl.value,
        activity_description: this.activityDescriptionCtrl.value
      }

      this.activityService.postActivity(payload).subscribe((response) => {
        alert(response.message);
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

  // Closes the modal component
  closeModal(event): void {
    if (event.close) {
      this.openModal = false;
      this.limparDados();
      this.getActivities();
    }
  }

  // Clean the modal fields
  limparDados(): void {
    this.activityTitleCtrl.setValue('')
    this.activityDescriptionCtrl.setValue('')
  }

}
