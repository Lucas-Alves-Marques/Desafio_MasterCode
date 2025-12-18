import Style from '../StockQuantity/StockQuantity.module.css';
import ConteinerForm from '../Conteiner/ConteinerForm';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function StockQuantity() {

    const [equipment, setEquipment] = useState([]);

    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleValue = (e) => {

        const updateData = equipment.map((field) => {

            if (field.category == e.target.name) {

                field.quantity = parseInt(e.target.value) ? parseInt(e.target.value) : e.target.value
            }

            return field;

        });

        setEquipment(updateData);

    };

    const saveForm = async (e) => {

        e.preventDefault();

        equipment.forEach(item => {

            if (item.quantity === '') {

                item.quantity = 0;
            }
        });

        try {

            const updatePromises = equipment.map(item =>

                fetch(`http://localhost:5000/equipment/${item.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(item)
                })
                
            );

            await Promise.all(updatePromises);

            setMessage('Atualização Realizada');

        } catch (error) {
            console.error('Erro ao atualizar equipamentos:', error);
            setMessage('Erro ao atualizar os equipamentos');
        }

    };

    useEffect(() => {

        fetch('http://localhost:5000/equipment', {

            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setEquipment(data);
            })
            .catch(error => {
                console.error('Erro ao buscar equipamentos:', error);
            });

    }, []);

    return (

        <ConteinerForm title='Quantidade de Equipamentos'>

            <div className={Style.conteiner}>

                <h2>Nível de Estoque</h2>
                <form onSubmit={(e) => { saveForm(e) }}>

                    {equipment.map((field) => (

                        <div key={field.category} className={Style.field}>

                            <h4>{field.category}</h4>
                            <input
                                name={field.category}
                                value={field.quantity || ''}
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

                        <button
                            onClick={() => {
                                setMessage('');
                                !message.includes('Erro') && navigate('/dashboards');
                            }}>
                            OK
                        </button>

                    </div>

                </div>

            }

        </ConteinerForm>
    );
};

export default StockQuantity;