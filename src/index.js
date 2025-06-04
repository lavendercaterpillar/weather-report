"user strict"

// define a state variable that tracks all the values we need in the code
const state = {  // call it state and add city name here
    currentTemp: 70,
    city: 'Seattle'
};

// Get references to DOM elements 



// Can be refactored to have 2 arguements (tempDisplay => color render, temp => ranges)
const updateTempColor = (temp) => {   
    const tempAsInt = parseInt(state.currentTemp)

    if (tempAsInt >= 80) {
        temp.style.color = "red";
    } else if (tempAsInt >= 70) {
        temp.style.color = "orange";
    } else if (tempAsInt >= 60) {
        temp.style.color = "yellow";
    } else if (tempAsInt >= 50) {
        temp.style.color = "green";
    } else {
        temp.style.color = "teal";
    }
};

const updateLandscape = (temp) => {
    const tempAsInt = parseInt(state.currentTemp)
    const landscape = document.getElementById('landscape')
    if (tempAsInt >= 80) {
        landscape.textContent = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
    } else if (tempAsInt >= 70) {
        landscape.textContent = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷"
    } else if (tempAsInt >= 60) {
        landscape.textContent = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃"  
    } else {
        landscape.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
    };
};

// Refactor to have 2 arguement (tempDisplay, temp)
const renderTemp = (temp) => {
        temp.textContent = state.currentTemp;
        updateTempColor(temp);
        updateLandscape(temp);
};

// Refactoring based on Adrian OH
// const renderTemp = (temp) => {   // need to remove
//     const temp = document.getElementById("temp-number");
//     temp.textContent = state.currentTemp;
//     updateTempColor(temp);
//     updateLandscape(temp);


// const increaseTemp = () => {
//     state.currentTemp += 1;
//     renderTemp(temp);
// };    


const setupTemperatureControls = () => {
    // Get references to DOM elements
    // these 3 lines create them but this function should actually update them
    const temp = document.getElementById("temp-number"); 
    const increaseBtn = document.getElementById("increase-temp");
    const decreaseBtn = document.getElementById("decrease-temp");
    
    // Increase temperature
    increaseBtn.addEventListener("click", () => {
        state.currentTemp += 1;
        renderTemp(temp);
    });
    
    // Decrease temperature
    decreaseBtn.addEventListener("click", () => {
        state.currentTemp -= 1;
        renderTemp(temp);
    });
    
    // Display temperature
    renderTemp(temp);
};

////////////////////////////////
////////// WAVE 03 /////////////
////////////////////////////////

// Get the references to DOM elements

// defines small functions of event listener
const updateCityName = (inputFieldValue, cityOutput) => {
    cityOutput.textContent = inputFieldValue;
};

const setupCityName = () => {};
    const inputField = document.getElementById("inputCity");
    const cityOutput = document.getElementById("city-output");    

    // we want to put these within registerEventHandler()
    inputField.addEventListener('input', () => {  
        updateCityName(inputField.value, cityOutput);
    });


// const resetCityName = () => {
    // const resetButton = document.getElementById("reset");
    
    // inputField.textContent.remove();
    // };
    
    ////////////////////////////////
    ////////// WAVE 04 /////////////
    ////////////////////////////////
    
    ////////////////////////////////
    ////////// WAVE 05 /////////////
    ////////////////////////////////
    
    ////////////////////////////////
    ////////// WAVE 06 /////////////
    ////////////////////////////////
    
    
    // Controller function which connects small functions to the event listeners
    const registerEventHandler = () => {
        // const increaseBtn = document.getElementById("increase-temp");
        // increaseBtn.addEventListener("click", increaseTemp);

        setupTemperatureControls();
        setupCityName();
        resetCityName();
};

document.addEventListener("DOMContentLoaded", registerEventHandler); 