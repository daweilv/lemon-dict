import $ from '@/util/jqLite';

const parser = doc => {
    const item = {
        word: $('.headword', doc).text(),
    };
    if (!item.word) throw new Error('no_word');
    item.ipa_uk = $('.uk .ipa', doc)
        .eq(0)
        .text();
    item.pron_uk = $('.uk audio > source', doc)
        .eq(0)
        .attr('src');
    item.ipa_us = $('.us .ipa', doc)
        .eq(0)
        .text();
    item.pron_us = $('.us audio > source', doc)
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
                    defs: $('.def-block', sense).map(defBlock => {
                        return {
                            level: $('.epp-xref', defBlock).text(),
                            codes: $('.dgc', defBlock).map(o => $(o).text()),
                            def: $('.def', defBlock).text(),
                            def_trans: $(
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

    console.log(item);
    return item;
};

export default parser;
