// Main Visualization Setup

document.addEventListener('DOMContentLoaded', function () {
    console.log('main.js loaded and running');

    // Fetch the embedded JSON data for initialization
    const dataElement = document.getElementById('data-script');
    let data = {};
    if (dataElement) {
        try {
            data = JSON.parse(dataElement.textContent);
            console.log('Data element found, proceeding with initialization.');
        } catch (error) {
            console.error('Error parsing JSON data:', error);
            return;
        }
    } else {
        console.error('Data element not found.');
        return;
    }

    const { random_array: arrayData = [], size = 10, speed = 2 } = data;

    // Function to initialize the visualizer based on page type
    function initializeVisualizer() {
        if (document.querySelector('.visualizer-container')) {
            createBars(arrayData);
        }
    }

    // Function to create bars for searching and sorting
    function createBars(array) {
        const container = document.querySelector('.visualizer-container');
        if (!container) {
            console.error('Visualizer container not found.');
            return;
        }
        container.innerHTML = '';
        array.forEach((value) => {
            const bar = document.createElement('div');
            bar.classList.add('bar');
            bar.style.height = `${value}%`;
            bar.innerHTML = `<p>${value}</p>`; // Keep structure of <p> inside bar
            container.appendChild(bar);
        });
        console.log('Bars created for array:', array);
    }

    // Set up sliders for interaction
    const sizeSlider = document.getElementById('size-slider');
    const speedSlider = document.getElementById('speed-slider');
    if (sizeSlider) {
        sizeSlider.addEventListener('input', () => {
            sizeSlider.previousElementSibling.textContent = `Size: ${sizeSlider.value}`;
        });
    } else {
        console.error('Size slider not found.');
    }

    if (speedSlider) {
        speedSlider.addEventListener('input', () => {
            speedSlider.previousElementSibling.textContent = `Speed: ${speedSlider.value}`;
        });
    } else {
        console.error('Speed slider not found.');
    }

    // Event listener for the reset button
    const resetButton = document.getElementById('reset-button');
    if (resetButton) {
        resetButton.addEventListener('click', function () {
            // Reloads the base page without any query parameters
            window.location.href = window.location.origin + window.location.pathname;
        });
    } else {
        console.error('Reset button not found.');
    }

    // Initialize the visualizer with current data
    initializeVisualizer();

    console.log('Visualizer initialized with array data:', arrayData);
});
