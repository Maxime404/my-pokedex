import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PokeLi from './PokeLi'
import PokeAttackCard from './PokeAttackCard'

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
        this.setState({ pokemon: data });
    }

    render() {
        const { pokemon } = this.state;
        let attaques = [];
        if (pokemon.attaques !== undefined) {
            attaques = pokemon.attaques;
        }

        return (
            <div class="p-2">
                <div class="container mb-5">
                    <div class="row">
                        <div class="col">
                            <img class="align-self-center" src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemon.ndex}.png`} alt={pokemon.ndex} />
                            <h2 class="align-self-center" key={pokemon.ndex}>
                                #{pokemon.ndex} {pokemon.nom}
                            </h2>
                        </div>
                    </div>
                </div>
                <div class="container mb-2">
                    <div class="row border-bottom text-left mb-3">
                        <p class="col-md-6 mb-1 h4">
                            Caractéristiques
                        </p>
                        <p class="col-md-6 mb-1 h4">
                            Noms
                        </p>
                    </div>
                    <div class="row">
                        <ul class="col-md-6 p-2">
                            <PokeLi name="Taille" value={pokemon.taille + " m"} />
                            <PokeLi name="Poids" value={pokemon.poids + " kg"} />
                            <PokeLi name="Espèce" value={pokemon.espece} />
                            <PokeLi name="Couleur" value={pokemon.couleur} />
                            <PokeLi name="Type 1" value={pokemon.type1} />
                            <PokeLi name="Type 2" value={pokemon.type2} />
                        </ul>
                        <ul class="col-md-6 p-2">
                            <PokeLi name="Pokemon" value={pokemon.pokemon} />
                            <PokeLi name="Nom (fr)" value={pokemon.nom} />
                            <PokeLi name="Name (en)" value={pokemon.nomen} />
                            <PokeLi name="Name (de)" value={pokemon.nomde} />
                            <PokeLi name="Isim (tm)" value={pokemon.nomtm} />
                            <PokeLi name="名前 (ja)" value={pokemon.nomja} />
                        </ul>
                    </div>
                </div>
                <div class="container mb-2">
                    <div class="row border-bottom text-left mb-3">
                        <p class="col-md-4 mb-1 h4">
                            -DEX
                        </p>
                        <p class="col-md-8 mb-1 h4">
                            Autres
                        </p>
                    </div>
                    <div class="row">
                        <ul class="col-md-4 p-2">
                            <PokeLi name="NDEX" value={pokemon.ndex} />
                            <PokeLi name="JDEX" value={pokemon.jdex} />
                            <PokeLi name="NJDEX" value={pokemon.njdex} />
                            <PokeLi name="HDEX" value={pokemon.hdex} />
                            <PokeLi name="FDEX" value={pokemon.fdex} />
                            <PokeLi name="ODEX" value={pokemon.odex} />
                            <PokeLi name="OPDEX" value={pokemon.opdex} />
                        </ul>
                        <ul class="col-md-4 p-2">
                            <PokeLi name="Expérience val." value={pokemon.expval} />
                            <PokeLi name="Expérience max." value={pokemon.expmax} />
                            <PokeLi name="Effort val." value={pokemon.effortval} />
                            <PokeLi name="Capture val." value={pokemon.captureval} />
                            <PokeLi name="Forme" value={pokemon.forme} />
                            <PokeLi name="Ratio femelle/mâle" value={pokemon.fmratio} />
                        </ul>
                        <ul class="col-md-4 p-2">
                            <PokeLi name="Groupe oeuf 1" value={pokemon.groupoeuf1} />
                            <PokeLi name="Groupe oeuf 2" value={pokemon.groupoeuf2} />
                            <PokeLi name="Oeuf Pas" value={pokemon.oeufpas} />
                            <PokeLi name="Capacité spéciale 1" value={pokemon.capspe1} />
                            <PokeLi name="Capacité spéciale 2" value={pokemon.capspe2} />
                        </ul>
                    </div>
                </div>
                <div class="container mb-2">
                    <div class="row border-bottom mb-3">
                        <p class="mb-1 h4">
                            Attaques
                        </p>
                    </div>
                    <div class="row">
                        {attaques
                            .map(attaque => (
                                <div class="col-sm-6 col-md-4 col-lg-3 p-3">
                                    <PokeAttackCard
                                        nom={attaque.nom}
                                        niveau={attaque.niveau}
                                        puissance={attaque.puissance}
                                        precision={attaque.precision}
                                        pp={attaque.pp} />
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        )
    }
}