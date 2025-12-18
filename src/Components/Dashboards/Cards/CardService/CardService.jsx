import { useEffect, useState } from 'react';
import Style from '../CardService/CardService.module.css';
import Card from '../Cards';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { FaCode as Code } from "react-icons/fa";

ChartJS.register(ArcElement, Tooltip, Legend);

function CardService() {

    const [services, setServices] = useState([]);

    useEffect(() => {

        fetch('http://localhost:5000/services',
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

                setServices(data);

            })
            .catch(error => {

                console.error('Erro ao enviar dados:', error);

            });


    }, []);

    return (

        <Card title={'Serviços a Executar'} url={'/edit/services'}>

            {services.length == 0 ? (

                <div className={Style.nenhumServico}>

                    <Code />
                    <h3>Nenhum serviço cadastrado</h3>

                </div>

            ) : (

                <>

                    <ul className={Style.list}>

                        {services?.map((service) => (

                            <li key={service.name}>{service.name}</li>

                        ))}

                    </ul>
                    <div>

                        <Pie
                            data={{

                                labels: services?.map((service) => (service.label)),
                                datasets: [{

                                    label: 'Serviços',
                                    data: services?.map((service) => (service.quantity)),
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
                                            padding: 8,
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

                </>

            )}

        </Card>

    );

}

export default CardService;