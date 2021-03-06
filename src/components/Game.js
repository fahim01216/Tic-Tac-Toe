import React from "react";
import Board from '../components/Board';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            nextTurn: true,
        };
    }

    handleClick(i) {
        const history = this.state.history;
        const current = history[history.length-1];
        const squares = current.squares.slice();

        if(calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.nextTurn ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            nextTurn: !this.state.nextTurn
        });
    }

    render() {
        const history = this.state.history;
        const current = history[history.length-1];
        const winner = calculateWinner(current.squares);
        let status;

        if(winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next Player: ' + (this.state.nextTurn ? 'X' : 'O');
        }

        return(
            <div className="game">
                <div className="game-board">
                    <Board 
                     squares={current.squares}
                     onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{/*todo */}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [2,5,8],
        [1,4,7],
        [0,4,8],
        [2,4,6]
    ];

    for(let i = 0; i < lines.length; i++) {
        const[a, b, c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}


export default Game;