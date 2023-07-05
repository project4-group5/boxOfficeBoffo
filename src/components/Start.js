import { useState } from "react";
import { useNavigate } from "react-router-dom";

import '../styles/start.css'

const Start = () => {
  const years = [];
  const [userYear, setUserYear] = useState(null);
  const navigate = useNavigate();

  for (let i = 1975; i < 2024; i++) {
    years.push(i);
  }

  // We're using data binding, which will allow React to know the changes.
  const handleYearChange = (event) => {
    setUserYear(event.target.value);
  };

  const handleStartClick = (event) => {
    event.preventDefault();
    navigate(`/Rankings/${userYear}`);
  };

  return (
    <section className="start">
      <div className="glass wrapper">

        <p>Game where you rank the highest grossing movies of the summer!</p>
        <form>
          <div className="input">
            <label htmlFor="years">Select a year:</label>
            <select className="years" id="years" name="years" onChange={handleYearChange}>
              {years.map((year) => {
                return (
                  <option value={year} key={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>
          <button onClick={handleStartClick}>Start Guessing</button>
        </form>

      </div>
    </section>

  )
}

export default Start;