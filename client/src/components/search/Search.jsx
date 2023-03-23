import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchcards } from "../../redux/actions/actions";

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
    <div>
      <input
        type="text"
        className="search_search"
        value={input.name}
        name="name"
        onChange={handleinput}
        placeholder="search food for name"
      />
      <button onClick={searchdata}>search</button>
    </div>
  );
}
export default Searchfood;
