import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalDetallesPage } from './modalDetalles.page';

const routes: Routes = [
  {
    path: '',
    component: ModalDetallesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalDetallesPageRoutingModule {}
