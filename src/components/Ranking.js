import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import OrderButtons from "./OrderButtons";
import { useState, useEffect } from 'react';
import { getDatabase, ref, push } from "firebase/database";
import firebase from "../firebase";

import '../styles/ranking.css'

const Ranking = (props) => {
   const navigate = useNavigate();
   const { userYear } = useParams();
   const [edit, setEdit] = useState(false);
   const [listEmpty, setListEmpty] = useState(true);

   useEffect(() => {
      const isEmpty = props.userList.every(
         (movie) => movie === "Click to add movie"
      );
      setListEmpty(isEmpty);
   }, [props.userList]);
   
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

      //forbid users to edit the list after lock in button is clicked on
      let isListComplete = true;
         for(let i = 0; i < 10; i++) {
            //"i" refers to each individual slot of the userList
            if (props.userList[i] === "Click to add movie") {
               alert("Please add 10 movies before locking your list in!")
               isListComplete = false
               break
            }
         }

         if (isListComplete === true) {
            //prompting the user to enter their name
            let userName = prompt("please enter your name")

            if (userName === null || userName === "") {
               alert("Please enter your name and press OK")
            } else {
                //creating an object which will be stored in firebase
            const firebaseEntry = {
               year: userYear,
               list: props.userList,
               name: userName
            }

            //pushing the firebaseEntry object into firebase
            const dbPush = push(dbRef, firebaseEntry);
            // console.log(dbPush);
            // console.log(dbPush._path)
            // console.log(dbPush._path.pieces_);
            navigate(`/PersonalizedList/${dbPush._path.pieces_[0]}/${userYear}`);
            }
           
         }     
   }
   console.log(listEmpty, props.userList);

   return (
      <section className="ranking">
         <div className="wrapper glass">
            <div>
               <h2>Highest grossing movies of {userYear}:</h2>
            </div>
            <div className="editButton">
               {!listEmpty && <button onClick={handleEdit}>{edit ? "Save" : "Edit"}</button>}
            </div>
            <ol>
               {
                  props.userList.map((listItem, index) => {
                     return (
                        <li key={index} className={(listItem !== "Click to add movie") && "movie"}><p onClick={() => handleClick(index)}>{listItem}</p>{edit && (listItem !== "Click to add movie") && <OrderButtons slot={index} userList={props.userList} setUserList={props.setUserList} />}</li>
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