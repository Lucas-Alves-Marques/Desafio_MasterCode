import Style from '../CardCourses/CardCourses.module.css';
import Card from '../Cards';
import { Chart } from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

function CardCourses({ dataCorses }) {

    return (

        <Card title={'Cursos e Formações'}>

            <ul className={Style.list}>

                {dataCorses?.map((course) => (

                    <li key={course.course}>{course.course}</li>

                ))}

            </ul>
            <div>

                <Doughnut
                    data={{

                        labels: ['Full Stack', 'Frontend', 'Backend', 'UX/UI'],
                        datasets: [{

                            label: 'Cursos Vendidos',
                            data: dataCorses?.map((course) => (course.sales)),
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

export default CardCourses;