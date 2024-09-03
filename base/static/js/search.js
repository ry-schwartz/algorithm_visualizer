// Searching Algorithms Setup

document.addEventListener('DOMContentLoaded', function () {
    console.log('searching.js loaded and running');

    // Ensure that this script only runs on the searching page where the relevant buttons and input are present
    const linearSearchButton = document.querySelector('button[onclick="runLinearSearch()"]');
    const binarySearchButton = document.querySelector('button[onclick="runBinarySearch()"]');
    const targetInput = document.getElementById('target-input');

    // Exit if necessary elements are not found
    if (!linearSearchButton || !binarySearchButton || !targetInput) {
        console.log('Relevant elements for searching algorithms not found.');
        return;
    }

    // Disable and enable buttons to prevent multiple simultaneous algorithm executions
    function disableButtons() {
        linearSearchButton.disabled = true;
        binarySearchButton.disabled = true;
    }

    function enableButtons() {
        linearSearchButton.disabled = false;
        binarySearchButton.disabled = false;
    }

    // Retrieve the target value from the input field
    function getTargetValue() {
        const target = parseInt(targetInput.value, 10);
        if (isNaN(target) || target < 10 || target > 50) {
            alert('Please enter a valid target between 10 and 50.');
            return null;
        }
        return target;
    }

    // Linear Search execution
    window.runLinearSearch = async function () {
        console.log('Running Linear Search');
        disableButtons();
        const array = [...document.querySelectorAll('.bar')].map(bar => parseInt(bar.textContent));
        const target = getTargetValue();
        if (target === null) {
            enableButtons();
            return;
        }
        await linearSearch(array, target, 1000 / parseInt(document.getElementById('speed-slider').value));
        enableButtons();
    };

    // Linear Search algorithm with visualization
    async function linearSearch(arr, target, speed) {
        const bars = document.querySelectorAll('.bar');
        for (let i = 0; i < arr.length; i++) {
            bars[i].style.height = `${parseInt(bars[i].style.height) * 1.2}%`;  // Visually grow height by 10%
            bars[i].style.border = '5px solid #F3F4F8'; // Highlight current position
            await sleep(speed);
            if (arr[i] === target) {
                bars[i].style.border = '5px solid green'; // Mark found with green border
                bars[i].style.height = `${parseInt(bars[i].textContent)}%`; // Revert visual growth
                return i;
            }
            bars[i].style.border = 'none'; // Reset border
            bars[i].style.height = `${parseInt(bars[i].textContent)}%`; // Revert visual growth
        }
        alert('Target not found');
        return -1;
    }

    // Binary Search execution
    window.runBinarySearch = async function () {
        console.log('Running Binary Search');
        disableButtons();
        const arr = [...document.querySelectorAll('.bar')].map(bar => parseInt(bar.textContent)).sort((a, b) => a - b);
        const target = getTargetValue();
        if (target === null) {
            enableButtons();
            return;
        }
        recreateBars(arr); // Recreate bars to ensure they are sorted
        await binarySearch(arr, target, 1000 / parseInt(document.getElementById('speed-slider').value));
        enableButtons();
    };

    // Function to recreate the bars for sorted array
    function recreateBars(array) {
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
            bar.innerHTML = `<p>${value}</p>`;
            container.appendChild(bar);
        });
        console.log('Bars recreated for sorted array:', array);
    }

    // Binary Search algorithm with visualization
    async function binarySearch(arr, target, speed) {
        const bars = document.querySelectorAll('.bar');
        let left = 0;
        let right = arr.length - 1;
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            bars[mid].style.transform = 'scaleY(1.1)'; // Visually grow height by 10%
            bars[mid].style.border = '5px solid #F3F4F8'; // Highlight current middle
            await sleep(speed);
            if (arr[mid] === target) {
                bars[mid].style.border = '5px solid green'; // Mark found with green border
                bars[mid].style.transform = 'scaleY(1.0)'; // Revert visual growth
                return mid;
            }
            if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
            bars[mid].style.border = 'none'; // Reset border
            bars[mid].style.transform = 'scaleY(1.0)'; // Revert visual growth
        }
        alert('Target not found');
        return -1;
    }

    // Helper function to pause execution for a specified time
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    console.log('Searching functions are now ready.');
});
