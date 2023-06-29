import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import OrderButtons from "./OrderButtons";
import { useState } from 'react';
import { getDatabase, ref, push } from "firebase/database";
import firebase from "../firebase";

const Ranking = (props) => {
   const navigate = useNavigate();
   const { userYear } = useParams();
   const [edit, setEdit] = useState(false);

   const handleClick = (slot) => {
      props.setMovieSlot(slot);
      navigate(`/Gallery/${userYear}`);
   }

   const handleEdit = () => {
      setEdit(!edit);
   }

   const handleClear = () => {
      console.log('hi');
      const newVariable = [
         "Click to add movie",
         "Click to add movie",
         "Click to add movie",
         "Click to add movie",
         "Click to add movie",
         "Click to add movie",
         "Click to add movie",
         "Click to add movie",
         "Click to add movie",
         "Click to add movie"
      ]
      props.setUserList(newVariable);
   }

   const handleLockClick = () => {
      //getting the database and creating a reference to it
      const database = getDatabase(firebase);
      const dbRef = ref(database);

      //prompting the user to enter their name
      let userName = prompt("please enter  your name")

      //creating an object which will be stored in firebase
      const firebaseEntry = {
         year: userYear,
         list: props.userList,
         name: userName
      }

      //pushing the firebaseEntry object into firebase
      const dbPush = push(dbRef, firebaseEntry);
      console.log(dbPush);
      console.log(dbPush._path)
      console.log(dbPush._path.pieces_);
      navigate(`/PersonalizedList/${dbPush._path.pieces_[0]}`);
   }

   return (
      <section>
         <div className="wrapper">
            <div>
               <h2>Highest grossing movies of year {userYear}:</h2>
            </div>
            <div className="editButton">
               <button onClick={handleEdit}>{edit ? "Save" : "Edit"}</button>
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
               <button onClick={handleClear}>Clear List</button>
               <button onClick={handleLockClick}>Lock In</button>
            </div>
         </div>
      </section>
   )
}

export default Ranking;