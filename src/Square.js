function Square(props) {
  return (
    <button className="square-board" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Square