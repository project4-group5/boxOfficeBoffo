import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import OrderButtons from "./OrderButtons";
import { useState } from 'react';
import { getDatabase, ref, push } from "firebase/database";
import firebase from "../firebase";

// imported the styles 
import '../styles/ranking.css'

// Ranking component with props passed
const Ranking = (props) => {
   // hook variable declaration
   const navigate = useNavigate();
   const { userYear } = useParams();
   // state variable declaration
   const [edit, setEdit] = useState(false);

   // function that is called when user clicks "select a movie"
   const handleClick = (slot) => {
      // storing the specific index chosen by user into the state
      props.setMovieSlot(slot);
      // user will be navigated to the correct component
      navigate(`/Gallery/${userYear}`);
   }

   // function that is called when user wants to edit their selection
   const handleEdit = () => {
      // changing the state to the opposite of what it currently is
      setEdit(!edit);
   }

   // function that is called when user want to clear all the selections they've chosen.
   const handleClear = () => {
      // changing the variable to contain the initial data
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
      // storing the variable into the state
      props.setUserList(newVariable);
   }

   // function that is called when user is completed the list and clicked on lock button
   const handleLockClick = () => {
      //getting the database and creating a reference to it
      const database = getDatabase(firebase);
      const dbRef = ref(database);

      //forbid users to edit the list after lock in button is clicked on
      let isListComplete = true;
      // loop that goes around 10 times
      for(let i = 0; i < 10; i++) {
         // if any of the user slots contain the initial string, then do not continue
         //"i" refers to each individual slot of the userList
         if (props.userList[i] === "Click to add movie") {
            // send user alert that they did not complete the list
            alert("Please add 10 movies before locking your list in!")

            isListComplete = false
            // break cut the loop
            break
         }
      }

      // if variable is true, and list is complete, send out prompt for further required information.
      if (isListComplete === true) {
         // prompting the user to enter their name
         let userName = prompt("please enter your name")
         // error handle to see if correct data is entered by user
         if (userName === null || userName === "") {
            // send out alert if it doesnt match what was requested
            alert("Please enter your name and press OK")
         } else {
            // else, create an object which will be stored in firebase
            const firebaseEntry = {
               year: userYear,
               list: props.userList,
               name: userName
         }

         // pushing the firebaseEntry object into firebase
         const dbPush = push(dbRef, firebaseEntry);
         // then, navigate user to the correct component
         navigate(`/PersonalizedList/${dbPush._path.pieces_[0]}/${userYear}`);
         }
      }     
   }

   return (
      // section begins
      <section className="ranking">
         {/* wrapper container begins */}
         <div className="wrapper glass">
            <div>
               <h2>Highest grossing movies of {userYear}:</h2>
            </div>
            {/* edit button container */}
            <div className="editButton">
               <button onClick={handleEdit}>{edit ? "Save" : "Edit"}</button>
            </div>
            {/* ordered list element */}
            <ol>
               {
               // map that appends each movie slot
               props.userList.map((listItem, index) => {
                  return (
                     <li key={index} className={(listItem !== "Click to add movie") && "movie"}><p onClick={() => handleClick(index)}>{listItem}</p>{edit && (listItem !== "Click to add movie") && <OrderButtons slot={index} userList={props.userList} setUserList={props.setUserList} />}</li>
                  )
               })
               }
            </ol>
            {/* button container */}
            <div className="buttonContainer">
               <button onClick={handleClear}>Clear List</button>
               <button onClick={handleLockClick}>Lock In</button>
            </div>
         </div>
      </section>
   )
}

export default Ranking;