import Style from './User.module.css';
import { IoPencil as Pencil } from "react-icons/io5";
import { IoEyeSharp as Eyes } from "react-icons/io5";
import { FaEyeSlash as EyesClosed } from "react-icons/fa";
import Card from './Card/Card';
import { useEffect, useState } from 'react';
import ConteinerForm from '../Conteiner/ConteinerForm';

function User() {

    const [users, setUsers] = useState();

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

    const clearUser = (e) => {

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

        try {

            if (user.name == '' || user.password == '') {

                setMessage('Preencha todos os campos');

                return;

            };

            if (user.id == null) {

                const newUser = { ...user, id: users?.length + 1 };

                if (!newUser.quantityCourses || newUser.quantityCourses.trim() == '') {

                    newUser.quantityCourses = 0;

                };

                if (!newUser.shopping || newUser.shopping.trim() == '') {

                    newUser.shopping = 0;

                };

                fetch('http://localhost:5000/users', {

                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newUser),
                })
                    .then((res) => res.json())
                    .then(() => {

                        setMessage('Usuário Cadastrado');

                    })
                    .catch((err) => console.log(err))


            }

            else {

                if (!user.quantityCourses || user.quantityCourses.trim() == '') {

                    user.quantityCourses = 0;

                };

                if (!user.shopping || user.shopping.trim() == '') {

                    user.shopping = 0;

                };

                fetch(`http://localhost:5000/users/${String(user.id)}`, {

                    method: 'PUT',
                    headers: {

                        'Content-Type': 'application/json',

                    },
                    body: JSON.stringify(user)
                })
                    .then((res) => {

                        if (!res.ok) {
                            throw new Error(`${res.status} => ${res.statusText}`);
                        }


                        return res.json()
                    })
                    .then(() => {

                        setMessage('Usuário Salvo');

                    })
                    .catch((err) => console.log(err))

                // editarUsuario(user.id, user);

            };

            clearUser(e);

        } catch (error) {

            console.log(error)

            setMessage('Erro ao salvar usuário');
        }


    };

    const confirmDel = (e) => {

        e.preventDefault();

        setMessage('Deseja exluir o usuário selecionado?');

    };

    const deleteUser = (e) => {

        e.preventDefault();

        if(users.length == 1 ) {

          setMessage('É necessário ter pelo menos um usuário cadastrado')   

          return;
          
        }

        try {

            fetch(`http://localhost:5000/users/${String(user.id)}`, {

                method: 'DELETE',
                headers: {

                    'Content-Type': 'application/json',

                },
            })
                .then((res) => {

                    if (!res.ok) {
                        throw new Error(`${res.status} => ${res.statusText}`);
                    }


                    return res.json()
                })
                .then(() => {

                    setMessage('Usuário excluído');

                })
                .catch((err) => console.log(err))

            clearUser(e);

        } catch (error) {

            console.log(error)

            setMessage('Erro ao excluir usuário');

        }

    };

    useEffect(() => {

        fetch('http://localhost:5000/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {

                setUsers(data)

            }).catch((err) => {

                console.log(err)

            })

    }, [user])

    return (

        <ConteinerForm title='Gerenciador de Usuários'>

            <div className={Style.conteiner}>

                <h2>Usuários</h2>
                <div className={Style.Cards}>

                    {users?.map((user) => (

                        <div className={Style.Card} key={user.id}>

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
                            value={user.name || ''}
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
                            value={user.password || ''}
                            onChange={(e) => { handleUser(e) }}
                        />

                    </div>
                    <div>

                        <p>Cursos Comprados:</p>
                        <input
                            name='quantityCourses'
                            placeholder='1'
                            value={user.quantityCourses || ''}
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
                            value={user.shopping || ''}
                            onChange={(e) => { handleUser(e) }}
                        />

                    </div>

                </div>
                {message &&

                    <div className={Style.message}>

                        <p>{message}</p>

                        {message == 'Deseja exluir o usuário selecionado?' ?

                            <div>

                                <button onClick={(e) => { deleteUser(e) }}>Sim</button>
                                <button onClick={() => { setMessage('') }}>Não</button>

                            </div>

                            :

                            <button onClick={() => { setMessage('') }}>OK</button>

                        }


                    </div>

                }
                <div className={Style.btns}>

                    {user.id &&

                        <button onClick={(e) => { clearUser(e) }}>Novo Usuário</button>

                    }

                    <button type='submit'>Salvar</button>

                    {user.id && <button onClick={(e) => { confirmDel(e) }}>Excluir</button>}

                </div>

            </form>

        </ConteinerForm>

    );

}

export default User;