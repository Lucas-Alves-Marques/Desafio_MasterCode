import Style from './Card.module.css';
import { FaUserAlt as User } from "react-icons/fa";

function Card({ user }) {

    return (

        <div className={Style.Card}>

            <div className={Style.cardUser}>

                <User />

            </div>
            <ul className={Style.infoUser}>

                <li>Nome: {user.name}</li>
                <li>Cursos Comprados: {user.quantityCourses}</li>
                <li>Componentes Comprados: {user.shopping}</li>

            </ul>

        </div>
    )

}

export default Card;