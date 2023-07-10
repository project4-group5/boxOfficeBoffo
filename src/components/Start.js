import { useState } from "react";
import { useNavigate } from "react-router-dom";

// importing the styles
import '../styles/start.css'

// start component function begins
const Start = () => {
  // state variable declaration
  const [userYear, setUserYear] = useState(null);

  // variable declaration 
  const years = [];
  const navigate = useNavigate();

  // for loop that pushes the years avaiable for the app use into the empty "years" array
  for (let i = 1975; i < 2024; i++) {
    years.push(i);
  }

  // function that is called whenever the user makes a change in the options form
  const handleYearChange = (event) => {
    // setting userYear state to the value that the user selected
    setUserYear(event.target.value);
  };


  // function that is called when user clicks "start guessing"
  const handleStartClick = (event) => {
    // preventing the app from refreshing itself prior the the changes made
    event.preventDefault();
    // if user has not selected a year, give alert, else navigate to the correct component
    if (userYear === null) {
      alert('Please select a year first');
    } else {
      navigate(`/Rankings/${userYear}`);
    }
  };

  return (
    // start section begins
    <section className="start wrapper">
      {/* wrapper container */}
      <div className="glass">
        <p>Game where you rank the highest grossing movies of the summer!</p>
        {/* form begins */}
        <form>
          <div className="input">
            <label htmlFor="years">Select a year:</label>

            <select className="years" id="years" name="years" onChange={handleYearChange}>
              {/* base selected option which gives initial instructions */}
              <option value="choose" selected>Please choose a year</option>
              {/* mapping the years array and returning an array of years for user's selection */}
              {years.map((year) => {
                return (
                  // options that will be appended to the DOM
                  <option value={year} key={year}>
                    {year}
                  </option>
                );
              })}
            </select>
            
          </div>
          {/* button that starts the app, navigates you to the next component */}
          <button onClick={handleStartClick}>Start Guessing</button>
        </form>

      </div>{/*  wrapper container ends */}
    </section> // section ends

  )
}

export default Start;