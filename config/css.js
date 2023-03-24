const px2rem = require('postcss-pxtorem');

module.exports = {
    loaderOptions: {
        less: {
            lessOptions: {
                javascriptEnabled: true
            }
        },
	    postcss: {
            postcssOptions: {
                plugins: [
                    px2rem({
                        rootValue: 192,
                        propList: ['*']
                    })
                ]
            }
	    }
    }
};
