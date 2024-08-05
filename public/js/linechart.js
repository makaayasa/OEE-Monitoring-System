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
    },
    {
        "line_produksi": "A01",
        "nama_line": "Assy Line A",
        "tgl_produksi": "2024-07-03",
        "shift_produksi": "1",
        "tipe_barang": "AAH",
        "timestamp_capture": "2024-07-02 21:19:19"
    },
    {
        "line_produksi": "A01",
        "nama_line": "Assy Line A",
        "tgl_produksi": "2024-07-03",
        "shift_produksi": "1",
        "tipe_barang": "AAH",
        "timestamp_capture": "2024-07-02 21:24:21"
    },
    {
        "line_produksi": "A01",
        "nama_line": "Assy Line A",
        "tgl_produksi": "2024-07-03",
        "shift_produksi": "1",
        "tipe_barang": "AAH",
        "timestamp_capture": "2024-07-02 21:28:43"
    }
];

function updateSummary(adjustedDate, adjustedTime) {
    const currentDateTime = new Date(`${adjustedDate}T${adjustedTime}`);
    console.log('Current DateTime:', currentDateTime);

    let quantityTotal = 0;
    let lastCapture = null;
    let outputTimeTotal = 0;
    let lastTimestamp = null;

    // Iterate through production data to find relevant entries
    data_Produksi.forEach(entry => {
        const timestampCapture = new Date(entry.timestamp_capture);
        if (timestampCapture <= currentDateTime) {
            quantityTotal++;
            if (!lastCapture || timestampCapture > lastCapture) {
                lastCapture = timestampCapture;
            }
            if (lastTimestamp) {
                outputTimeTotal += (timestampCapture - lastTimestamp) / 1000; // Calculate time difference in seconds
            }
            lastTimestamp = timestampCapture;
        }
    });

    if (lastCapture) {
        const latestEntry = data_Produksi.find(entry => new Date(entry.timestamp_capture).getTime() === lastCapture.getTime());

        if (latestEntry) {
            document.getElementById('summary-type').textContent = latestEntry.tipe_barang;
            document.getElementById('summary-ideal').textContent = latestEntry.tipe_barang; // Assuming 'ideal' refers to 'tipe_barang'
            document.getElementById('summary-quantity').textContent = quantityTotal;
            document.getElementById('summary-capture').textContent = lastCapture.toISOString().slice(0, 19).replace('T', ' ');
            document.getElementById('summary-time').textContent = outputTimeTotal + ' seconds'; // Display total output time in seconds
        } else {
            console.error('Latest entry not found');
        }
    } else {
        console.log('No captures found before the current datetime');
    }
}

$(document).ready(function() {
    const table = $('#data-table').DataTable({
        data: data_Produksi,
        columns: [
            { data: 'line_produksi' },
            { data: 'nama_line' },
            { data: 'tgl_produksi' },
            { data: 'shift_produksi' },
            { data: 'tipe_barang' },
            { data: 'timestamp_capture' }
        ]
    });

    $('#data-table tbody').on('click', 'tr', function() {
        const data = table.row(this).data();
        const timestamp = data.timestamp_capture;
        const [date, time] = timestamp.split(' ');
        updateSummary(date, time);
    });

    function updateChart(data) {
        const timestamps = data_Produksi.map(item => item.timestamp_capture);
        const quantities = timestamps.map((timestamp, index) => index + 1);

        const ctx = document.getElementById('lineChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: timestamps,
                datasets: [{
                    label: 'Production Quantity Over Time',
                    data: quantities,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    fill: false
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'minute'
                        }
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Initial chart update
    updateChart(data_Produksi);
});
