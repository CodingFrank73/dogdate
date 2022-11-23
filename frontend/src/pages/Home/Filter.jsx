
import Typography from '@mui/material/Typography';

import { useForm, Controller } from 'react-hook-form';
import { useTheme } from '@mui/material/styles';

import {
    Box,
    Chip,
    FormControl,
    InputLabel,
    MenuItem,
    Modal,
    OutlinedInput,
    Select,
    Slider,
} from "@mui/material"

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const selections = []
const genders = ['female', 'male']
const sizes = ['small', 'medium', 'large']

const marksDistance = [
    { value: 0, label: '0' },
    { value: 15, label: '15' },
    { value: 30, label: '30' },
];

const marksAge = [
    { value: 0, label: '0' },
    { value: 10, label: '10' },
    { value: 20, label: '20' }
]

function getStyles(name, selections, theme) {
    return {
        fontWeight:
            selections.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium
    }
}


const style = {
    position: 'absolute',
    top: '0%',
    left: '0%',
    width: '90%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    m: 1,
};

const Filter = (props) => {
    const { control, handleSubmit, setValue } = useForm();

    const theme = useTheme();

    return (
        <Modal
            open={props.isFilterScreenOpenend}
            onClose={props.handleClose}
        >
            <form onSubmit={props.handleClose}>

                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">Filter</Typography>
                    <p>Gender</p>

                    <Controller
                        name='filterGender'
                        control={control}
                        defaultValue={['female', 'male']}
                        render={({ field: { onChange, value } }) => (
                            <FormControl fullWidth margin="dense" size="small">
                                <InputLabel id="showGenderLabel">Show me</InputLabel>
                                <Select
                                    id="filterGender"
                                    multiple
                                    name='filterGender'
                                    value={props.filteredGender}
                                    onChange={(e) => props.setFilteredGender(e.target.value)}
                                    input={<OutlinedInput id="select-multiple-chip" label="Show me" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value} />
                                            ))}
                                        </Box>
                                    )}
                                    MenuProps={MenuProps}
                                >
                                    {genders.map((name) => (
                                        <MenuItem
                                            key={name}
                                            value={name}
                                            style={getStyles(name, selections, theme)}
                                        >
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                    />

                    <Controller
                        name='filterSize'
                        control={control}
                        defaultValue={[]}
                        render={({ field: { onChange, value } }) => (
                            <FormControl fullWidth margin='dense' size='small'>
                                <InputLabel id='size'>Size</InputLabel>
                                <Select
                                    id='filterSize'
                                    multiple
                                    name='filterSize'
                                    value={props.filteredSize}
                                    onChange={(e) => props.setFilteredSize(e.target.value)}
                                    input={<OutlinedInput id="select-multiple" label="Size" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value} />
                                            ))}
                                        </Box>
                                    )}
                                    MenuProps={MenuProps}
                                >
                                    {sizes.map((name) => (
                                        <MenuItem
                                            key={name}
                                            value={name}
                                            style={getStyles(name, selections, theme)}
                                        >
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                    />

                    <div className="dataFrameSlider">
                        <label>Maximum Distance</label>
                        <Box
                            sx={{ mb: 3 }}>
                            <Controller
                                name="maxDistance"
                                control={control}
                                defaultValue={15}

                                render={({ field: { onChange, value } }) => (

                                    <Slider
                                        id='maxDistance'
                                        name='maxDistance'
                                        value={props.filteredMaxDistance}
                                        onChange={(e) => props.setFilteredMaxDistance(e.target.value)}
                                        size='small'
                                        valueLabelDisplay="auto"
                                        min={0}
                                        max={30}
                                        step={1}
                                        marks={marksDistance}
                                    />
                                )}
                            />
                        </Box>

                        <label>Age Range</label>
                        <Controller
                            name="ageRange"
                            control={control}
                            defaultValue={[0, 20]}
                            render={({ field: { onChange, value } }) => (
                                <Slider
                                    id='ageRange'
                                    name='ageRange'
                                    value={props.filteredAgeRange}
                                    onChange={(e) => props.setFilteredAgeRange(e.target.value)}
                                    size='small'
                                    valueLabelDisplay="auto"
                                    min={0}
                                    max={20}
                                    step={1}
                                    marks={marksAge}
                                />
                            )}
                        />
                    </div>
                </Box>
            </form>
        </Modal>
    );
}

export default Filter;