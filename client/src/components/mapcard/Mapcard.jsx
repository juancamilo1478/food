function Mapcard(props) {
  const divs = [];

  const cambiarvalor = (data) => {
    props.positionpage(Number(data));
  };

  for (let i = 0; i < props.tamaño; i++) {
    divs.push(
      <div
        key={i}
        className={props.position === i ? "mapcard_botton" : "mapcard_here"}
        onClick={() => cambiarvalor(i)}
      >
        <h1>{i}</h1>
      </div>
    );
  }

  return (
    <div className="map_card_component">
      <div
        onClick={() => cambiarvalor(Number(props.position) - 1)}
        className={
          Number(props.position) === 0 ? "map_card_null" : "map_card_prev"
        }
      ></div>

      {divs}
      <div
        onClick={() => cambiarvalor(Number(props.position) + 1)}
        className={
          Number(props.position) === Number(props.tamaño - 1)
            ? "map_card_null"
            : "map_card_next"
        }
      ></div>
    </div>
  );
}
export default Mapcard;
