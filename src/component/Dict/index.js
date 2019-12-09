import cambridge from './Cambridge';
import collins from './Collins';

export default [cambridge, collins];

export const Dicts = {
    cambridge,
    collins,
};

export const getDict = dictType => {
    return Dicts[dictType];
};
