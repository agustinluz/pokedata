import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ModalDetallesPageRoutingModule } from './modalDetalles-routing.module';
import { ModalDetallesPage } from './modalDetalles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalDetallesPageRoutingModule,
    

  ],
  declarations: [ModalDetallesPage]
})
export class ModalDetallesPageModule {}