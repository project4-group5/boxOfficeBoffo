import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getDatabase, ref, get } from "firebase/database";
import firebase from "../firebase";

const CompareLists =  (props) => {
  const [userList1, setUserList1] = useState([]);
  const [userList2, setUserList2] = useState([]);

  const [key1, setKey1] = useState([]);
  const [key2, setKey2] = useState([]);
  
  const navigate = useNavigate();
  
  const handleChange1 = (event) => {
    setKey1(event.target.value)
  }

  const handleChange2 = (event) => {
    setKey2(event.target.value)
  }

  const handleCompare = (key1, key2) => {

    const database = getDatabase(firebase);
    const dbRef = ref(database);

    get(dbRef).then((snapshot) => {
      // One of the returned values is a method called ".exists()", which will return a boolean value for whether there is a returned value from our "get" function 
      if (snapshot.exists()) {
        // We call `.val()` on our snapshot to get the contents of our data. The returned data will be an object that we can  iterate through later
        const allLists = snapshot.val()
        for (let dbKey in allLists) {
          if (dbKey === key1) {
            console.log(allLists[dbKey].list);
            setUserList1(allLists[dbKey].list)
          }
          if (dbKey === key2) {
            console.log(allLists[dbKey].list);
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

  const handleRestart = () => {
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
    navigate(`/`)

  }
  return (
    <>
    <button onClick={handleRestart}>Start new game</button>
    <h3>User 1 list</h3>
    <input type="text" placeholder="Please enter user 1 key" onChange={handleChange1} value={key1}></input>
    <h3>User 2 list</h3>
    <input type="text" placeholder="Please enter user 2 key" onChange={handleChange2} value={key2}></input>
    <button onClick={() => handleCompare(key1, key2)}>Compare</button>
    <ul>
      {userList1.map((movie) => {
        return <li>{movie}</li>
      })}
    </ul>
     <ul>
      {userList2.map((movie) => {
        return <li>{movie}</li>
      })}
    </ul>

    </>
  )
}

export default CompareLists;