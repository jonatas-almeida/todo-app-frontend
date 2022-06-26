import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UtilService } from 'src/app/services/util.service';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  usernameCtrl = new FormControl('');
  passwordCtrl = new FormControl('');
  openModal: boolean = false;

  constructor(
    private userService: UserService,
    public utilService: UtilService,
    ) { }

  ngOnInit() {
    this.iniciarFormulario();
  }

  iniciarFormulario(): void {
    this.loginForm = new FormGroup({
      username: this.usernameCtrl,
      user_password: this.passwordCtrl
    });
  }

  // Faz o login do usuário
  async login(): Promise<any> {
    this.openModal = true;
  
    try {
      this.userService.userLogin(this.usernameCtrl.value, this.passwordCtrl.value).subscribe((data) => {
        if(data.status == 'success') {
          this.openModal = false;
          this.userService.userToken = data.token;
          this.limparDados()
          this.utilService.goToNextPage('/dashboard');
        }
        else {
          this.openModal = false;
          alert("Nâo foi possível fazer o login")
        }
      }, err => {
        this.openModal = false;
        alert(err)
      })
    } catch (error) {
      this.openModal = false;
      console.log(error)
    }
  }

  // Limpa os campos de usuário e senha
  limparDados(): void {
    this.usernameCtrl.setValue('');
    this.passwordCtrl.setValue('');
  }

}
