import Style from './CustomerService.module.css';
import MatrixEffect from '../../Login/Background/MatrixEffect';
import { IoMdArrowRoundBack as Return } from "react-icons/io";
import { useDatabase } from '../../../DataBase/DataBase';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function CustomerService() {

    const navigate = useNavigate();

    const { dataBase, updateCustomerSer } = useDatabase();

    const [data, setData] = useState([]);

    const [message, setMessage] = useState('');

    const handleValue = (e) => {

        const updateData = data.map((field) => {

            if (field.category == e.target.name) {

                field.response = parseInt(e.target.value) ? parseInt(e.target.value) : e.target.value
            }

            return field;

        });

        setData(updateData);

    };

    const saveForm = (e) => {

        e.preventDefault();

        setMessage('Atualização Realizada');

        updateCustomerSer(data);

    };

    useEffect(() => {

        setData(dataBase?.customerService);

    }, []);

    return (

        <>
            <MatrixEffect />
            <div className={Style.body}>

                <div className={Style.header}>

                    <Return onClick={() => { navigate('/dashboards') }} />
                    <h1>Pesquisa de Satisfação de Atendimento</h1>

                </div>
                <div className={Style.main}>

                    <div className={Style.conteiner}>

                        <h2>Nível de Atendimento</h2>
                        <form onSubmit={(e) => { saveForm(e) }}>

                            {data.map((field) => (

                                <div key={field.category} className={Style.field}>

                                    <h4>{field.category}</h4>
                                    <input
                                        name={field.category}
                                        value={field.response}
                                        onChange={(e) => { handleValue(e) }}
                                    />

                                </div>

                            ))}

                            <button type='submit'>Salvar</button>

                        </form>

                    </div>

                </div>

                {message &&

                    <div className={Style.message}>

                        <p>{message}</p>
                        <div>

                            <button onClick={() => { setMessage(''); navigate('/dashboards'); }}>
                                OK
                            </button>

                        </div>

                    </div>

                }

            </div>

        </>
    );

}

export default CustomerService;