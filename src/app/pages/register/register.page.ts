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
  confirmPasswordCtrl = new FormControl('');

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
      user_password: this.userPasswordCtrl,
      confirm_password: this.confirmPasswordCtrl
    });
  }

  // Cria um novo usuário
  async createNewUser(): Promise<void> {
    this.openModal = true;

    try {

      const salt = bcrypt.genSaltSync(10);
      const passwordEnc = bcrypt.hashSync(this.userPasswordCtrl.value, salt) 

      const payload = {
        username: this.usernameCtrl.value,
        user_email: this.userEmailCtrl.value,
        user_password: passwordEnc.toString()
      }

      console.log(payload);
      
      if(this.userPasswordCtrl.value === this.confirmPasswordCtrl.value) {
        this.userService.createUser(payload.username, payload.user_email, payload.user_password).subscribe(async (data) => {
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


  limparDados(): void {
    this.usernameCtrl.setValue("")
    this.userEmailCtrl.setValue("")
    this.userPasswordCtrl.setValue("")
    this.confirmPasswordCtrl.setValue("")
  }

}
