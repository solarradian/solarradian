import Axios from "./Axios"
import SummaryApi from "../common/SummaryApi.js"

const fetchUsersDetails = async()=>{
    try {
        const response = await Axios({
            ...SummaryApi.usersDetails
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export default fetchUsersDetails;