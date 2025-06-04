"user strict"
    // Landscape image should update 
    //     Temperature (F)	Landscape
    //     80+	"🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂"
    //     70-79	"🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷"
    //     60-69	"🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃"
    //     59 or below	"🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲"

const tempState = {
    currentTemp: 70
};

// Can be refactored to have 2 arguements (tempDisplay => color render, temp => ranges)
const updateTempColor = (temp) => {   
    const tempAsInt = parseInt(tempState.currentTemp)

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
    const tempAsInt = parseInt(tempState.currentTemp)
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
    temp.textContent = tempState.currentTemp;
    updateTempColor(temp);
    updateLandscape(temp);
    };

const setupTemperatureControls = () => {
    // Get references to DOM elements
    const temp = document.getElementById("temp-number");
    const increaseBtn = document.getElementById("increase-temp");
    const decreaseBtn = document.getElementById("decrease-temp");

    // Increase temperature
    increaseBtn.addEventListener("click", () => {
        tempState.currentTemp += 1;
        renderTemp(temp);
    });
    
    // Decrease temperature
    decreaseBtn.addEventListener("click", () => {
        tempState.currentTemp -= 1;
        renderTemp(temp);
    });

    // Display temperature
    renderTemp(temp);
};

////////////////////////////////
////////// WAVE 03 /////////////
////////////////////////////////

const setupCityNameControls = () => {};


const registerEventHandler = () => {
    setupTemperatureControls();
    setupCityNameControls();
};

document.addEventListener("DOMContentLoaded", registerEventHandler); 