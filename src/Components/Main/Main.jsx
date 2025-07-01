import Style from '../Main/Main.module.css';
import Logo from '../../Img/NomeDaEmpresa.png';
import MatrixEffect from '../Login/Background/MatrixEffect';
import { useNavigate } from 'react-router-dom';

function Main() {

    const navigate = useNavigate();

    const navigateTo = (url) => {

        navigate(`${url}`)

    };

    return (

        <>
            <MatrixEffect />
            <div className={Style.body}>

                <div className={Style.main}>

                    <img alt='Logo da Empresa MasterCode' src={Logo} />
                    <h1>Bem-Vindo á <span>MasterCode</span>: Empresa de Software</h1>
                    <ul>

                        <li>Home</li>
                        <li onClick={() => {navigateTo('/dashboards')}}>DashBoards</li>
                        <li>Contatos</li>

                    </ul>

                </div>

            </div>

        </>

    )

}

export default Main;