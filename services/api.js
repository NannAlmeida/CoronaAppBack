const axios = require('axios').default;

const api = axios.create({
    baseURL: 'https://covid19-brazil-api.now.sh/api'
});

module.exports = api;