import Style from '../Layout/Conteiner.module.css';

function Conteiner(props){

    return(

        <div className={Style.body}>

            <div className={Style.conteiner}>

                {props.children}

            </div>

        </div>

    )

}

export default Conteiner;