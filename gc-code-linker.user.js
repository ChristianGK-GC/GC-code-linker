// ==UserScript==
// @name         GC Code Linker
// @namespace    https://github.com/ChristianGK-GC/GC-code-linker
// @author       ChristianGK
// @version      1.4
// @description  Links GC codes on web pages to coord.info.
// @updateURL    https://github.com/ChristianGK-GC/GC-code-linker/raw/refs/heads/main/gc-code-linker.user.js
// @downloadURL  https://github.com/ChristianGK-GC/GC-code-linker/raw/refs/heads/main/gc-code-linker.user.js
// @match        *://*/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    const excluded = 'a, script, style, noscript, textarea, select, button, [contenteditable], svg, math';

    function linkCodes(root) {
        if (root.nodeType === Node.ELEMENT_NODE && root.matches(excluded)) return;

        const nodes = [];
        if (root.nodeType === Node.TEXT_NODE) nodes.push(root);
        else {
            const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
            while (walker.nextNode()) nodes.push(walker.currentNode);
        }

        for (const node of nodes) {
            if (!node.parentElement || node.parentElement.closest(excluded)) continue;

            const matches = Array.from(node.data.matchAll(/\bGC[0-9A-Z]+\b/g));
            if (!matches.length) continue;

            const fragment = document.createDocumentFragment();
            let offset = 0;
            for (const match of matches) {
                fragment.append(node.data.slice(offset, match.index));
                const link = document.createElement('a');
                link.href = `https://coord.info/${match[0]}`;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.textContent = match[0];
                link.style.backgroundColor = '#b9e1a6';
                link.style.color = '#00693d';
                link.style.borderRadius = '2px';
                link.style.padding = '0 2px';
                link.style.textDecoration = 'underline';
                fragment.append(link);
                offset = match.index + match[0].length;
            }
            fragment.append(node.data.slice(offset));
            node.replaceWith(fragment);
        }
    }

    linkCodes(document.body);
    new MutationObserver(records => {
        for (const record of records) {
            if (record.type === 'characterData') linkCodes(record.target);
            for (const node of record.addedNodes) linkCodes(node);
        }
    }).observe(document.body, { childList: true, characterData: true, subtree: true });
})();
