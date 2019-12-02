module.exports = function(api) {
    api.cache(true);
    return {
        presets: [
            [
                '@babel/preset-env',
                {
                    forceAllTransforms: true,
                },
            ],
            '@babel/preset-react',
        ],
        plugins: [
        ],
    };
};
