import { useState } from "react"
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: "100%",
  height: "100vh",
  background: 'linear-gradient(0deg, #FF5870, #5A1AED)',
}

const LikesCard = (props) => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div onClick={handleOpen} className="likeCard">
        <img src={`dogs/${props.like.dogName}.png`} alt="dog pic" />
        <div className="likeDogname">{props.like.dogName}</div>
        {/* <div className="">{props.like.gender}</div> */}
      </div>


      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Der Hund heisst:  {props.like.dogName}
          </Typography> */}

          <div className="matchMatch">
            <h1>It's a Match!</h1>
            <p> {props.like.dogName} likes you too</p>
            <div className="loveBox">
              <div className="likeDogleft"><img src="dogs/balto-profil.png" alt="dog pic"></img></div>
              <div className="likeDogright"><img src={`dogs/${props.like.dogName}-profil.png`} alt="dog pic" /></div>
            </div>
            <Link to="/chat" ><div className="buttonMatchChat">SEND A MESSAGE</div></Link>
            <Link to="/home" ><div className="buttonMatchSwipe">KEEP SWIPING</div></Link>
          </div>
        </Box>
      </Modal>


    </div>
  );
}

export default LikesCard;