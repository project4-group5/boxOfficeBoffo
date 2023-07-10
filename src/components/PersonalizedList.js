import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDatabase, ref, get } from "firebase/database";
import firebase from "../firebase";
import axios from "axios";

// imported the styles
import '../styles/personalizedLists.css'

const PersonalizedList = (props) => {

  // state variable declaration
  const [actualRanking, setActualRanking] = useState([]);
  const [personalRanking, setPersonalRanking] = useState([]);
  //  hook destructured variable declaration
  const { personalKey, userYear } = useParams();
  // hook variable declaration
  const navigate = useNavigate();

  // useEffect hook that checks for changes
  useEffect(() => {
    // firebase variable declaration
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    // "GET"-ting the firebase data
    get(dbRef).then((snapshot) => {
      // One of the returned values is a method called ".exists()", which will return a boolean value for whether there is a returned value from our "get" function 
      if (snapshot.exists()) {
        // We call `.val()` on our snapshot to get the contents of our data. The returned data will be an object that we can  iterate through later
        const allLists = snapshot.val()
        // loop to check if variable is in the array
        for (let dbKey in allLists) {
          // if the key matches, store it in state
          if (dbKey === personalKey) {
            setPersonalRanking(allLists[dbKey].list);
          }
        }
      } else {
        console.log("No data available")
      }
    }).catch((error) => {
      console.log(error)
    })
    // axios call 
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
        primary_release_year: `${userYear}`,
        "primary_release_date.gte": `${userYear}-05-01`,
        "primary_release_date.lte": `${userYear}-09-04`,
        sort_by: "revenue.desc",
        with_original_language: "en",
      },
    }).then((res) => {
      const actualList = [];
      for (let i = 0; i < 10; i++) {
        actualList.push(res.data.results[i].title)
      }
      console.log(actualList);
      setActualRanking(actualList);
    })
  }, [])

  // function that is called when user completed list and a score is given
  const score = () => {
    // setting the score variable to be 0
    let score = 0;
    // for each method to go through each movie in the personal array
    personalRanking.forEach((userMovie, userIndex) => {
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
    return `Your score is ${score}/100`;
  }

  // function that calculates the score for each individual movie
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

  // function that is called when user wants to compare list
  const handleCompare = () => {
    navigate(`/CompareLists/${personalKey}`)
  }

  // function that is called when user wants to start a new game
  const handleRestart = () => {
    // clearing the movie list to initial data
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
    // setting the state to base data
    props.setUserList(newVariable);
    // navigate user to main page
    navigate(`/`)
  }

  return (
    // wrapper container
    <div className="wrapper persoList">
      {/* buttons that call functions when user clicks */}
      <button onClick={handleRestart}>Start new game</button>
      <button onClick={handleCompare}>Compare with others</button>
      {/* personal key is appended here with option to copy the key button */}
      <p className="pKey">Your personal key is: {personalKey} <button onClick={() => {
        navigator.clipboard.writeText(personalKey);
      }}><i className="fa-solid fa-copy"></i></button> </p>
      <p className="pKey"> Copy it and use it compare with friends</p>
        {/* ternary operator - score will be shown here */}
        {personalRanking && actualRanking && <h3 className="score">{score()}</h3>}
      {/* first flex container which hold user list choices */}
      <div className="flexContainer">
        <h2>Your List</h2>
        {/* ordered list element */}
        <ol className="glass">
          {/* mapping through the user array */}
          {personalRanking.map((movie, index) => {
            return (
              // appending each movie to DOM
              <li key={index} className = {movieScore(movie, index)}>
                {movie}
              </li>
            )
          })}
        </ol>
      </div>
      {/* second flex container which hold correct answer list */}
      <div className="flexContainer">
        <h2>Answer</h2>
        {/* ordered list element */}
        <ol className="glass">
          {/* mapping through the user array */}
          {actualRanking.map((movie, index) => {
            return (
              // appending each movie to DOM
              <li key={index}>
                {movie}
              </li>
            )
          })}
        </ol>
      </div>
      <div className="legendBox glass">
        <h3 className="legend">Legend</h3>
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
  )
}

export default PersonalizedList;