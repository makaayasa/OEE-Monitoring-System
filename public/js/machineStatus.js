let running = false;
let operationInterval = null;
let totalStopInterval = null;
let operationTime = 0;
let totalStopTime = 0;

// Function to update the machine status
function updateMachineStatus() {
    const machineStatusElement = document.getElementById('machine-status');
    const troubleInformationElement = document.getElementById('trouble-information');
    const operationTimeElement = document.getElementById('operation-time');
    const totalStopTimeElement = document.getElementById('total-stop-time');
    const loadingTimeElement = document.getElementById('loading-time');

    if (!machineStatusElement || !troubleInformationElement || !operationTimeElement || !totalStopTimeElement || !loadingTimeElement) {
        console.error("One or more elements could not be found. Please check the element IDs.");
        return;
    }

    if (running) {
        machineStatusElement.textContent = "RUN";
        machineStatusElement.style.color = '#00cc00'; // Green color for RUN
        troubleInformationElement.textContent = "- - -";
        clearInterval(totalStopInterval);
        totalStopInterval = null;

        if (!operationInterval) {
            operationInterval = setInterval(() => {
                operationTime += 0.1;
                operationTimeElement.textContent = operationTime.toFixed(1) + ' min';
                const loadingTime = operationTime + totalStopTime;
                loadingTimeElement.textContent = loadingTime.toFixed(1) + ' min';
            }, 6000); // Update every 6 seconds
        }
    } else {
        machineStatusElement.textContent = "STOP";
        machineStatusElement.style.color = '#ff3333'; // Red color for STOP
        clearInterval(operationInterval);
        operationInterval = null;

        if (!totalStopInterval) {
            totalStopInterval = setInterval(() => {
                totalStopTime += 0.1;
                totalStopTimeElement.textContent = totalStopTime.toFixed(1) + ' min';
                const loadingTime = operationTime + totalStopTime;
                loadingTimeElement.textContent = loadingTime.toFixed(1) + ' min';
            }, 6000); // Update every 6 seconds
        }
    }
}

// Function to toggle the machine status
function toggleMachineStatus() {
    running = !running;
    updateMachineStatus();
}

// Initial setup to start the status toggling
document.addEventListener('DOMContentLoaded', function() {
    let toggleInterval = 18000; // 18 seconds in milliseconds
    let startDelay = 1000; // 1 second in milliseconds

    setInterval(() => {
        toggleMachineStatus(); // Change the status
        setTimeout(() => {
            toggleMachineStatus(); // Change the status again after 1 second
        }, startDelay);
    }, toggleInterval + startDelay);
    
    toggleMachineStatus(); // Start the initial state
});
