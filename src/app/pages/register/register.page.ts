import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UtilService } from 'src/app/services/util.service';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  userForm: FormGroup;
  usernameCtrl = new FormControl('');
  userEmailCtrl = new FormControl('');
  userPasswordCtrl = new FormControl('');
  userFullNameCtrl = new FormControl('');
  confirmPasswordCtrl = new FormControl('');

  isUserAvailabeMessage: string = '';
  isUserAvailable: any;
  openModal: boolean = false;

  constructor(
    private userService: UserService,
    public utilService: UtilService,
    public route: Router
  ) { }

  ngOnInit() {
    this.iniciarFormulario();
  }

  iniciarFormulario(): void {
    this.userForm = new FormGroup({
      username: this.usernameCtrl,
      user_email: this.userEmailCtrl,
      user_full_name: this.userFullNameCtrl,
      user_password: this.userPasswordCtrl,
      confirm_password: this.confirmPasswordCtrl
    });
  }

  // Cria um novo usuário
  async createNewUser(): Promise<void> {
    this.openModal = true;

    try {

      if(this.isUserAvailable.available) {
        const salt = bcrypt.genSaltSync(10);
        const passwordEnc = bcrypt.hashSync(this.userPasswordCtrl.value, salt) 

        const payload = {
          username: this.usernameCtrl.value,
          user_email: this.userEmailCtrl.value,
          user_full_name: this.userFullNameCtrl.value,
          user_password: passwordEnc.toString()
        }

        
        if(this.userPasswordCtrl.value === this.confirmPasswordCtrl.value) {
          this.userService.createUser(payload.username, payload.user_email, payload.user_full_name, payload.user_password).subscribe(async (data) => {
            // alert(data.message)
            console.log("Carregando...")
            await this.loginUserAfterRegister(payload.username, this.userPasswordCtrl.value);
            this.limparDados()
            console.log("Logado!")
          }, err => {
            this.openModal = false;
            console.log(err)
          })
        }
        else {
          this.openModal = false;
          alert('As senhas não coincidem!')
        }
      }
      else {
        this.openModal = false;
        console.log("O nome de usuário já está em uso!")
      }
      
    } catch (error) {
      this.openModal = false;
      console.log(error)
    }
  }

  // Efetua o login após o cadastro
  async loginUserAfterRegister(name, password): Promise<void> {
    try {
      this.userService.userLogin(name, password).subscribe((user) => {
        console.log(user)
        if(user.status == 'success') {
          this.openModal = false;
          this.userService.userToken = user.token;
          this.route.navigateByUrl('/dashboard')
        }else {
          this.openModal = false;
          alert("Não foi possível fazer o login após o cadastro")
        }
      })
    } catch (error) {
      console.table(error);
    }
  }

  // Verifica se o nome de usuário já existe
  async verifyUser(): Promise<void> {
    if(this.usernameCtrl.value == '' || this.usernameCtrl.value == null) {
      this.isUserAvailabeMessage = '';
    }
    else {
      try {
        this.userService.verifyExistingUser(this.usernameCtrl.value).subscribe(
          (data) => {
            this.isUserAvailable = data;
            this.isUserAvailabeMessage = data.message;
          }, err => {
            console.log(err)
          }
        )
      } catch (error) {
        console.log(error);
      }
    }
  }


  limparDados(): void {
    this.usernameCtrl.setValue("")
    this.userEmailCtrl.setValue("")
    this.userPasswordCtrl.setValue("")
    this.confirmPasswordCtrl.setValue("")
    this.isUserAvailable = null;
    this.isUserAvailabeMessage = '';
  }

}
