import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Pokemons extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pokemon: {}, pathname: props.location.pathname.slice(1) };
    }

    componentDidMount() {
        this.fetchListPokemonSpec();
    }

    async fetchListPokemonSpec() {

        const response = await fetch(`http://localhost:5000/api/pokemons/${this.state.pathname}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json();
        console.log(data)
        this.setState({ pokemon: data });
    }

    render() {
        const { pokemon } = this.state;

        let li_type2;
        if (pokemon.type2) {
            li_type2 = <li>Type 2</li>;
        } else {
            li_type2 = <li></li>;
        }

        return (
            <div class="p-2">
                <div class="container">
                    <div class="row">
                        <div class="col-md-6">
                            <img class="align-self-center" src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemon.ndex}.png`} alt={pokemon.ndex} />
                            <h2 class="align-self-center" key={pokemon.ndex}>
                                #{pokemon.ndex} {pokemon.nom}
                            </h2>
                        </div>
                        <div class="card col-md-6">
                            <div class="row card-body">
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container">
                    <div class="row border-bottom mb-3">
                        <p class="mb-1 h4">
                            Identité
                        </p>
                    </div>
                    <div class="row">
                        <ul class="col-md-3 p-2 font-weight-bold">
                            <li>Taille</li>
                            <li>Poids</li>
                            <li>Espèce</li>
                            <li>Couleur</li>
                            <li>Type 1</li>
                            {li_type2}
                        </ul>
                        <ul class="col-md-3 p-2">
                            <li>{pokemon.taille} m</li>
                            <li>{pokemon.poids} kg</li>
                            <li>{pokemon.espece}</li>
                            <li>{pokemon.couleur}</li>
                            <li>{pokemon.type1}</li>
                            <li>{pokemon.type2}</li>
                        </ul>
                        <ul class="col-md-3 p-2 font-weight-bold">
                            <li>Cras justo odio</li>
                            <li>Cras justo odio</li>
                            <li>Cras justo odio</li>
                            <li>Cras justo odio</li>
                            <li>Cras justo odio</li>
                        </ul>
                        <ul class="col-md-3 p-2">
                            <li>Cras justo odio</li>
                            <li>Cras justo odio</li>
                            <li>Cras justo odio</li>
                            <li>Cras justo odio</li>
                            <li>Cras justo odio</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}