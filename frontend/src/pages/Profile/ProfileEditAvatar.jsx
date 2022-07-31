import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import apiBaseUrl from "../../api"

import Footer from '../../components/Footer/Footer';

import backarrow from '../../assets/icons/arrow-back.svg';

const ProfileEditAvatar = (props) => {

    const navigate = useNavigate()

    const [profileImage, setProfileImage] = useState('');
    const [error, setError] = useState('');

    const doUpload = async (e) => {

        e.preventDefault();

        const formData = new FormData()
        // formData.set("profileImage", profileImage, profileImage.name)

        formData.append("avatar", profileImage);


        try {
            //TODO: Ursprünglicher Code - Kann wenn alles läuft gelöscht werden
            // const response = await fetch(apiBaseUrl + '/api/users/myProfile/editAvatar', {
            //     method: "POST",
            //     headers: {
            //         token: "JWT " + props.token
            //     },
            //     body: formData
            // })
            // const result = await response.json()


            const response = await fetch(apiBaseUrl + '/api/users/upload', {
                method: "POST",
                headers: {
                    token: "JWT " + props.token
                },
                body: formData
            })

            const result = await response.json()

            if (!result.err) {
                console.log("Hat geklappt..........");
                navigate(-1)
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
                <h2>Upload Avatar</h2>
            </div>
            <div className="editAvatarBody">
                <form className="editAvatar">
                    <input type="file" name="avatar" placeholder="Picture" onChange={(e) => setProfileImage(e.target.files[0])} />
                    <button onClick={doUpload} type="submit">Upload</button>
                </form>

                {error &&
                    <div><p>{error}</p></div>}
            </div>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default ProfileEditAvatar;