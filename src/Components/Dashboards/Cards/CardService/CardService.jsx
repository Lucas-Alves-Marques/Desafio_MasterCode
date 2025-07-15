import Style from '../CardService/CardService.module.css';
import Card from '../Cards';
import { Chart } from 'chart.js/auto';
import { Pie } from 'react-chartjs-2';

function CardService({ dataService }) {

    return (

        <Card title={'Serviços a Executar'} url={'/edit/services'}>

            <ul className={Style.list}>

                {dataService?.map((service) => (

                    <li key={service.name}>{service.name}</li>

                ))}

            </ul>
            <div>

                <Pie
                    data={{

                        labels: dataService?.map((service) => (service.label)),
                        datasets: [{

                            label: 'Serviços',
                            data: dataService?.map((service) => (service.quantity)),
                            backgroundColor: [
                                
                                'rgb(0, 200, 0)',
                                'rgb(0, 160, 0)',
                                'rgb(0, 120, 0)',
                            ],
                        }]
                    }}
                    options={{
                        plugins: {
                            legend: {
                                position: 'top',
                                labels: {
                                    align: 'center',
                                    font: {
                                        size: 12,
                                    },
                                    padding: 10,
                                    color: 'rgb(0, 247, 0)'
                                }
                            },
                            tooltip: {
                                enabled: true,
                                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                               titleFont: { size: 13 },
                                bodyFont: { size: 12 },
                            }
                            
                        },

                        responsive: true,
                        maintainAspectRatio: false
                    }}

                />

            </div>

        </Card>

    );

}

export default CardService;