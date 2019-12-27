import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PokeCard from './PokeCard'

export default class Pokemons extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pokemons_ref: [], pokemons: [] }

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
        console.log(data)
        this.setState({ pokemons_ref: data.pokemons.sort((a, b) => a.ndex - b.ndex) });
        this.setState({ pokemons: this.state.pokemons_ref });
    }

    handleSearchChange(event) {
        this.setState({
            pokemons: this.state.pokemons_ref.filter((pokemon) => {
                return this.ignoreCase(`#${pokemon.ndex}${pokemon.nom}`).includes(this.ignoreCase(event.target.value));
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

            case (event.target.value === 'orderByWeight'):
                this.setState({ pokemons: this.state.pokemons.sort((a, b) => a.poids - b.poids) });
                break;

            case (event.target.value === 'disorderByWeight'):
                this.setState({ pokemons: this.state.pokemons.sort((a, b) => b.poids - a.poids) });
                break;

            default:
                this.setState({ pokemons: this.state.pokemons.sort((a, b) => a.ndex - b.ndex) });
        }
    }

    ignoreCase(string) {
        return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    render() {
        const { pokemons } = this.state;

        return (
            <div>
                <div class="container">
                    <form class="mb-4" autocomplete="off" >
                        <div class="form-row">
                            <div class="col-md-10 px-2 pb-2">
                                <input class="form-control" type="text" placeholder="Recherche" name="search" onChange={this.handleSearchChange} />
                            </div>
                            <div class="col-md-2 px-2 pb-2">
                                <select class="form-control" name="orderBy " type="text" onChange={this.handleSelectChange}>
                                    <option value="orderByNdex">- Ndex</option>
                                    <option value="disorderByNdex">+ Ndex</option>
                                    <option value="orderByName">Alphabétique</option>
                                    <option value="disorderByName">Analphabétique</option>
                                    <option value="orderByWeight">- Poids</option>
                                    <option value="disorderByWeight">+ Poids</option>
                                </select>
                            </div>
                        </div>

                    </form>
                </div>
                <div class="container">
                    <div class="row">
                        {pokemons
                            .map(pokemon => (
                                <div class="col-sm-4 col-md-3 col-lg-2 p-2">
                                    <PokeCard ndex={pokemon.ndex} nom={pokemon.nom} />
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        )
    }
}