import Style from './Services.module.css';
import ConteinerForm from '../Conteiner/ConteinerForm';
import Card from './Card/Card';
import { IoPencil as Pencil } from "react-icons/io5";
import { useEffect, useState } from 'react';
import { FaCode as Code } from "react-icons/fa";

function Service() {

    const [services, setServices] = useState();

    const [service, setService] = useState({

        id: null,
        name: null,
        quantity: null,
        label: null

    });

    const [message, setMessage] = useState('');

    const handleService = (e) => {

        setService(prev => ({

            ...prev,

            [e.target.name]: e.target.value

        }));

    };

    const newService = (e) => {

        e.preventDefault();

        setService({

            id: null,
            name: '',
            quantity: 0,
            label: ''


        });

    };

    const confirmDel = (e) => {

        e.preventDefault();

        setMessage('Deseja exluir o serviço selecionado?');

    };

    const deleteService = (e) => {

        e.preventDefault();

        setMessage('')

        fetch(`http://localhost:5000/services/${String(service.id)}`, {

            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(() => {

                setMessage('Serviço Excluído');
                newService(e);

            })
            .catch(error => {
                console.error('Erro ao buscar serviços:', error);
                setMessage('Erro ao excluir serviço');

            });

    };

    const submitForm = (e) => {

        e.preventDefault();

        if (!service.quantity && service.quantity == null) {

            setMessage('Preencha a quantidade');

            return
        }

        if (!service.label && service.label == null) {

            setMessage('Preencha o nome do serviço');

            return
        }

        if (!service.name && service.name == null) {

            setMessage('Preencha a descrição do serviço');

            return;
        }

        if (service.id == null) {

            const updateService = { ...service, id: String(services.length + 1) };

            fetch('http://localhost:5000/services', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateService)
            })
                .then(response => response.json())
                .then(() => {

                    setMessage('Serviço Cadastrado');
                    newService(e);

                })
                .catch(error => {
                    console.error('Erro ao buscar serviços:', error);
                    setMessage('Erro ao cadastrar serviço');

                });

        }

        else {

            fetch(`http://localhost:5000/services/${String(service.id)}`, {

                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(service)
            })
                .then(response => response.json())
                .then(() => {

                    setMessage('Serviço Salvo');
                    newService(e);

                })
                .catch(error => {
                    console.error('Erro ao buscar serviços:', error);
                    setMessage('Erro ao cadastrar serviço');

                });

        }
    };

    useEffect(() => {

        fetch('http://localhost:5000/services', {


            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setServices(data);
            })
            .catch(error => {
                console.error('Erro ao buscar serviços:', error);
            });
    }, [service]);


    return (

        <ConteinerForm title='Gerenciador de Serviços'>

            <div className={Style.conteiner}>

                <h2>Serviços</h2>
                <div className={Style.Cards}>


                    {services?.length == 0 ? (

                        <div className={Style.nenhumServico}>

                            <Code />
                            <h3>Nenhum serviço cadastrado</h3>

                        </div>

                    ) : (

                        services?.map((service) => (

                            <div className={Style.Card} key={service.id}>

                                <Card service={service} />
                                <Pencil className={Style.pencil} onClick={() => { setService(service) }} />

                            </div>

                        ))


                    )}
                </div>

            </div>
            <form className={Style.form} onSubmit={submitForm}>

                <div className={Style.inputs}>

                    <h2>Dados do Serviço</h2>
                    <div>

                        <p>Serviço:</p>
                        <input
                            name='label'
                            value={service.label || ''}
                            onChange={(e) => { handleService(e) }}
                            className={Style.alingText}

                        />

                    </div>
                    <div>

                        <p>Quantidade:</p>
                        <input
                            name='quantity'
                            value={service.quantity || ''}
                            onChange={(e) => { handleService(e) }}
                            className={Style.alingText}
                        />

                    </div>
                    <div className={Style.description}>

                        <p>Descrição:</p>
                        <textarea
                            name='name'
                            value={service.name || ''}
                            onChange={(e) => { handleService(e) }}
                            className={Style.inputService}
                        />

                    </div>

                </div>
                {message &&

                    <div className={Style.message}>

                        <p>{message}</p>

                        {message == 'Deseja exluir o serviço selecionado?' ?

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

                    {service.id &&

                        <button onClick={(e) => { newService(e) }}>Novo Serviço</button>

                    }

                    <button type='submit'>Salvar</button>

                    {service.id &&

                        <button onClick={(e) => { confirmDel(e) }}>Excluir</button>

                    }

                </div>

            </form>

        </ConteinerForm>

    );

};

export default Service;