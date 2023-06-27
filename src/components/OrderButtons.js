const OrderButtons = (props) => {
    return (
        <div>
            { props.slot !== "one" && <button id="up">Up</button> }
            { props.slot !== "ten" && <button id="down">Down</button> }
        </div>
    )
}

export default OrderButtons;