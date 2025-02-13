import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pokemon } from '../modelo/pokemonInterface';

@Component({
  selector: 'app-modal-detalles',
  templateUrl: './modalDetalles.page.html',
  styleUrls: ['./modalDetalles.page.scss'],
  standalone: false
})
export class ModalDetallesPage {

  @Input() pokemon!:Pokemon

  constructor(private modalCtrl: ModalController) {}

  dismissModal() {
    this.modalCtrl.dismiss();
  }
}