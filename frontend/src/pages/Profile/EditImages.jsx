import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import CustomButton from "../../components/CustomButton/CustuomButton";
import apiBaseUrl from "../../api"


const EditImages = (props) => {
    const [image, setImage] = useState("")
    const [fileForUpload, setFileForUpload] = useState('')
    const [endpointPath, setEndpointPath] = useState('');
    const [headerText, setHeaderText] = useState('');
    const [error, setError] = useState('');

    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        setImage(location.state.image)
        setEndpointPath(location.state.pathToEndpoint)
        setHeaderText(location.state.headerText)
    }, []);

    const handleImage = (e) => {
        if (e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]))
            setFileForUpload(e.target.files[0])
        }
    }

    const doUpload = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("image", fileForUpload);

        try {
            const response = await fetch(apiBaseUrl + `${endpointPath}`, {
                method: "PUT",
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
        <div className="profile" >
            <Header headline={headerText} />
            <form className="signup-box">
                <div className="mainImageUpload">
                    <label htmlFor="image_uploads"><img src={image} alt="mainImage" /></label>
                    <p>click picture to edit</p>
                    <input type="file" id="image_uploads" name="image_uploads" accept=".jpg, .jpeg, .png" onChange={(e) => handleImage(e)} />
                </div>

                <CustomButton clickHandler={doUpload} buttonType="submit" buttonText="Upload"></CustomButton>
            </form>

            <Footer />
        </div >
    );
}

export default EditImages;