import diet from "../../images/dieta.png";

const Card = (props) => {
  return (
    <div className="card_tamaño">
      <div className="card_div_name">
        <h2>{props.name}</h2>
      </div>
      <img src={props.image} alt={props.image} className="card_image" />
      <div className="card_level">
        <h3>Head score: {props.level} points</h3>
      </div>
      <div className="card_icodieta">
        <h4>Type of diet</h4>
        <div>
          <img src={diet} alt="dieta" />
        </div>
      </div>
      <div className="card_dietas">
        {props.diets.map((data) => {
          return <div className="card_diets">{data}</div>;
        })}
      </div>
    </div>
  );
};
export default Card;
