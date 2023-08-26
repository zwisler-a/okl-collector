(async () => {
    const data = await fetch('/data').then(r => r.json());
    console.log(data);

    const ctx = document.getElementById('myChart');

    const devices = Object.keys(data);
    const timestamps = Object.keys(data).flatMap(k => data[k]).map(values => values.t);
    const cData = {
        labels: [...new Set(timestamps)].map(t => new Date(t).toLocaleTimeString()),
        datasets: devices.map(device => ({
            label: device,
            data: data[device].map(d => d.v),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        })),
    };

    new Chart(ctx, {
        type: 'line',
        data: cData
    });

})();