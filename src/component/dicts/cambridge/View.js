import React, { useState, useEffect } from 'react';
import config from './config';
import { fetchDict } from '@/util/request';

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
            <div className="ld-speeches">
                <span className="ld-speech">
                    UK
                    <i className="material-icons">volume_up</i>
                    <span className="phonetic">/ɡʊd/</span>
                </span>
                <span className="ld-speech">
                    US
                    <i className="material-icons">volume_up</i>
                    <span className="phonetic">/ɡʊd/</span>
                </span>
            </div>
            <div className="ld-explains">
                {item[0].senses[0].definations.map(o => (
                    <div key={o.def}>
                        <p>{o.def}</p>
                        <p>{o.defTrans}</p>
                    </div>
                ))}
            </div>
        </>
    );
}

export default View;
