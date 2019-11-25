import React from 'react';
import './App.scss';
import { Tabs } from 'antd';

import dicts from './dicts/index';

const { TabPane } = Tabs;
function App() {
  return (
    <div className="lemon-dict">
      <div className="ld-head">
        <h2 className="ld-word">good</h2>
        <div className="ld-tools">
          <i className="material-icons">unfold_less</i>
          <i className="material-icons">favorite_border</i>
        </div>
      </div>

      <Tabs>
        {dicts.map(dict => {
          const View = dict.View;
          return (
            <TabPane
              key={dict.config.name}
              className="ld-tab-panel"
              tab={
                <span>
                  <img
                    className="ld-dict__icon"
                    src={dict.config.favicon}
                    alt=""
                  />
                  {dict.config.name}
                </span>
              }
            >
              <View search="good" />
            </TabPane>
          );
        })}
      </Tabs>
    </div>
  );
}

export default App;
