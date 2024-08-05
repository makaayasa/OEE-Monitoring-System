// Dummy data
const data_header = [
    {
        line: "A01",
        linedesc: "JKT Line Assy A",
        shift: "1"
    }
];

function updateMachineDetails() {
    if (data_header.length > 0) {
        const details = data_header[0];
        const lineElement = document.getElementById('line');
        const linedescElement = document.getElementById('linedesc');
        const shiftElement = document.getElementById('shift');

        if (lineElement) {
            lineElement.innerText = details.line;
        }
        if (linedescElement) {
            linedescElement.innerText = details.linedesc;
        }
        if (shiftElement) {
            shiftElement.innerText = details.shift;
        }
    } else {
        console.warn('data_header array is empty');
    }
}

// Call the function to update the machine details on page load
document.addEventListener('DOMContentLoaded', updateMachineDetails);
