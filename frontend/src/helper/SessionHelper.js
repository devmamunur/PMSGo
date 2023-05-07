class SessionHelper{
    setToken(token){
        localStorage.setItem("token", token);
    }
    getToken(){
       return  localStorage.getItem("token");
    }
    setUserDetails(data){
        localStorage.setItem("userDetails", JSON.stringify(data));
    }
    getUserDetails(){
       return  JSON.parse(localStorage.getItem("userDetails"));
    }
}

export const {setToken, getToken, setUserDetails, getUserDetails} = new  SessionHelper();