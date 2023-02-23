export interface IdGenerator {
  generate: () => string;
}

export class MathRandomIdGenerator implements IdGenerator {
  constructor() {}
  generate: () => string = () => {
    return String(Math.random() * 10000000000000000);
  };
}

export interface Tab {
  /**
   * NOTE: chrome.tabs.Tab.idそのままであるため要注意
   * - すでに一度閉じたタブのidは無効なidになるため, タブ関連の操作では扱えない.
   * - 識別子としてそのまま利用しているだけ.
   */
  id?: number;
  url?: string;
  faviconUrl?: string;
  title?: string;
}

export interface Workspace {
  id: string;
  name: string;
  tabs: Tab[];
}

export interface Setting {
  workspaces: Workspace[];
}
