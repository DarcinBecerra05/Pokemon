import { LitElement, html } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import styles from './pokemon-list-dm.css.js';
import '@bbva-experience-components/bbva-button-default/bbva-button-default.js';

export class PokemonListDm extends LitElement {

  static get is() {
    return 'pokemon-list-dm';
  }
  static get properties() {
    return {
      pokemonList: { type: Array}
    };
  }

  constructor() {
    super();
    this.pokemonList = [];
    this.fetchPokemonData();
  }

  static get styles() {
    return [
      styles,
      getComponentSharedStyles('pokemon-list-dm-shared-styles'),
    ];
  }

  async fetchPokemonData() {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
      const data = await response.json();
      const detailedData = await Promise.all(data.results.map(pokemon => fetch(pokemon.url).then(res => res.json())));
      this.pokemonList = detailedData;
      console.log(this.pokemonList);
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
    }
  }


}

customElements.define(PokemonListDm.is, PokemonListDm);
