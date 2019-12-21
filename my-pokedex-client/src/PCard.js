import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function PCard(props) {
    return (
        <div class="pokemon-pcard">
            <img src={'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/' + props.ndex + '.png'} alt={props.ndex} />
            <p key={props.ndex}>
                #{props.ndex} {props.nom}
            </p>
        </div>
    )
}

export default PCard;
