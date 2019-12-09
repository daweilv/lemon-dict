import React, { useState, useEffect } from 'react';
import config from './config';
import { fetchDict } from '@/util/request';
import Def from './Def';

function View(props) {
    console.log('props', props);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [item, setItem] = useState(null);

    useEffect(() => {
        console.log('useEffect');
        fetchDict(config.name, props.search)
            .then(data => {
                setItem(data);
                setIsLoading(false);
            })
            .catch(err => {});
        return () => {
            console.log('1111');
        };
    }, [props.search]);
    if (isError) return <div>Something went wrong.</div>;

    return isLoading ? (
        <div>loading</div>
    ) : (
        <>
            <div className="ld-title">{item.word}</div>
            <div className="ld-speeches">
                <span className="ld-speech">
                    UK
                    <i className="material-icons">volume_up</i>
                    <span className="phonetic">/{item.ipa_uk}/</span>
                </span>
                <span className="ld-speech">
                    US
                    <i className="material-icons">volume_up</i>
                    <span className="phonetic">/{item.ipa_us}/</span>
                </span>
            </div>
            <div className="ld-entries">
                {item.entries.map(entry => (
                    <div className="ld-entry">
                        <div className="ld-info">
                            <span className="ld-pos">{entry.pos}</span>
                            <span className="ld-codes">
                                {entry.codes.map(o => (
                                    <code>{o}</code>
                                ))}
                            </span>
                        </div>
                        <div className="ld-senses">
                            {entry.senses.map(sense => (
                                <div className="ld-sense">
                                    <div className="ld-sense-info">
                                        <span className="ld-sense-level">
                                            {sense.pos}
                                        </span>
                                        <span className="ld-guide-word">
                                            {sense.guide_word}
                                        </span>
                                    </div>
                                    <div className="ld-defs">
                                        {sense.defs.map(def => (
                                            <Def def={def} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default View;
