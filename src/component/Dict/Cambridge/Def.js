import React from 'react';

const Def = ({ def }) => {
    if (def.type === 'def') {
        return (
            <div className="ld-def-block">
                <div className="ld-def-info">
                    <span className="ld-level">{def.level}</span>
                    <span className="ld-codes">
                        {def.codes.map(o => (
                            <code>{o}</code>
                        ))}
                    </span>
                </div>
                <div className="ld-def"><strong>{def.def}</strong></div>
                <div className="ld-def-trans">{def.def_trans}</div>
                <ul className="ld-examples">
                    {def.examples.map(example => (
                        <li className="ld-example">
                            <div className="ld-eg">
                                <i>{example.eg}</i>
                            </div>
                            <div className="ld-trans">
                                <i>{example.trans}</i>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    } else {
        return (
            <div className="ld-phrase-block">
                <div className="ld-phrase-title">{def.phrase}</div>
                <div className="ld-def-info">
                    <span className="ld-level">{def.level}</span>
                    <span className="ld-codes">{def.codes}</span>
                </div>
                <div className="ld-def">{def.def}</div>
                <div className="ld-def-trans">{def.def_trans}</div>
                <ul className="ld-examples">
                    {def.examples.map(example => (
                        <li className="ld-example">
                            <div className="ld-eg">{example.eg}</div>
                            <div className="ld-trans">{example.trans}</div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
};

export default Def;
