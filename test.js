getPokemons() {
    this._getCitysService({
      host: this.host,
      version: this.version,
      native: this.native,
      
    })
      .generateRequest()
      .then((response) => {
        response = JSON.parse(response.response);
        const newDataCities = [];
        response.data.forEach((e) => {
          const newObjPokemon = {
            id: e.id,
            name: e.name,
            prites: e.state.id,
            stateName: e.state.name
          };
          newDataCities.push(newObjectCities);
        });
        console.log(newDataCities);
        this._fireEvent('data-cities-success', newDataCities);
      })
      .catch((error) => {
        this._fireEvent('data-cities-failure', error);
      });
  }

  _fireEvent(eventName, payload = {}) {
    this.dispatchEvent(
      new CustomEvent(eventName, {
        bubbles: true,
        composed: true,
        detail: payload,
      }),
    );
  }


  ///UI
  _fireEvent(eventName, detail) {
    this.dispatchEvent(
      new CustomEvent(eventName, {
        bubbles: true,
        composed: true,
        detail,
      })
    );
  }