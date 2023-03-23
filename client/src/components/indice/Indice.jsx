//imagenes
import Slide from "./slide";
import image from "../../images/f1.jpg";
import { Link } from "react-router-dom";
import chef from "../../images/chef.png";
const Indice = () => {
  return (
    <div className="indice_top">
      <div className="indice_fondo">
        <img src={image} alt="image_font" className="indice_image" />
      </div>
      <div className="indice_div1">
        <div className="indice_div_parrafo">
          <h1>Juan camilo saiz </h1>
          <h3>
            if you are looking for recipes for any type of diet, you are in the
            right place. Explore our platform and discover a wide variety of
            culinary options to enjoy while maintaining a healthy lifestyle.
            Also, feel free to share your own culinary creations to help others
            and expand the scope of culinary diversity.
          </h3>
          <Link to={"/home"} className="link">
            <div className="indice_botton">Explorar</div>
          </Link>
        </div>
        <div className="indice_div_slider">
          <Slide />
          <img src={chef} alt="shef" className="indice_chef" />
        </div>
      </div>
    </div>
  );
};
export default Indice;
