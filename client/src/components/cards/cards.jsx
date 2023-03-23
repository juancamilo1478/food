import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Mapcard from "../mapcard/Mapcard";
import Card from "./Card";

const Cards = () => {
  const cartas = useSelector((state) => state.cards);
  const [navegation, setnavegation] = useState(0);
  useEffect(() => {
    setnavegation(0);
  }, [cartas]);

  const positionpage = (data) => {
    setnavegation(data);
  };

  return (
    <div>
      <Mapcard
        tamaño={cartas.length}
        position={navegation}
        positionpage={positionpage}
      />
      <div className="cards_total">
        {cartas.length > 0 &&
          cartas[navegation]?.map((data, index) => {
            return (
              <Card
                name={data.name}
                id={data.id}
                level={data.level}
                diets={data.diets}
                image={data.image}
                key={index}
              />
            );
          })}
      </div>
    </div>
  );
};
export default Cards;
