import { createDictPanel } from '@/component/PanelWrapper';
import { debounce } from '@/util';

let panel;

function onDictEvent(e) {
    console.log('onDictEvent');
    if (isInsideDictPanel(e.target)) return;
    const { pageX, pageY } = e;
    let search = String(window.getSelection());
    search = search.replace(/^\s*/, '').replace(/\s*$/, '');
    if (search === '') {
        console.log('empty word');
        return;
    }
    if (panel) {
        panel.close();
        panel = undefined;
    }
    panel = createDictPanel({
        search,
        top: pageY + 10,
        left: pageX + 10,
    });
}

function onClick(e) {
    console.log('onClick');
    const container = document.querySelector('.ld-wrapper');
    if (
        container &&
        panel &&
        !container.contains(e.target) &&
        container !== e.target
    ) {
        console.log('close');
        panel.close();
        panel = undefined;
    }
}

function isInsideDictPanel(target) {
    const container = document.querySelector('.ld-portal');
    return container && container.contains(target);
}

const debounced = debounce(onDictEvent, 200);
window.addEventListener('mouseup', debounced, false);
window.addEventListener('click', onClick, false);
