"user strict"
const locationURL = 'http://127.0.0.1:5000/location'
const weatherURL = 'http://127.0.0.1:5000/weather'


// define a state variable that tracks all the values we need in the code
const state = {  // call it state and add city name here
    currentTemp: 70,
    city: 'Seattle',
    skySelect: 'cloudy'
};


// defines small functions of event listener
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

const renderTemp = (temp) => {
    console.log('renderTemp temp= ', temp)
    console.log('currentTemp state= ', state.currentTemp)
    temp.textContent = state.currentTemp;
    updateTempColor(temp);
    updateLandscape(temp);
};


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

const getLonLat = () => {
    return axios.get(locationURL, {
        params: {
            q: state.city
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


const setRealTimeTemp = () => {
    const realTimeTempButton = document.getElementById('real-time-temp');
    const temp = document.getElementById("temp-number"); 

    realTimeTempButton.addEventListener('click', () => {
        getRealTimeTemp()
            .then(realTemp =>{
                state.currentTemp =realTemp;
                temp.textContent = state.currentTemp;
                renderTemp(temp);
            })
            .catch(error => {
                console.log("Error fetching real-time temperature:", error);
            });

    //         // console.log('in realtime set, before get real time', state.currentTemp)
    //         state.currentTemp = getRealTimeTemp();
    //         temp.textContent = state.currentTemp;
    //         // console.log('in realtime set after real time, state of current temp', state.currentTemp)
    //         renderTemp(temp);
    // return
    });
};


const getRealTimeTemp = () => {
    // let promise = Promise.resolve();
    // promise

    return getLonLat()
        .then(({lat, lon}) => {
            return axios.get(weatherURL, {
                params: { lat: lat, lon: lon }
            })
        })

        // .then(response => {
        //     const { lat, lon } = response;
        //     return axios.get(weatherURL, {
        //         params: {
        //             lat: lat,
        //             lon: lon
        //         }
        //     })
        // })

        .then(response => {
            const tempK = response.data.main.temp;
            const tempF = ((tempK - 273.15) * 9/5 + 32).toFixed(1); // Rounded to 1 decimal
            console.log('temp= ', tempF);
            return tempF;
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