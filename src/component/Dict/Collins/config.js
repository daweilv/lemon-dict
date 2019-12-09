import icon from './icon.png';
export default {
    name: 'collins',
    icon,
    url: search =>
        `https://dictionary.cambridge.org/dictionary/english-chinese-simplified/${encodeURIComponent(
            search
        )}`,
};
