export default {
    name: 'collins',
    favicon: 'https://www.collinsdictionary.com/zh/favicon-32x32.png',
    url: search =>
        `https://dictionary.cambridge.org/dictionary/english-chinese-simplified/${encodeURIComponent(
            search
        )}`,
};
