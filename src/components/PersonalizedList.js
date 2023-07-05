import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDatabase, ref, get } from "firebase/database";
import firebase from "../firebase";
import axios from "axios";


import '../styles/personalizedLists.css'

const PersonalizedList = (props) => {


  const [actualRanking, setActualRanking] = useState([]);
  const [personalRanking, setPersonalRanking] = useState([]);
  const { personalKey, userYear } = useParams();
  console.log(personalKey, userYear)
  const navigate = useNavigate();



  useEffect(() => {
    const database = getDatabase(firebase);
    const dbRef = ref(database);

    get(dbRef).then((snapshot) => {
      // One of the returned values is a method called ".exists()", which will return a boolean value for whether there is a returned value from our "get" function 
      if (snapshot.exists()) {
        // We call `.val()` on our snapshot to get the contents of our data. The returned data will be an object that we can  iterate through later
        const allLists = snapshot.val()
        for (let dbKey in allLists) {
          if (dbKey === personalKey) {
            console.log(allLists[dbKey].list);
            setPersonalRanking(allLists[dbKey].list);
          }
        }
      } else {
        console.log("No data available")
      }
    }).catch((error) => {
      console.log(error)
    })
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

  const score = () => {
    //scorecard
    let score = 0;
    personalRanking.forEach((userMovie, userIndex) => {
      let difference = 100
      actualRanking.forEach((actualMovie, actualIndex) => {
        if (userMovie === actualMovie) {
          difference = Math.abs(userIndex - actualIndex)
          console.log("inside the if statement")
        }
      })

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
    return `Your score is ${score}`;
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
    
    <div className="wrapper persoList">
      
      {personalRanking && actualRanking && <h3 className="score">{score()}</h3>}

      <div className="flexContainer">
        <h2>Your List</h2>
        <ol className="glass">
          {personalRanking.map((movie) => {
            return (
              <li>
                {movie}
              </li>
            )
          })}
        </ol>
      </div>

      <div className="flexContainer">
        <h2>Answer</h2>
        <ol className="glass">
          {actualRanking.map((movie) => {
            return (
              <li>
                {movie}
              </li>
            )
          })}
        </ol>
      </div>

    </div>
  )
}

export default PersonalizedList;