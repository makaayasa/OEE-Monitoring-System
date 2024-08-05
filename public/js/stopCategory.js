const stopTimes = {
    'Dandori': 0,
    'Others': 0,
    'Tool': 0,
    'Start Up': 0,
    'Breakdown': 0
};

const maxBars = 20;

// Function to update progress bars
function updateProgressBars() {
    Object.keys(stopTimes).forEach(category => {
        const barsContainer = document.getElementById(`${category.toLowerCase().replace(' ', '-')}-bars`);
        const timeLabel = document.getElementById(`${category.toLowerCase().replace(' ', '-')}-time`);
        
        // Calculate number of bars to display
        const numBars = Math.round((stopTimes[category] / 100) * maxBars);
        
        // Clear existing bars
        barsContainer.innerHTML = '';
        
        // Create new bars
        for (let i = 0; i < numBars; i++) {
            const bar = document.createElement('div');
            barsContainer.appendChild(bar);
        }
        
        // Update time label
        timeLabel.innerText = stopTimes[category].toFixed(1) + ' min';
    });
}

// Example: Simulate updates to the stop times
setInterval(() => {
    // Simulate some data changes
    stopTimes['Dandori'] = Math.random() * 100;
    stopTimes['Others'] = Math.random() * 100;
    stopTimes['Tool'] = Math.random() * 100;
    stopTimes['Start Up'] = Math.random() * 100;
    stopTimes['Breakdown'] = Math.random() * 100;

    // Update the progress bars
    updateProgressBars();
}, 5000); // Update every 5 seconds
