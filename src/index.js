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

const tempState = {
    currentTemp: 70
};

const updateTempColor = (temp) => {
    const tempAsInt = parseInt(tempState.currentTemp)
    // const tempColor = document.getElementById("temp-number");

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

const renderTemp = (temp) => {
    temp.textContent = tempState.currentTemp;
    updateTempColor(temp);
    };

const registerEventHandler = () => {
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

document.addEventListener("DOMContentLoaded", registerEventHandler); 


