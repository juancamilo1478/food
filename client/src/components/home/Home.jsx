import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Cards from "../cards/cards";
import { getcards } from "../../redux/actions/actions";
import Filter from "../filter/Filter";
import Search from "../search/Search";
const Home = () => {
  const dispatch = useDispatch();
  // const cartas = useSelector((state) => state.cards);

  useEffect(() => {
    dispatch(getcards());
  }, []);

  return (
    <div>
      <div className="home_fondo"></div>
      <Search />

      <div className="home_cards">
        <div className="home_filter">
          <Filter />
        </div>

        <div className="home_cartas">
          <Cards />
        </div>
      </div>
    </div>
  );
};
export default Home;
