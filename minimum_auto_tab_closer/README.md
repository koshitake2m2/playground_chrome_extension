# minimum auto tab closer

## 概要
指定のurlのタブを数秒後に自動で閉じるChrome拡張機能.

## 用途
SlackやZoom等のurlからブラウザを経由してアプリを開く時, リダイレクト用のページが残るので自動で消したい.

## Install

1. このディレクトリをダウンロードする.
2. `manifest.json` の `content_scripts.matches` をお好みで修正する.
3. Chromeの拡張機能のページ(`chrome://extensions/`)を開く.
4. デベロッパー モードにする. (`デベロッパー モード` をクリックしてswitchをonにする.)
5. `パッケージ化されていない拡張機能を読み込む` をクリックして, このディレクトリを選択する.

## Test

- インストール後に試しに開いてみよう→ https://zoom.us/test

## Reference

Thanks!!

- [ethirolle/redirect-tab-closer](https://github.com/ethirolle/redirect-tab-closer)
- [ChromeAdmin/meetings-page-auto-closer-for-zoom](https://github.com/ChromeAdmin/meetings-page-auto-closer-for-zoom)
- [Extensions - Chrome Developers](https://developer.chrome.com/docs/extensions/)
