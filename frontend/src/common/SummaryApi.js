export const baseURL = "http://localhost:8080"

const SummaryApi = {

    register: {
        url: '/api/user/register',
        method: "post"
    },
    login: {
        url: '/api/user/login',
        method: "post"
    }
    ,
    verifyEmail: {
        url: '/api/user/verify-email',
        method: "post"
    },
    logout: {
        url: '/api/user/logout',
        method: "get"
    },
    uploadAvatar : {
        url : '/api/user/upload-avatar',
        method : "put"
    },
    userDetails: {
        url: '/api/user/user-details',
        method: "get"
    },
    usersDetails: {
        url: '/api/user/users-details',
        method: "get"
    },
    refreshToken: {
        url: 'api/user/refresh-token',
        method: 'post'
    },
    forgot_password: {
        url: '/api/user/forgot-password',
        method: "put"
    },
    forgot_password_otp_verification: {
        url: '/api/user/verify-forgot-password-otp',
        method: "put"
    },
    resetPassword: {
        url: '/api/user/reset-password',
        method: "put"
    },
    updateUserDetails: {
        url: '/api/user/update-user',
        method: "put"
    },
    createAddress: {
        url: '/api/address/create',
        method: 'post'
    },
    getAddress: {
        url: '/api/address/get',
        method: 'get'
    },
    updateAddress: {
        url: '/api/address/update',
        method: 'put'
    },
    disableAddress: {
        url: '/api/address/disable',
        method: 'delete'
    },
    createProject: {
        url: "/api/projects/createproject",
        method: "post"
    },
    getallprojects: {
        url: "/api/projects/getallprojects",
        method: "get"
    },
    uploadImage : {
        url :'/api/file/upload',
        method : "post",
    },
}

export default SummaryApi

