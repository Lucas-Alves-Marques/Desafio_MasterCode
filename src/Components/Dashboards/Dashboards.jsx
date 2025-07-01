import { data, useNavigate } from 'react-router-dom';
import Style from '../Dashboards/DashBoards.module.css';
import Card from './Cards/Cards';
import { FaHome as Home } from "react-icons/fa";
import { useEffect, useState } from 'react';
import CardUser from './Cards/CardUser/CardUser';

function DashBoards() {

    const navigate = useNavigate();

    const [dataBase, setDataBase] = useState({})

    const navigateTo = (url) => {

        navigate(`${url}`)

    };

    useEffect(() => {

        fetch('../../../public/Database.json')
            .then(response => response.json())
            .then(data => {setDataBase(data)})
            .catch(error => console.error('Erro ao carregar JSON:', error));

    }, []);

    return (

        <div className={Style.body}>

            <div className={Style.header}>

                <Home onClick={() => { navigateTo('/main') }} />
                <h1>MasterCode Dashboard</h1>

            </div>
            <div className={Style.main}>

                <CardUser data={dataBase.users}/>

            </div>

        </div>

    );

}

export default DashBoards;