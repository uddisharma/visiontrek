
const StoreToken = (value) =>{

    if(value){
        const {access ,refresh}=value;
        localStorage.setItem("access_token",access)
        localStorage.setItem("refresh_token",refresh)
    }
}

const GetToken =()=>{
    let access_token=localStorage.getItem("access_token")
    let refresh_token=localStorage.getItem("refresh_token")
    return{access_token,refresh_token}
}


const RemoveToken =()=>{
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    localStorage.removeItem("oauth2_ss::http://localhost:3000::1::DEFAULT::_ss_")
}

export {StoreToken,GetToken,RemoveToken}