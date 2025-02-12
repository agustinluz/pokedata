import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../modelo/pokemon';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';


  constructor(private http: HttpClient) {}

  getPokemonList(limit: number, offset: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?limit=${limit}&offset=${offset}`);
  }

  getPokemonDetails(id: number): Promise<any> {
    return this.http.get(`${this.apiUrl}/${id}`).toPromise()
        .then((data: any) => {
            return {
                types: data.types.map((t: any) => t.type.name).join(', '), 
                abilities: data.abilities.map((a: any) => a.ability.name).join(', '),
                weight: data.weight,
                height: data.height
            };
        })
        .catch(() => {
            return { types: '', abilities: '', weight: '', height: '' }; 
        });
}
  
  getPokemonsPaginados(limit: number, offset: number): Promise<Pokemon[]> {
    return new Promise<Pokemon[]>((resolve, reject) => {
        this.http.get(`${this.apiUrl}?limit=${limit}&offset=${offset}`).toPromise()
            .then(async (data: any) => {
                if (!data.results) {
                    reject("No se encontraron Pokémon");
                    return;
                }
                let Pokemons: Pokemon[] = [];

            for (const poke of data.results) {
                const partes = poke.url.split("/");
                const id = Number(partes[partes.length - 2]);
                const pokemonData = await this.getPokemonDetails(id);

                Pokemons.push({
                    id: id,
                    nombre: poke.name,
                    imagen: (`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`),
                    tipos: pokemonData.tipos,
                    habilidades: pokemonData.habilidades,
                    peso: pokemonData.peso,
                    altura: pokemonData.altura
                });
            }
                console.log("Pokémons procesados:", Pokemons);
                resolve(Pokemons);
            })
            .catch((error: Error) => {
                reject(error.message);
            });
    });
}

  getPokemonId(url: string): number {
    return parseInt(url.split('/').filter(part => part).pop()||"0", 10);
  }

  getTotalPokemonCount(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
        this.http.get(this.apiUrl).toPromise()
            .then((data: any) => {
                if (!data.count) {
                    reject("No se pudo obtener el total de Pokémon");
                    return;
                }

                resolve(data.count);
            })
            .catch((error: Error) => {
                console.error("Error al obtener el total de Pokémon:", error);
                reject(error.message);
            });
    });
}
}
