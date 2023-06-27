import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import OrderButtons from "./OrderButtons";

const Ranking = (props) => {
   const navigate = useNavigate();
   const { userYear } = useParams();

   const handleClick = (slot) => {
      props.setMovieSlot(slot);
      navigate(`/Gallery/${userYear}`);
   }


   return (
      <section>
         <div>
            <h2>Highest grossing movies of year {userYear}:</h2>
         </div>
         <div className="editButton">
            <button>Edit</button>
         </div>
         <ol>
            <li><p onClick={()=>handleClick("one")}>{props.userList.one}</p><OrderButtons slot="one"/></li>
            <li><p onClick={() => handleClick("two")}>{props.userList.two}</p><OrderButtons slot="two" /></li>
            <li><p onClick={() => handleClick("three")}>{props.userList.three}</p><OrderButtons slot="three" /></li>
            <li><p onClick={() => handleClick("four")}>{props.userList.four}</p><OrderButtons slot="four" /></li>
            <li><p onClick={() => handleClick("five")}>{props.userList.five}</p><OrderButtons slot="five" /></li>
            <li><p onClick={() => handleClick("six")}>{props.userList.six}</p><OrderButtons slot="six" /></li>
            <li><p onClick={() => handleClick("seven")}>{props.userList.seven}</p><OrderButtons slot="seven" /></li>
            <li><p onClick={() => handleClick("eight")}>{props.userList.eight}</p><OrderButtons slot="eight" /></li>
            <li><p onClick={() => handleClick("nine")}>{props.userList.nine}</p><OrderButtons slot="nine" /></li>
            <li><p onClick={() => handleClick("ten")}>{props.userList.ten}</p><OrderButtons slot="ten" /></li>
         </ol>
         <div className="buttonContainer">
            <button>Clear List</button>
            <button>Lock In</button>
         </div>
      </section>
   )
}

export default Ranking;