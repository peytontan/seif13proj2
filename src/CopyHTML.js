import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';

function CopyHTML() {
    const { searchInput } = useParams(); //this is from the :searchInput from app.js

    const htmlText= `hi ${searchInput}`
    const textareaRef = useRef(null); //currently textareaRef is null - current:null.. using useRef cause we want to manipulate dom data, not managing the state of the component (i dont need to rerender when theres a click etc..)

    const handleCopyButtonClick = () => {
        if (textareaRef.current) {
            textareaRef.current.select(); //select the value of textareaRef 
            document.execCommand('copy'); //this is the copy function

            if (document.queryCommandEnabled('copy')) { //alert should appear or else there is no indicator that this has already been copied
                window.alert ("Copied")
            }
        }
    };

    return (
        <div>
            <br></br>
            <textarea //html tag that holds unlimited characters 
                ref={textareaRef}
                value={htmlText} //input the value as htmlText or else it will be empty
                readOnly //can't edit, only can highlight and copy content!
                style={{ width: '100%', height: '100px' }} //make it full width 
            />
            <div className='email-container'>
            <button className='button-green' onClick={handleCopyButtonClick}>Copy HTML</button>
        </div>
        </div>
    );
}

export default CopyHTML;
