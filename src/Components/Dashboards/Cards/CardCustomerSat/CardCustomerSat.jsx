import { useEffect, useState } from 'react';
import Style from '../CardCustomerSat/CardCustomerSat.module.css';
import Card from '../Cards';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

function CardCustomerSat() {

    const [dataCustomer, setDataCustomer] = useState(null);

    const [satisfaction, setSatisfation] = useState([]);

    useEffect(() => {

        fetch('http://localhost:5000/satisfaction',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao enviar dados');
                }
                return response.json();
            })
            .then(data => {

                const totalSum = data?.reduce((acc, customer) => acc + customer.response, 0);

                const results = data?.map((cust) => {

                    const percentage = (parseFloat(cust.response) / totalSum) * 100;

                    return isNaN(percentage) ? 0 : percentage.toFixed(2);

                });

                setSatisfation(results);

                setDataCustomer(data);

            })
            .catch(error => {

                console.log(error);

            })

    }, []);

    return (

        <Card title={'Gestão de Satisfação do Cliente'} url='/edit/customersat'>

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