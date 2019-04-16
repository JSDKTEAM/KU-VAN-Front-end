export const UpdateObject = (oldObject, updateObject) => {
    return {
        ...oldObject,
        ...updateObject
    }
}