export function getFromStorage(key){
    if(!key){
        return null;
    }
    try{
        const valueStr = localStorage.getItem(key);
        if(valueStr){
            return valueStr;
        }
        return null;
    }catch (err){
        return null;
    }
}

export function setInStorage(key, obj){
    if(!key){
        console.error('Error: Key is missing');
    }
    try{
        localStorage.setItem(key, obj);
    }catch(err){
        console.error(err);
    }
}

export function removeInStorage(key){
    if(!key){
        console.error('Error: key is missing');
    }
    try{
        localStorage.removeItem(key);
    }catch(err){
        console.error(err)
    }
}