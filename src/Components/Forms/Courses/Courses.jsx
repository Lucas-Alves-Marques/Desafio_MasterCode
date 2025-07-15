import Style from './Courses.module.css';
import ConteinerForm from '../Conteiner/ConteinerForm';
import Card from './Card/Card';
import { useDatabase } from '../../../DataBase/DataBase';
import { IoPencil as Pencil } from "react-icons/io5";
import { useState } from 'react';

function Courses() {

    const { dataBase, adicionarCurso, editarCurso, removerCurso } = useDatabase();

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

        setMessage('')

        removerCurso(course.id);

        newCourse(e);

    };

    const submitForm = (e) => {

        e.preventDefault();

        if (course.id == null) {

            adicionarCurso(course);

            setMessage('Curso Adicionado');

            newCourse(e);

        }

        else {

            editarCurso(course.id, course);

            setMessage('Curso Salvo');

            newCourse(e);


        }
        
    };

    return (

        <ConteinerForm title='Gerenciador de Cursos Vendidos'>

            <div className={Style.conteiner}>

                <h2>Cursos</h2>
                <div className={Style.Cards}>

                    {dataBase.courses.map((course) => (

                        <div className={Style.Card}>

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
                            value={course.course}
                            onChange={(e) => { handleCourse(e) }}
                            className={Style.inputService}
                        />

                    </div>
                    <div>

                        <p>Quantidade Vendida:</p>
                        <input
                            name='sales'
                            value={course.sales}
                            onChange={(e) => { handleCourse(e) }}
                            className={Style.alingText}
                        />

                    </div>
                    <div>

                        <p>Rótulo:</p>
                        <input
                            name='label'
                            value={course.label}
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