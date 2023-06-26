import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import OrderButtons from "./OrderButtons";

const Ranking = (props) => {
   const navigate = useNavigate();
   const { userYear } = useParams();

   const handleClick = (key) => {
      props.onSlotUpdate(key);
      navigate(`/Gallery/${userYear}`);
      console.log(key)
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
            <li><p onClick={()=>handleClick(1)}>{props.userList.one}</p><OrderButtons /></li>
            <li><p onClick={()=>handleClick(2)}>{props.userList.three}</p><OrderButtons /></li>
            <li><p onClick={()=>handleClick(3)}>{props.userList.two}</p><OrderButtons /></li>
            <li><p onClick={()=>handleClick(4)}>{props.userList.four}</p><OrderButtons /></li>
            <li><p onClick={()=>handleClick(5)}>{props.userList.five}</p><OrderButtons /></li>
            <li><p onClick={()=>handleClick(6)}>{props.userList.six}</p><OrderButtons /></li>
            <li><p onClick={()=>handleClick(7)}>{props.userList.seven}</p><OrderButtons /></li>
            <li><p onClick={()=>handleClick(8)}>{props.userList.eight}</p><OrderButtons /></li>
            <li><p onClick={()=>handleClick(9)}>{props.userList.nine}</p><OrderButtons /></li>
            <li><p onClick={()=>handleClick(10)}>{props.userList.ten}</p><OrderButtons /></li>
         </ol>
         <div className="buttonContainer">
            <button>Clear List</button>
            <button>Lock In</button>
         </div>
      </section>
   )
}

export default Ranking;