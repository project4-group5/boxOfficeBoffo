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

            {
               props.userList.map((listItem, index) => {
                  return (
                  <li key={index}><p onClick={() => handleClick(index)}>{listItem}</p><OrderButtons slot={index} userList={props.userList} setUserList={props.setUserList} /></li>
                  )

               })
            }

         </ol>
         <div className="buttonContainer">
            <button>Clear List</button>
            <button>Lock In</button>
         </div>
      </section>
   )
}

export default Ranking;