import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Pokemons extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pokemons: [] }

        this.handleChange = this.handleChange.bind(this);
    }

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
        //console.log(data)
        this.setState({ pokemons: data.pokemons.sort((a, b) => a.ndex - b.ndex) });
    }

    handleChange(event) {
        switch (true) {
            case (event.target.value == 'orderByNdex'):
                this.setState({ pokemons: this.state.pokemons.sort((a, b) => a.ndex - b.ndex) });
                break;

            case (event.target.value == 'disorderByNdex'):
                this.setState({ pokemons: this.state.pokemons.sort((a, b) => b.ndex - a.ndex) });
                break;

            case (event.target.value == 'orderByName'):
                this.setState({
                    pokemons: this.state.pokemons.sort((a, b) => {
                        return (a.nom > b.nom) ? 1 : (a.nom < b.nom) ? -1 : 0
                    })
                });
                break;

            case (event.target.value == 'disorderByName'):
                this.setState({
                    pokemons: this.state.pokemons.sort((a, b) => {
                        return (b.nom > a.nom) ? 1 : (b.nom < a.nom) ? -1 : 0;
                    })
                });
                break;

            default:
                this.setState({ pokemons: this.state.pokemons.sort((a, b) => a.ndex - b.ndex) });
        }
    }

    render() {
        const { pokemons } = this.state;

        return (
            <div>
                <h1>Pokemon list:</h1>
                <div class="container">
                    <div>
                        <label for="orderBy">Trier par :  </label>
                        <select name="orderBy " type="text" onChange={this.handleChange}>
                            <option value="orderByNdex">Ndex</option>
                            <option value="disorderByNdex">- Ndex</option>
                            <option value="orderByName">Alphabétique</option>
                            <option value="disorderByName">- Alphabétique</option>
                        </select>
                    </div>
                    <div class="row">
                        {pokemons
                            .map(pokemon => (
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