import config from './config';
import { fetchDocument } from '../../util/request';
import View from './View';
import $ from '../../util/jqLite';

export const parseHTML = async search => {
  console.time('fetchDocument');
  const doc = await fetchDocument(config.url(search));
  console.timeEnd('fetchDocument');
  console.time('parseDocument');

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
              defTrans: $('.def-body > span.trans', defBlock).text(),
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
  console.timeEnd('parseDocument');
  console.log(JSON.stringify(data));
  return data;
};

export default {
  View,
  config,
};
