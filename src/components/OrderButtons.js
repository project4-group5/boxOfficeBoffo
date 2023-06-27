const OrderButtons = (props) => {
    return (
        <div>
            {/* make accessible??? sr-only */}
            { props.slot !== "one" && <button id="up"><i class="fa-solid fa-angle-up"></i></button> }
            { props.slot !== "ten" && <button id="down"><i class="fa-solid fa-angle-down"></i></button> }
        </div>
    )
}

export default OrderButtons;