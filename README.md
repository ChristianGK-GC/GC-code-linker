# GC Code Linker

![Userscript](https://img.shields.io/badge/Userscript-JavaScript-yellow) ![Tampermonkey](https://img.shields.io/badge/Tampermonkey-Compatible-green) ![License](https://img.shields.io/badge/License-GPL%20v3-blue)

GC Code Linker is a userscript that turns geocache codes in web page text into links to [coord.info](https://coord.info/).

## Installation

1. Install a userscript manager such as [Tampermonkey](https://www.tampermonkey.net/) or [Violentmonkey](https://violentmonkey.github.io/).
2. [Install GC Code Linker](https://github.com/ChristianGK-GC/GC-code-linker/raw/refs/heads/main/gc-code-linker.user.js), or open [gc-code-linker.user.js](gc-code-linker.user.js) on GitHub and select **Raw**.
3. Confirm the installation in your userscript manager.

Your userscript manager can check for updates automatically when update checks are enabled.

## How it works

- Finds standalone uppercase codes beginning with `GC`, followed by one or more uppercase letters or digits, such as `GC12345`.
- Links codes to `https://coord.info/` and opens them in a new tab.
- Processes text added or changed after the page loads.
- Leaves existing links, form controls, and editable areas unchanged.

The script runs on HTTP and HTTPS pages. Browser restrictions may prevent userscripts from running on certain pages.

## Test

After installing the userscript, reload this page. Each code below should become a link:

For example, GC4 is a short code, GC12345 contains only digits after the prefix, and GCA0123 combines letters and digits.
