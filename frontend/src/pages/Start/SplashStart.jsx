//  BILDER-IMPORT
import ddLogo from '../../assets/icons/logo.svg';
import googleLogo from '../../assets/icons/google-logo.svg';
import klammerAffe from '../../assets/icons/klammeraffe.svg';

const SplashStart = () => {
    return (
        <div>
            <div className="splash">
                <div className="dd-logo-wrapper">
                    <img className="dd-logo" src={ddLogo} alt="dogdate logo" />
                </div>
                <h1>dogdate</h1>
                <button>
                    <div className="wbLogo"><img src={googleLogo} alt="Google" /></div>
                    <div className="wbText">LOGIN WITH GOOGLE</div>
                </button>


                <button>
                    <div className="wbLogoAT"><img src={klammerAffe} alt="Klammeraffe" /></div>
                    <div className="wbText">LOGIN WITH EMAIL</div>
                </button>


                <p className="wText">By clicking Log In, you agree with our <a href="#">Terms</a>.
                    Learn how we process your data in our <a href="#">Privacy
                        Policy</a> and <a href="#">Cookies Policy</a>.</p>
                <footer>
                    <p>Don't have account? <a href="signup.html">Signup</a></p>
                </footer>
            </div>
        </div>
    );
}

export default SplashStart;