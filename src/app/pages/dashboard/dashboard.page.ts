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
  activityId: any;

  searchCtrl = new FormControl('');

  userName: string;
  userProfileName: string;
  activitiesList: any = [];
  openModal: boolean;
  isEditing: boolean;

  ngOnInit() {
    if (this.userService.userToken) {
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

  // Setta o token no sessionStorage
  setUsernameOnInit(): void {
    if (this.userService.userToken) {
      sessionStorage.setItem('token', this.userService.userToken);
      let decodedToken: any = jwtDecode(this.userService.userToken);

      this.userName = decodedToken.user_name.toString();
      this.userProfileName = decodedToken.user_full_name.toString();
    }
  }


  // Retorna todas as atividades
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

  // Cria uma nova atividade
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

  // Deleta uma atividade
  async deleteClickedActivity(activity): Promise<void> {
    const activityId = activity._id;
    const activityName = activity.activity_title;

    try {
      // const message = confirm(`Do you want to delete '${activityName}'?`).valueOf()

      //if (message) {
        this.activityService.deleteActivity(activityId).subscribe(
          (response) => {
            this.limparDados();
            this.getActivities();
          }, err => {
            console.log(err)
          }
        )
      //}
    } catch (error) {
      console.log(error)
    }
  }

  // Procurar por uma atividade específica digitando
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

  async updateActivityInfo(): Promise<void> {
    try {
      if (this.activityForm.valid) {
        const body = {
          activity_title: this.activityTitleCtrl.value,
          activity_description: this.activityDescriptionCtrl.value
        }

        this.activityService.updateActivity(this.activityId, body).subscribe(
          (response) => {
            console.log(response)
            this.limparDados();
            this.getActivities();
          }, error => {
            console.log(error)
          })
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Abre o modal de edição
  openEditModal(todoItem): void {
    if (todoItem) {
      this.openModal = true;
      this.isEditing = true;

      this.activityId = todoItem._id;
      this.activityTitleCtrl.setValue(todoItem.activity_title)
      this.activityDescriptionCtrl.setValue(todoItem.activity_description)
    }
  }

  // Fecha o component de modal
  closeModal(event): void {
    if (event.close) {
      this.openModal = false;
      this.limparDados();
      this.getActivities();
    }
  }

  // Limpa o campo de busca
  limparCampoBusca(): void {
    this.searchCtrl.setValue('');
    this.getActivities();
  }

  // Limpa os campos do modal de adicionar uma nova atividade
  limparDados(): void {
    this.isEditing = false;
    this.openModal = false;
    this.activityTitleCtrl.setValue('')
    this.activityDescriptionCtrl.setValue('')
  }

}
