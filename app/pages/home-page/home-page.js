import { CellsPage } from '@cells/cells-page';
import { html, css } from 'lit-element';
import '@cells-demo/demo-app-template/demo-app-template.js';
import '@bbva-web-components/bbva-web-link/bbva-web-link.js'; //Componentes externos
import '@bbva-experience-components/bbva-button-default/bbva-button-default.js';

class HomePage extends CellsPage {
  static get is() {
    return 'home-page';
  }
  static get properties() {
    return {
      title: { type: String },
      company: { type: String },
      pokemonList: { type: Array },
    };
  }

  constructor() {
    super();
    this.title = 'Taller 1 Páginas Declarativas';
    this.pokemonList = [];
    this.fetchPokemonData();
  }

  async fetchPokemonData() {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?offset=131&limit=5');
      const data = await response.json();
      const detailedData = await Promise.all(
        data.results.map((pokemon) =>
          fetch(pokemon.url).then((res) => res.json())
        )
      );
      this.pokemonList = detailedData;
      console.log(this.pokemonList);
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
    }
  }

  render() {
    return html` <div class="container">
      <h3>${this.title}</h3>
      ${this.pokemonList
    ? this.pokemonList.map(
      (pokemon) => html`
              <div class="pokemon-container">
                <bbva-web-card-product class="pokemon-card">
                  <!-- Imagen del Pokémon -->
                  <img
                    class="pokemon-image"
                    slot="media"
                    src="${pokemon.sprites.front_default}"
                    alt="${pokemon.name}"
                  />
                  <!-- Nombre del Pokémon -->
                  <div class="pokemon-name" slot="title">${pokemon.name}</div>
                  <!-- Peso del Pokémon -->
                  <div class="pokemon-name" slot="title">
                    ${pokemon.weight} Kg
                  </div>
                  <!-- Tipos del Pokémon -->
                  <div class="pokemon-type" slot="details">
                    ${pokemon.types.map(
    (typeInfo) => html`<span>${typeInfo.type.name}</span>`
  )}
                  </div>
                </bbva-web-card-product>
                <bbva-button-default
                  @click=${this.goToEvolution}
                  class="evolutions-button"
                  text="Evoluciones"
                ></bbva-button-default>
              </div>
            `
    )
    : ''}
    </div>`;
  }

  goToEvolution() {
    this.publish('evolution-channel', this.totals);
    this.navigate('evolution');
  }


}

window.customElements.define(HomePage.is, HomePage);
