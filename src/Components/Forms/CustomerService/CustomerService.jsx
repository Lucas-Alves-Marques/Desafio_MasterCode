import Style from './CustomerService.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ConteinerForm from '../Conteiner/ConteinerForm';

function CustomerService() {

    const navigate = useNavigate();

    const [customerService, setCustomerService] = useState([]);

    const [message, setMessage] = useState('');

    const handleValue = (e) => {

        const updateData = customerService.map((field) => {

            if (field.category == e.target.name) {

                field.response = parseInt(e.target.value) ? parseInt(e.target.value) : e.target.value
            }

            return field;

        });

        setCustomerService(updateData);

    };

    const saveForm = async (e) => {

        e.preventDefault();

        customerService.forEach(item => {

            if (item.response === '') {

                item.response = 0;
            }
        });

        try {

            const updatePromises = customerService.map(item =>

                fetch(`http://localhost:5000/customerService/${item.id}`, {
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
            console.error('Erro ao atualizar os niveis de atendimento:', error);
            setMessage('Erro ao atualizar os niveis de atendimento');
        }

    };

    useEffect(() => {

        fetch('http://localhost:5000/customerService', {

            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data) => {

                setCustomerService(data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    return (

        <ConteinerForm title='Pesquisa de Satisfação de Atendimento'>

            <div className={Style.conteiner}>

                <h2>Nível de Atendimento</h2>
                <form onSubmit={(e) => { saveForm(e) }}>

                    {customerService.map((field) => (

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

}

export default CustomerService;