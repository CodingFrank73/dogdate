const apiBaseUrl =
    process.env.NODE_ENV === 'production'
        ? "https://dogdate-backend.herokuapp.com"
        : "http://localhost:9000"


export default apiBaseUrl;