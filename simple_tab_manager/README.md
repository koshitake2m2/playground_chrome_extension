# simple tab manager

This is a simple tab manager.

This is inspired by [OneTab](https://www.one-tab.com/), and [Workona Tab Manager](https://workona.com/tab-manager/).

## Features

- save tabs as workspace

### Next features (Not implemented)

- [ ] fix UI
- [ ] delete & rename workspace
- [ ] add new tab to workspace
- [ ] save tab groups
- [ ] shortcuts setting
- [ ] output chrome.storage.local as json

## Install

1. download this directory.
2. `npm ci`
3. `npm run build`
4. Open `chrome://extensions/` in Chrome and upload this directory.

## Develop

1. Start build:watch.

```bash
npm run build:watch
```

2. Open extension option page.
3. Fix code and reload page.

### Develop Todo

- [ ] lint
- [ ] domain service (usecase)

### Setup Log

```bash
npx create-next-app@latest
npm i -D @types/chrome
npm i @mui/material @mui/icons-material @emotion/react @emotion/styled
npm i -D watch
npm i -D @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint
```
