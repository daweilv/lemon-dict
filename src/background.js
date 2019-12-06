import { fetchDictReal } from '@/util/request';

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(
        sender.tab
            ? 'from a content script:' + sender.tab.url
            : 'from the extension'
    );
    fetchDictReal(request).then(sendResponse);
    return true;
});
