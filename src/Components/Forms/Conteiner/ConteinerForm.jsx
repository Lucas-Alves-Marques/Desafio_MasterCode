import Style from './ConteinerForm.module.css';
import MatrixEffect from '../../Login/Background/MatrixEffect';
import { IoMdArrowRoundBack as Return } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

function ConteinerForm(props) {

    const navigate = useNavigate();

    return (

        <>
            <MatrixEffect />
            <div className={Style.body}>

                <div className={Style.header}>

                    <Return onClick={() => { navigate('/dashboards') }} />
                    <h1>{props.title}</h1>

                </div>
                <div className={Style.main}>

                    {props.children}

                </div>

            </div>

        </>
    )

};

export default ConteinerForm;