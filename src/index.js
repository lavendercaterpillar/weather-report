"user strict"
/**
 * Logical Steps
 * 
 * What do we want to select? the buttons that control the temp and the update the landscape image
 
 * Once we select the thing what do we do with it? if increase button is clicked the number should increase by one, if declrease button is clicked number should decres by 2, if current temp button is clicked API call to fetch temperature based on city name
 
 * Does anything need to happen after we do what we want to do with the thing? 
    The color must update based on temp ranges
        Temperature (F)	Color
        80+	Red
        70-79	Orange  
        60-69	Yellow
        50-59	Green
        49 or below	Teal
    Landscape image should update 
        Temperature (F)	Landscape
        80+	"🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂"
        70-79	"🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷"
        60-69	"🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃"
        59 or below	"🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲"

        Pseudo code
        variables: increase, decrease, temperature, color
        use switch for colors
        */
// const weather_report = () => {
//     CONST RED_LIMIT = 80
//     CONST ORANGE_LIMIT = 79
//     CONST YELLOW_LIMIT = 69
//     CONST GREEN_LIMIT = 59
//     CONST TEAL_LIMIT = 49

    // "orange" if 70 <= temperature >=79 else None  
// }

const tempState = {
    tempDisplay: 70
};

const increaseTempBtn = () => {
    const temperature = document.getElementById('temp-number');
    tempState.tempDisplay += 1;
    temperature.textContent = tempState.tempDisplay;
}

const decreaseTempBtn = () => {
    const temperature = document.getElementById('temp-number');
    tempState.tempDisplay -= 1;
    temperature.textContent = tempState.tempDisplay;
}

const registerEventHandlers = () => {
    increaseBtn = document.getElementById('increase-temp');
    increaseBtn.addEventListener('click', increaseTempBtn)

    decreaseBtn = document.getElementById('decrease-temp');
    decreaseBtn.addEventListener('click', decreaseTempBtn)
}

document.addEventListener('DOMContentLoaded', registerEventHandlers);
