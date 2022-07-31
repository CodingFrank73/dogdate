import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import apiBaseUrl from "../../api"
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

import Footer from '../../components/Footer/Footer';

//  BILDER-IMPORT
import backarrow from '../../assets/icons/arrow-back.svg';

const ProfileEditSettings = (props) => {
  const [dogName, setDogName] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [size, setSize] = useState('');
  const [phone, setPhone] = useState('');
  const [userId, setUserId] = useState("");
  const [bigImage, setBigImage] = useState("")


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

      setDogName(result.dogName)
      setGender(result.gender)
      setDateOfBirth(new Date(result.dateOfBirth).toLocaleDateString('en-CA'))
      setSize(result.size)
      setEmail(result.email)
      setPhone(result.phone)
      setUserId(result._id)
      setBigImage(result.bigImage)

    } catch (error) {
      console.log("error from catch", error)
      setError("Problem fetching user data - try again")
    }
  }
  const doUpdate = async (e) => {
    e.preventDefault();
    console.log(props.token)

    const dataToUpdate = { userId, dogName, gender, dateOfBirth: new Date(dateOfBirth).toISOString(), size, email, phone }

    try {
      const response = await fetch(apiBaseUrl + "/api/users/myProfile/profileEditSettings", {
        method: "PUT",
        headers: {
          token: "JWT " + props.token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToUpdate)
      })
      console.log("data from Json.stringify -", dataToUpdate)

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

  const doUpload = async (e) => {
    e.preventDefault();
    // console.log("TEST", bigImage)

    const formData = new FormData()
    formData.set("bigImage", bigImage) ///kommt ich hier an???

    // console.log("TEST2", formData.entries())

    try {
      const response = await fetch(apiBaseUrl + '/api/users/myProfile/editBigImage', {
        method: "POST",
        headers: {
          token: "JWT " + props.token
        },
        body: formData
      })
      const result = await response.json()

      if (!result.err) {
        console.log("Hat geklappt..........");

        return
      }

      if (result.err.validationErrors) {
        const firstError = result.err.validationErrors[0];
        setError(firstError.msg + ":" + firstError.param);
        return
      }


    } catch (error) {
      console.log("error..............");
    }


  }

  return (

    <div className="profile">
      <div className="profile-header">
        <Link to="/profile" ><img className="profile-arrow-back" src={backarrow} alt="back" /></Link>
        <h2>Edit</h2>

      </div>


      <form className="signup-box">
        <h3>Account Settings</h3>
        <input type="text" name="dogName" value={dogName} onChange={(e) => setDogName(e.target.value)} />
        <div><img src={bigImage} alt="BigImage" /></div>
        {/* <div><img src={`/dogs/${dogName}.png`} alt="BigImage" /></div> */}
        <input type="file" placeholder="Picture" onChange={(e) => setBigImage(e.target.files[0])} />
        <button onClick={doUpload} type="submit">Upload</button>


        <div className="dataFrame">
          <div className="dataLable">
            <InputLabel id="labelLanguage"> Gender</InputLabel></div>
          <div className="dataData">
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={gender}
              label="Gender"
              onChange={(e) => { setGender(e.target.value) }}
            >
              <MenuItem value="m">Male</MenuItem>
              <MenuItem value="f">Female</MenuItem>
            </Select>
          </div>
        </div>

        <input type="date" name="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />

        <div className="dataFrame">
          <div className="dataLable">
            <InputLabel id="labelLanguage"> Size</InputLabel></div>
          <div className="dataData">
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={size}
              label="Size"
              onChange={(e) => { setSize(e.target.value) }}
            >
              <MenuItem value="s">Small</MenuItem>
              <MenuItem value="m">Medium</MenuItem>
              <MenuItem value="l">Large</MenuItem>
            </Select>
          </div>
        </div>

        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="text" name="phone" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />

        <button onClick={doUpdate} type="submit" className='saveButton'>SAVE</button>
      </form>

      <footer>
        <Footer />
      </footer>

    </div>
  );
}

export default ProfileEditSettings;