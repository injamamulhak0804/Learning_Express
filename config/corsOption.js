const whiteList = ['http://localhost:3800/', 'https://www.google.com/',
    'https://expressjs.com/']
const corsOptions = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200
}

// export default corsOptions;

module.exports = corsOptions;