import $ from '@/util/jqLite';

const parser = doc => {
    const item = {
        word: $('.headword', doc)
            .eq(0)
            .text(),
    };
    if (!item.word) throw new Error('no_word');
    item.ipa_uk = $('.uk .ipa', doc)
        .eq(0)
        .text();
    item.pron_uk = $('.uk amp-audio > source', doc)
        .eq(0)
        .attr('src');
    item.ipa_us = $('.us .ipa', doc)
        .eq(0)
        .text();
    item.pron_us = $('.us amp-audio > source', doc)
        .eq(0)
        .attr('src');
    item.entries = $('.entry-body__el', doc).map(entry => {
        return {
            pos: $('.pos-header .pos', entry).text(),
            codes: $('.pos-header .dgc', entry).map(o => $(o).text()),
            senses: $('.dsense', entry).map(sense => {
                return {
                    pos: $('.pos', sense).text(),
                    guide_word: $('.guideword span', sense).text(),
                    defs: $('.sense-body > div[class*="-block"]', sense).map(
                        block => {
                            const item = {
                                type: block.classList.contains('def-block')
                                    ? 'def'
                                    : 'phrase',
                                level: $('.epp-xref', block).text(),
                                codes: $('.dgc', block).map(o => $(o).text()),
                                def: $('.def', block).text(),
                                def_trans: $(
                                    '.def-body > span.trans',
                                    block
                                ).text(),
                                examples: $('.examp', block).map(examp => {
                                    return {
                                        eg: $('.eg', examp).text(),
                                        trans: $('.trans', examp).text(),
                                    };
                                }),
                            };
                            if (item.type === 'phrase') {
                                item.phrase = $('.phrase-title', block).text();
                            }
                            return item;
                        }
                    ),
                };
            }),
        };
    });

    console.log(JSON.stringify(item));
    return item;
};

export default parser;
