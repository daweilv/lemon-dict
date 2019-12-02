export const debounce = function(fn, timeout) {
    let lastCall = null;
    let now = () => new Date().getTime();
    let timer = null;
    return (...args) => {
        if (timer && lastCall && now() - lastCall < timeout) {
            console.log('clearTimeout');
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            console.log('invoke');
            fn.apply(this, args);
        }, timeout);
        lastCall = now();
    };
};
