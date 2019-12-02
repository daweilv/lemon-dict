import { fetchDict } from '@/util/request';
import config from '@/component/dicts/cambridge/config';
import $ from '@/util/jqLite';

const parser = doc => {
    const data = $('.entry-body__el', doc).map(entry => {
        return {
            posgram: $('.posgram', entry).text(),
            ipa_uk: $('.uk .ipa', entry).text(),
            ipa_us: $('.us .ipa', entry).text(),
            senses: $('.dsense', entry).map(dsense => {
                return {
                    pos: $('.pos', dsense).text(),
                    guideword: $('.guideword span', dsense).text(),
                    definations: $('.def-block', dsense).map(defBlock => {
                        return {
                            defInfo: $('.def-info', defBlock).text(),
                            def: $('.def', defBlock).text(),
                            defTrans: $(
                                '.def-body > span.trans',
                                defBlock
                            ).text(),
                            examples: $('.examp', defBlock).map(examp => {
                                return {
                                    eg: $('.eg', examp).text(),
                                    trans: $('.trans', examp).text(),
                                };
                            }),
                        };
                    }),
                };
            }),
        };
    });
    console.log(data);
    return data;
};

export default parser;
