import React from "react";
import Square from "./Square";

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        className={this.props.squareClassNames[i]}
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
          <div className="row-title-field">{i+1}</div>
          {elements}
        </div>
      )
    })

    return (
      <div className="board">
        <div className="column-title-row">
          <div className="column-title-field">a</div>
          <div className="column-title-field">b</div>
          <div className="column-title-field">c</div>
        </div>
        {rows}
      </div>
    );
  }
}

export default Board;