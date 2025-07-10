import { useNavigate } from 'react-router-dom';
import Style from '../Dashboards/DashBoards.module.css';
import { FaHome as Home } from "react-icons/fa";
import { useDatabase } from '../../DataBase/DataBase';
import CardUser from './Cards/CardUser/CardUser';
import CardService from './Cards/CardService/CardService';
import CardCourses from './Cards/CardCourses/CardCourses';
import CardCustomerSat from './Cards/CardCustomerSat/CardCustomerSat';
import CardCustomerSer from './Cards/CardCustomerSer/CardCustomerSer';
import CardEquipment from './Cards/CardEquipment/CardEquipment';

function DashBoards() {

    const navigate = useNavigate();

    const { dataBase } = useDatabase();

    // Pegando os dados no banco de dados

    /*

    const [dataBase, setDataBase] = useState([]);

    useEffect(() => {
        
        fecth
        
    }, []);

    */

    return (

        <div className={Style.body}>

            <div className={Style.header}>

                <Home onClick={() => { navigate('/main') }} />
                <h1>MasterCode Dashboard</h1>

            </div>
            <div className={Style.main}>

                <CardUser dataUser={dataBase.users} />
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