import React from 'react';
import ReactDOM from 'react-dom'
function portal() {
    return ReactDOM.createPortal(
        <div>
           xxx 
        </div>,document.getElementById('x')
    );
}

export default portal;