import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Ranking = () => {
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
         <div className="editButton">
            <button>Edit</button>
         </div>
         <ol>
            <li onClick={handleClick}>{listSlots.one}Hey</li>
            <li onClick={handleClick}>{listSlots.two}</li>
            <li onClick={handleClick}>{listSlots.three}</li>
            <li onClick={handleClick}>{listSlots.four}</li>
            <li onClick={handleClick}>{listSlots.five}</li>
            <li onClick={handleClick}>{listSlots.six}</li>
            <li onClick={handleClick}>{listSlots.seven}</li>
            <li onClick={handleClick}>{listSlots.eight}</li>
            <li onClick={handleClick}>{listSlots.nine}</li>
            <li onClick={handleClick}>{listSlots.ten}</li>
         </ol>
         <p>HEY!</p>
         <div className="buttonContainer">
            <button>Clear List</button>
            <button>Lock In</button>
         </div>
      </section>
   )
}

export default Ranking;