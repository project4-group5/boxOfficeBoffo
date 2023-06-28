import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import OrderButtons from "./OrderButtons";
import { useState } from 'react';

const Ranking = (props) => {
   const navigate = useNavigate();
   const { userYear } = useParams();
   const [ edit, setEdit ] = useState(false);

   const handleClick = (slot) => {
      props.setMovieSlot(slot);
      navigate(`/Gallery/${userYear}`);
   }

   const handleEdit = () => {
      setEdit(!edit)
   }

   return (
      <section>
         <div>
            <h2>Highest grossing movies of year {userYear}:</h2>
         </div>
         <div className="editButton">
            <button onClick={handleEdit}>{ edit ? "Save" : "Edit" }</button>
         </div>
         <ol>

            {
               props.userList.map((listItem, index) => {
                  return (
                     <li key={index}><p onClick={() => handleClick(index)}>{listItem}</p>{edit && <OrderButtons slot={index} userList={props.userList} setUserList={props.setUserList} />}</li>
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