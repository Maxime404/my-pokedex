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

        return (
            <div>
                <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemon.ndex}.png`} alt={pokemon.ndex} />
                <p key={pokemon.ndex}>
                    #{pokemon.ndex}<br />{pokemon.nom}
                </p>
            </div>
        )
    }
}