import { useNavigate } from 'react-router-dom';
import Style from '../Dashboards/DashBoards.module.css';
import { IoExitOutline as Exit } from "react-icons/io5";
import CardUser from './Cards/CardUser/CardUser';
import CardService from './Cards/CardService/CardService';
import CardCourses from './Cards/CardCourses/CardCourses';
import CardCustomerSat from './Cards/CardCustomerSat/CardCustomerSat';
import CardCustomerSer from './Cards/CardCustomerSer/CardCustomerSer';
import CardEquipment from './Cards/CardEquipment/CardEquipment';
import MatrixEffect from '../Login/Background/MatrixEffect';

function DashBoards() {

    const navigate = useNavigate();

    return (

        <>

            <MatrixEffect />
            <div className={Style.body}>

                <div className={Style.header}>

                    <h1>Master<span>Code</span> Dashboard</h1>
                    <Exit onClick={() => { navigate('/') }} />

                </div>
                <div className={Style.main}>

                    <CardUser />
                    <CardService />
                    <CardCourses />
                    <CardEquipment />
                    <CardCustomerSer />
                    <CardCustomerSat />

                </div>

            </div>

        </>

    );

}

export default DashBoards;