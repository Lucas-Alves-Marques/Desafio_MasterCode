import Style from './Card.module.css';
import { GiDiploma as Diploma } from "react-icons/gi";

function Card({ course }) {

    return (

        <div className={Style.Card}>

            <div className={Style.cardCourse}>

                <Diploma />

            </div>
            <ul className={Style.infoCourse}>

                <li>Cursos: {course.course}</li>
                <li>Vendas: {course.sales}</li>
                <li>Rótulo: {course.label}</li>

            </ul>

        </div>
    )

}

export default Card;