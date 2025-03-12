import React from "react";


interface Buttonprops {
    buttonValue?: string;
    className?: string;
}

function DeleteButton ({buttonValue,className}:Buttonprops) {
    return(
        <input type="submit" value={buttonValue} className={className}/>
    );
}
export default DeleteButton;