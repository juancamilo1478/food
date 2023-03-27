import { useEffect, useState } from "react";
import validation from "./validation";
import { useDispatch, useSelector } from "react-redux";
import Look from "./look";
import axios from "axios";
import { listfilters } from "../../redux/actions/actions";

function Form() {
  const dispatch = useDispatch();
  const dietas = useSelector((state) => state.diets);
  useEffect(() => {
    if (dietas.length === 0) {
      dispatch(listfilters());
    }
  }, []);

  const diets = useSelector((state) => state.diets);
  const [contenido, setcontenido] = useState({
    name: "",
    image: "",
    resumen: "",
    level: 0,
    pasos: [],
    diet: [],
    select_diet: "",
    paso: "",
    chek: false,
  });
  const [errors, setErrors] = useState({
    name: "",
    image: "",
    resumen: "",
    level: "",
    pasos: "",
    diet: "",
  });

  const handledata = (e) => {
    setcontenido({ ...contenido, [e.target.name]: e.target.value });

    setErrors(
      validation({
        ...contenido,
        [e.target.name]: e.target.value,
      })
    );
    console.log(errors);
  };
  const handleform = (e) => {
    e.preventDefault();

    if (
      !errors.name &&
      !errors.image &&
      !errors.level &&
      !errors.pasos &&
      !errors.diet
    ) {
      axios
        .post("http://localhost:3001/recipes", {
          name: contenido.name,
          image: contenido.image,
          resumen: contenido.resumen,
          level: contenido.level,
          pasos: contenido.pasos,
          diet: contenido.diet,
        })
        .then((response) => {
          setcontenido({
            name: "",
            image: "",
            resumen: "",
            level: 0,
            pasos: [],
            diet: [],
            select_diet: "",
            paso: "",
            chek: false,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setcontenido({ ...contenido, ["chek"]: true });
    }
  };

  const handleselect = (e) => {
    setcontenido({
      ...contenido,
      ["select_diet"]: e.target.value,
    });
  };

  const savediet = () => {
    console.log(contenido.diet.includes(contenido.select_diet) === false);
    if (
      contenido.select_diet !== "" &&
      contenido.diet.includes(contenido.select_diet) === false
    ) {
      setcontenido({
        ...contenido,
        ["diet"]: [...contenido.diet, contenido.select_diet],
      });
      console.log(contenido);
    }
  };

  const deletediet = (e) => {
    let data = contenido.diet.filter((data) => {
      return data !== e.target.value;
    });
    setcontenido({
      ...contenido,
      ["diet"]: data,
    });
  };

  const deletestep = (e) => {
    let filtered = contenido.pasos.filter((data) => {
      return parseInt(e.target.value) !== parseInt(data.number);
    });
    console.log(filtered);
    filtered = filtered.map((data, index) => {
      return {
        ...data,
        number: index + 1,
      };
    });

    setcontenido({
      ...contenido,
      ["pasos"]: filtered,
    });
  };

  const savestep = () => {
    if (contenido.paso.length > 0) {
      const number = contenido.pasos.length + 1;
      const data = { number: number, step: contenido.paso };
      setcontenido({
        ...contenido,
        ["paso"]: "",
        ["pasos"]: [...contenido.pasos, data],
      });
      console.log(contenido);
    }
  };
  return (
    <div className="form_father">
      <div className="form_top_wallpeper"></div>

      <form onSubmit={handleform}>
        {/* form part 1 */}
        <div className="form_data">
          <h1>Create your own recipe</h1>
          <div className="form_element">
            <h3>Recipe name:</h3>
            <input
              type="text"
              value={contenido.name}
              name="name"
              onChange={handledata}
            />
          </div>
          <div className="form_element">
            <h3>Recipe image</h3>
            <input
              type="text"
              value={contenido.image}
              name="image"
              onChange={handledata}
            />
          </div>

          <div className="form_element">
            <h3>Head score:</h3>
            <input
              type="number"
              value={contenido.level}
              name="level"
              onChange={handledata}
            />
          </div>
        </div>
        {/* form part 2 */}
        <div className="form_data">
          <div className="form_text_long">
            <h3>Summary:</h3>
            <textarea
              className="form_textarea"
              value={contenido.resumen}
              rows="3"
              cols="80"
              name="resumen"
              onChange={handledata}
            ></textarea>
          </div>
        </div>
        {/* form part 3 */}
        <div className="form_data">
          <div className="form_add_recipe">
            <div className="form_2_element">
              <h5>Tipe recipe</h5>
              {diets ? (
                <select onChange={handleselect} className="form_selector">
                  {diets.map((data) => {
                    return <option value={data}>{data}</option>;
                  })}
                </select>
              ) : (
                <div>nada</div>
              )}
              <button onClick={savediet}>Add</button>
              <div className="form_steps">
                <h5>Steps</h5>
                <textarea
                  name="paso"
                  value={contenido.paso}
                  rows="5"
                  cols="50"
                  onChange={handledata}
                  className="form_text_2"
                ></textarea>
                <button onClick={savestep}>Add Step</button>
              </div>
            </div>

            <Look
              contenido={contenido}
              deletediet={deletediet}
              deletestep={deletestep}
            />
          </div>

          <button type="submit" className="finish_form">
            Save
          </button>
          {contenido.chek === true ? (
            <div className="form_error">
              <h2>Erros:</h2>
              {errors.name ? <h3>{errors.name}</h3> : ""}
              {errors.image ? <h3>{errors.image}</h3> : ""}
              {errors.level ? <h3>{errors.level}</h3> : ""}
              {errors.pasos ? <h3>{errors.pasos}</h3> : ""}
              {errors.diet ? <h3>{errors.diet}</h3> : ""}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </form>
    </div>
  );
}
export default Form;
