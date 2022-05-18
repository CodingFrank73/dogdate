import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import apiBaseUrl from "../../api"

//  BILDER-IMPORT
import backarrow from '../../assets/icons/arrow-back.svg';
import iconHome from '../../assets/icons/home.svg';
import iconLike from '../../assets/icons/like.svg';
import iconChat from '../../assets/icons/chat.svg';
import iconProfileaktiv from '../../assets/icons/profile-aktiv.svg';
import iconpen from '../../assets/icons/pen.svg';


const ProfileEditSettings = (props) => {
  const [dogName, setDogName] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [size, setSize] = useState('');
  const [phone, setPhone] = useState('');
  const [userId, setUserId] = useState("")

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

    } catch (error) {
      console.log("error from catch", error)
      setError("Problem fetching user data - try again")
    }
  }
  const doUpdate = async (e) => {
    e.preventDefault();
    console.log(props.token)

    const dataToUpdate = { userId, dogName, gender, dateOfBirth, size, email, phone }

    try {
      const response = await fetch(apiBaseUrl + "/api/users/myProfile/profileEditSettings", {
        method: "PUT",
        headers: {
          token: "JWT " + props.token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToUpdate)
      })
      console.log("data from Json.stringify -", dataToUpdate) //wo zum Henker ist die ID????

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
      <div className="profile-header">
        <img className="profile-arrow-back" src={backarrow} alt="back" />
        <h2>Edit</h2>

      </div>


      <form className="signup-box">
        <h3>Account Settings</h3>
        <input type="text" name="dogName" value={dogName} onChange={(e) => setDogName(e.target.value)} />
        <input type="text" name="gender" value={gender} onChange={(e) => setGender(e.target.value)} />
        <input type="date" name="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
        <input type="text" name="size" value={size} placeholder="Size" onChange={(e) => setSize(e.target.value)} />
        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="text" name="phone" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <button onClick={doUpdate} type="submit">SAVE</button>
      </form>

      <footer>
        <div className="nav">
          <div><img src={iconHome} alt="home" /></div>
          <div><img src={iconLike} alt="like" /></div>
          <div><img src={iconChat} alt="chat" /></div>
          <div><img src={iconProfileaktiv} alt="profile" /></div>
        </div>
      </footer>

    </div>
  );
}

export default ProfileEditSettings;