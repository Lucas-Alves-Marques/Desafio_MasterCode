import Style from '../CustomerSatisfaction/CustomerSatisf.module.css';
import ConteinerForm from '../Conteiner/ConteinerForm';
import { useDatabase } from '../../../DataBase/DataBase';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CustomerSatisf() {

    const { dataBase, updateCustomerSat } = useDatabase();

    const [data, setData] = useState([]);

    const [message, setMessage] = useState('');

    const navigate = useNavigate();

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

        updateCustomerSat(data);

    };

    useEffect(() => {

        setData(dataBase?.satisfaction);

    }, []);

    return (

        <ConteinerForm title='Satisfação do Cliente'>

            <div className={Style.conteiner}>

                <h2>Nível de Satisfação</h2>
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

        </ConteinerForm>
    );
};

export default CustomerSatisf;