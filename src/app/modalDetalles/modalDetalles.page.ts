import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pokemon } from '../modelo/pokemonInterface';

@Component({
  selector: 'app-modal-detalles',
  templateUrl: './modalDetalles.page.html',
  styleUrls: ['./modalDetalles.page.scss'],
  standalone: false
})
export class ModalDetallesPage implements OnInit {

  @Input() pokemon!: Pokemon;
  tipoClase: string = '';

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    if (this.pokemon && this.pokemon.tipos.length > 0) {
      this.tipoClase = this.pokemon.tipos[0].toLowerCase(); // Usar el primer tipo como clase
    }
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }
}