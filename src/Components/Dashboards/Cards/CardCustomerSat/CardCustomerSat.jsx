import { useEffect, useState } from 'react';
import Style from '../CardCustomerSat/CardCustomerSat.module.css';
import Card from '../Cards';
import { Chart } from 'chart.js/auto';
import { Pie } from 'react-chartjs-2';

function CardCustomerSat({ dataCustomer }) {

    const [satisfaction, setSatisfation] = useState([]);

    useEffect(() => {

        const totalSum = dataCustomer?.reduce((acc, customer) => acc + customer.response, 0);

        const results = dataCustomer?.map((cust) => {

            const percentage = (parseFloat(cust.response) / totalSum) * 100;

            return percentage.toFixed(2);

        });

        setSatisfation(results);

    }, [dataCustomer]);

    return (

        <Card title={'Gestão de Satisfação do Cliente'}>

            <ul className={Style.list}>

                {dataCustomer?.map((Satisfaction, index) => {

                    if (satisfaction && satisfaction.length == 3) {

                        return (

                            <li key={Satisfaction.category}>

                                {Satisfaction.category}: {satisfaction[index]}%

                            </li>

                        )

                    }


                })}

            </ul>
            <div>

                <Pie
                    data={{

                        labels: ['Satisfeitos', 'Neutros', 'Insatisfeitos'],
                        datasets: [{

                            label: 'Respostas',
                            data: dataCustomer?.map((customer) => (customer.response)),
                            backgroundColor: [

                                'rgb(0, 200, 0)',
                                'rgb(230, 247, 0)',
                                'rgb(200, 0, 0)',

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

export default CardCustomerSat;