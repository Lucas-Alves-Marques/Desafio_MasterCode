import Style from './Card.module.css';
import { FaCode as Code } from "react-icons/fa";

function Card({ service }) {

    return (

        <div className={Style.Card}>

            <div className={Style.cardService}>

                <Code />

            </div>
            <ul className={Style.infoService}>

                <li> <span>Serviço: </span> {service.label}</li>
                <li> <span>Quantidade: </span> {service.quantity}</li>
                <li> <span>Descrição: </span> {service.name}</li>

            </ul>

        </div>
    )

}

export default Card;