import Style from './Contacts.module.css';
import Logo from '../../Img/NomeDaEmpresa.png';
import MatrixEffect from '../Login/Background/MatrixEffect';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft as Arrow } from "react-icons/fa";
import { RiInstagramFill as Instagram } from "react-icons/ri";
import { IoLogoWhatsapp as Whatsapp } from "react-icons/io";

function Contacts() {

    const navigate = useNavigate();

    return (

        <>
            <MatrixEffect />
            <div className={Style.body}>

                <div className={Style.main}>

                    <div className={Style.header}>

                        <Arrow onClick={() => {navigate('/main')}} />

                    </div>
                    <img alt='Logo da Empresa MasterCode' src={Logo} />
                    <div className={Style.contacts}>

                        <div>

                            <Instagram />
                            <h4>Instagram</h4>

                        </div>
                        <div>

                            <Whatsapp />
                            <h4>Whatsapp</h4>

                        </div>

                    </div>


                </div>

            </div>

        </>

    )

}

export default Contacts;