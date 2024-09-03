// Shortest Path Visualization Setup

document.addEventListener('DOMContentLoaded', function () {
    console.log('shortest_path.js loaded and running');

    let selectedDifficulty = 'easy'; // Default difficulty

    // Function to initialize the grid
    function initializeGrid(rows = 10, cols = 15) {
        const gridContainer = document.querySelector('.visualizer-grid');
        if (!gridContainer) {
            console.error('Grid container not found.');
            return;
        }
        gridContainer.innerHTML = '';
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const cell = document.createElement('div');
                cell.classList.add('grid-item', 'on'); // Initially all cells are "on"
                cell.style.backgroundColor = 'aqua'; // Set initial color to aqua
                cell.dataset.row = row;
                cell.dataset.col = col;
                gridContainer.appendChild(cell);
                console.log(`Initialized cell (${row}, ${col}) as "on" with color aqua.`);
            }
        }
        console.log(`Grid initialized with ${cols} x ${rows} layout.`);
    }

    // Function to clear the grid before generating a new maze
    function clearGrid() {
        const cells = document.querySelectorAll('.grid-item');
        cells.forEach(cell => {
            cell.classList.remove('off');
            cell.classList.add('on');
            cell.style.backgroundColor = 'aqua'; // Reset cells to aqua
        });
        console.log('Grid cleared, all cells set to "on" with color aqua.');
    }

    // Function to set the start and end points at fixed positions
    function setStartAndEndPoints() {
        const startCell = document.querySelector('.grid-item[data-row="0"][data-col="0"]');
        const endCell = document.querySelector('.grid-item[data-row="9"][data-col="14"]');

        if (startCell) {
            startCell.style.backgroundColor = '#F3F4F8'; // Start point
            startCell.classList.remove('on'); // Mark as non-obstacle
            startCell.classList.add('start');
            console.log('Start point set at (0, 0).');
        }

        if (endCell) {
            endCell.style.backgroundColor = '#F3F4F8'; // End point
            endCell.classList.remove('on'); // Mark as non-obstacle
            endCell.classList.add('end');
            console.log('End point set at (9, 14).');
        }
    }

    // Function to generate a maze based on the selected difficulty
    function generateMaze() {
        clearGrid(); // Clear the grid before adding new obstacles

        // Set fixed start and end points before obstacles
        setStartAndEndPoints();

        let obstacleCount;
        switch (selectedDifficulty) {
            case 'easy':
                obstacleCount = 15;
                break;
            case 'medium':
                obstacleCount = 30;
                break;
            case 'hard':
                obstacleCount = 45;
                break;
            default:
                obstacleCount = 15;
        }

        // Get available cells for obstacles excluding start and end
        const cells = Array.from(document.querySelectorAll('.grid-item.on:not(.start):not(.end)'));
        if (cells.length === 0) {
            console.log('No available cells to place obstacles.');
            return;
        }

        // Randomly turn off cells by adding obstacles
        for (let i = 0; i < obstacleCount; i++) {
            const randomIndex = Math.floor(Math.random() * cells.length);
            const randomCell = cells[randomIndex];
            randomCell.classList.remove('on');
            randomCell.classList.add('off');
            randomCell.style.backgroundColor = '#0b3062'; // Set "off" cells to dark blue
            cells.splice(randomIndex, 1); // Remove cell from the array to avoid duplicates
            console.log(`Turned off cell at (${randomCell.dataset.row}, ${randomCell.dataset.col}).`);
        }
    }

    // Async function to visualize Dijkstra's algorithm
    async function runDijkstra() {
        console.log('Running Dijkstra Algorithm...');

        // Fetch the speed from the speed slider
        const speed = parseInt(document.getElementById('speed-slider').value);
        await executeDijkstra(200 / speed); // Pass the calculated delay to the algorithm
    }

    // Async function to visualize Bellman-Ford algorithm
    async function runBellmanFord() {
        console.log('Running Bellman-Ford Algorithm...');

        // Fetch the speed from the speed slider
        const speed = parseInt(document.getElementById('speed-slider').value);
        await executeBellmanFord(200 / speed); // Pass the calculated delay to the algorithm
    }

    // Dijkstra's algorithm visualization logic
    async function executeDijkstra(delayTime) {
        const startCell = document.querySelector('.start');
        const endCell = document.querySelector('.end');
        const cells = Array.from(document.querySelectorAll('.grid-item'));

        if (!startCell || !endCell) {
            console.error('Start or End cell not found.');
            return;
        }

        let queue = [startCell];
        let visited = new Set();
        let parentMap = new Map();

        // Delay function to pause between steps based on slider speed
        function delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        while (queue.length > 0) {
            const currentCell = queue.shift();

            if (currentCell !== startCell && currentCell !== endCell) {
                currentCell.style.backgroundColor = 'yellow';
            }

            if (currentCell === endCell) {
                tracePath(parentMap, endCell);
                return;
            }

            await delay(delayTime);

            const neighbors = getNeighbors(currentCell, cells);
            for (let neighbor of neighbors) {
                if (!visited.has(neighbor) && !neighbor.classList.contains('off')) {
                    queue.push(neighbor);
                    visited.add(neighbor);
                    parentMap.set(neighbor, currentCell);
                    if (neighbor !== startCell && neighbor !== endCell) {
                        neighbor.style.backgroundColor = 'orange';
                    }
                }
            }
        }

        console.log('No path found to the end.');
    }

    // Bellman-Ford algorithm visualization logic
    async function executeBellmanFord(delayTime) {
        const startCell = document.querySelector('.start');
        const endCell = document.querySelector('.end');
        const cells = Array.from(document.querySelectorAll('.grid-item'));

        if (!startCell || !endCell) {
            console.error('Start or End cell not found.');
            return;
        }

        let visited = new Set();
        let queue = [startCell];
        let parentMap = new Map();

        function delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        while (queue.length > 0) {
            const currentCell = queue.shift();

            if (currentCell !== startCell && currentCell !== endCell) {
                currentCell.style.backgroundColor = 'lightblue';
            }

            if (currentCell === endCell) {
                tracePath(parentMap, endCell);
                return;
            }

            await delay(delayTime);

            const neighbors = getNeighbors(currentCell, cells);
            for (let neighbor of neighbors) {
                if (!visited.has(neighbor) && !neighbor.classList.contains('off')) {
                    queue.push(neighbor);
                    visited.add(neighbor);
                    parentMap.set(neighbor, currentCell);
                    if (neighbor !== startCell && neighbor !== endCell) {
                        neighbor.style.backgroundColor = 'purple';
                    }
                }
            }
        }

        console.log('No path found to the end.');
    }

    // Function to trace the shortest path from end to start
    function tracePath(parentMap, endCell) {
        let current = endCell;
        while (parentMap.has(current)) {
            current = parentMap.get(current);
            if (current.classList.contains('start')) break; // Stop if we reach the start
            current.style.backgroundColor = 'green'; // Highlight the shortest path
        }
    }

    // Helper function to get neighboring cells (up, down, left, right)
    function getNeighbors(cell, cells) {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        return cells.filter(c => {
            const r = parseInt(c.dataset.row);
            const co = parseInt(c.dataset.col);
            return (
                (r === row && Math.abs(co - col) === 1) ||
                (co === col && Math.abs(r - row) === 1)
            );
        });
    }

    // Event listener for difficulty selection to update the selected difficulty
    const difficultyElement = document.getElementById('difficulty');
    if (difficultyElement) {
        difficultyElement.addEventListener('change', function () {
            selectedDifficulty = this.value;
            console.log(`Difficulty selected: ${selectedDifficulty}`);
        });
    } else {
        console.error('Difficulty selection element not found.');
    }

    // Event listener for the "Generate Maze" button
    const generateMazeButton = document.getElementById('generate-maze');
    if (generateMazeButton) {
        generateMazeButton.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent form submission if in a form context
            console.log(`Generate Maze button clicked with difficulty: ${selectedDifficulty}`);
            generateMaze();
        });
    } else {
        console.error('Generate Maze button not found.');
    }

    // Event listeners for the algorithm buttons
    const dijkstraButton = document.getElementById('run-dijkstra');
    if (dijkstraButton) {
        dijkstraButton.addEventListener('click', function () {
            runDijkstra();
        });
    } else {
        console.error('Dijkstra button not found.');
    }

    const bellmanFordButton = document.getElementById('run-bellman-ford');
    if (bellmanFordButton) {
        bellmanFordButton.addEventListener('click', function () {
            runBellmanFord();
        });
    } else {
        console.error('Bellman-Ford button not found.');
    }

    // Initialize the grid on page load
    initializeGrid();
    console.log('Grid setup is now complete.');
});
