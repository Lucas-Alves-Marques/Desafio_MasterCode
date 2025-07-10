import Style from '../StockQuantity/StockQuantity.module.css';
import ConteinerForm from '../Conteiner/ConteinerForm';
import { useDatabase } from '../../../DataBase/DataBase';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function StockQuantity() {

    const { dataBase, updateEquipment } = useDatabase();

    const [data, setData] = useState([]);

    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleValue = (e) => {

        const updateData = data.map((field) => {

            if (field.category == e.target.name) {

                field.quantity = parseInt(e.target.value) ? parseInt(e.target.value) : e.target.value
            }

            return field;

        });

        setData(updateData);

    };

    const saveForm = (e) => {

        e.preventDefault();

        setMessage('Atualização Realizada');

        updateEquipment(data);

    };

    useEffect(() => {

        setData(dataBase?.equipment);

    }, []);

    return (

        <ConteinerForm title='Quantidade de Equipamentos'>

            <div className={Style.conteiner}>

                <h2>Nível de Estoque</h2>
                <form onSubmit={(e) => { saveForm(e) }}>

                    {data.map((field) => (

                        <div key={field.category} className={Style.field}>

                            <h4>{field.category}</h4>
                            <input
                                name={field.category}
                                value={field.quantity}
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

export default StockQuantity;