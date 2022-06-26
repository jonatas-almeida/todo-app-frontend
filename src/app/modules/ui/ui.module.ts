import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { InputComponent } from 'src/app/components/input/input.component';
import { CardComponent } from 'src/app/components/card/card.component';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { CheckboxComponent } from 'src/app/components/checkbox/checkbox.component';
import { SelectComponent } from 'src/app/components/select/select.component';
import { ToolbarComponent } from 'src/app/components/toolbar/toolbar.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { BackButtonComponent } from 'src/app/components/back-button/back-button.component';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { RoundButtonComponent } from 'src/app/components/round-button/round-button.component';
import { FloatingButtonComponent } from 'src/app/components/floating-button/floating-button.component';



@NgModule({
  declarations: [
    InputComponent,
    CardComponent,
    ModalComponent,
    CheckboxComponent,
    SelectComponent,
    ToolbarComponent,
    ButtonComponent,
    BackButtonComponent,
    LoadingComponent,
    RoundButtonComponent,
    FloatingButtonComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    // Components
    InputComponent,
    CardComponent,
    ModalComponent,
    CheckboxComponent,
    SelectComponent,
    ToolbarComponent,
    ButtonComponent,
    BackButtonComponent,
    LoadingComponent,
    RoundButtonComponent,
    FloatingButtonComponent,

    // Modules
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: []
})
export class UiModule { }
