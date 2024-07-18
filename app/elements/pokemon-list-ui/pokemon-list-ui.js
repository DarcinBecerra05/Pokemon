import { LitElement, html } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import styles from './pokemon-list-ui.css.js';
import '@bbva-experience-components/bbva-button-default/bbva-button-default.js';

/**
 * ![LitElement component](https://img.shields.io/badge/litElement-component-blue.svg)
 *
 * This component ...
 *
 * Example:
 *
 * ```html
 *   <pokemon-list-ui></pokemon-list-ui>
 * ```
 */
export class PokemonListUi extends LitElement {

  static get is() {
    return 'pokemon-list-ui';
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

  _fireEvent(eventName, detail) {
    this.dispatchEvent(
      new CustomEvent(eventName, {
        bubbles: true,
        composed: true,
        detail,
      })
    );
  }

  static get styles() {
    return [
      styles,
      getComponentSharedStyles('pokemon-list-ui-shared-styles'),
    ];
  }

  async fetchPokemonData() {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=2');
      const data = await response.json();
      const detailedData = await Promise.all(data.results.map(pokemon => fetch(pokemon.url).then(res => res.json())));
      this.pokemonList = detailedData;
      console.log(this.pokemonList);
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
    }
  }

  render() {
    return html`
      <div class="container">
        ${this.pokemonList ? this.pokemonList.map(pokemon => html`
          <div class="pokemon-container">
            <bbva-web-card-product class="pokemon-card">
              <!-- Imagen del Pokémon -->
              <img class="pokemon-image" slot="media" src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
              <!-- Nombre del Pokémon -->
              <div class="pokemon-name" slot="title">${pokemon.name}</div>
              <!-- Peso del Pokémon -->
              <div class="pokemon-name" slot="title">${pokemon.weight} Kg</div>
              <!-- Tipos del Pokémon -->
              <div class="pokemon-type" slot="details">
                ${pokemon.types.map(typeInfo => html`<span>${typeInfo.type.name}</span>`)}
              </div>
            </bbva-web-card-product>
            <bbva-button-default @click=${this.gotoEvolution} class="evolutions-button" text="Evoluciones"></bbva-button-default>
          </div>
        `) : ''}
      </div>`;
  }

  gotoEvolution() {
    this.navigate('evolution');
  }

}


customElements.define(PokemonListUi.is, PokemonListUi);