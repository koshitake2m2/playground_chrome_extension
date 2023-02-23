export interface Setting {
  workspaces: Workspace[];
}

export interface Workspace {
  workspaceName: string;
  tabs: Tab[];
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
