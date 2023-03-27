function Look(props) {
  return (
    <div className="look_all">
      {props.contenido.pasos ? (
        <div>
          {props.contenido.pasos.map((data) => {
            return (
              <div className="look_step">
                <button value={data.number} onClick={props.deletestep}>
                  X
                </button>
                <div>
                  <h4>
                    {data.number} {data.step}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        "error"
      )}

      {props.contenido.diet ? (
        <div className="form_look_recipe">
          {props.contenido.diet.map((data) => {
            return (
              <div className="form_look_botton">
                {data}
                <button value={data} onClick={props.deletediet}>
                  X
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        "error"
      )}
    </div>
  );
}
export default Look;
