const OrderButtons = (props) => {

    // moves the item up the list
    const moveUp = (index) => {
        const newArray = [...props.userList];
        const removed = newArray.slice(index, index + 1);
        newArray.splice(index, 1);
        newArray.splice(index - 1, 0, removed[0]);
        props.setUserList(newArray);
    }

    // moves the item down the list
    const moveDown = (index) => {
        const newArray = [...props.userList];
        const removed = newArray.slice(index, index + 1);
        newArray.splice(index, 1);
        newArray.splice(index + 1, 0, removed[0]);
        props.setUserList(newArray);
    }

    return (
        <div>
            {/* make accessible??? sr-only */}
            { props.slot !== 0 && <button id="up" onClick={() => (moveUp(props.slot))}><i className="fa-solid fa-angle-up"></i></button> }
            {props.slot !== 9 && <button id="down" onClick={() => (moveDown(props.slot))}><i className="fa-solid fa-angle-down"></i></button> }
        </div>
    )
}

export default OrderButtons;