import { getDicts } from '@/component/dicts';
import axios from 'axios';

export const fetchDict = (dictType, search) => {
    if (process.env.DEVICE === 'extension') {
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
    } else {
        return fetchDictReal({ dictType, search });
    }
};

export const fetchDictReal = param => {
    const { dictType, search } = param;
    const dict = getDicts(dictType);
    return new Promise(function(resolve, reject) {
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        let url = dict.config.url(search);
        if (process.env.DEVICE !== 'extension') url = proxy + url;
        axios
            .request({
                url: url,
                responseType: 'document',
                withCredentials: false,
                // cancelToken,
            })
            .then(res => {
                console.log(res.status);
                // console.log(res.data.documentElement.innerHTML);
                resolve({ res: dict.parser(res.data) });
                // callback({ res: res.data });
            })
            .catch(err => {
                console.log('catch', err);
                resolve({ err });
            });
    });
};
