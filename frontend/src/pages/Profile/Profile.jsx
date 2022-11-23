import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AlertDialog from './AlertDelete';

import apiBaseUrl from "../../api"
import iconpen from '../../assets/icons/pen.svg';
import pic from '../../assets/img/shittingDogColor.png'

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const Profile = (props) => {

    const [ageRange, setAgeRange] = useState([2, 4]);
    const [maxDistance, setMaxDistance] = useState(100);
    const [dogname, setDogname] = useState('');
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [size, setSize] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [plan, setPlan] = useState('');
    const [location, setLocation] = useState('');
    const [language, setLanguage] = useState('English');
    const [filterGender, setFilterGender] = useState([]);
    const [filterSize, setFilterSize] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [bigImage, setBigImage] = useState('');
    const [error, setError] = useState("")

    useEffect(() => {
        scrollToTop();
        fetchData()
            .then(console.log())
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const fetchData = async () => {
        try {
            const response = await fetch(apiBaseUrl + `/api/users/myProfile`, {
                headers: {
                    token: "JWT " + props.token
                }
            })
            const result = await response.json()

            setProfileImage(result.profileImage);
            setBigImage(result.bigImage);
            setDogname(result.dogName)
            setGender(result.gender);
            setEmail(result.email)
            setDateOfBirth(new Date(result.dateOfBirth).toLocaleDateString('en-CA'))
            setSize(result.size)
            setPhone(result.phone)
            setLocation(result.location);
            setLanguage(result.language);
            setFilterGender(result.filterGender.join(", "));
            setFilterSize(result.filterSize.join(", "));
            setPlan(result.plan)
            setAgeRange([result.ageRange[0], result.ageRange[1]])
            setMaxDistance(result.maxDistance)

        } catch (error) {

        }
    }

    const logout = () => {
        props.setToken(null)
        console.log("You are logged out")
    }

    return (
        <div className="profile">
            <Header headline={"Profile"} />

            <div className="profileBody">
                <div className="profilePic">
                    {/* <img src={profileImage !== null ? profileImage : pic} alt="avatar" /> */}
                    <div className="editProfilepic">
                        <Link to="/profile/editImages"
                            state={{
                                image: profileImage,
                                pathToEndpoint: '/api/users/myProfile/editImageProfile',
                                headerText: 'Profile Image'
                            }}>
                            <img src={iconpen} alt="home" />
                        </Link>
                    </div>
                </div>

                <div className="headlineFrame">
                    <h3>Account Settings</h3>
                    <Link to="/profile/editSettings">
                        <button className='headlineButton'>Edit</button>
                    </Link>
                </div>

                <div className="dataFrame">
                    <div className="dataLable">Name </div>
                    <div className="dataData">{dogname}</div>
                </div>

                <div className="dataFrame">
                    <div className="dataLable">Gender </div>
                    <div className="dataData">{gender}</div>
                </div>

                <div className="dataFrame">
                    <div className="dataLable">Date Of Birth </div>
                    <div className="dataData">{dateOfBirth}</div>
                </div>

                <div className="dataFrame">
                    <div className="dataLable">Size</div>
                    <div className="dataData">{size}</div>
                </div>

                <div className="dataFrame">
                    <div className="dataLable">Email</div>
                    <div className="dataData">{email}</div>
                </div>

                <div className="dataFrame">
                    <div className="dataLable">Phone number</div>
                    <div className="dataData">{phone}</div>
                </div>

                <div className="headlineFrame">
                    <h3>Image Settings</h3>
                </div>

                <div className="dataFrame">
                    <div className="dataLable">Profile</div>
                    <div className="dataData">
                        <Link to="/profile/editImages"
                            state={{
                                image: profileImage,
                                pathToEndpoint: '/api/users/myProfile/editImageProfile',
                                headerText: 'Profile Image'
                            }}>
                            <button className='dataData dataButton'>Edit</button>
                        </Link>
                    </div>
                </div>

                <div className="dataFrame">
                    <div className="dataLable">Main</div>
                    <div className="dataData">
                        <Link to="/profile/editImages"
                            state={{
                                image: bigImage,
                                pathToEndpoint: '/api/users/myProfile/editImageMain',
                                headerText: 'Main Image'
                            }}>
                            <button className='dataData dataButton'>Edit</button>
                        </Link>
                    </div>
                </div>

                <h3>Plan Settings</h3>
                <div className="dataFrame">
                    <div className="dataLable">Current Plan</div>
                    <div className="dataData colorHighlightGreen">{plan}</div>
                </div>

                <div className="headlineFrame">
                    <h3>Discovery Settings</h3>
                    <Link to="/profile/editSettingsDiscovery">
                        <button className='headlineButton'>Edit</button>
                    </Link>
                </div>

                <div className="dataFrame">
                    <div className="dataLable">Location</div>
                    <div className="dataData">{location}</div>
                </div>

                <div className="dataFrame">
                    <div className="dataLable">Language</div>
                    <div className="dataData">{language}</div>
                </div>

                <div className="dataFrame">
                    <div className="dataLable">Show me</div>
                    <div className="dataData">{filterGender}</div>
                </div>
                <div className="dataFrame">
                    <div className="dataLable">Size</div>
                    <div className="dataData">{filterSize}</div>
                </div>

                <div className="dataFrame">
                    <div className="dataLable">Age Range</div>
                    <div className="dataData">{ageRange[0]} to {ageRange[1]} years</div>
                </div>

                <div className="dataFrame">
                    <div className="dataLable">Maximum Distance</div>
                    <div className="dataData">{maxDistance} miles</div>
                </div>

                <button onClick={logout} className="buttonLogout">
                    Logout
                </button>

                <AlertDialog token={props.token} />
            </div >

            <Footer />

        </div >
    );
}

export default Profile;