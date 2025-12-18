import Style from './Courses.module.css';
import ConteinerForm from '../Conteiner/ConteinerForm';
import Card from './Card/Card';
import { IoPencil as Pencil } from "react-icons/io5";
import { useEffect, useState } from 'react';
import { GiDiploma as Diploma } from "react-icons/gi";

function Courses() {

    const [courses, setCourses] = useState();

    const [course, setCourse] = useState({

        id: null,
        course: null,
        sales: null,
        label: null

    });

    const [message, setMessage] = useState('');

    const handleCourse = (e) => {

        setCourse(prev => ({

            ...prev,

            [e.target.name]: e.target.value

        }));

    };

    const newCourse = (e) => {

        e.preventDefault();

        setCourse({

            id: null,
            course: '',
            sales: 0,
            label: ''


        });

    };

    const confirmDel = (e) => {

        e.preventDefault();

        setMessage('Deseja exluir o curso selecionado?');

    };

    const deleteService = (e) => {

        e.preventDefault();

        fetch(`http://localhost:5000/courses/${course.id}`, {

            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(() => {
                setMessage('Curso Excluído');
                newCourse(e);
            })
            .catch(error => {
                setMessage('Erro ao excluir curso');
                console.error('Erro ao excluir curso:', error);
            });

    };

    const submitForm = (e) => {

        e.preventDefault();

        if (course.id == null) {

            const updateCourse = { ...course, id: String(courses.length + 1) }

            fetch('http://localhost:5000/courses', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateCourse)
            })
                .then(response => response.json())
                .then(() => {
                    setMessage('Curso Adicionado');
                    newCourse(e);

                })
                .catch(error => {
                    setMessage('Erro ao adicionar curso');
                    console.error('Erro ao adicionar curso:', error);
                });

        }

        else {


            fetch(`http://localhost:5000/courses/${course.id}`, {

                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(course)
            })
                .then(response => response.json())
                .then(() => {
                    setMessage('Curso Salvo');
                    newCourse(e);

                })
                .catch(error => {
                    setMessage('Erro ao salvar curso');
                    console.error('Erro ao salvar curso:', error);
                });

        }

    };

    useEffect(() => {

        fetch('http://localhost:5000/courses', {

            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setCourses(data);
            })
            .catch(error => {
                console.error('Erro ao buscar cursos:', error);
            });


    }, [course])

    return (

        <ConteinerForm title='Gerenciador de Cursos Vendidos'>

            <div className={Style.conteiner}>

                <h2>Cursos</h2>
                <div className={Style.Cards}>

                    {courses?.length == 0 ?

                        <div className={Style.nenhumCurso}>

                            <Diploma />
                            <h3>Nenhum curso cadastrado</h3>

                        </div>

                        :

                        courses?.map((course) => (

                            <div className={Style.Card} key={course.id}>

                                <Card course={course} />
                                <Pencil className={Style.pencil} onClick={() => { setCourse(course) }} />

                            </div>

                        ))

                    }

                </div>

            </div>
            <form className={Style.form} onSubmit={submitForm}>

                <div className={Style.inputs}>

                    <h2>Dados do Curso</h2>
                    <div>

                        <p>Curso:</p>
                        <input
                            name='course'
                            value={course.course || ''}
                            onChange={(e) => { handleCourse(e) }}
                            className={Style.inputService}
                        />

                    </div>
                    <div>

                        <p>Vendas:</p>
                        <input
                            name='sales'
                            value={course.sales || ''}
                            onChange={(e) => { handleCourse(e) }}
                            className={Style.alingText}
                        />

                    </div>
                    <div>

                        <p>Rótulo:</p>
                        <input
                            name='label'
                            value={course.label || ''}
                            onChange={(e) => { handleCourse(e) }}
                            className={Style.alingText}

                        />

                    </div>

                </div>
                {message &&

                    <div className={Style.message}>

                        <p>{message}</p>

                        {message == 'Deseja exluir o curso selecionado?' ?

                            <div>

                                <button onClick={(e) => { deleteService(e) }}>Sim</button>
                                <button onClick={() => { setMessage('') }}>Não</button>

                            </div>

                            :

                            <div>

                                <button onClick={() => { setMessage('') }}>OK</button>

                            </div>

                        }


                    </div>

                }
                <div className={Style.btns}>

                    {course.id &&

                        <button onClick={(e) => { newCourse(e) }}>Novo Curso</button>

                    }

                    <button type='submit'>Salvar</button>

                    {course.id &&

                        <button onClick={(e) => { confirmDel(e) }}>Excluir</button>

                    }

                </div>

            </form>

        </ConteinerForm>

    )

};

export default Courses;