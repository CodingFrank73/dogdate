import { Link } from "react-router-dom";
import backarrow from '../../assets/icons/arrow-back.svg';

const HeaderChatRoom = (props) => {
    return (
        <div className="profile-header">
            <Link to={-1}><img className="profile-arrow-back" src={backarrow} alt="back" /></Link>
            <div className="profile-header-info">
                <img src={props.profileImage} alt="profileImage" />
                <h2>{props.dogName}</h2>
            </div>

        </div>
    );
}

export default HeaderChatRoom;