"user strict"
const locationURL = 'http://127.0.0.1:5000/location'
const weatherURL = 'http://127.0.0.1:5000/weather'
// const locationURL = 'http://127.0.0.1:5000/proxy_bp/location'
// const weatherURL = 'http://127.0.0.1:5000/proxy_bp/weather'

// define a state variable that tracks all the values we need in the code
const state = {  // call it state and add city name here
    currentTemp: 70,
    city: 'Seattle',
    skySelect: 'cloudy'
};

// Get references to DOM elements 

// Can be refactored to have 2 arguements (tempDisplay => color render, temp => ranges)
const updateTempColor = (temp) => {   

    const tempAsInt = parseInt(state.currentTemp)
    temp.style.color = "red";
    if (tempAsInt >= 80) {
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
const inputField = document.getElementById('inputCity');
const cityOutput = document.getElementById('city-output');    

// defines small functions of event listener
const updateCityName = (inputFieldValue, cityOutput) => {
    cityOutput.textContent = inputFieldValue;
};

const setupCityName = () => {
    // we want to put this within registerEventHandler()
    inputField.addEventListener('input', () => {  
        updateCityName(inputField.value, cityOutput);
    });
};

    
////////////////////////////////
////////// WAVE 04 /////////////
////////////////////////////////
const setRealTimeTemp = () => {
    const realTimeTempButton = document.getElementById('real-time-temp');
    const temp = document.getElementById("temp-number"); 

    realTimeTempButton.addEventListener('click', () => {
        state.currentTemp = getRealTimeTemp();
        temp.textContent = state.currentTemp;
        renderTemp(state.currentTemp);
    return
    });
};

const getLonLat = () => {
    return axios.get('/location', {
        params: {
        city: state.city
        }
    })
    .then(response => {
        const { lat, lon } = response.data[0];
        return { lat, lon }
    })
    .catch(error => {
        console.log(error);
    });  
        
}
const getRealTimeTemp = () => {
    const { lat, lon } = getLonLat();

    return axios
        .get('/weather', {
            params: {
                lat: lat,
                lon: lon,
                format: 'json'
            }
        })
        .then(response => {
            const temp = response.data[0].current.temp;
            return temp;
        })
        .catch(error => {
            console.log(error);
        });
};
////////////////////////////////
////////// WAVE 05 /////////////
////////////////////////////////
const skySelect = document.getElementById('sky-select')
const skyDisplay = document.getElementById('sky-output')

const updateSkyDisplay = (skySelect, skyDisplay) => {
    
    if (skySelect.value === 'sunny') {
        skyDisplay.textContent = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
    } else if (skySelect.value === 'cloudy') {
        skyDisplay.textContent = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
    } else if (skySelect.value === 'rainy') {
        skyDisplay.textContent = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
    } else if (skySelect.value === 'snowy') {
        skyDisplay.textContent = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
    };
};

const setupSkyDisplay = () => {
    skySelect.addEventListener('change', () => {
        updateSkyDisplay(skySelect, skyDisplay);
    });
};

////////////////////////////////
////////// WAVE 06 /////////////
////////////////////////////////
const resetButton = document.getElementById('reset');

const resetCityName = (event) => {
    resetButton.addEventListener('click', () => { 
        cityOutput.textContent = 'Seattle';
        inputField.value = '';
        event.preventDefault();
    });
};


// Controller function which connects small functions to the event listeners
const registerEventHandler = () => {

    setupTemperatureControls();
    setRealTimeTemp();
    setupCityName();
    resetCityName();
    setupSkyDisplay();
};

document.addEventListener("DOMContentLoaded", registerEventHandler); 