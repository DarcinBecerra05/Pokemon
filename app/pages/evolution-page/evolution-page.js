import { CellsPage } from '@cells/cells-page';
import { html, css } from 'lit-element';
import '@cells-demo/demo-app-template/demo-app-template.js';
import '@bbva-web-components/bbva-web-link/bbva-web-link.js';
import '../../elements/pokemon-list-ui/pokemon-list-ui.js';

class EvolutionPage extends CellsPage {
  static get is() {
    return 'evolution-page';
  }
  static get properties() {
    return {
      title: { type: String },
    };
  }

  constructor() {
    super();
    this.title = 'Evolución de Pokemon';
  }

  render() {
    return html`
      <demo-app-template data-cells-type="template">
        <div slot="app-main-content">
          <h3>${this.title}</h3>
          <bbva-button-default
            @click=${this.gotoHome}
            class="evolutions-button"
            text="Regresar"
          ></bbva-button-default>
        </div>
      </demo-app-template>
    `;
  }

  gotoHome() {
    this.navigate('home');
  }

  handleChannels() {
    this.subscribe('evolution-channel', data => {
      this.totalGoalAmount = data.totalGoalAmount;
      this.totalSavedAmount = data.totalSavedAmount;
    });
  }


}

window.customElements.define(EvolutionPage.is, EvolutionPage);
