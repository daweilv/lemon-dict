import icon from './icon.png';
export default {
    name: 'cambridge',
    icon,
    url: search =>
        `https://dictionary.cambridge.org/dictionary/english-chinese-simplified/${encodeURIComponent(
            search
        )}`,
};
