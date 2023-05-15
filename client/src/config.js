export const config = {
    apiEndPoint: process.env.NODE_ENV === 'production'
        ? "http://84.38.181.97/api/"
        : "http://localhost:8080/api/",
    apiEndPointUploads: process.env.NODE_ENV === 'production'
        ? "http://84.38.181.97/uploads/"
        : "http://localhost:8080/uploads/",
}