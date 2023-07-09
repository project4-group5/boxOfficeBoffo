import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { getDatabase, ref, get } from "firebase/database";
import firebase from "../firebase";

// Compare list component 
const CompareLists =  (props) => {
  // first set of state variable declarations
  const [user1Info, setUser1Info] = useState({
    year: null,
    name: "",
    list: []
  });
  const [user2Info, setUser2Info] = useState({
    year: null,
    name: "",
    list: []
  });
  // second set of state variable declarations

  const user1Key = useParams();

  const [key1, setKey1] = useState(user1Key.user1Key);
  const [key2, setKey2] = useState([]);

  const [key1exists, setKey1exists] = useState(false);
  const [key2exists, setKey2exists] = useState(false);  

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
    setKey1exists(false)
    setKey2exists(false)

    setUser1Info({
    year: null,
    name: "",
    list: []
  });
    setUser1Info({
    year: null,
    name: "",
    list: []
  });

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
            // storing the specific list into the first userList state
            setUser1Info(allLists[dbKey])
            setKey1exists(true)
          }
          // if statement to check the firebase database to see if the second user's input matches any of the files
          if (dbKey === key2) {
            // storing the specific list into the second userList state
            setUser2Info(allLists[dbKey])
            setKey2exists(true)
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
      {!key1exists && <p>Please enter a valid key and press Compare</p>}
      <h3>User 2 list</h3>
      {/* input for second users key */}
      <input type="text" placeholder="Please enter user 2 key" onChange={handleChange2} value={key2}></input>
      {!key2exists && <p>Please enter a valid key and press Compare</p>}
      {/* button that is clicked once the users have completed the input */}
      <button onClick={() => handleCompare(key1, key2)}>Compare</button>
      
      {
        user1Info.year !== user2Info.year && <p>Please make sure keys belong to the same year</p>
      }
      
      {key1exists && key2exists && (user1Info.year === user2Info.year) && <>
      <h3>{user1Info.year}</h3>
      {/* first ul element */}
      <ul>
        <p>{user1Info.name}</p>
        {/* map that goes through first array and appends each list */}
        {user1Info.list.map((movie, index) => {
          return <li key={index}>{movie}</li>
        })}
      </ul>
      {/* second ul element */}
      <h3>{user2Info.year}</h3>
      <p>{user2Info.name}</p>
      <ul>
        {/* map that goes through first array and appends each list */}
        {user2Info.list.map((movie, index) => {
          return <li key={index}>{movie}</li>
        })}
      </ul>
      </>}
      
    </>
  )
}

export default CompareLists;