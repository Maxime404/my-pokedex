import React from 'react';
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

function PCard(props) {
    return (
        <a href={`/${props.ndex}`}>
            <div class="pokemon-pcard">
                <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${props.ndex}.png`} alt={props.ndex} />
                <p key={props.ndex}>
                    #{props.ndex}<br />{props.nom}
                </p>
            </div>
        </a>

    )
}

export default PCard;
