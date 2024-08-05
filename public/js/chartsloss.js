document.addEventListener('DOMContentLoaded', function() {
            const ctx = document.getElementById('OEElossPieChart').getContext('2d');
            const data = {
                labels: ['Stop Loss', 'Speed Loss', 'OEE'],
                datasets: [{
                    data: [45, 8, 43],
                    backgroundColor: [
                        '#ff4048',
                        '#ffe716',
                        '#2df726'
                    ],
                    borderColor: '#333333'
                }]
            };

            const options = {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                return tooltipItem.label + ': ' + tooltipItem.raw.toFixed(2) + '%';
                            }
                        }
                    }
                }
            };

            const pieChart = new Chart(ctx, {
                type: 'doughnut',
                data: data,
                options: options
            });

            setInterval(() => {
                // Generate new random values
                const stopLoss = (Math.random() * 50).toFixed(2);
                const speedLoss = (Math.random() * 20).toFixed(2);
                const oee = (100 - stopLoss - speedLoss).toFixed(2);

                // Update the chart data
                pieChart.data.datasets[0].data = [stopLoss, speedLoss, oee];

                // Update the chart
                pieChart.update();
            }, 1000);
        });