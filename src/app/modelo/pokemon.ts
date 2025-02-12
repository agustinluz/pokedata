import { Pokemon } from './pokemonInterface';

export class PokemonClass implements Pokemon  {
    constructor(
        public id: number ,
        public nombre: string ,
        public imagen: string,
        public tipos: string,
        public habilidades: string,
        public peso: string,
        public altura: string
    ) {
    }
}

export { Pokemon };
