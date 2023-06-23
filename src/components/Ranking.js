import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import OrderButtons from "./OrderButtons";

const Ranking = (props) => {
   const navigate = useNavigate();
   const { userYear } = useParams();

   const handleClick = () => {
      navigate(`/Gallery/${userYear}`);
   }


   const listSlots = {
      one: "",
      two: "",
      three: "",
      four: "",
      five: "",
      six: "",
      seven: "",
      eight: "",
      nine: "",
      ten: ""
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
            <li><p onClick={handleClick}>{props.userList.one}</p><OrderButtons /></li>
            <li><p onClick={handleClick}>{props.userList.three}</p><OrderButtons /></li>
            <li><p onClick={handleClick}>{props.userList.two}</p><OrderButtons /></li>
            <li><p onClick={handleClick}>{props.userList.four}</p><OrderButtons /></li>
            <li><p onClick={handleClick}>{props.userList.five}</p><OrderButtons /></li>
            <li><p onClick={handleClick}>{props.userList.six}</p><OrderButtons /></li>
            <li><p onClick={handleClick}>{props.userList.seven}</p><OrderButtons /></li>
            <li><p onClick={handleClick}>{props.userList.eight}</p><OrderButtons /></li>
            <li><p onClick={handleClick}>{props.userList.nine}</p><OrderButtons /></li>
            <li><p onClick={handleClick}>{props.userList.ten}</p><OrderButtons /></li>
         </ol>
         <div className="buttonContainer">
            <button>Clear List</button>
            <button>Lock In</button>
         </div>
      </section>
   )
}

export default Ranking;