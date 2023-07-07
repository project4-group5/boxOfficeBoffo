import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { getDatabase, ref, get } from "firebase/database";
import firebase from "../firebase";

// Compare list component 
const CompareLists =  (props) => {
  // first set of state variable declarations
  const [userList1, setUserList1] = useState([]);
  const [userList2, setUserList2] = useState([]);
  // second set of state variable declarations

  const user1Key = useParams();

  const [key1, setKey1] = useState(user1Key.user1Key);
  const [key2, setKey2] = useState([]);
  

  const navigate = useNavigate();

  
  // function that is called whenever theres is a change detected from the user
  const handleChange1 = (event) => {
    // setting the initial state, which will be the value of the first users input (their personal key)
    setKey1(event.target.value)
  }
  // function that is called whenever theres is a change detected from the user
  const handleChange2 = (event) => {
  // setting the second state, which will be the value of the second users input (their personal key)
    setKey2(event.target.value)
  }

  // function that is called when compare button is clicked, user's input will be passed as arguements. 
  const handleCompare = (key1, key2) => {
    // firebase variables declaration
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    // "GET"-ting the data we left inthe firebase database 
    get(dbRef).then((snapshot) => {
      // One of the returned values is a method called ".exists()", which will return a boolean value for whether there is a returned value from our "get" function 
      if (snapshot.exists()) {
        // We call `.val()` on our snapshot to get the contents of our data. The returned data will be an object that we can  iterate through later
        const allLists = snapshot.val()
        for (let dbKey in allLists) {
          // if statement to check the firebase database to see if the first user's input matches any of the files
          if (dbKey === key1) {
            console.log(allLists[dbKey].list);
            // storing the specific list into the first userList state
            setUserList1(allLists[dbKey].list)
          }
          // if statement to check the firebase database to see if the second user's input matches any of the files
          if (dbKey === key2) {
            console.log(allLists[dbKey].list);
            // storing the specific list into the second userList state
            setUserList2(allLists[dbKey].list)
          }
        }
      } else {
        console.log("No data available")
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  // function that is called when user selects "start new game"
  const handleRestart = () => {
    // variable declaration
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
    // setting the state with data passed using props
    props.setUserList(newVariable);
    // navigate to the main page
    navigate(`/`)

  }
  return (
    // fragment element
    <>
      {/* button which resets the app*/}
      <button onClick={handleRestart}>Start new game</button>
      <h3>User 1 list</h3>
      {/* input for first users key */}
      <input type="text" placeholder="Please enter user 1 key" onChange={handleChange1} value={key1}></input>
      <h3>User 2 list</h3>
      {/* input for second users key */}
      <input type="text" placeholder="Please enter user 2 key" onChange={handleChange2} value={key2}></input>
      {/* button that is clicked once the users have completed the input */}
      <button onClick={() => handleCompare(key1, key2)}>Compare</button>

      {/* first ul element */}
      <ul>
        {/* map that goes through first array and appends each list */}
        {userList1.map((movie) => {
          return <li>{movie}</li>
        })}
      </ul>
      {/* second ul element */}
      <ul>
        {/* map that goes through first array and appends each list */}
        {userList2.map((movie) => {
          return <li>{movie}</li>
        })}
      </ul>
    </>
  )
}

export default CompareLists;