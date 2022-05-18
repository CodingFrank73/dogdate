import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import apiBaseUrl from "../../api";

//  BILDER-IMPORT
import loadingIndicator from '../../assets/img/runningDog.gif';

const AuthRequired = (props) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (props.token) {
            //Wenn bereits ein Token vorhanden ist wird nicht gefetch.
            //Nur bei ersten laden von Bedeutung.
            setLoading(false);
            return
        }

        fetchData()
    }, []);

    async function fetchData() {
        try {
            const response =
                await fetch(apiBaseUrl + `/api/users/refreshtoken`, {
                    method: "POST",
                    mode: "cors",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include"
                })

            const result = await response.json();
            setLoading(false);
            props.setToken(result.token);

        } catch (error) {
            console.log("Loading RefreshToken failed......");
        }
    }

    // Loading indicator
    if (loading) {
        return <div className="loadingIndicator">
            <img src={loadingIndicator} alt="Loading..." />
        </div>
    }

    // Wenn kein gültiger Token vorhanden ist
    if (!props.token) {
        return <Navigate to="/" />
    }

    // Wenn ein gültiger Token ermittelt wurde.
    return (
        // Durch Passwort geschützen Inhalt anzeigen
        <>{props.children}</>
    );
}

export default AuthRequired; 