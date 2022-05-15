const apiBaseUrl =
    process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_BACKEND_URL
        : "http://localhost:9000"


export default apiBaseUrl;
