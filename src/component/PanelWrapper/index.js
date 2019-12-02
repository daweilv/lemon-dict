import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import Panel from '@/component/Panel';

function PanelWrapper(props) {
    console.log('PanelWrapper');
    if (!props.isOpen) return null;
    return (
        <div
            className="ld-wrapper"
            style={{
                position: 'absolute',
                top: props.top,
                left: props.left,
                zIndex:2000
            }}
        >
            {props.children}
        </div>
    );
}

function createDictPanel(props) {
    console.log('createDictPanel');
    const div = document.createElement('div');
    div.className = 'ld-portal';
    document.body.appendChild(div);
    const curProps = { ...props, afterClose: destroy, close, isOpen: true };
    function render(p) {
        ReactDOM.render(
            <PanelWrapper top={p.top} left={p.left} isOpen={p.isOpen}>
                <Panel search={p.search} afterClose={p.afterClose} />
            </PanelWrapper>,
            div
        );
    }
    function destroy() {
        const unmountResult = ReactDOM.unmountComponentAtNode(div);
        if (unmountResult && div.parentNode) {
            div.parentNode.removeChild(div);
        }
    }
    function close() {
        render({ ...curProps, isOpen: false });
    }
    render(curProps);
    return {
        close,
        container: div.querySelector('.ld-wrapper'),
    };
}

export { createDictPanel };
