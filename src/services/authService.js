export async function login(usernameOrEmail, password){
    const rawResponse = fetch("https://mix-n-mash.herokuapp.com/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            username: usernameOrEmail,
            password: password
        })
    });

    const response = await rawResponse;

    if(response.ok){
        return response.json();
    } else {
        return {error: response.status, message: await response.text()}
    }
}

export async function logout(){
    const rawResponse = fetch("https://mix-n-mash.herokuapp.com/auth/logout", {
        method: "GET",
        credentials: "include",
        headers: {
            Accept: "none",
        }
    });

    const response = await rawResponse;

    if(response.ok){
        return response.text();
    } else {
        return false;
    }
}

export async function signup(username, email, password){
    const rawResponse = fetch("https://mix-n-mash.herokuapp.com/auth/signup", {
        method: "POST",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password
        })
    });

    const response = await rawResponse;
    
    if(response.ok){
        return response.json();
    } else {
        return {error: response.status, message: await response.text()}
    }
    
}

export async function getUser(){
    const rawResponse = fetch("https://mix-n-mash.herokuapp.com/auth/user", {
        method: "GET",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    })

    const response = await rawResponse;

    if(response.ok){
        return response.json();
    } else {
        return {error: response.status, message: await response.text()}
    }
}

export async function changePassword(username, password, newPassword){
    const rawResponse = fetch("https://mix-n-mash.herokuapp.com/auth/changePassword", {
        method: "POST",
        credentials: "include",
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            username: username,
            password: password,
            newPassword: newPassword
        })
    });

    const response = await rawResponse;

    if(response.ok){
        return response.text();
    } else {
        return {error: response.status, message: await response.text()}
    }
}

export async function forgotPassword(email){
    const rawResponse = fetch("https://mix-n-mash.herokuapp.com/auth/forgotPassword", {
        method: "POST",
        credentials: "include",
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            email: email,
        })
    });

    const response = await rawResponse;

    if(response.ok){
        return response.text();
    } else {
        return {error: response.status, message: await response.text()}
    }
}

export async function resetPassword(email, tempCode, newPassword){
    const rawResponse = fetch("https://mix-n-mash.herokuapp.com/auth/verifyCode", {
        method: "POST",
        credentials: "include",
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            email: email,
            tempCode: tempCode,
            newPassword: newPassword
        })
    });

    const response = await rawResponse;

    if(response.ok){
        return response.text();
    } else {
        return {error: response.status, message: await response.text()}
    }
}