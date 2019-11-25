import React, { useState, useEffect } from 'react';
import { parseHTML } from './index';

function View(props) {
  console.log('props', props);
  const [isLoading, setIsLoading] = useState(true);
  const [item, setItem] = useState(null);
  useEffect(() => {
    console.log('useEffect');
    parseHTML(props.search).then(data => {
      // console.log(res);

      setItem(data);
      setIsLoading(false);
    });
  }, [props.search]);

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
        {item[0].senses[0].definations.map(o=> (
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
