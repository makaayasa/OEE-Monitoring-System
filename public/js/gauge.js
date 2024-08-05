document.addEventListener('DOMContentLoaded', function() {
    var gauges = {};

    function createGauge(id, value, colorZones) {
        var opts = {
            angle: 0,
            lineWidth: 0.2,
            radiusScale: 0.9,
            pointer: {
                length: 0.6,
                strokeWidth: 0.035,
                color: '#000000'
            },
            limitMax: false,
            limitMin: false,
            colorStart: '#6FADCF',
            colorStop: '#8FC0DA',
            strokeColor: '#E0E0E0',
            generateGradient: true,
            highDpiSupport: true,
            staticZones: colorZones,
            staticLabels: {
                font: "10px sans-serif",
                labels: [0, 40, 60, 100],
                color: "#ffffff",
                fractionDigits: 0
            }
        };
        var target = document.getElementById(id);
        var gauge = new Gauge(target).setOptions(opts);
        gauge.maxValue = 100;
        gauge.setMinValue(0);
        gauge.animationSpeed = 32;
        gauge.set(value);

        // Store the gauge in the gauges object
        gauges[id] = gauge;

        var valueDisplay = document.createElement('div');
        valueDisplay.id = id + '-value';
        valueDisplay.className = 'gauge-value';
        valueDisplay.textContent = value.toFixed(2) + '%';
        target.parentNode.insertBefore(valueDisplay, target);
    }

    function updateGauge(id, value) {
        var gauge = gauges[id];
        if (gauge) {
            gauge.set(value);
            document.getElementById(id + '-value').textContent = value.toFixed(2) + '%';
        }
    }

    createGauge("OEEGauge", 100, [
        {strokeStyle: "#ff4048", min: 0, max: 39.99},
        {strokeStyle: "#ffe716", min: 40, max: 59.99},
        {strokeStyle: "#2df726", min: 60, max: 100}
    ]);

    createGauge("availabilityGauge", 70, [
        {strokeStyle: "#ff4048", min: 0, max: 39.99},
        {strokeStyle: "#ffe716", min: 40, max: 59.99},
        {strokeStyle: "#2df726", min: 60, max: 100}
    ]);

    createGauge("performanceGauge", 20, [
        {strokeStyle: "#ff4048", min: 0, max: 39.99},
        {strokeStyle: "#ffe716", min: 40, max: 59.99},
        {strokeStyle: "#2df726", min: 60, max: 100}
    ]);

    createGauge("qualityGauge", 30, [
        {strokeStyle: "#ff4048", min: 0, max: 39.99},
        {strokeStyle: "#ffe716", min: 40, max: 59.99},
        {strokeStyle: "#2df726", min: 60, max: 100}
    ]);

    setInterval(() => {
        // Example: dynamically update the availability gauge value
        const operationTime = Math.random() * 100; // Example dynamic value
        const loadingTime = 100; // Example value
        const availability = (operationTime / loadingTime) * 100;
        updateGauge("availabilityGauge", availability);

        // Update performance gauge
        const performance = Math.random() * 100; // Example dynamic value
        updateGauge("performanceGauge", performance);

        // Update quality gauge
        const quality = Math.random() * 100; // Example dynamic value
        updateGauge("qualityGauge", quality);

        // Update OEE gauge (Example: OEE = (Availability * Performance * Quality) / 10000)
        const OEE = (availability * performance * quality) / 10000;
        updateGauge("OEEGauge", OEE);
    }, 1000);
});