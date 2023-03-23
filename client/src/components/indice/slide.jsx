import image1 from "../../images/01.jpg";
import image2 from "../../images/02.jpg";
import image3 from "../../images/03.jpg";
import image4 from "../../images/04.jpg";

import { useEffect, useState } from "react";

const Slide = () => {
  const [contador, setcontador] = useState({
    contar: 0,
    estado: false,
  });
  let identificadorTiempoDeEspera;
  useEffect(() => {
    temporizadorDeRetraso();
  });

  function temporizadorDeRetraso() {
    identificadorTiempoDeEspera = setTimeout(funcionConRetraso, 5000);
  }

  function funcionConRetraso() {
    if (contador.contar === 3 && contador.estado === false) {
      setcontador({
        ...contador,

        ["estado"]: true,
      });

      console.log(contador);
    } else if (contador.contar === 0 && contador.estado == true) {
      setcontador({
        ...contador,

        ["estado"]: false,
      });

      console.log(contador);
    } else if (contador.estado === false) {
      setcontador({
        ...contador,
        ["contar"]: contador.contar + 1,
      });
      console.log(contador);
    } else if (contador.estado === true) {
      setcontador({
        ...contador,
        ["contar"]: contador.contar - 1,
      });
      console.log(contador);
    }
  }

  return (
    <div className="slide_total">
      <div
        className={
          contador.contar === 1
            ? "indice_slider2"
            : contador.contar === 2
            ? "indice_slider3"
            : contador.contar === 3
            ? "indice_slider4"
            : "indice_slider"
        }
      >
        <div className="indice_slider">
          <div className="indice_slide">
            <img src={image1} alt="image1" className="image_slide" />
          </div>
          <div className="indice_slide">
            <img src={image2} alt="image2" className="image_slide" />
          </div>
          <div className="indice_slide">
            <img src={image3} alt="image3" className="image_slide" />
          </div>
          <div className="indice_slide">
            <img src={image4} alt="image4" className="image_slide" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide;
