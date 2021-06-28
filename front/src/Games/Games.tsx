import React from "react";
import Triqui from "../Triqui/Triqui";
import {TriquiCell} from "../Helpers/types";
import './Games.css';

type GamesPros = {
    games: [TriquiCell[][]]
}

const Games: React.FC<GamesPros> = (props) => {
    return (
        <div className={'games-container'}>
            <hr/>
            <h1 className={"heading-games"}>Juegos anteriores: </h1>
            <table className={'games-table'}>
                <tbody className={'games-table-body'}>
                <tr>
                    {props.games.map((value,index) => {
                        return <td key={index}><Triqui isOld={true} game={value}/></td>
                    })}
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Games;