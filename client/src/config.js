export const config = {
    apiEndPoint: process.env.NODE_ENV === 'production'
        ? "http://80.249.145.76/api/"
        : "http://localhost:8080/api/",
    isFireBase: false,
}

