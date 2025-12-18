import Style from '../CardCourses/CardCourses.module.css';
import Card from '../Cards';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
ChartJS.register(ArcElement, Tooltip, Legend);
import { GiDiploma as Diploma } from "react-icons/gi";

function CardCourses() {

    const [corses, setCorses] = useState([]);

    useEffect(() => {

        fetch('http://localhost:5000/courses',
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

                setCorses(data);

            })
            .catch(error => {

                console.log(error);

            })

    }, [])

    return (

        <Card title={'Cursos e Formações'} url={'/edit/courses'}>

            {corses.length > 0 ? (

                <>
                
                    <ul className={Style.list}>

                        {corses?.map((course) => (

                            <li key={course.course}>{course.course}</li>

                        ))}

                    </ul>
                    <div>

                        <Doughnut
                            data={{

                                labels: corses?.map((course) => (course.label)),
                                datasets: [{

                                    label: 'Cursos Vendidos',
                                    data: corses?.map((course) => (course.sales)),
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

                </>

            ) : (

                <div className={Style.nenhumCurso}>

                    <Diploma />
                    <h3>Nenhum curso cadastrado</h3>

                </div>
            )}

        </Card>

    );

}

export default CardCourses;