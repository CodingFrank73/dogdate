import React from 'react'
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from 'react-hook-form'

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import {
    Box,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material"

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';

import CustomButton from '../../components/CustomButton/CustuomButton';
import Header from "../../components/Header/Header";

import apiBaseUrl from "../../api"
import defaultImage from '../../assets/img/click07.png';

const Signup = () => {

    const navigate = useNavigate();
    const timerRef = useRef(null)

    const { handleSubmit, control, setValue } = useForm();

    const [showPassword, setShowPassword] = useState(false);
    const [image, setImage] = useState(null);
    const [imageForUpload, setImageForUpload] = useState('')
    const [success, setSuccess] = useState("")
    const [error, setError] = useState('');
    const [labelMessage, setLabelMessage] = useState("Location");

    let successText = `A very warm welcome to the DogDate community! We will now direct you to the login section - please sign in with your credentials and enjoy using Dogdate!`;

    useEffect(() => {
        return () => clearTimeout(timerRef.current)
    })

    const doSignUp = async (data) => {

        try {
            if (imageForUpload == '') { throw new Error("Image is required") }

            const formData = new FormData()

            formData.append("dogName", data.dogName)
            formData.append("location", data.location)
            formData.append("postalCode", data.postalCode)
            formData.set("gender", data.gender)
            formData.set("size", data.size)
            formData.set("dateOfBirth", data.dateOfBirth)
            formData.set("email", data.email)
            formData.set("password", data.password)
            formData.append("image", imageForUpload)

            const response = await fetch(apiBaseUrl + '/api/users/register', {
                method: "POST",
                body: formData
            })

            const result = await response.json()

            if (!result.err) {
                setSuccess(successText)

                setTimeout(() => {
                    navigate("/login")
                }, 4500)

                return
            }

            // Validation errors from the backend
            if (result.err.validationErrors) {
                const firstError = result.err.validationErrors[0];
                setError(`The ${firstError.param} field has an ${firstError.msg}`)
                return
            }

            // sonstige Fehler die vom Backend kommen
            setError('ERROR aus Backend: ', result.err.message);

        } catch (e) {
            setError(e.message)
        }
    }


    const handleImage = (e) => {
        if (e.target.files[0]) {
            setError('')
            setImage(URL.createObjectURL(e.target.files[0]))
            setImageForUpload(e.target.files[0])
        }
    }

    const handleClickShowPassword = () => { setShowPassword(!showPassword) };

    const handleMouseDownPassword = (event) => { event.preventDefault() };

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
    }

    function cbError() {
        setLabelMessage("Location")
    }

    return (
        <div className="profile">
            <Header headline={"Sign Up"} />
            <form className="signup-box" onSubmit={handleSubmit(doSignUp)}>

                <Controller
                    name='dogName'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: "Your Name is required",
                        minLength: { value: 2, message: 'Your Name should be 2-20 characters!' },
                        maxLength: { value: 20, message: 'Your Name should be 2-20 characters!' }
                    }}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                            id="dogName"
                            label="Your Name"
                            name='dogName'
                            fullWidth
                            margin="dense"
                            size="small"
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : null}
                        />
                    )}
                />

                <Controller
                    name='location'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'Location is required',
                    }}
                    render={({ field: { onChange, focus, value }, fieldState: { error } }) => (
                        <TextField
                            id="loaction"
                            label={labelMessage}
                            name='location'
                            fullWidth
                            size="small"
                            margin="dense"
                            disabled
                            value={value}

                            onBlur={() => console.log("Hallo")}
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
                    name='gender'
                    control={control}
                    defaultValue=''
                    render={({ field: { onChange, value } }) => (
                        <FormControl fullWidth margin="dense" size="small">
                            <InputLabel id="gender">Gender</InputLabel>
                            <Select
                                id="gender"
                                label="Gender"
                                name='gender'
                                value={value}
                                onChange={onChange}
                            >
                                <MenuItem value='female'>Female</MenuItem>
                                <MenuItem value='male'>Male</MenuItem>
                            </Select>
                        </FormControl>
                    )}
                />

                <Controller
                    name='size'
                    control={control}
                    defaultValue=''
                    render={({ field: { onChange, value } }) => (
                        <FormControl fullWidth margin='dense' size='small'>
                            <InputLabel id='size'>Size</InputLabel>
                            <Select
                                id='size'
                                label="Size"
                                name='size'
                                value={value}
                                onChange={onChange}
                            >
                                <MenuItem value='small'>Small</MenuItem>
                                <MenuItem value='medium'>Medium</MenuItem>
                                <MenuItem value='large'>Large</MenuItem>
                            </Select>
                        </FormControl>
                    )}
                />

                <Controller
                    name='dateOfBirth'
                    control={control}
                    defaultValue={null}
                    render={({ field: { onChange, value } }) => (

                        <FormControl fullWidth margin="dense">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    id='dateOfBirth'
                                    label="Date of birth"
                                    inputFormat="dd.MM.yyyy"
                                    disableFuture
                                    openTo='day'
                                    views={['day']}
                                    value={value}
                                    onChange={onChange}
                                    renderInput={(params) => <TextField {...params} size='small' />}
                                />
                            </LocalizationProvider>
                        </FormControl>

                    )}
                />

                <Controller
                    name='email'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'Email address is required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address"
                        }
                    }}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                            id="email-address"
                            label="Email Address"
                            name='email'
                            fullWidth
                            size="small"
                            margin="dense"
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : null}
                        />
                    )}
                />

                <Controller
                    name='password'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'Password is required',
                        minLength: { value: 8, message: 'Password must have at least 8 characters' },
                        pattern: {
                            value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$/,
                            message: "test"
                        }
                    }}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                            id="password"
                            label='Password'
                            name='password'
                            fullWidth
                            size="small"
                            margin="dense"
                            type={showPassword ? "text" : "password"}
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : null}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    )}
                />

                <Box mt={1}>
                    <div className="mainImageUpload">
                        <label htmlFor="image_uploads"><img src={image !== null ? image : defaultImage} alt="mainImage" /></label>

                        <div className="customButton-save">
                            <CustomButton buttonType="submit" buttonText="SIGN UP"></CustomButton>
                        </div>

                        <input className="teste" type="file" id="image_uploads" name="image_uploads" accept=".jpg, .jpeg, .png" onChange={(e) => handleImage(e)} />
                    </div>
                </Box>

                {error && <p>{error}</p>}

            </form >

            {success && <p className="successText">{success}</p>}
        </div >
    );
}

export default Signup;