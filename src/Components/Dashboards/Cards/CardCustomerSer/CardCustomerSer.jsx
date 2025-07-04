import { useEffect, useState } from 'react';
import Style from '../CardCustomerSer/CardCustomerSer.module.css';
import Card from '../Cards';
import { Chart } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

function CardCustomerSer({ dataCustomer }) {

    const [totalService, setTotalService] = useState(null);

    useEffect(() => {

        const totalSum = dataCustomer?.reduce((acc, customer) => acc + customer.response, 0);

        setTotalService(totalSum);

        console.log(totalSum)

    }, [dataCustomer]);

    return (

        <Card title={'Nível de Atendimento'}>

            <ul className={Style.list}>

                <li>Atendimentos Concluídos: {totalService}</li>

            </ul>
            <div>

                <Bar
                    data={{

                        labels: ['Satisfeitos', 'A melhorar', 'Insatisfeitos'],
                        datasets: [{

                            label: 'Respostas',
                            data: dataCustomer?.map((customer) => (customer.response)),
                            backgroundColor: [

                                'rgb(0, 200, 0)',
                                'rgb(230, 247, 0)',
                                'rgb(200, 0, 0)',

                            ],
                            barThickness: 50,
                        }]
                    }}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false, 
                        layout: {
                            padding: 10 
                        },
                        scales: {
                            x: {
                                ticks: {
                                    maxRotation: 0,
                                    minRotation: 0,
                                    autoSkip: true,
                                },
                                grid: {
                                    display: false
                                }
                            },
                            y: {
                                ticks: {
                                    padding: 8,
                                    font: {
                                        size: 12
                                    }
                                },
                                grid: {
                                    drawBorder: false
                                }
                            }
                        },
                        plugins: {
                            legend: {
                                display: false
                            }
                        }
                    }}

                />

            </div>

        </Card>

    );

}

export default CardCustomerSer;