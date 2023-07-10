// imported the styles
import '../styles/orderButtons.css'

// OrderButtons component with passed props
const OrderButtons = (props) => {

    // function that is called when user wants to moves the item up the list
    const moveUp = (index) => {
        // spreading the items in the array and storing into variable 
        const newArray = [...props.userList];
        // variable that removes the specific item from array
        const removed = newArray.slice(index, index + 1);
        // splicing item in array
        newArray.splice(index, 1);
        // splicing item in array, which includes the removed variable as a parameter
        newArray.splice(index - 1, 0, removed[0]);
        // setting the state to changed newArray
        props.setUserList(newArray);
    }

    // function that is called when the user wants to moves the item down the list
    const moveDown = (index) => {
        // spreading the items in the array and storing into variable
        const newArray = [...props.userList];
        // variable that removes the specific item from array
        const removed = newArray.slice(index, index + 1);
        // splicing item in array
        newArray.splice(index, 1);
        // splicing item in array, which includes the removed variable as a parameter
        newArray.splice(index + 1, 0, removed[0]);
        // setting the state to changed newArray
        props.setUserList(newArray);
    }

    // function that is called when user wants to delete a movie
    const deleteButton = (index) => {
        // spreading the items in the array and storing into variable
        const newArray = [...props.userList];
        // changing the slot to initial string
        newArray[index] = "Click to add movie"
        // storing new changes into state
        props.setUserList(newArray);
    }

    return (
        // order button container
        <div className="orderButtons">
            {/* button container */}
            <div className='buttonContainer'>
                {/* make accessible??? sr-only */}
                {/* ternary operator, which will contain buttons to move up or down */}
                {props.slot !== 0 && <button className='order' id="up" onClick={() => (moveUp(props.slot))}><i className="fa-solid fa-angle-up"></i></button>}
                {props.slot !== 9 && <button className='order' id="down" onClick={() => (moveDown(props.slot))}><i className="fa-solid fa-angle-down"></i></button>}
            </div>

            {/* creating button to delete a movie from the list */}
            <button className='remove' onClick={() => (deleteButton(props.slot))}>Remove</button>
        </div>
    )
}

export default OrderButtons;