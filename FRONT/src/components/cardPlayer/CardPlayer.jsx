import './cardPlayer.css'
import logo from '../../assets/logo-siigo-blanco-300x300.png'

export const CardPlayer = ()=> {
    return(
        <div className='card--user'>

            <div className="logo--content">
                <img src={logo} alt="logo" />
            </div>

        </div>
    )
}