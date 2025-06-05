"user strict"
const locationURL = 'http://127.0.0.1:5000/location'
const weatherURL = 'http://127.0.0.1:5000/weather'


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
const updateCityName = () => {
    // cityOutput.textContent = inputFieldValue;
    state.city = inputField.value;
    cityOutput.textContent = state.city;
};

const setupCityName = () => {
    // we want to put this within registerEventHandler()
    inputField.addEventListener('input', () => {  
        updateCityName();
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
    return axios.get(locationURL, {
        params: {
            q: state.city
        }
    })
    .then(response => {
        const { lat, lon } = response.data[0];
        return { lat, lon } // {lat:lat, lon:lon}
    })
    .catch(error => {
        console.log(error);
    });  
        
}
const getRealTimeTemp = () => {
    let promise = Promise.resolve();

    promise
    .then(() => {
        return getLonLat()
    })
    .then(response => {
        const { lat, lon } = response;
        return axios.get(weatherURL, {
            params: {
                lat: lat,
                lon: lon
            }
        })
    })
    .then(response => {
        const temp = response.data.main.temp;
        console.log('temp= ', temp);
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

const updateSkyDisplay = () => {
    const sky = state.skySelect;

    if (sky === 'sunny') {
        skyDisplay.textContent = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
    } else if (sky === 'cloudy') {
        skyDisplay.textContent = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
    } else if (sky === 'rainy') {
        skyDisplay.textContent = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
    } else if (sky === 'snowy') {
        skyDisplay.textContent = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
    };
};

const setupSkyDisplay = () => {
    skySelect.addEventListener('change', () => {
        state.skySelect = skySelect.value;
        updateSkyDisplay();
    });
};

////////////////////////////////
////////// WAVE 06 /////////////
////////////////////////////////
const resetButton = document.getElementById('reset');

const resetCityName = () => {
    resetButton.addEventListener('click', (event) => { 
        // cityOutput.textContent = 'Seattle';
        state.city = 'Seattle';
        cityOutput.textContent = state.city;
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