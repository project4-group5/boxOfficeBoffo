import React, { useState } from 'react';

//create a function that will open the pop-up
function PopUpButton() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <button onClick={() => setIsOpen(true)}>
                Open Pop-up
            </button>

            {isOpen && (
                <div>
                    <p>How to play:</p>
                    <ol>
                        <li>Choose a year and click 'start guessing'.</li>
                        <li>Guess 10 movies based on their highest grossing of the year (most money made!).</li>
                        <li>Click on each slot to select a movie from that year's summer.</li>
                        <li>You can edit your list and move movie titles up and down the slots using the arrows.</li>
                        <li>Once your list is complete, click 'Lock in', enter your name and click 'ok' to submit it.</li>
                        <li>We will give you the correct answers compared to your list. You will receive a score out of 100.</li>
                        <li>You will be given a personal key (i.e.: -NZhJ6pQJ84Gwl86lZpg).</li>
                        <li>Click 'Start a new game' on the top left of the same page, or compare your list and score with other players' lists of that year.</li>
                        <li>You can also compare lists with other users.</li>    
                    </ol>
                    <button onClick={() => setIsOpen(false)}>
                        Close Pop-up
                    </button>
                </div>
            )}
        </div>
    );
}

export default PopUpButton;