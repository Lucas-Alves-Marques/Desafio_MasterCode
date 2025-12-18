import { useNavigate } from 'react-router-dom';
import Style from '../Cards/Cards.module.css';
import { IoPencil as Pencil } from "react-icons/io5";

function Card(props) {

    const navigate = useNavigate();

    const navigateTo = () => {

        navigate(`${props.url}`)

    };

    return (

        <div className={Style.Card}>

            <div className={Style.title}>

                <h4>{props.title}</h4>
                <Pencil onClick={() => {navigateTo()}}/>

            </div>
            <div className={Style.main}>

                {props.children}

            </div>

        </div>

    );
    
};

export default Card;