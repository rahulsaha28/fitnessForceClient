import jwt from 'jsonwebtoken';

export const authenticationTokenSaver = (token)=>{
    // access the local storage
    localStorage.setItem('token', `barer ${token}`);
}



export const getUserFromToken = ()=>{
    const token = localStorage.getItem('token');
    if(token){
        const newToken = token.split(' ')[1];
        return jwt.decode(newToken);
    }
    else{
        return {}
    }
}

export const getToken = ()=>{
    const token = localStorage.getItem('token');
    if(token){
        return token;
    }
    else{
        return null;
    }
}

export const logOut = ()=>{
    localStorage.clear("token");
}