const Start = () => {
  const years = [];
  
  for (let i=1975; i < 2024; i++) {
    years.push(i);
  }
  
  return (
    <section className="start">
      <p>Game where you rank the highest grossing movies of the summer!</p>
      <form>
        <label htmlFor="years">Select a year</label>
        <select id="years" name="years">
          {years.map((year) => {
          return (
            <option value={year} key={year}>
              {year}
            </option>
          );
        })}
      </select>
      </form>
      
    
    </section>
    
  )
}

export default Start;