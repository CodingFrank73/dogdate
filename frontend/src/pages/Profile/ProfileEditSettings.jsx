import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";


const ProfileEditSettings = (props) => {
  const [dogName, setDogName] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [bigImage, setBigImage] = useState();
  const [error, setError] = useState('');


  return (
    <div>
      <div>arrow Back</div>
      <h1>Edit</h1>

      <h2>Account Settings</h2>

      <form>
        <input type="text" name="dogName" id="" value="" />
        <input type="text" name="phone" id="" value="" />
        <input type="date" name="dateOfBirth" id="" value="" />
        <input type="text" name="email" id="" value="" />
      </form>



    </div>
  );
}

export default ProfileEditSettings;