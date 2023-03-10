# simple tab manager

This is a simple tab manager.

This is inspired by [OneTab](https://www.one-tab.com/), and [Workona Tab Manager](https://workona.com/tab-manager/).

## Features

- save tabs as workspace

### Next features (Not implemented)

- [ ] fix UI
- [ ] rename workspace
- [ ] confirm modal before delete workspace
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

- [ ] domain service (usecase)
- [ ] unit test
- [ ] on memory repository for local test
- [ ] multi projects and build by one command.

### Setup Log

```bash
npx create-next-app@latest
npm i -D @types/chrome
npm i @mui/material @mui/icons-material @emotion/react @emotion/styled
npm i -D watch
npm i -D @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint
npm i -D eslint-plugin-react eslint-plugin-import
npm i -D eslint-plugin-jsx-a11y eslint-plugin-react-hooks
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier husky lint-staged
```
