let data_header;
let data_linestop;
let data_produksi;

async function fetchData() {
    try {
        // data_header
        let response = await fetch('/api/data-header');
        data_header = await response.json();

        if (!Array.isArray(data_header)) {
            data_header = [data_header];
        }

        // data_linestop
        response = await fetch('/api/data-linestop');
        data_linestop = await response.json();

        if (!Array.isArray(data_linestop)) {
            data_linestop = [data_linestop];
        }

        // data_produksi
        response = await fetch('/api/data-produksi');
        data_produksi = await response.json();

        if (!Array.isArray(data_produksi)) {
            data_produksi = [data_produksi];
        }

        // Update machine details
        updateMachineDetails();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchData);
