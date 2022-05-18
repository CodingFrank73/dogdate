import { Link } from "react-router-dom";

//  BILDER-IMPORT
import ddLogo from "../../assets/icons/logo.svg";
import googleLogo from "../../assets/icons/google-logo.svg";
import klammerAffe from "../../assets/icons/klammeraffe.svg";
import dog from "../../assets/img/icon-dog.png";
import heart from "../../assets/icons/like-white.svg";
import vegan from "../../assets/img/icon-vegan.png";

const SplashStart = () => {
  return (
    <div>
      <div className="splash">
        <div className="dd-logo-wrapper">
          <img className="dd-logo" src={ddLogo} alt="dogdate logo" />
        </div>
        <h1>dogdate</h1>
        <button>
          <div className="wbLogo">
            <img src={googleLogo} alt="Google" />
          </div>
          <div className="wbText">LOGIN WITH GOOGLE</div>
        </button>

         <Link to="/login">
        <a href="login">
            <button>
              <div className="wbLogoAT">
                <img src={klammerAffe} alt="Klammeraffe" />
              </div>
              <div className="wbText">LOGIN WITH EMAIL</div>
            </button>         
        </a>
         </Link>

        <p className="wText">
          By clicking Log In, you agree with our <a href="#">Terms</a>. Learn
          how we process your data in our <a href="#">Privacy Policy</a> and{" "}
          <a href="#">Cookies Policy</a>.
        </p>
        <Link to="/signup">
        <div className="signUpfooter">
          <p>
            Don't have account? <a href="signup">Signup</a>
          </p>
        </div>
        </Link>
        <div className="splashFooter">
          <div>
            <img className="iconDog" src={dog} alt="dog" /> &copy; 2022 by MFG
          </div>
          <div>
            <img className="iconVegan" src={heart} alt="love" /> Created with
            Love
          </div>
          <div>
            <img className="iconVegan" src={vegan} alt="vegan" /> 1oo% vegan
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashStart;
