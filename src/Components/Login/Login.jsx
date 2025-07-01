import { useNavigate } from 'react-router-dom';
import Style from './Login.module.css';
import { useState } from 'react';
import MatrixEffect from './Background/MatrixEffect';

function Login() {

    const [userForm, setUserForm] = useState({

        name: null,
        password: null

    });

    const [message, setMessage] = useState(null);

    const Navigate = useNavigate();

    const handleUser = (e) => {

        setUserForm(prev => ({

            ...prev,

            [e.target.name]: e.target.value

        }));
    };

    const loginValidation = (e) => {

        //Simulação de validação no Banco de Dados

        e.preventDefault();

        fetch('../../../public/Database.json')
            .then(response => response.json())
            .then(data => {

                const userLogin = data.usuarios.filter((user) => {

                    if (userForm.name == user.name && userForm.password == user.password) {

                        return user
                    }

                });

                if (userLogin.length > 0) {

                    console.log('Foi')

                    Navigate('/main')
                }

                else {

                    setMessage('Usuario não cadastrado')
                    // console.log(userLogin)

                };

            }).catch(error => console.error('Erro ao carregar JSON:', error));


        //Mandando para o back-end

        // fetch('API', {

        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(userForm),
        // })
        //     .then(response => {

        //         if (!response.ok) {

        //             throw new Error('Erro ao enviar dados');
        //         }

        //         return response.json();
        //     })
        //     .then(data => {

        //         console.log('Resposta do servidor:', data);

        //     })
        //     .catch(error => {

        //         console.error('Erro na requisição:', error);

        //     });

    };

    return (

        <>
            <MatrixEffect />
            <div className={Style.body}>

                <form className={Style.formLogin} onSubmit={loginValidation}>

                    <h1>MASTER<span>CODE</span></h1>
                    <input
                        name='name'
                        placeholder='Usuário'
                        onChange={(e) => { handleUser(e) }}
                    />
                    <input
                        name='password'
                        placeholder='Senha'
                        type='password'
                        onChange={(e) => { handleUser(e) }}
                    />
                    <button type='submit'>Entrar</button>

                </form>

                <p className={Style.copyRigth}>© 2025 MasterCode. Todos os direitos reservados.</p>

                {message &&

                    <div className={Style.message}>

                        <p>{message}</p>
                        <button onClick={(e) => { e.preventDefault(); setMessage(null) }}>OK</button>

                    </div>

                }


            </div>

        </>

    );
}

export default Login;