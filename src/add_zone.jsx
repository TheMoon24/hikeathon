import React from 'react';

function ZoneButton() {
    const handleClick = () => {
        console.log("Button clicked!");
    };

    const buttonStyle = {
        padding: '10px 20px',
        backgroundColor: '#4CAF50', // Green background
        color: 'white', // White text
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s ease',
    };

    const buttonHoverStyle = {
        backgroundColor: '#45a049', // Darker green on hover
    };

    return (
        <button 
            onClick={handleClick} 
            style={buttonStyle} 
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
        >
            Add Zone
        </button>
    );
}

export default ZoneButton