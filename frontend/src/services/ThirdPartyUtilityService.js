import axios from 'axios';

const Post = async function(url, data, headers){
    try{
        const response = axios.post(url, data, {headers});
        return response
    }
    catch(err){
        return err;
    }
}
const Patch = async function(url, data, headers){
    try{
        const response = axios.patch(url, data, {headers});
        return response
    }
    catch(err){
        return err;
    }
}

const Get = async function(url, headers){
    try{
        const response = axios.get(url, {headers});
        return response;
    }
    catch(err){
        return err;
    }
}

export {Get, Post, Patch};