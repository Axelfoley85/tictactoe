import React from "react";
import Board from './Board'

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        col: null,
        row: null,
      }],
      xIsNext: true,
      stepNumber: 0,
      reverseList: false,
      gameOver: false
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber +1)
    const current = history[history.length -1]
    const squares = current.squares.slice()
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      history: history.concat([{
        squares: squares,
        col: i % 3 + 1,
        row: Math.floor(i / 3) + 1,
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    })
  }

  jumpTo(move) {
    this.setState({
      stepNumber: move,
      xIsNext: (move % 2) === 0,
    })
  }

  reverseListOrder() {
    this.setState({
      reverseList: !this.state.reverseList
    })
  }

  isWinnerSquare(i, winner) {
    return winner ? 
      winner.includes(i) ?
        "square-winner" : "square-board" :
      "square-board"
  }
  
  render() {
    const column = ['a', 'b', 'c']

    const history = this.state.history
    const current = history[this.state.stepNumber]
    const winner = calculateWinner(current.squares)
    
    let status
    if (winner) {
      status = 'Game Over, winner is ' + winner.player + ' ' + winner.line
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            className={(i) => this.isWinnerSquare(i, winner)}
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>
            <button onClick={()=>this.reverseListOrder()}>Reverse list order</button>
          </div>
          {
            this.state.reverseList ?
              <ol reversed>{this.movesList(history, column)}</ol> :
              <ol>{this.movesList(history, column)}</ol>
          }
        </div>
      </div>
    );
  }

  movesList(history, column) {
    const length = history.length
    const start = this.state.reverseList ? length - 1 : 0
    let list = []
    const reverseList = this.state.reverseList

    for (
      let move = start;
      move < length && move >= 0;
      reverseList ? move-- : move++
    ) {
      const description = move ?
        'Go to move #' + move + ' (' +
        column[history[move].col - 1] +
        history[move].row + ')' :
        'Go to game start';

      const historyItemClass = this.state.stepNumber === move ? "active-step" : null;

      list.push(
        <li key={move}>
          <button
            className={historyItemClass}
            onClick={() => this.jumpTo(move)}
          >
            {description}
          </button>
        </li>
      );
    }

    return list
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b , c] = lines[i];
    if (
      squares[a] && 
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return {
        player: squares[a],
        line: [a, b, c]
      }
    }
  }
  return null
}

export default Game;
