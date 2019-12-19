import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Pokemons extends React.Component {
    state = { pokemons: [] }

    componentDidMount() {
        this.fetchListPokemons();
    }

    async fetchListPokemons() {
        const response = await fetch('http://localhost:5000/api/pokemons', {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json();
        console.log(data)
        this.setState({ pokemons: data.pokemons });
    }

    render() {
        const { pokemons } = this.state;

        return (
            <div>
                <h1>Pokemon list:</h1>
                <div class="container">
                    <div class="row">
                        {pokemons.map(pokemon => (
                            <div class="col-sm-6 col-md-4 col-lg-3 mb-3">
                                <div class="pokemon-v-card">
                                    <img src={'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/' + pokemon.ndex + '.png'} alt={pokemon.ndex} />
                                    <p key={pokemon.ndex}>
                                        #{pokemon.ndex} {pokemon.nom}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}