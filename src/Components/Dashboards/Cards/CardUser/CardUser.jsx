import { useEffect, useState } from 'react';
import Style from '../CardUser/CardUser.module.css';
import Card from '../Cards';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function CardUser() {

    const [typeUser, setTypeUser] = useState({

        totalUser: null,
        students: null,
        buyers: null,
        studentBuyers: null,
        visitors: null

    });

    useEffect(() => {

        fetch('http://localhost:5000/users',
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

                const studentUsers = data?.filter((user) => (user.quantityCourses > 0 && user.shopping == 0));

                const buyersUsers = data?.filter((user) => (user.shopping > 0 && user.quantityCourses == 0));

                const studentBuyersUsers = data?.filter((user) => (user.shopping > 0 && user.quantityCourses > 0));

                const visitorsUsers = data?.filter((user) => (user.shopping == 0 && user.quantityCourses == 0));

                const totalUsers = data?.length;

                setTypeUser(prev => ({

                    ...prev,

                    totalUser: totalUsers,
                    students: studentUsers?.length,
                    buyers: buyersUsers?.length,
                    studentBuyers: studentBuyersUsers?.length,
                    visitors: visitorsUsers?.length,

                }));

            })




    }, [])

    return (

        <Card title={'Tipos de Usuários'} url={'/edit/users'}>

            <ul className={Style.list}>

                <li>Total de Usuários: {typeUser.totalUser}</li>

            </ul>
            <div>

                <Doughnut
                    data={{

                        labels: ['Estudantes', 'Compradores', 'Ambos', 'Visitantes'],
                        datasets: [{

                            label: 'Usuários',
                            data: [typeUser.students, typeUser.buyers, typeUser.studentBuyers, typeUser.visitors],
                            backgroundColor: [

                                'rgb(0, 200, 0)',
                                'rgb(0, 160, 0)',
                                'rgb(0, 120, 0)',
                                'rgb(0, 80, 0)',
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

export default CardUser;