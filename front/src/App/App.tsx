import React, {useEffect, useState} from 'react';
import './App.css';
import Triqui from "../Triqui/Triqui";
import Navbar from "../Navbar/Navbar";
import {getRequest} from "../Data/BackendConnection";
import {ButtonStatus, TriquiCell} from "../Helpers/types";
import {AxiosResponse} from "axios";
import Games from "../Games/Games";


function App() {
    const [games, setGames] = useState<[TriquiCell[][]]>([[]]);

    const emptyBoard: TriquiCell[][] = [[{status: ButtonStatus.INITIAL, crossed: false}, {
        status: ButtonStatus.INITIAL,
        crossed: false
    }, {status: ButtonStatus.INITIAL, crossed: false}], [{
        status: ButtonStatus.INITIAL,
        crossed: false
    }, {status: ButtonStatus.INITIAL, crossed: false}, {
        status: ButtonStatus.INITIAL,
        crossed: false
    }], [{status: ButtonStatus.INITIAL, crossed: false}, {
        status: ButtonStatus.INITIAL,
        crossed: false
    }, {status: ButtonStatus.INITIAL, crossed: false}]];

    useEffect(() => {
        const handling = (reponse: AxiosResponse) => {
            const games = reponse.data
            setGames(games.games)
        }

        const errorHandling = (reason: unknown) => {
            console.log(reason)
        }
        getRequest(handling, errorHandling, 'http://localhost:5000/games')
    }, [])

    return (
        <div className="App">
            <Navbar/>
            <Triqui game={emptyBoard} isOld={false}/>
            <Games games={games}/>
        </div>
    );
}

export default App;
