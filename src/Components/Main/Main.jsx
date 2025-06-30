import Conteiner from '../Layout/Conteiner';
import Style from '../Main/Main.module.css';
import Logo from '../../../public/NomeDaEmpresa.png'

function Main(){

    return(

        <Conteiner>

            <div className={Style.main}>

                <img alt='Logo da Empresa MasterCode' src={Logo} />
                <h1>Bem-Vindo á Mastercode: Empresa de Software</h1>
                <ul>

                    <li>Home</li>
                    <li>DashBoards</li>
                    <li>Contatos</li>

                </ul>

            </div>

        </Conteiner>

    )

}

export default Main;