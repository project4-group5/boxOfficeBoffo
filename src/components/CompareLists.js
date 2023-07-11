import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDatabase, ref, get } from "firebase/database";
import firebase from "../firebase";
import axios from "axios";

import '../styles/personalizedLists.css'
import '../styles/compareLists.css'

// Compare list component 
const CompareLists = (props) => {
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

  const [actualRanking, setActualRanking] = useState([]);
  // second set of state variable declarations

  const user1Key = useParams();

  const [key1, setKey1] = useState(user1Key.user1Key);
  const [key2, setKey2] = useState([]);

  const [key1exists, setKey1exists] = useState(false);
  const [key2exists, setKey2exists] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios({
      url: "https://api.themoviedb.org/3/discover/movie",
      method: "GET",
      dataResponse: "json",
      params: {
        api_key: "c7d2bc1af674054e4cbfe886c8424b11",
        include_adult: "false",
        include_video: "false",
        language: "en-US",
        page: "1",
        primary_release_year: `${user1Info.year}`,
        "primary_release_date.gte": `${user1Info.year}-05-01`,
        "primary_release_date.lte": `${user1Info.year}-09-04`,
        sort_by: "revenue.desc",
        with_original_language: "en",
      },
    }).then((res) => {
      const actualList = [];
      if (res.data.results.length > 0) {
        for (let i = 0; i < 10; i++) {
          actualList.push(res.data.results[i].title)
        }
        setActualRanking(actualList);
      }
    })
  }, [user1Info, user2Info])
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


  // function that is called when user completed list and a score is given
  const score = (userRanking) => {
    // setting the score variable to be 0
    let score = 0;
    // for each method to go through each movie in the personal array
    userRanking.forEach((userMovie, userIndex) => {
      let difference = 100
      // checking to see if user movie and actual movie matches
      actualRanking.forEach((actualMovie, actualIndex) => {
        if (userMovie === actualMovie) {
          // if it does match, then adjust the difference variable to match score
          difference = Math.abs(userIndex - actualIndex)
        }
      })


      // scoring logic
      switch (difference) {
        case 0:
          score += 10;
          break;
        case 1:
          score += 7;
          break;
        case 2:
          score += 5;
          break;
        case 100:
          score += 0;
          break;
        default:
          score += 1;
      }
      console.log(`user movie is ${userMovie} and difference is ${difference} and score is ${score}`)
    })
    // app will return the final score out of 100 to user
    return `Score is ${score}/100`;
  }

  const movieScore = (userMovie, userIndex) => {
    let difference = 100
    actualRanking.forEach((actualMovie, actualIndex) => {
      if (userMovie === actualMovie) {
        difference = Math.abs(userIndex - actualIndex)
      }
    })
    //  scoring logic
    switch (difference) {
      case 0:
        return "points10"
      case 1:
        return "points7"
      case 2:
        return "points5"
      case 100:
        return "points0"
      default:
        return "points1"
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    // fragment element

    <section className="wrapper">

      {/* button which resets the app*/}
      <div className="restart">
        <button className="start" onClick={handleRestart}>Start new game</button>
      </div>

      <form onSubmit={handleSubmit} action="submit" className="compareForm glass">
        <div className="inputs">
          <div className="flexContainer">
            <label>User 1 list:</label>
            {/* input for first users key */}
            <input type="text" placeholder="Enter user 1 key" onChange={handleChange1} value={key1}></input>
            {!key1exists && <p className="direct">Enter a valid key and press compare</p>}
          </div>

          <div className="flexContainer">
            <label>User 2 list:</label>
            {/* input for second users key */}
            <input type="text" placeholder="Enter user 2 key" onChange={handleChange2} value={key2}></input>
            {!key2exists && <p className="direct">Enter a valid key and press compare</p>}
          </div>
        </div>

        {/* button that is clicked once the users have completed the input */}
        <button className="compareButton" onClick={() => handleCompare(key1, key2)}>Compare</button>
      </form>

      {
        user1Info.year !== user2Info.year && <p>Please make sure keys belong to the same year</p>
      }

      {
        key1 === key2 && <p>Please make sure to use different keys</p>
      }

      {key1exists && key2exists && key1 !== key2 && (user1Info.year === user2Info.year) && <>
        <h2>{user1Info.year}</h2>
        <div className="persoList">
          <div className="flexContainer glass">
            <h3>{user1Info.name}</h3>
            {/* first ul element */}
            <ul>
              {/* map that goes through first array and appends each list */}
              {user1Info.list.map((movie, index) => {
                return <li key={index} className={movieScore(movie, index)}>{movie}</li>
              })}
            </ul>
            {user1Info.list.length > 0 && actualRanking.length > 0 && <h3 className="score compareScore">{score(user1Info.list)}</h3>}
          </div>

          <div className="flexContainer glass">
            {/* second ul element */}
            {/* <h2>{user2Info.year}</h2> */}
            <h3>{user2Info.name}</h3>
            <ul>
              {/* map that goes through first array and appends each list */}
              {user2Info.list.map((movie, index) => {
                return <li key={index} className={movieScore(movie, index)}>{movie}</li>
              })}
            </ul>
            {user2Info.list.length > 0 && actualRanking.length > 0 && <h3 className="score compareScore">{score(user2Info.list)}</h3>}
          </div>
          {/* legend box */}
          <div className="legendBox glass">
            <h2 className="legend">Legend</h2>
            <div className="flex">
              <div class="color1"></div>
              <p>Correct: 10pts</p>
            </div>
            <div className="flex">
              <div class="color2"></div>
              <p>1 spot off: 7pts</p>
            </div>
            <div className="flex">
              <div class="color3"></div>
              <p>2 spots off: 5pts</p>
            </div>
            <div className="flex">
              <div class="color4"></div>
              <p>3+ spots off: 1pts</p>
            </div>
            <div className="flex">
              <div class="color5"></div>
              <p>Incorrect: 0pts</p>
            </div>
          </div>
        </div>
      </>}
    </section>

  )
}

export default CompareLists;