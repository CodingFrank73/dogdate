import { useNavigate } from "react-router-dom";
import { useEffect } from "react"

//  BILDER-IMPORT
import ddLogo from '../../assets/icons/logo.svg';
import dog from '../../assets/img/icon-dog.png';
import heart from '../../assets/icons/like-white.svg';
import vegan from '../../assets/img/icon-vegan.png';

const Splash = () => {
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            navigate("/splashstart")
        }, 2000)
    }, [])


    return (
        <div>
            <div className="splash">
                <div className="dd-logo-wrapper">
                    <img className="dd-logo" src={ddLogo} alt="dogdate logo" />
                </div>

                <h1>dogdate</h1>
                <div className='splashFooter'>
                    <div><img className="iconDog" src={dog} alt="dog" /> &copy; 2022 by MFG</div>
                    <div><img className="iconVegan" src={heart} alt="love" /> Created with Love</div>
                    <div><img className="iconVegan" src={vegan} alt="vegan" /> 1oo% vegan</div>
                </div>
            </div>

        </div>
    );
}

export default Splash;