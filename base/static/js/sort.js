// Sorting Algorithms Setup

document.addEventListener('DOMContentLoaded', function () {
    console.log('sorting.js loaded and running');

    // Ensure this script only runs on the sorting page where relevant buttons are present
    const bubbleSortButton = document.querySelector('button[onclick="runBubbleSort()"]');
    const selectionSortButton = document.querySelector('button[onclick="runSelectionSort()"]');
    const insertionSortButton = document.querySelector('button[onclick="runInsertionSort()"]');
    const mergeSortButton = document.querySelector('button[onclick="runMergeSort()"]');
    const quickSortButton = document.querySelector('button[onclick="runQuickSort()"]');

    // Exit if necessary elements are not found
    if (!bubbleSortButton || !selectionSortButton || !insertionSortButton || !mergeSortButton || !quickSortButton) {
        console.log('Relevant elements for sorting algorithms not found.');
        return;
    }

    // Disable and enable buttons to avoid concurrent executions
    function disableButtons() {
        bubbleSortButton.disabled = true;
        selectionSortButton.disabled = true;
        insertionSortButton.disabled = true;
        mergeSortButton.disabled = true;
        quickSortButton.disabled = true;
    }

    function enableButtons() {
        bubbleSortButton.disabled = false;
        selectionSortButton.disabled = false;
        insertionSortButton.disabled = false;
        mergeSortButton.disabled = false;
        quickSortButton.disabled = false;
    }

    // Helper function to update bar height and label
    function updateBar(bar, value) {
        bar.style.height = `${value}%`;
        bar.querySelector('p').textContent = value; // Ensure text content updates correctly
    }

    // Helper function to pause execution for a specified time
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Swap elements and update their positions
    async function swap(arr, i, j, bars) {
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap in the array
        const tempHeight = bars[i].style.height;
        const tempText = bars[i].querySelector('p').textContent;

        bars[i].style.height = bars[j].style.height;
        bars[i].querySelector('p').textContent = bars[j].querySelector('p').textContent;

        bars[j].style.height = tempHeight;
        bars[j].querySelector('p').textContent = tempText;

        await sleep(100); // Pause briefly to make the swap visually noticeable
    }

    // Bubble Sort Execution
    window.runBubbleSort = async function () {
        console.log('Running Bubble Sort');
        disableButtons();
        const bars = document.querySelectorAll('.bar');
        const arr = Array.from(bars, bar => parseInt(bar.textContent));
        await bubbleSort(arr, bars, 1000 / parseInt(document.getElementById('speed-slider').value));
        enableButtons();
    };

    // Bubble Sort Algorithm with Visualization
    async function bubbleSort(arr, bars, speed) {
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
                bars[j].style.border = '3px solid #F3F4F8';
                bars[j + 1].style.border = '3px solid #F3F4F8';
                await sleep(speed);
                if (arr[j] > arr[j + 1]) {
                    await swap(arr, j, j + 1, bars); // Swap both visually and logically
                }
                bars[j].style.border = 'none';
                bars[j + 1].style.border = 'none';
            }
        }
    }

    // Selection Sort Execution
    window.runSelectionSort = async function () {
        console.log('Running Selection Sort');
        disableButtons();
        const bars = document.querySelectorAll('.bar');
        const arr = Array.from(bars, bar => parseInt(bar.textContent));
        await selectionSort(arr, bars, 1000 / parseInt(document.getElementById('speed-slider').value));
        enableButtons();
    };

    // Selection Sort Algorithm with Visualization
    async function selectionSort(arr, bars, speed) {
        for (let i = 0; i < arr.length; i++) {
            let minIndex = i;
            bars[minIndex].style.border = '3px solid #F3F4F8';
            for (let j = i + 1; j < arr.length; j++) {
                bars[j].style.border = '3px solid #F3F4F8';
                await sleep(speed);
                if (arr[j] < arr[minIndex]) {
                    bars[minIndex].style.border = 'none';
                    minIndex = j;
                    bars[minIndex].style.border = '3px solid #F3F4F8';
                }
                bars[j].style.border = 'none';
            }
            if (minIndex !== i) {
                await swap(arr, i, minIndex, bars); // Swap visually and logically
            }
            bars[minIndex].style.border = 'none';
        }
    }

    // Insertion Sort Execution
    window.runInsertionSort = async function () {
        console.log('Running Insertion Sort');
        disableButtons();
        const bars = document.querySelectorAll('.bar');
        const arr = Array.from(bars, bar => parseInt(bar.textContent));
        await insertionSort(arr, bars, 1000 / parseInt(document.getElementById('speed-slider').value));
        enableButtons();
    };

    // Insertion Sort Algorithm with Visualization
    async function insertionSort(arr, bars, speed) {
        for (let i = 1; i < arr.length; i++) {
            let key = arr[i];
            let j = i - 1;
            while (j >= 0 && arr[j] > key) {
                bars[j + 1].style.border = '3px solid #F3F4F8';
                await sleep(speed);
                arr[j + 1] = arr[j];
                updateBar(bars[j + 1], arr[j + 1]);
                bars[j + 1].style.border = 'none';
                j--;
            }
            arr[j + 1] = key;
            updateBar(bars[j + 1], arr[j + 1]);
        }
    }

    // Merge Sort Execution
    window.runMergeSort = async function () {
        console.log('Running Merge Sort');
        disableButtons();
        const bars = document.querySelectorAll('.bar');
        const arr = Array.from(bars, bar => parseInt(bar.textContent));
        await mergeSortHelper(arr, bars, 0, arr.length - 1, 1000 / parseInt(document.getElementById('speed-slider').value));
        enableButtons();
    };

    // Merge Sort Algorithm with Visualization
    async function mergeSortHelper(arr, bars, l, r, speed) {
        if (l < r) {
            let m = l + Math.floor((r - l) / 2);
            await mergeSortHelper(arr, bars, l, m, speed);
            await mergeSortHelper(arr, bars, m + 1, r, speed);
            await merge(arr, bars, l, m, r, speed);
        }
    }

    async function merge(arr, bars, l, m, r, speed) {
        let n1 = m - l + 1;
        let n2 = r - m;
        let L = new Array(n1);
        let R = new Array(n2);
        for (let i = 0; i < n1; i++) L[i] = arr[l + i];
        for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

        let i = 0, j = 0, k = l;

        while (i < n1 && j < n2) {
            bars[k].style.border = '3px solid #F3F4F8';
            await sleep(speed);
            if (L[i] <= R[j]) {
                arr[k] = L[i];
                i++;
            } else {
                arr[k] = R[j];
                j++;
            }
            updateBar(bars[k], arr[k]);
            bars[k].style.border = 'none';
            k++;
        }

        while (i < n1) {
            arr[k] = L[i];
            updateBar(bars[k], arr[k]);
            i++;
            k++;
        }

        while (j < n2) {
            arr[k] = R[j];
            updateBar(bars[k], arr[k]);
            j++;
            k++;
        }
    }

    // Quick Sort Execution
    window.runQuickSort = async function () {
        console.log('Running Quick Sort');
        disableButtons();
        const bars = document.querySelectorAll('.bar');
        const arr = Array.from(bars, bar => parseInt(bar.textContent));
        await quickSortHelper(arr, bars, 0, arr.length - 1, 1000 / parseInt(document.getElementById('speed-slider').value));
        enableButtons();
    };

    // Quick Sort Algorithm with Visualization
    async function quickSortHelper(arr, bars, low, high, speed) {
        if (low < high) {
            let pi = await partition(arr, bars, low, high, speed);
            await quickSortHelper(arr, bars, low, pi - 1, speed);
            await quickSortHelper(arr, bars, pi + 1, high, speed);
        }
    }

    async function partition(arr, bars, low, high, speed) {
        let pivot = arr[high];
        let i = low - 1;

        for (let j = low; j <= high - 1; j++) {
            bars[j].style.border = '3px solid #F3F4F8';
            await sleep(speed);
            if (arr[j] < pivot) {
                i++;
                await swap(arr, i, j, bars); // Swap visually and logically
            }
            bars[j].style.border = 'none';
        }
        await swap(arr, i + 1, high, bars); // Final swap of pivot
        return i + 1;
    }

    console.log('Sorting functions are now ready.');
});
