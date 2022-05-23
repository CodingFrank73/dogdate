import {useState} from "react"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: "100%",
  height: "100vh",
  bgcolor: '#f0f',
  
};

const LikesCard = (props) => {
   
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);  
   
    return (  
        <div>   
        <div onClick={handleOpen}>
            <img src={`dogs/${props.like.dogName}.png`} alt="dog pic" />
            <div className="dogName">{props.like.dogName}</div>
            <div className="">{props.like.gender}</div>
        </div>
       
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
            {props.like.dogName}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <div>
              Hallo Welt
          </div>
        </Box>    
      </Modal>


    </div>
     );
}
 
export default LikesCard;