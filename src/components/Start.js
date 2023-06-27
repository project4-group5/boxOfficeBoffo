import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Start = () => {
  const years = [];
  const [userYear, setUserYear] = useState(null);
  const navigate = useNavigate();

  for (let i=1975; i < 2024; i++) {
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
      <p>Game where you rank the highest grossing movies of the summer!</p>
      <form>
        <label htmlFor="years">Select a year</label>
        <select id="years" name="years" onChange={handleYearChange}>
          {years.map((year) => {
          return (
            <option value={year} key={year}>
              {year}
            </option>
          );
        })}
      </select>
      <button onClick={handleStartClick}>Start Guessing</button>
      </form>
      
    
    </section>
    
  )
}

export default Start;