import { useEffect, useState } from 'react';
import Style from '../CardEquipment/CardEquipment.module.css';
import Card from '../Cards';
import { Chart } from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

function CardEquipment({ dataEquipment }) {

    const [totalEquip, setTotalEquip] = useState(null);

    const [status, setStatus] = useState(null);

    useEffect(() => {

        const totalSum = dataEquipment?.reduce((acc, customer) => acc + customer.quantity, 0);

        setTotalEquip(totalSum);

        const stockStatus = dataEquipment?.reduce((stock, item) => {

            return item.quantity > stock.quantity ? item : stock;

        });

        setStatus(stockStatus?.category);

    }, [dataEquipment])

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
                            data: dataEquipment?.map((equip) => (equip.quantity)),
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