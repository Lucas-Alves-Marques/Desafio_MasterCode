import Style from '../Main/Main.module.css';
import Logo from '../../Img/NomeDaEmpresa.png';
import MatrixEffect from '../Login/Background/MatrixEffect';
import { useNavigate } from 'react-router-dom';

function Main() {

    const navigate = useNavigate();

    return (

        <>
            <MatrixEffect />
            <div className={Style.body}>

                <div className={Style.main}>

                    <img alt='Logo da Empresa MasterCode' src={Logo} />
                    <h1>Bem-Vindo á <span>MasterCode</span>: Empresa de Software</h1>
                    <ul>

                        <li onClick={() => { navigate('/dashboards') }}>DashBoards</li>
                        <li onClick={() => { navigate("/contacts") }}>Contatos</li>
                        <li onClick={() => { navigate("/") }}>Sair</li>

                    </ul>

                </div>

            </div>

        </>

    )

}

export default Main;