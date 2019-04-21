export const UpdateObject = (oldObject, updateObject) => {
    return {
        ...oldObject,
        ...updateObject
    }
}

export const GetSessionUser = () => {
    let userSession = JSON.parse(sessionStorage.getItem('UserSession'));
    return userSession;
    
}