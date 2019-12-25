import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function PCard(props) {
    return (
        <a class="poke-link" href={`http://localhost:5000/api/pokemons/${props.ndex}`}>
            <div class="pokemon-pcard">
                <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${props.ndex}.png`} alt={props.ndex} />
                <p class="poke-link" key={props.ndex}>
                    #{props.ndex}<br />{props.nom}
                </p>
            </div>
        </a>

    )
}

export default PCard;
