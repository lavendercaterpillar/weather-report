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


const registerEventHandler = () => {
    // Get references to DOM elements
    const tempDisplay = document.getElementById("temp-number");
    const increaseBtn = document.getElementById("increase-temp");
    const decreaseBtn = document.getElementById("decrease-temp");
    
    // Parse initial temperature with default = 70
    let temp = parseInt(tempDisplay.textContent) || 70;  // if itemp is integer
    tempDisplay.textContent = temp;
    // tempDisplay.style.color = "orange"; // as a test

    // Temperature Color Code
    const updateTempColor = () => {
        if (temp >= 80) {
            tempDisplay.style.color = "red";
        } else if (temp >= 70) {
            tempDisplay.style.color = "orange";
        } else if (temp >= 60) {
            tempDisplay.style.color = "yellow";
        } else if (temp >= 50) {
            tempDisplay.style.color = "green";
        } else {
            tempDisplay.style.color = "teal";
        }
    };
    
    const renderTemp = () => {
        tempDisplay.textContent = temp;
        updateTempColor();
    };    
    
    // Increase temperature
    increaseBtn.addEventListener("click", () => {
        temp += 1;
        // tempDisplay.textContent = temp;
        renderTemp();
    });
    
    // Decrease temperature
    decreaseBtn.addEventListener("click", () => {
        temp -= 1;
        // tempDisplay.textContent = temp;
        renderTemp();
    });
    
    // Set initial color
    updateTempColor();
};

document.addEventListener("DOMContentLoaded", registerEventHandler); 