import React, {useEffect, useState} from 'react';
import {ButtonStatus, TriquiCell} from "../Helpers/types";
import './Triqui.css';
import {postRequest} from "../Data/BackendConnection";
import {AxiosResponse} from "axios";

type TriquiProps = {
    game: TriquiCell[][],
    isOld: boolean,
}

const Triqui: React.FC<TriquiProps> = (props) => {

    const [board, setBoard] = useState<TriquiCell[][]>(props.game);
    const [isX, setIsX] = useState<boolean>(true);
    const [isComplete, setIsComplete] = useState<boolean>(false);
    const [currentPosition, setCurrentPosition] = useState<[number, number]>([0, 0]);

    const createBoardRow = (row: TriquiCell[], disabled: boolean, columnNumber: number) => {
        return row.map((button, rowNumber) => {
            let buttonIcon = undefined;
            if (button.status !== ButtonStatus.INITIAL) {
                buttonIcon = button.status !== ButtonStatus.O ? <i className='far fa-circle'/> :
                    <i className='fas fa-times'/>
            }
            if (button.crossed) {
                return <td key={`${rowNumber}-${columnNumber}`} className={'triqui-cell'}>
                    <button className={'button-triqui-crossed'}
                            onClick={() => selectCell(isX, [columnNumber, rowNumber])}
                            disabled={disabled}>{buttonIcon} </button>
                </td>
            }
            return <td key={`${rowNumber}-${columnNumber}`} className={'triqui-cell'}>
                <button className={'button-triqui'} onClick={() => selectCell(isX, [columnNumber, rowNumber])}
                        disabled={disabled}>{buttonIcon} </button>
            </td>
        })
    }

    const validateBoard = () => {
        setIsComplete(isX ? validateComplete() || validateHorizontal(ButtonStatus.O) || validateFirstDiagonal(ButtonStatus.O) || validateVertical(ButtonStatus.O) || validateSecondDiagonal(ButtonStatus.O)
            : validateComplete() || validateHorizontal(ButtonStatus.X) || validateFirstDiagonal(ButtonStatus.X) || validateVertical(ButtonStatus.X) || validateSecondDiagonal(ButtonStatus.X))
    }

    const validateFirstDiagonal = (cellType: ButtonStatus): boolean => {
        let won = true;
        for (let i = 0; i < board.length; i++) {
            if (board[i][i].status !== cellType) {
                won = false;
            }
        }
        if (won) {
            const newBoard = board;
            for (let i = 0; i < board.length; i++) {
                newBoard[i][i] = {status: board[i][i].status, crossed: true}
            }
            setBoard(newBoard);
        }
        return won
    }

    const validateSecondDiagonal = (cellType: ButtonStatus): boolean => {
        let won = true;
        for (let j = board[0].length - 1; j >= 0; j--) {
            if (board[j][board[0].length - 1 - j].status !== cellType) {
                won = false;
            }
        }
        if (won) {
            const newBoard = board;
            for (let j = board[0].length - 1; j >= 0; j--) {
                newBoard[j][board[0].length - 1 - j] = {status: board[j][board[0].length - 1 - j].status, crossed: true}
            }
            setBoard(newBoard);
        }
        return won
    }

    const validateHorizontal = (cellType: ButtonStatus): boolean => {
        let won = true;
        for (let i = 0; i < board[currentPosition[0]].length; i++) {
            if (board[currentPosition[0]][i].status !== cellType) {
                won = false;
            }
        }
        if (won) {
            const newBoardColumn = board[currentPosition[0]].map(value => {
                return {status: value.status, crossed: true}
            })
            setBoard(prevousBoard => {
                let newBoard = prevousBoard;
                newBoard[currentPosition[0]] = newBoardColumn;
                return newBoard;
            })
        }
        return won;
    }

    const validateVertical = (cellType: ButtonStatus): boolean => {
        let won = true;
        for (let i = 0; i < board[currentPosition[0]].length; i++) {
            if (board[i][currentPosition[1]].status !== cellType) {
                won = false;
            }
        }
        if (won) {
            const newBoard = board;
            for (let i = 0; i < board.length; i++) {
                newBoard[i][currentPosition[1]] = {status: board[i][currentPosition[1]].status, crossed: true}
            }
            setBoard(newBoard);
        }
        return won;
    }

    const validateComplete = (): boolean => {
        let complete = true;
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                if (board[i][j].status === ButtonStatus.INITIAL) {
                    complete = false;
                }
            }
        }
        return complete;
    }

    useEffect(() => {
        if (!props.isOld) {
            validateBoard()
        }
    })

    const selectCell = (currentIsX: boolean, buttonIndex: [number, number]) => {
        setBoard(prevState => {
            const board = prevState;
            board[buttonIndex[0]][buttonIndex[1]].status = isX ? ButtonStatus.X : ButtonStatus.O;
            return board;
        })
        setIsX(!isX);
        setCurrentPosition(buttonIndex);
    }

    const restartGame = () => {
        const handling = (response: AxiosResponse) => {
            console.log(response.data)
        }
        const errorHandling = (reason: unknown) => {
            console.log(reason);
        }

        const url = 'http://localhost:5000/game'
        postRequest({game: board}, handling, errorHandling, url)
        window.location.reload();
    }

    const showAlert = () => {
        if (isComplete && !props.isOld) {
            return <div className={'alert'}>
                <p>El juego ha terminado. Quieres volver a jugar?
                </p>
                <button className={"button-new-game"} onClick={() => restartGame()}><p>Nueva partida</p></button>
            </div>
        }
    }
    return <div className={'container-triqui'}>
        {showAlert()}
        <table className={'table-triqui'}>
            <tbody>
            {
                board.map((row, index) => {
                    return <tr key={`${index}`}>{createBoardRow(row, isComplete || props.isOld, index)}</tr>
                })
            }
            </tbody>
        </table>
    </div>
}

export default Triqui;