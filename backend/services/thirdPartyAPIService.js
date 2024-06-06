const axios = require('axios');

const get = async (url) => {
    try{
        const response = await axios.get(url);
        return response;
    }
    catch(error){
        return error;
    }
}


module.exports = {
    get,
}