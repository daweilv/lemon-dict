import React, { useEffect } from 'react';
import './style.less';
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Dicts from '@/component/Dict/index';
import ErrorBoundary from '@/component/Dict/ErrorBoundary';

function Panel({ search, afterClose }) {
    useEffect(() => {
        return () => {
            console.log('Panel distory');
            afterClose();
        };
    }, []);
    return (
        <div className="lemon-dict">
            <div className="ld-head">
                <div className="ld-word">{search}</div>
                <div className="ld-tools">
                    <i className="material-icons">unfold_less</i>
                    <i className="material-icons">favorite_border</i>
                </div>
            </div>

            <Tabs>
                <TabList>
                    {Dicts.map(dict => (
                        <Tab key={dict.config.name}>
                            <span>
                                <img
                                    className="ld-dict__icon"
                                    src={dict.config.icon}
                                    alt={dict.config.name}
                                />
                                {dict.config.name}
                            </span>
                        </Tab>
                    ))}
                </TabList>
                {Dicts.map(dict => {
                    const View = dict.View;
                    return (
                        <TabPanel key={dict.config.name}>
                            <div className="ld-tab-panel">
                                <ErrorBoundary>
                                    <View search={search} />
                                </ErrorBoundary>
                            </div>
                        </TabPanel>
                    );
                })}
            </Tabs>
        </div>
    );
}

export default Panel;
