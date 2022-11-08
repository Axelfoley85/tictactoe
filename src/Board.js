import React from "react";
import Square from "./Square";

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        // winnerRow={this.props.winnerRow}
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const rows = [0, 1, 2].map((i) => {
      const elements = [0, 1, 2].map((j) => {
        return this.renderSquare(i*3 + j)
      })

      return (
        <div className="board-row" key={i}>
          <div className="square">{i+1}</div>
          {elements}
        </div>
      )
    })

    return (
      <div className="board">
        <div className="board-row">
          <div className="square"></div>
          <div className="square">a</div>
          <div className="square">b</div>
          <div className="square">c</div>
        </div>
        {rows}
      </div>
    );
  }
}

export default Board;