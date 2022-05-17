import { useState } from "react";
import apiBaseUrl from "../../api"
import { useNavigate } from "react-router-dom";

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
        <div>
            <form style={{ display: "flex", flexDirection: "column", width: "400px" }}>
                <input type="file" placeholder="Picture" onChange={(e) => setProfileImage(e.target.files[0])} />
                <button onClick={doUpload} type="submit">Upload</button>
            </form>
            {error && 
            <div><p>{error}</p></div>}
        </div>
    );
}

export default ProfileEditAvatar;