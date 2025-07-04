import { data, useNavigate } from 'react-router-dom';
import Style from '../Dashboards/DashBoards.module.css';
import { FaHome as Home } from "react-icons/fa";
import { useEffect, useState } from 'react';
import CardUser from './Cards/CardUser/CardUser';
import CardService from './Cards/CardService/CardService';
import CardCourses from './Cards/CardCourses/CardCourses';
import CardCustomerSat from './Cards/CardCustomerSat/CardCustomerSat';
import CardCustomerSer from './Cards/CardCustomerSer/CardCustomerSer';
import CardEquipment from './Cards/CardEquipment/CardEquipment';

function DashBoards() {

    const navigate = useNavigate();

    const [dataBase, setDataBase] = useState({});

    const navigateTo = (url) => {

        navigate(`${url}`)

    };

    useEffect(() => {

        fetch('/Database.json')
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

                <CardUser dataUser={dataBase.users}/>
                <CardService dataService={dataBase.services} />
                <CardCourses dataCorses={dataBase.courses} />
                <CardEquipment dataEquipment={dataBase.equipment} />
                <CardCustomerSer dataCustomer={dataBase.customerService} />
                <CardCustomerSat dataCustomer={dataBase.satisfaction} />
                
            </div>

        </div>

    );

}

export default DashBoards;