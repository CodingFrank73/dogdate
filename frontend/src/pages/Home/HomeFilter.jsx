import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Slider from '@mui/material/Slider';

const style = {
    position: 'absolute',
    top: '0%',
    left: '0%',
    width: '100%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const HomeFilter = (props) => {

    return (
        <Modal
            open={props.isFilterScreenOpenend}
            onClose={props.handleClose}
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">Filter</Typography>

                <div className="dataFrame">
                    <p>Gender</p>
                    <div className="optionBox">
                        {props.filteredGender.includes("female") ?
                            <div id="genderLeft" className="genderLeft genderLeft-aktiv" onClick={props.handleChangeGenderF}>Female</div>
                            :
                            <div id="genderLeft" className="genderLeft" onClick={props.handleChangeGenderF}>Female</div>
                        }

                        {props.filteredGender.includes("male") ?
                            <div id="genderRight" className="genderRight genderRight-aktiv" onClick={props.handleChangeGenderM}>Male</div>
                            :
                            <div id="genderRight" className="genderRight" onClick={props.handleChangeGenderM}>Male</div>
                        }
                    </div>
                </div>

                <div className="dataFrame">
                    <p className="rangeHL">Age Range</p>
                    <Slider
                        value={props.filteredAgeRange}
                        onChangeCommitted={props.handleChangeAgeRange}
                        valueLabelDisplay="on"
                        min={0}
                        max={20}
                        step={1}
                    />
                </div>

                <div className="dataFrame">
                    <p>Size</p>
                    <div className="optionBox">
                        {props.filteredSize.includes("small") ?
                            <div id="sizeSmall" className="sizeSmall sizeSmall-aktiv" onClick={props.handleChangeSizeS}>S</div>
                            : <div id="sizeSmall" className="sizeSmall" onClick={props.handleChangeSizeS}>S</div>
                        }

                        {props.filteredSize.includes("medium") ?
                            < div id="sizeMiddle" className="sizeMiddle sizeMiddle-aktiv" onClick={props.handleChangeSizeM} > M</div>
                            : <div id="sizeMiddle" className="sizeMiddle" onClick={props.handleChangeSizeM}>M</div>
                        }

                        {props.filteredSize.includes("large") ?
                            <div id="sizeLarge" className="sizeLarge sizeLarge-aktiv" onClick={props.handleChangeSizeL}>L</div>
                            : <div id="sizeLarge" className="sizeLarge" onClick={props.handleChangeSizeL}>L</div>
                        }
                    </div>
                </div>

                <div className="dataFrame">
                    <p className="rangeHL">Distance (in km)</p>
                    <Slider
                        value={props.filteredMaxDistance}
                        onChangeCommitted={props.handleChangeDistance}
                        valueLabelDisplay="on"
                        min={0}
                        max={30}
                        step={5}
                    />
                </div>
            </Box>
        </Modal>
    );
}

export default HomeFilter;