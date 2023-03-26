import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filtrar } from "../../redux/actions/actions";

function FilterBotton(props) {
  const [estate, setState] = useState("OFF");
  const cartas = useSelector((state) => state.cards);
  useEffect(() => {
    handlefilter();
  }, [estate]);

  useEffect(() => {
    handlereset();
  }, [props.reset]);

  const dispatch = useDispatch();
  const handlebotton = () => {
    if (estate == "OFF") {
      setState("ON");
    }
  };
  const handlereset = () => {
    setState("OFF");
  };

  const handlefilter = () => {
    if (estate === "ON") {
      let data_filter = cartas.flat();
      let newdata_filter = data_filter.filter((data) => {
        return data.diets.includes(props.name) === true;
      });

      dispatch(filtrar(newdata_filter));
    }
  };

  return (
    <div className="filterBotton">
      <h3>{props.name}</h3>
      <div
        className={
          estate == "ON" ? "filter_div_bottonon" : "filter_div_bottonoff"
        }
      >
        <button
          className={estate === "ON" ? "botton_movilon" : "botton_moviloff"}
          onClick={handlebotton}
        ></button>
      </div>
    </div>
  );
}
export default FilterBotton;
