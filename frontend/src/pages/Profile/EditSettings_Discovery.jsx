import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useTheme } from '@mui/material/styles';

import {
  Box,
  Chip,
  FormControl,
  InputAdornment,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Slider,
  TextField
} from "@mui/material"

import LocationSearchingIcon from '@mui/icons-material/LocationSearching';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CustomButton from '../../components/CustomButton/CustuomButton';
import apiBaseUrl from "../../api"
import languagesJson from "../../assets/data/languages"

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

const EditSettings_Discovery = (props) => {

  const [error, setError] = useState('');
  const [labelMessage, setLabelMessage] = useState("Location");
  const { control, handleSubmit, setValue } = useForm();

  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData()
      .then(console.log())
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(apiBaseUrl + "/api/users/myProfile", {
        headers: {
          token: "JWT " + props.token
        }
      })

      const result = await response.json()

      setValue('userId', result._id)
      setValue('location', result.location)
      setValue('postalCode', result.postalCode)
      setValue('language', result.language)
      setValue('filterGender', result.filterGender)
      setValue('filterSize', result.filterSize)
      setValue('maxDistance', result.maxDistance)
      setValue('ageRange', result.ageRange)

    } catch (error) {
      console.log("error from catch", error)
      setError("Problem fetching user data - try again")
    }
  }

  const handleClickLocationSearch = () => {
    setLabelMessage("find current Location...")
    navigator.geolocation.getCurrentPosition(cbSuccess, cbError)
  }

  async function cbSuccess(position) {
    const {
      latitude,
      longitude
    } = position.coords;

    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=geocodejson&lat=${latitude}&lon=${longitude}`)

    const result = await response.json()
    setLabelMessage("Location")
    setValue('location', result.features[0].properties.geocoding.city)
    setValue('postalCode', result.features[0].properties.geocoding.postcode)
    console.log(result);

  }

  function cbError() {
    setLabelMessage("Location")
    console.log("onError worked...");
  }

  const onSubmit = async (data) => {
    try {
      const response = await fetch(apiBaseUrl + "/api/users/myProfile/editSettingsDiscovery", {
        method: "PUT",
        headers: {
          token: "JWT " + props.token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (!result.err) {
        console.log("success!!")
        navigate(-1)
        return
      }

      if (result.err.validationErrors) {
        const firstError = result.err.validationErrors[0]
        setError(firstError.msg + ": " + firstError.param)
        return
      }

    } catch (error) {
      console.log("show me an error !!!!")
    }

  }

  return (
    <div className="profile">
      <Header headline={"Edit"} />

      {/* <div className="profileBody"> */}
      <form className="signup-box" onSubmit={handleSubmit(onSubmit)}>
        <h3>Discovery Settings</h3>

        <Controller
          name='location'
          control={control}
          defaultValue=''
          rules={{
            required: 'Location is required',
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              id="loaction"
              label={labelMessage}
              name='location'
              fullWidth
              size="small"
              margin="dense"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickLocationSearch}
                      edge="end"
                    >
                      <LocationSearchingIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          )}
        />

        <Controller
          name='language'
          control={control}
          defaultValue=''
          render={({ field: { onChange, value } }) => (
            <FormControl fullWidth margin="dense" size="small">
              <InputLabel id="language">Language</InputLabel>
              <Select
                id="language"
                label="Language"
                name='language'
                value={value}
                onChange={onChange}
              >
                {languagesJson.map((singleLang) => {
                  return (
                    <MenuItem key={singleLang.code} value={singleLang.name}>{singleLang.name}</MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          )}
        />

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
                value={value}
                onChange={onChange}
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
                value={value}
                onChange={onChange}
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
                  value={value}
                  onChange={onChange}
                  size='small'
                  valueLabelDisplay="auto"
                  min={0}
                  max={30}
                  step={5}
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
                value={value}
                onChange={onChange}
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

        <div className="customButton-save">
          <CustomButton buttonType="submit" buttonText="Save"></CustomButton>
        </div>
      </form>

      <Footer />
    </div>
  );
}

export default EditSettings_Discovery;