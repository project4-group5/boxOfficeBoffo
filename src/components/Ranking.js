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
            <li><p onClick={()=>handleClick("one")}>{props.userList.one}</p><OrderButtons /></li>
            <li><p onClick={()=>handleClick("two")}>{props.userList.two}</p><OrderButtons /></li>
            <li><p onClick={()=>handleClick("three")}>{props.userList.three}</p><OrderButtons /></li>
            <li><p onClick={()=>handleClick("four")}>{props.userList.four}</p><OrderButtons /></li>
            <li><p onClick={()=>handleClick("five")}>{props.userList.five}</p><OrderButtons /></li>
            <li><p onClick={()=>handleClick("six")}>{props.userList.six}</p><OrderButtons /></li>
            <li><p onClick={()=>handleClick("seven")}>{props.userList.seven}</p><OrderButtons /></li>
            <li><p onClick={()=>handleClick("eight")}>{props.userList.eight}</p><OrderButtons /></li>
            <li><p onClick={()=>handleClick("nine")}>{props.userList.nine}</p><OrderButtons /></li>
            <li><p onClick={()=>handleClick("ten")}>{props.userList.ten}</p><OrderButtons /></li>
         </ol>
         <div className="buttonContainer">
            <button>Clear List</button>
            <button>Lock In</button>
         </div>
      </section>
   )
}

export default Ranking;