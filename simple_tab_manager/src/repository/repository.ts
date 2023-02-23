import { Tab, Workspace } from "@/domain/model";

export interface TabRepository {
    findCurrent: (options: { pinned?: boolean }) => Promise<Tab[]>;
    create: (tabs: Tab[]) => Promise<Tab[]>;
    remove: (tabs: Tab[]) => Promise<void>;
}

export class ChromeTabRepository implements TabRepository {
    constructor() { }
    findCurrent = async (options: { pinned?: boolean }) => {
        const chromeTabs = await chrome.tabs.query(options);
        const tabs = chromeTabs.map((t) => {
            const tab: Tab = {
                id: t.id,
                url: t.url,
                faviconUrl: t.favIconUrl,
                title: t.title,
            };
            return tab;
        });
        return tabs;
    }

    create = async (tabs: Tab[]) => {
        return await Promise.all(tabs.map(async (tab) => {
            const newChromeTab = await chrome.tabs.create({
                url: tab.url ?? '',
                active: false,
            });
            const newTab: Tab = {
                id: newChromeTab.id,
                url: newChromeTab.url,
                faviconUrl: newChromeTab.favIconUrl,
                title: newChromeTab.title,
            };
            return newTab;
        }));
    }

    remove = async (tabs: Tab[]) => {
        await Promise
            .all(tabs.map((tab) => {
                return chrome.tabs.remove(tab.id ?? NaN);
            }));
    }

}

export interface WorkspaceRepository {
    findAll: () => Promise<Workspace[]>
    create: (workspace: Workspace) => Promise<void>
}

export class ChromeWorkspaceRepository implements WorkspaceRepository {
    private workspacesKey = "workspaces"

    findAll = async () => {
        return await chrome.storage.local.get(this.workspacesKey).then((values) => (values[this.workspacesKey] ?? []) as Workspace[])
    }

    create = async (workspace: Workspace) => {
        const currentWorkspaces = await this.findAll();
        const newWorkspaces = [...currentWorkspaces, workspace]
        let keyValue: { [key: string]: any } = {}
        keyValue[this.workspacesKey] = newWorkspaces
        await chrome.storage.local.set(keyValue)
    }
}