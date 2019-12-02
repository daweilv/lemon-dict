import cambridge from './cambridge';
import collins from './collins';

export default [cambridge, collins];

export const dicts = {
    cambridge,
    collins,
};

export const getDicts = dictType => {
    return dicts[dictType];
};
