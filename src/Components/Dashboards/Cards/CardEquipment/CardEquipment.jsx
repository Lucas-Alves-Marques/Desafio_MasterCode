import { useEffect, useState } from 'react';
import Style from '../CardEquipment/CardEquipment.module.css';
import Card from '../Cards';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function CardEquipment() {

    const [equipments, setEquipments] = useState(null);

    const [totalEquip, setTotalEquip] = useState(null);

    const [status, setStatus] = useState(null);

    useEffect(() => {

        fetch('http://localhost:5000/equipment',
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

                setEquipments(data);

                const totalSum = data?.reduce((acc, customer) => acc + customer.quantity, 0);

                setTotalEquip(totalSum);

                const stockStatus = data?.reduce((stock, item) => {

                    return item.quantity > stock.quantity ? item : stock;

                });

                setStatus(stockStatus?.category);

            })
            .catch(error => {

                console.log(error);

            })

    }, [])

    return (

        <Card title={'Quantidade de Equip.'} url={'/edit/stockquant'}>

            <ul className={Style.list}>

                <li>Total de Equipamentos: {totalEquip}</li>
                <li>Estoque: {status}</li>

            </ul>
            <div>

                <Doughnut
                    data={{

                        labels: ['Carente', 'Moderado', 'Abastecido'],
                        datasets: [{

                            label: 'Quantidade',
                            data: equipments?.map((equip) => (equip.quantity)),
                            backgroundColor: [

                                'rgb(200, 0, 0)',
                                'rgb(230, 247, 0)',
                                'rgb(0, 200, 0)',

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

export default CardEquipment;