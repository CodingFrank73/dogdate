import { Link, useLocation } from "react-router-dom";
import Box from '@mui/material/Box';
import pic from '../../assets/img/shittingDogColor.png'

const Match = (props) => {

    const style = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        background: 'linear-gradient(0deg, #FF5870, #5A1AED)',
    }

    const location = useLocation();
    const state = location.state;

    return (
        <div>
            <Box sx={style}>
                <div className="matchMatch">
                    <h1>It's a Match!</h1>
                    <p> {state.dogName} likes you too</p>
                    <div className="loveBox">
                        <div className="likeDogleft"><img src={state.myImage} alt="dog pic"></img></div>
                        <div className="likeDogright"><img src={state.profileImage !== null ? state.profileImage : pic} alt="avatar" /></div>
                    </div>
                    <Link to="/chat" ><div className="buttonMatchChat">SEND A MESSAGE</div></Link>
                    <Link to="/home" ><div className="buttonMatchSwipe">KEEP SWIPING</div></Link>

                </div>
            </Box>
        </div >
    );
}

export default Match;