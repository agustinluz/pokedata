import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Router } from '@angular/router';
import { Pokemon } from '../modelo/pokemon.modelo';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  pokemonList: Pokemon[] = [];
  limit = 20;
  offset = 0;
  searchTerm: string = '';

  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit() {
    this.loadPokemon();
  }

  loadPokemon() {
    this.pokemonService.getPokemonList(this.limit, this.offset).subscribe(response => {
      this.pokemonList = response.results.map((pokemon: any) => {
        const id = pokemon.url.split('/')[6];
        return {
          name: pokemon.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
          id: id
        };
      });
    });
  }

  searchPokemon(event: any) {
    const searchTerm = event.target.value.toLowerCase().trim();
    if (!searchTerm) {
      this.loadPokemon();
      return;
    }

    this.pokemonService.getPokemonDetails(searchTerm).subscribe(
      (response) => {
        this.pokemonList = [{
          name: response.name,
          image: response.sprites.front_default,
          id: response.id
        }];
      },
      (error) => {
        this.pokemonList = [];
      }
    );
  }

  nextPage() {
    this.offset += this.limit;
    this.loadPokemon();
  }

  prevPage() {
    if (this.offset >= this.limit) {
      this.offset -= this.limit;
      this.loadPokemon();
    }
  }

  viewDetails(name: string) {
    this.router.navigate(['/pokemon-details', name]);
  }
}
