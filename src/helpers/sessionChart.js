export const sessionChartOptions = () => {
    return {
        legend: {
            position: 'bottom'
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero:false,
                        max: 5,
                        stepSize: .25
                    }
                }
            ]
        }
    }
};

export const formatDataForChart = (chartData) => {
    console.log(chartData)

    let chartLabels = [];
    let sad_confidence = [];
    let surprised_confidence = [];
    let happy_confidence = [];
    let disgusted_confidence = [];
    let angry_confidence = [];
    let calm_confidence = [];
    let confused_confidence = [];

    chartData
        .sort((a, b) =>  a.View - b.View)
        // eslint-disable-next-line
        .map((item,index)=>{
            chartLabels.push(`View ${item.View}`);
            sad_confidence.push(item.sad_confidence);
            surprised_confidence.push(item.surprised_confidence);
            happy_confidence.push(item.happy_confidence);
            disgusted_confidence.push(item.disgusted_confidence);
            angry_confidence.push(item.angry_confidence);
            calm_confidence.push(item.calm_confidence);
            confused_confidence.push(item.confused_confidence);
        });

    const data = {
        labels: chartLabels,
        datasets: [
            {
                label: 'Sad',
                fill: false,
                data: sad_confidence,
                backgroundColor: '#332288',
                borderColor: '#332288'
            },
            {
                label: 'Surprised',
                fill: false,
                data: surprised_confidence,
                backgroundColor: '#88ccee',
                borderColor: '#88ccee'
            },
            {
                label: 'Happy',
                fill: false,
                data: happy_confidence,
                backgroundColor: '#44aa99',
                borderColor: '#44aa99'
            },
            {
                label: 'Disgusted',
                fill: false,
                data: disgusted_confidence,
                backgroundColor: '#117733',
                borderColor: '#117733'
            },
            {
                label: 'Angry',
                fill: false,
                data: angry_confidence,
                backgroundColor: '#999933',
                borderColor: '#999933'
            },
            {
                label: 'Calm',
                fill: false,
                data: calm_confidence,
                backgroundColor: '#ddcc77',
                borderColor: '#ddcc77'
            },
            {
                label: 'Confused',
                fill: false,
                data: confused_confidence,
                backgroundColor: '#882255',
                borderColor: '#882255'
            },
            {
                label: '',
                fill: false,
                data: [],
                backgroundColor: '#aa4499',
                borderColor: '#aa4499'
            }
        ]
    };

    return data;
};