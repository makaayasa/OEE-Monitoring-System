const data_Produksi = [
    {
        "line_produksi": "A01",
        "nama_line": "Assy Line A",
        "tgl_produksi": "2024-07-03",
        "shift_produksi": "1",
        "tipe_barang": "AAH",
        "timestamp_capture": "2024-07-02 21:02:28"
    },
    {
        "line_produksi": "A01",
        "nama_line": "Assy Line A",
        "tgl_produksi": "2024-07-03",
        "shift_produksi": "1",
        "tipe_barang": "AAH",
        "timestamp_capture": "2024-07-02 21:09:26"
    },
    {
        "line_produksi": "A01",
        "nama_line": "Assy Line A",
        "tgl_produksi": "2024-07-03",
        "shift_produksi": "1",
        "tipe_barang": "AAH",
        "timestamp_capture": "2024-07-02 21:14:53"
    }
];

function updateSummary(adjustedDate, adjustedTime) {
    const currentDateTime = new Date(`${adjustedDate}T${adjustedTime}`);
    console.log('Current DateTime:', currentDateTime);
    
    let quantityTotal = 0;
    let lastCapture = null;

    // Iterate through production data to find relevant entries
    data_Produksi.forEach(entry => {
        const timestampCapture = new Date(entry.timestamp_capture);
        if (timestampCapture <= currentDateTime) {
            quantityTotal++;
            if (!lastCapture || timestampCapture > lastCapture) {
                lastCapture = timestampCapture;
            }
        }
    });

    if (lastCapture) {
        const latestEntry = data_Produksi.find(entry => new Date(entry.timestamp_capture).getTime() === lastCapture.getTime());

        if (latestEntry) {
            document.getElementById('summary-type').textContent = latestEntry.tipe_barang;
            document.getElementById('summary-ideal').textContent = latestEntry.tipe_barang; // Assuming 'ideal' refers to 'tipe_barang'
            document.getElementById('summary-quantity').textContent = quantityTotal;
            document.getElementById('summary-capture').textContent = lastCapture.toISOString().slice(0, 19).replace('T', ' ');
            document.getElementById('summary-time').textContent = latestEntry.tipe_barang; // This might need to be updated if 'time' is different
        } else {
            console.error('Latest entry not found');
        }
    } else {
        console.log('No captures found before the current datetime');
    }
}

// Example usage
updateSummary("2024-07-02", "21:10:00");
