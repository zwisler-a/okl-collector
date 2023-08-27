(async () => {
    const data = await fetch('/data-adjusted').then(r => r.json());
    console.log(data);

    const ctx = document.getElementById('myChart');


    const devices = Object.keys(data);
    const cData = {
        datasets: devices.map(device => ({
            label: device,
            data: data[device].map(d => ({x: d.t, y: d.v})),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        })),
    };


    const config = {
        type: 'line',
        data: cData,
        options: {
            spanGaps: 1000 * 60 * 60,
            responsive: true,
            interaction: {
                mode: 'nearest',
            },
            plugins: {
                title: {
                    text: 'Sensor Data',
                    display: true
                }
            },
            scales: {
                x: {
                    type: 'time',
                    time: {
                        tooltipFormat: 'dd.MM.yy - HH:mm'
                    },
                    title: {
                        display: true,
                        text: 'Date'
                    },
                    ticks: {
                        autoSkip: false,
                        major: {
                            enabled: true
                        },
                        font: function(context) {
                            if (context.tick && context.tick.major) {
                                return {
                                    weight: 'bold',
                                };
                            }
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Moisture in %'
                    }
                }
            },
        },
    };

    console.log(config)
    new Chart(ctx, config);

})();