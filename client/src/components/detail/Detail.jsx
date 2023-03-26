import { useDispatch, useSelector } from "react-redux";
import { detaildata } from "../../redux/actions/actions";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";

const Detail = () => {
  const dispatch = useDispatch();
  let { id } = useParams();
  const detail = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(detaildata(id));
    console.log(detail.pasos);
    console.log(detail.diets);
  }, []);

  const estilos = {
    position: "relative",
    width: detail.level + "%",
    height: "100%",
    padding: "8px",
    overflow: "hidden",
    display: "flex",
  };

  return (
    <div className="detail_detail">
      <div className="detail_fondo">
        <div></div>
      </div>
      {detail.name ? (
        <div className="detail_all">
          <h2>{detail.name}</h2>
          <div className="detail_2div">
            <div>
              <img src={detail.image} alt="image" />
            </div>
            <div dangerouslySetInnerHTML={{ __html: detail.resumen }}></div>
          </div>

          <div className="detail_level">
            <div className="detail_points">
              <h1>Head points: {detail.level}</h1>
            </div>

            <div className="detail_barra_100">
              <div style={estilos}>
                <div className="detail_barra" />
              </div>
            </div>
          </div>

          <div className="detail_paso_top">
            <h2>Preparation</h2>
            {detail.pasos.map((data) => {
              return (
                <div className="detail_paso">
                  {data.number}
                  <p>{data.step}</p>
                </div>
              );
            })}
            <div className="detail_return">
              <h4>Return</h4>
            </div>
          </div>
        </div>
      ) : (
        <div>no cago que vamos hacer </div>
      )}
    </div>
  );
};
export default Detail;
