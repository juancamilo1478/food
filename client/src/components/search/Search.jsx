import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchcards } from "../../redux/actions/actions";
import { Link } from "react-router-dom";
function Searchfood() {
  const [input, setInput] = useState({
    name: "",
  });
  const dispatch = useDispatch();
  const handleinput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    console.log(input.name);
  };

  const searchdata = () => {
    dispatch(searchcards(input.name));
  };

  return (
    <div className="search_all">
      <Link to={"/form"} className="link">
        <div className="search_add">
          <h1>Add recipe</h1>
          <i class="fa-sharp fa-regular fa-pen-to-square"></i>
        </div>
      </Link>
      <div className="search_search">
        <i class="fa-solid fa-magnifying-glass" />
        <input
          type="text"
          value={input.name}
          name="name"
          onChange={handleinput}
          placeholder="search food for name"
        />
        <div onClick={searchdata} className="search_button">
          Go
        </div>
      </div>
    </div>
  );
}
export default Searchfood;
