import Style from './User.module.css';
import { useNavigate } from 'react-router-dom';
import { useDatabase } from '../../../DataBase/DataBase';
import { IoMdArrowRoundBack as Return } from "react-icons/io";
import Card from './Card/Card';

function User() {

    const navigate = useNavigate();

    const { dataBase } = useDatabase();

    return (

        <div className={Style.body}>

            <div className={Style.header}>

                <Return onClick={() => { navigate('/dashboards') }} />
                <h1>Gerenciador de Usuários</h1>

            </div>
            <div className={Style.main}>

                {dataBase.users.map((user) => (

                    <Card user={user} />

                    ))
                }

            </div>

        </div>

    )

}

export default User;