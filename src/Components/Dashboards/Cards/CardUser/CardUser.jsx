import { useEffect, useState } from 'react';
import Style from '../CardUser/CardUser.module.css';
import Card from '../Cards';
import { Chart } from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

function CardUser({ dataUser }) {

    const [typeUser, setTypeUser] = useState({

        totalUser: null,
        students: null,
        buyers: null,
        studentBuyers: null,
        visitors: null

    });

    useEffect(() => {

       const studentUsers = dataUser?.filter((user) => (user.quantityCourses > 0 && user.shopping == 0 ));

       const buyersUsers = dataUser?.filter((user) => (user.shopping > 0 && user.quantityCourses == 0));

       const studentBuyersUsers = dataUser?.filter((user) => (user.shopping > 0 && user.quantityCourses > 0));

       const visitorsUsers = dataUser?.filter((user) => (user.shopping == 0 && user.quantityCourses == 0));

       const totalUsers = dataUser?.length;

       setTypeUser(prev => ({

        ...prev,

        totalUser: totalUsers,
        students: studentUsers?.length,
        buyers: buyersUsers?.length,
        studentBuyers: studentBuyersUsers?.length,
        visitors: visitorsUsers?.length,

       }));


    }, [dataUser])

    return (

        <Card title={'Tipos de Usuários'} url={'/edit/users'}>

            <ul className={Style.list}>

                    <li>Total de Usuários: {typeUser.totalUser}</li>

            </ul>
            <div>

                <Doughnut
                    data={{

                        labels: ['Estudantes', 'Compradores', 'Ambos','Visitantes'],
                        datasets: [{

                            label: 'Usuários',
                            data: [typeUser.students, typeUser.buyers, typeUser.studentBuyers,typeUser.visitors],
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