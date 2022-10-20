import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form'

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@mui/material"

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CustomButton from '../../components/CustomButton/CustuomButton';
import apiBaseUrl from "../../api"

const ProfileEditSettings = (props) => {

  const [error, setError] = useState('');
  const { control, handleSubmit, setValue } = useForm()
  const navigate = useNavigate()

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
      setValue('dogName', result.dogName)
      setValue('gender', result.gender)
      setValue('size', result.size)
      setValue('dateOfBirth', new Date(result.dateOfBirth).toLocaleDateString('en-CA'))
      setValue('email', result.email)
      setValue('phone', result.phone)

    } catch (error) {
      console.log("error from catch", error)
      setError("Problem fetching user data - try again")
    }
  }

  const onSubmit = async (data) => {

    try {
      const response = await fetch(apiBaseUrl + "/api/users/myProfile/profileEditSettings", {
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

      <form className="signup-box" onSubmit={handleSubmit(onSubmit)}>
        <h3>Account Settings</h3>

        <Controller
          name='dogName'
          control={control}
          defaultValue=''
          rules={{
            required: "Your Name is required!",
            minLength: { value: 2, message: 'Your Name should be 2-20 characters!' },
            maxLength: { value: 20, message: 'Your Name should be 2-20 characters!' }
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              id="dogName"
              label="Name"
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
          name='gender'
          control={control}
          defaultValue=''
          render={({ field: { onChange, value } }) => (
            <FormControl fullWidth margin="normal" size="small">
              <InputLabel id="gender">Gender</InputLabel>
              <Select
                id="gender"
                label="Gender"
                name='gender'
                value={value}
                onChange={onChange}
              >
                <MenuItem value='f'>Female</MenuItem>
                <MenuItem value='m'>Male</MenuItem>
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
                <MenuItem value='s'>Small</MenuItem>
                <MenuItem value='m'>Medium</MenuItem>
                <MenuItem value='l'>Large</MenuItem>
              </Select>
            </FormControl>
          )}
        />

        <Controller
          name='dateOfBirth'
          control={control}
          defaultValue={null}
          render={({ field: { onChange, value } }) => (

            <FormControl fullWidth margin="normal">
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
            required: 'Email address is required!',
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
          name='phone'
          control={control}
          defaultValue=''
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              id="phone"
              label="Phone"
              name='phone'
              fullWidth
              margin="dense"
              size="small"
              value={value}
              onChange={onChange}
            />
          )}
        />

        <CustomButton buttonType="submit" buttonText="Save"></CustomButton>
      </form>

      <Footer />

    </div>
  );
}

export default ProfileEditSettings;