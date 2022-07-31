import { Link, useLocation } from "react-router-dom";
import icoHome from '../../assets/icons/home.svg'
import icoHomeActiv from '../../assets/icons/home-aktiv.svg';
import icoLike from '../../assets/icons/like.svg';
import icoLikeActiv from '../../assets/icons/like-aktiv.svg'
import icoChat from '../../assets/icons/chat.svg';
import icoChatActiv from '../../assets/icons/chat-aktiv.svg'
import icoProfile from '../../assets/icons/profile.svg';
import icoProfileActiv from '../../assets/icons/profile-aktiv.svg';

const Footer = () => {

    const location = useLocation();
    const path = location.pathname;

    return (
        <div className="nav">
            <div><Link to="/home" ><img src={path === '/home' ? icoHomeActiv : icoHome} alt="home" /></Link></div>
            <div><Link to="/like" ><img src={path === '/like' ? icoLikeActiv : icoLike} alt="like" /></Link></div>
            <div><Link to="/chat" ><img src={path === '/chat' ? icoChatActiv : icoChat} alt="chat" /></Link></div>
            <div><Link to="/profile" ><img src={path === '/profile' ? icoProfileActiv : icoProfile} alt="profile" /></Link></div>
        </div>
    );
}

export default Footer;