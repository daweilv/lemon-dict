export const fetchDict = (dictType, search) => {
    return new Promise(function(resolve, reject) {
        chrome.runtime.sendMessage({ dictType, search }, function({
            err,
            res,
        }) {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};
