import Style from './Card.module.css';
import { FaCode as Code } from "react-icons/fa";

function Card({ service }) {

    return (

        <div className={Style.Card}>

            <div className={Style.cardService}>

                <Code />

            </div>
            <ul className={Style.infoService}>

                <li>Serviço: {service.name}</li>
                <li>Quantidade: {service.quantity}</li>
                <li>Rótulo: {service.label}</li>

            </ul>

        </div>
    )

}

export default Card;