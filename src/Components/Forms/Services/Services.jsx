import Style from './Services.module.css';
import ConteinerForm from '../Conteiner/ConteinerForm';
import Card from './Card/Card';
import { useDatabase } from '../../../DataBase/DataBase';
import { IoPencil as Pencil } from "react-icons/io5";
import { useState } from 'react';


function Service() {

    const { dataBase, adicionarServiço, editarServiço, removerServiço } = useDatabase();

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

        removerServiço(service.id);

        newService(e);

    };

    const submitForm = (e) => {

        e.preventDefault();

        if (service.id == null) {


            adicionarServiço(service);

            setMessage('Serviço Cadastrado');

            newService(e);

        }

        else {

            editarServiço(service.id, service);

            setMessage('Serviço Salvo');

            newService(e);

        }
    };

    return (

        <ConteinerForm title='Gerenciador de Serviços'>

            <div className={Style.conteiner}>

                <h2>Serviços</h2>
                <div className={Style.Cards}>

                    {dataBase.services.map((service) => (

                        <div className={Style.Card}>

                            <Card service={service} />
                            <Pencil className={Style.pencil} onClick={() => { setService(service) }} />

                        </div>

                    ))
                    }
                </div>

            </div>
            <form className={Style.form} onSubmit={submitForm}>

                <div className={Style.inputs}>

                    <h2>Dados do Serviço</h2>
                    <div>

                        <p>Serviço:</p>
                        <input
                            name='name'
                            value={service.name}
                            onChange={(e) => { handleService(e) }}
                            className={Style.inputService}
                        />

                    </div>
                    <div>

                        <p>Quantidade:</p>
                        <input
                            name='quantity'
                            value={service.quantity}
                            onChange={(e) => { handleService(e) }}
                            className={Style.alingText}
                        />

                    </div>
                    <div>

                        <p>Rótulo:</p>
                        <input
                            name='label'
                            value={service.label}
                            onChange={(e) => { handleService(e) }}
                            className={Style.alingText}

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

    )

};

export default Service;