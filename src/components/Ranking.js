const Ranking = () => {
   const listSlots = {
      one: "",
      two: "",
      three: "",
      four: "",
      five: "",
      six: "",
      seven: "",
      eight: "",
      nine: "",
      ten: ""
   }
   
   return (
      <section>
         <div className="editButton">
            <button>Edit</button>
         </div>
         {/* <ol>

            <li>{listSlots.one}Hey</li>
            <li>{listSlots.two}</li>
            <li>{listSlots.three}</li>
            <li>{listSlots.four}</li>
            <li>{listSlots.five}</li>
            <li>{listSlots.six}</li>
            <li>{listSlots.seven}</li>
            <li>{listSlots.eight}</li>
            <li>{listSlots.nine}</li>
            <li>{listSlots.ten}</li>
         </ol> */}
         <p>HEY!</p>
         <div className="buttonContainer">
            <button>Clear List</button>
            <button>Lock In</button>
         </div>
      </section>
   )
}

export default Ranking;