import Style from './User.module.css';
import { useNavigate } from 'react-router-dom';
import { useDatabase } from '../../../DataBase/DataBase';
import { IoMdArrowRoundBack as Return } from "react-icons/io";
import { IoPencil as Pencil } from "react-icons/io5";
import { IoEyeSharp as Eyes } from "react-icons/io5";
import { FaEyeSlash as EyesClosed } from "react-icons/fa";
import Card from './Card/Card';
import MatrixEffect from '../../Login/Background/MatrixEffect';
import { useState } from 'react';
import ConteinerForm from '../Conteiner/ConteinerForm';

function User() {

    const navigate = useNavigate();

    const { dataBase, adicionarUsuario, editarUsuario, removerUsuario } = useDatabase();

    const [user, setUser] = useState({

        id: null,
        name: null,
        password: null,
        quantityCourses: null,
        shopping: null

    });

    const [typePassword, setTypePassword] = useState('password');

    const [message, setMessage] = useState('');

    const handleUser = (e) => {

        setUser(prev => ({

            ...prev,

            [e.target.name]: e.target.value

        }));

    };

    const newUser = (e) => {

        e.preventDefault();

        setUser({

            id: null,
            name: '',
            password: '',
            quantityCourses: 0,
            shopping: 0

        });

    };

    const handlePassword = () => {

        if (typePassword == 'password') {

            setTypePassword('text')
        }

        else {
            setTypePassword('password')

        };

    };

    const submitForm = (e) => {

        e.preventDefault();

        if (user.id == null) {


            adicionarUsuario(user);

        }

        else {

            editarUsuario(user.id, user);
        }
    };

    const confirmDel = (e) => {

        e.preventDefault();

        setMessage('Deseja exluir o usuário selecionado?');

    };

    const deleteUser = (e) => {

        e.preventDefault();

        setMessage('')

        removerUsuario(user.id);

        newUser(e);

    };

    return (

        <ConteinerForm title='Gerenciador de Usuários'>

            <div className={Style.conteiner}>

                <h2>Usuários</h2>
                <div className={Style.Cards}>

                    {dataBase.users.map((user) => (

                        <div className={Style.Card}>

                            <Card user={user} />
                            <Pencil className={Style.pencil} onClick={() => { setUser(user) }} />

                        </div>

                    ))
                    }
                </div>

            </div>
            <form onSubmit={submitForm} className={Style.form}>

                <div className={Style.inputs}>

                    <h2>Dados do Usuário</h2>
                    <div>

                        <p>Nome:</p>
                        <input
                            name='name'
                            placeholder='Usuário1'
                            value={user.name}
                            onChange={(e) => { handleUser(e) }}
                        />

                    </div>
                    <div>

                        <p>Senha:</p>
                        {typePassword == 'text'

                            ? <Eyes onClick={() => { handlePassword() }} />
                            : <EyesClosed onClick={() => { handlePassword() }} />

                        }

                        <input
                            name='password'
                            type={typePassword}
                            value={user.password}
                            onChange={(e) => { handleUser(e) }}
                        />

                    </div>
                    <div>

                        <p>Cursos Comprados:</p>
                        <input
                            name='quantityCourses'
                            placeholder='1'
                            value={user.quantityCourses}
                            className={Style.alingText}
                            onChange={(e) => { handleUser(e) }}
                        />

                    </div>
                    <div>

                        <p>Componentes Comprados:</p>
                        <input
                            name='shopping'
                            placeholder='1'
                            className={Style.alingText}
                            value={user.shopping}
                            onChange={(e) => { handleUser(e) }}
                        />

                    </div>

                </div>
                {message &&

                    <div className={Style.message}>

                        <p>{message}</p>
                        <div>

                            <button onClick={(e) => { deleteUser(e) }}>Sim</button>
                            <button onClick={() => { setMessage('') }}>Não</button>

                        </div>

                    </div>

                }
                <div className={Style.btns}>

                    {user.id &&

                        <button onClick={(e) => { newUser(e) }}>Novo Usuário</button>

                    }

                    <button type='submit'>Salvar</button>

                    {user.id && <button onClick={(e) => { confirmDel(e) }}>Excluir</button>}

                </div>

            </form>

        </ConteinerForm>

    );

}

export default User;