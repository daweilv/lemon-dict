import axios from 'axios';
import { getDicts } from '@/component/dicts';

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(
        sender.tab
            ? 'from a content script:' + sender.tab.url
            : 'from the extension'
    );
    const { dictType, search } = request;
    const dict = getDicts(dictType);
    axios
        .request({
            url: dict.config.url(search),
            responseType: 'document',
            withCredentials: false,
            // cancelToken,
        })
        .then(res => {
            console.log(res.status);
            console.log(res.data.documentElement.innerHTML);
            sendResponse({ res: dict.parser(res.data) });
            // sendResponse({ res: res.data });
        })
        .catch(err => {
            console.log('catch', err);
            sendResponse({ err });
        });
    return true;
});
