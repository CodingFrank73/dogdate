import { Link } from "react-router-dom";
import backarrow from '../../assets/icons/arrow-back.svg';

const Header = (props) => {

    return (
        <div>
            <div className="profile-header">
                <Link to={-1}><img className="profile-arrow-back" src={backarrow} alt="back" /></Link>
                <h2>{props.headline}</h2>
            </div>
        </div>


    );
}

export default Header;