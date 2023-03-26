import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderdata, reset } from "../../redux/actions/actions";
import FilterBotton from "./FilterBotton";

function Filter() {
  //CONTROLER STATE FILTERS AND ORDER
  const cartas = useSelector((state) => state.cards);
  const diets = useSelector((state) => state.diets);

  const dispatch = useDispatch();

  const [estado, setEstado] = useState({
    order: "",
    filter: "",
  });
  //order setstate
  const order = (e) => {
    setEstado({
      ...estado,
      ["order"]: e,
    });
    let all = cartas.flat();
    switch (e) {
      case "A-Z":
        const az = all.sort((a, b) => a.name.localeCompare(b.name));
        dispatch(orderdata(az));
        break;
      case "Z-A":
        const za = all.sort((a, b) => b.name.localeCompare(a.name));
        dispatch(orderdata(za));
        break;
      case "HS-min":
        for (var j = 0; j < all.length; j++) {
          for (var i = 0; i < all.length - 1; i++) {
            if (all[i + 1].level < all[i].level) {
              const auxiliar = all[i];
              all[i] = all[i + 1];
              all[i + 1] = auxiliar;
            }
          }
        }
        dispatch(orderdata(all));
        break;
      case "HS-max":
        for (var j = 0; j < all.length; j++) {
          for (var i = 0; i < all.length - 1; i++) {
            if (all[i + 1].level > all[i].level) {
              const auxiliar = all[i];
              all[i] = all[i + 1];
              all[i + 1] = auxiliar;
            }
          }
        }
        dispatch(orderdata(all));
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    console.log(diets);
  }, [diets]);

  //reset
  const [resetboton, setreset] = useState(0);

  const handlereset = () => {
    setreset(resetboton + 1);
    setreset(resetboton - 1);
    dispatch(reset());
  };

  return (
    <div className="filter_all">
      <h3>Order by</h3>
      <hr />
      <div className="filter_botton_order">
        <div
          onClick={() => order("A-Z")}
          className={estado.order === "A-Z" ? "filter_ok" : "filter_no"}
        >
          <h4>A-Z</h4>
        </div>
        <div
          onClick={() => order("Z-A")}
          className={estado.order === "Z-A" ? "filter_ok" : "filter_no"}
        >
          <h4>Z-A</h4>
        </div>
        <div
          onClick={() => order("HS-min")}
          className={estado.order === "HS-min" ? "filter_ok" : "filter_no"}
        >
          <h4>HS-min</h4>
        </div>
        <div
          onClick={() => order("HS-max")}
          className={estado.order === "HS-max" ? "filter_ok" : "filter_no"}
        >
          <h4>HS-max</h4>
        </div>
      </div>
      <hr />
      {/* parte de los filtros */}

      {diets.map((data, index) => {
        return (
          <div>
            <FilterBotton key={index} name={data} reset={resetboton} />
          </div>
        );
      })}
      <div onClick={handlereset} className="filter_botton_reset">
        <h2>Reset</h2>
      </div>
    </div>
  );
}
export default Filter;
