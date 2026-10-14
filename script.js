// DOM Elements
const barsContainer = document.getElementById("bars");
const generateBtn = document.getElementById("generate");
const sortBtn = document.getElementById("sort");
const algorithmSelect = document.getElementById("algorithm");
const arraySizeInput = document.getElementById("arraySize");

const comparisonsEl = document.getElementById("comparisons");
const swapsEl = document.getElementById("swaps");
const timeEl = document.getElementById("time");
const statusEl = document.getElementById("status");

let array = [];
let comparisons = 0;
let swaps = 0;
let startTime = 0;

// Generate random array
function generateArray(size = 25) {
    array = [];
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 100) + 10);
    }
    renderBars();
    statusEl.innerText = "Ready";
    comparisonsEl.innerText = "0";
    swapsEl.innerText = "0";
    timeEl.innerText = "0 ms";
}

// Render bars on screen
function renderBars(indices = [], className = "") {
    barsContainer.innerHTML = "";
    const maxHeight = Math.max(...array);
    
    array.forEach((value, idx) => {
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${(value / maxHeight) * 100}%`;
        
        if (indices.includes(idx)) {
            bar.classList.add(className);
        }
        barsContainer.appendChild(bar);
    });
}

// Sleep function for animation delay
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Bubble Sort Implementation
async function bubbleSort() {
    let len = array.length;
    startTime = performance.now();
    
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            comparisons++;
            comparisonsEl.innerText = comparisons;
            
            renderBars([j, j + 1], "comparing");
            await sleep(30);
            
            if (array[j] > array[j + 1]) {
                swaps++;
                swapsEl.innerText = swaps;
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                
                renderBars([j, j + 1], "pivot");
                await sleep(30);
            }
        }
    }
    
    let endTime = performance.now();
    timeEl.innerText = `${(endTime - startTime).toFixed(2)} ms`;
    renderBars();
    statusEl.innerText = "Completed";
}

// Event Listeners
generateBtn.addEventListener("click", () => {
    generateArray(arraySizeInput.value);
});

arraySizeInput.addEventListener("input", () => {
    generateArray(arraySizeInput.value);
});

sortBtn.addEventListener("click", async () => {
    sortBtn.disabled = true;
    generateBtn.disabled = true;
    statusEl.innerText = "Sorting...";
    comparisons = 0;
    swaps = 0;
    
    const selectedAlgo = algorithmSelect.value;
    if (selectedAlgo === "bubble") {
        await bubbleSort();
    } else {
        await bubbleSort(); 
    }
    
    sortBtn.disabled = false;
    generateBtn.disabled = false;
});

// Initial load
generateArray(25);