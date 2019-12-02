export default {
    name: 'cambridge',
    favicon:
        'https://dictionary.cambridge.org/external/images/favicon.ico?version=5.0.59',
    url: search =>
        `https://dictionary.cambridge.org/dictionary/english-chinese-simplified/${encodeURIComponent(
            search
        )}`,
};
