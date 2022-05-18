import { useState } from "react";
import apiBaseUrl from "../../api"
import { useNavigate } from "react-router-dom";

//  BILDER-IMPORT
import backarrow from '../../assets/icons/arrow-back.svg';
import iconHome from '../../assets/icons/home.svg';
import iconLike from '../../assets/icons/like.svg';
import iconChat from '../../assets/icons/chat.svg';
import iconProfileaktiv from '../../assets/icons/profile-aktiv.svg';
import iconpen from '../../assets/icons/pen.svg';

const ProfileEditAvatar = (props) => {

    const navigate = useNavigate()

    const [profileImage, setProfileImage] = useState('');
    const [error, setError] = useState('Error uploading avatar');

    const doUpload = async (e) => {

        e.preventDefault();

        const formData = new FormData()
        formData.set("profileImage", profileImage, profileImage.name)

        try {
            const response = await fetch(apiBaseUrl + '/api/users/myProfile/editAvatar', {
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
                <img className="profile-arrow-back" src={backarrow} alt="back" />
                <h2>Upload Avatar</h2>
            </div>
            <div className="editAvatarBody">
                <form className="editAvatar">
                    <input type="file" placeholder="Picture" onChange={(e) => setProfileImage(e.target.files[0])} />
                    <button onClick={doUpload} type="submit">Upload</button>
                </form>

                {error &&
                    <div><p>{error}</p></div>}
            </div>
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

export default ProfileEditAvatar;