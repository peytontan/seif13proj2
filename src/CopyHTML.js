import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';

function CopyHTML() {
    const { searchInput } = useParams(); //this is from the :searchInput from app.js

    const htmlText= `hi ${searchInput}`
    const textareaRef = useRef(null);

    const handleCopyButtonClick = () => {
        if (textareaRef.current) {
            textareaRef.current.select();
            document.execCommand('copy');
        }
    };

    return (
        <div>
            <br></br>
            <textarea
                ref={textareaRef}
                value={htmlText}
                readOnly
                style={{ width: '100%', height: '200px' }}
            />
            <div className='email-container'>
            <button className='button-green' onClick={handleCopyButtonClick}>Copy HTML</button>
        </div>
        </div>
    );
}

export default CopyHTML;
