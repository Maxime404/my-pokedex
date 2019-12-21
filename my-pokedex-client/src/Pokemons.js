import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PCard from './PCard'

export default class Pokemons extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pokemons: [] }

        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
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

    handleSearchChange(event) {
        this.setState({
            pokemons: this.state.pokemons.filter((pokemon) => {
                return pokemon.nom.includes(event.target.value);
            })
        });
    }

    handleSelectChange(event) {
        switch (true) {
            case (event.target.value === 'orderByNdex'):
                this.setState({ pokemons: this.state.pokemons.sort((a, b) => a.ndex - b.ndex) });
                break;

            case (event.target.value === 'disorderByNdex'):
                this.setState({ pokemons: this.state.pokemons.sort((a, b) => b.ndex - a.ndex) });
                break;

            case (event.target.value === 'orderByName'):
                this.setState({
                    pokemons: this.state.pokemons.sort((a, b) => {
                        return (this.ignoreCase(a.nom) > this.ignoreCase(b.nom)) ? 1 : (this.ignoreCase(a.nom) < this.ignoreCase(b.nom)) ? -1 : 0
                    })
                });
                break;

            case (event.target.value === 'disorderByName'):
                this.setState({
                    pokemons: this.state.pokemons.sort((a, b) => {
                        return (this.ignoreCase(b.nom) > this.ignoreCase(a.nom)) ? 1 : (this.ignoreCase(b.nom) < this.ignoreCase(a.nom)) ? -1 : 0
                    })
                });
                break;

            default:
                this.setState({ pokemons: this.state.pokemons.sort((a, b) => a.ndex - b.ndex) });
        }
    }

    ignoreCase(string) {
        return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    render() {
        const { pokemons } = this.state;

        return (
            <div>
                <h1>Pokemon list:</h1>
                <div class="container">
                    <div class="mb-3">
                        <label for="inputText">Trier par :  </label>
                        <input name="inputText" type="text" onChange={this.handleSearchChange} />
                        <label for="orderBy">Trier par :  </label>
                        <select name="orderBy " type="text" onChange={this.handleSelectChange}>
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
                                    <PCard ndex={pokemon.ndex} nom={pokemon.nom} />
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        )
    }
}