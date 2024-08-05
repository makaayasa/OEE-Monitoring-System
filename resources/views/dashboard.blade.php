<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OEE Monitoring System</title>
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.21/css/jquery.dataTables.min.css">
    <script src="{{ asset('js/dateTime.js') }}" defer></script>
    <script src="{{ asset('js/machineStatus.js') }}" defer></script>
    <script src="{{ asset('js/machineDetail.js') }}" defer></script>
    <script src="{{ asset('js/chartsloss.js') }}" defer></script>
    <script src="{{ asset('js/gauge.js') }}" defer></script>
    <script src="{{ asset('js/database.js') }}" defer></script>
    <script src="{{ asset('js/outputTime.js') }}" defer></script>
    <script src="{{ asset('js/stopCategory.js') }}" defer></script>
    <script src="{{ asset('js/linechart.js') }}" defer></script>
    <script src="https://code.jquery.com/jquery-3.5.1.js"></script>
    <script src="https://cdn.datatables.net/1.10.21/js/jquery.dataTables.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/raphael/2.3.0/raphael.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-gauge@0.3.0/dist/chartjs-gauge.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/justgage@1.3.3/justgage.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-gauge@0.2.0"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-gauge@0.2.0"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-gauge"></script>
    <script src="https://bernii.github.io/gauge.js/dist/gauge.min.js"></script>
</head>
<body onload="fetchData();">
    <div class="dashboard">
        <div class="header">
            <h1>OEE Monitoring System</h1>
            <div class="date-time">
                <div class="date" id="date" ></div>
                <div class="time" id="time"></div>
            </div>
        </div>
        <div class="basic-info">
            <div class="machine-info">
                <div class="machine-title">
                    <div>Machine Information</div>
                </div>
                <div class="machine-detail">
                    <div id="line"></div>
                    <div id="linedesc"></div>
                    <div id="shift"></div>
                </div>
            </div>
            <div class="status-machine">
                <div class="label">Machine Status</div>
                <div class="value" id="machine-status">STOP</div>
            </div>
            <div class="trouble-info">
                <div class="label">Trouble Information</div>
                <div class="value" id="trouble-information">- - -</div>
            </div>
            </div>
        <div class="metrics">
            <div class="metric total-loading-time">
                <div class="label">Loading  Time</div>
                <div class="value" id="loading-time">0.0 min</div>
            </div>
            <div class="metric total-stop-time">
                <div class="label">Total Stop Time</div>
                <div class="value" id="total-stop-time">0.0 min</div>
            </div>
            <div class="metric total-operation-time">
                <div class="label">Operation Time</div>
                <div class="value" id="operation-time">0.0 min</div>
            </div>
        </div>
        <div class="gauge-container">
        <div class="gauge">
            <div class="gauge-title">Availability</div>
            <canvas id="availabilityGauge"></canvas>
        </div>
        <div class="gauge">
            <div class="gauge-title">Performance</div>
            <canvas id="performanceGauge"></canvas>
        </div>
        <div class="gauge">
            <div class="gauge-title">Quality</div>
            <canvas id="qualityGauge"></canvas>
        </div>
        <div class="gauge oee">
            <div class="gauge-title">OEE</div>
            <canvas id="OEEGauge"></canvas>
        </div>
    </div>
        <div class="summary">
            <div class="summary-stop">
                <h2>Stop Category</h2>

                <div class="summary-stop-detail">
                <div class="summary-stop-container">
                <div class="progress-bar-row">
                    <div class="progress-bar-label">Dandori</div>
                    <div class="progress-bar-group" id="dandori-bars"></div>
                    <div class="progress-bar-time" id="dandori-time">0.0 min</div>
                </div>
                <div class="progress-bar-row">
                    <div class="progress-bar-label">Others</div>
                    <div class="progress-bar-group" id="others-bars"></div>
                    <div class="progress-bar-time" id="others-time">0.0 min</div>
                </div>
                <div class="progress-bar-row">
                    <div class="progress-bar-label">Tool</div>
                    <div class="progress-bar-group" id="tool-bars"></div>
                    <div class="progress-bar-time" id="tool-time">0.0 min</div>
                </div>
                <div class="progress-bar-row">
                    <div class="progress-bar-label">Start_Up</div>
                    <div class="progress-bar-group" id="startup-bars"></div>
                    <div class="progress-bar-time" id="startup-time">0.0 min</div>
                </div>
                <div class="progress-bar-row">
                    <div class="progress-bar-label">Breakdown</div>
                    <div class="progress-bar-group" id="breakdown-bars"></div>
                    <div class="progress-bar-time" id="breakdown-time">0.0 min</div>
                </div>
             </div>
             </div>
            </div>

            <div class="summary-output">
                <div class="output-time">
                    <h2>Output Time</h2>
                    <table>
                        <tr>
                            <th>Type</th>
                            <th>Ideal Cycle</th>
                            <th>Quantity Total</th>
                            <th>Last Capture</th>
                            <th>Output Time Total</th>
                        </tr>
                        <tr>
                            <td id="summary-type">-</td>
                            <td id="summary-ideal">-</td>
                            <td id="summary-quantity">-</td>
                            <td id="summary-capture">-</td>
                            <td id="summary-time">-</td>
                        </tr>
                    </table>
                </div>
                <table id="data-table" class="display">
        <thead>
            <tr>
                <th>Line Produksi</th>
                <th>Nama Line</th>
                <th>Tgl Produksi</th>
                <th>Shift Produksi</th>
                <th>Tipe Barang</th>
                <th>Timestamp Capture</th>
            </tr>
        </thead>
        <tbody>
            <!-- Data will be inserted here by JavaScript -->
        </tbody>
    </table>

    <canvas id="lineChart"></canvas>
            </div>
            <div class="summary-oee-loss">
                <h2>OEE vs Loss</h2>
                <div class="oee-vs-loss">
                    <div class="oee-vs-loss-chart">
                        <canvas id="OEElossPieChart"></canvas>
                    </div>
                    <div class="oee-vs-loss-legend">
                        <table class="legend-detail">
                            <tr>
                                <th></th>
                                <th></th>
                                <th>Time</th>
                                <th>Percentage</th>
                            </tr>
                            <tr>
                                <td style="background-color: #2df726;"></td>
                                <td class="type">OEE</td>
                                <td>35 min</td>
                                <td>24%</td>
                            </tr>
                            <tr>
                                <td style="background-color: #ff4048;"></td>
                                <td class="type">Stop Loss</td>
                                <td>35 min</td>
                                <td>24%</td>
                            </tr>
                            <tr>
                                <td style="background-color: #ffe716;"></td>
                                <td class="type">Speed Loss</td>
                                <td>35 min</td>
                                <td>24%</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>