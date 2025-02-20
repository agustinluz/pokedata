import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Router } from '@angular/router';
import { Pokemon } from '../modelo/pokemonInterface';
import { ModalController } from '@ionic/angular';
import { ModalDetallesPageModule } from '../modalDetalles/modalDetalles.module';
import { ModalDetallesPage } from '../modalDetalles/modalDetalles.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  pokemonList: Pokemon[] = [];
  filteredPokemonList: Pokemon[] = [];
  allPokemonList: Pokemon[] = [];
  limit = 20;
  offset = 0;
  searchTerm: string = '';
  currentPage: number = 1;
  totalPokemons: number = 0;
  pageSize: number = 20;

  constructor(private pokemonService: PokemonService, private router: Router, private modalCtrl:ModalController) {}

  ngOnInit() {
    this.getAllPokemon();
    this.loadPokemon();
    this.pokemonService.getTotalPokemonCount()
      .then((count: number) => {
        this.totalPokemons = count;
        console.log('Total de Pokémon:', this.totalPokemons);
      })
      .catch((error: string) => {
        console.error('Error al obtener el total de Pokémon:', error);
      });
  }

  getAllPokemon(): void {
    this.pokemonService.getAllPokemons()
      .then((pokemons: Pokemon[]) => {
        this.allPokemonList = pokemons;
        console.log('Todos los Pokémon cargados:', this.allPokemonList);
      })
      .catch((error: string) => {
        console.error('Error al cargar todos los Pokémon:', error);
      });
  }

  
  loadPokemon(): void {
    this.pokemonService.getPokemonsPaginados(this.pageSize, (this.currentPage - 1) * this.pageSize)
      .then((pokemons: Pokemon[]) => {
        this.pokemonList = pokemons;
        this.filteredPokemonList = pokemons;
        console.log('Lista de Pokémon cargada:', this.pokemonList);
      })
      .catch((error: string) => {
        console.error('Error al cargar Pokémon:', error);
      });
  }

  goToFirstPage(): void {
    this.currentPage = 1;
    this.loadPokemon();
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPokemon();
    }
  }

  goToNextPage(): void {
    this.currentPage++;
    this.loadPokemon();
  }

  goToLastPage(): void {
    this.currentPage = Math.ceil(this.totalPokemons / this.pageSize);
    this.loadPokemon();
  }



  async abrirModal(pokemonId: number) {
    const PokemonLista = this.pokemonList.find(p => p.id === pokemonId);
    if (!PokemonLista) return;
    const modal = await this.modalCtrl.create({
      component: ModalDetallesPage,
      componentProps: { pokemon: PokemonLista }
    });
    return modal.present();
  }
  filterPokemon(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm) {
      this.filteredPokemonList = this.pokemonList.filter(pokemon => 
        pokemon.nombre.toLowerCase().includes(searchTerm)
      );
    } else {
      this.filteredPokemonList = this.pokemonList; // Mostrar todos los Pokémon si no hay término de búsqueda
    }
  }
    
}
