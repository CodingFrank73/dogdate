//  BILDER-IMPORT
import ddLogo from '../../assets/icons/logo.svg';

const Splash = () => {
    return (
        <div>
            <div className="splash">
                <div className="dd-logo-wrapper">
                    <img className="dd-logo" src={ddLogo} alt="dogdate logo" />
                </div>

                <h1>dogdate</h1>
            </div>

        </div>
    );
}

export default Splash;