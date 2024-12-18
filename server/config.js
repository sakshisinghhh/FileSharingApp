const path = require('path');

const basedir = __dirname

const Config = {
    PORT: 5000,
    BACKEND_DOMAIN: "http://localhost:5000",
    BASE_DIR: basedir,
    FILE_LINK_EXPIRY_IN_MINUTES:10,// i am setting 1 minute expiry time to check this functionality working or not 
    CRYPTR_TOKEN: "fddffd",
};

module.exports = {
    Config,
};