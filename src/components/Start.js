import { useState } from "react";


const Start = () => {
  const years = [];
  const [userYear, setUserYear] = useState(null);

  for (let i=1975; i < 2024; i++) {
    years.push(i);
  }
  
  // We're using data binding, which will allow React to know the changes.
  const handleYearChange = (event) => {
    setUserYear(event.target.value);
    console.log(setUserYear)
  }
  
  const handleStartClick = (event) => {
    event.preventDefault()
  }

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