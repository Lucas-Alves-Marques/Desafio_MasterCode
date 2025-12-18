import Style from '../CustomerSatisfaction/CustomerSatisf.module.css';
import ConteinerForm from '../Conteiner/ConteinerForm';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CustomerSatisf() {

    const [satisfaction, setSatisfaction] = useState([]);

    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleValue = (e) => {

        const updateData = satisfaction.map((field) => {

            if (field.category == e.target.name) {

                field.response = parseInt(e.target.value) ? parseInt(e.target.value) : e.target.value
            }

            return field;

        });

        setSatisfaction(updateData);

    };

    const saveForm = async (e) => {

        e.preventDefault();

        satisfaction.forEach(item => {

            if (item.response === '') {

                item.response = 0;
            }
        });

        try {

            const updatePromises = satisfaction.map(item =>

                fetch(`http://localhost:5000/satisfaction/${item.id}`, {
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
            console.error('Erro ao atualizar as satisfações:', error);
            setMessage('Erro ao atualizar as satisfações');
        }

    };

    useEffect(() => {

        fetch('http://localhost:5000/satisfaction', {

            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setSatisfaction(data);
            })
            .catch(error => {
                console.error('Erro ao buscar satisfação:', error);
            });

    }, []);

    return (

        <ConteinerForm title='Satisfação do Cliente'>

            <div className={Style.conteiner}>

                <h2>Nível de Satisfação</h2>
                <form onSubmit={(e) => { saveForm(e) }}>

                    {satisfaction.map((field) => (

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