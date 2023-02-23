import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { ChangeEventHandler, MouseEventHandler, useEffect, useState } from 'react'
import { Button, Input } from '@mui/material';
import Image from 'next/image';

/**
 * データ設計
 * - setting:
 * - workspaces:
 */

const emptySetting: Setting = {
  workspaces: []
}

interface Setting {
  workspaces: Workspace[]
}

interface Workspace {
  workspaceName: string
  tabs: Tab[]
}

interface Tab {
  id?: number
  url?: string
  faviconUrl?: string
  title?: string
}

const workspacesKey = "workspaces"

export default function Home() {
  const [isLoading, setLoading] = useState(false);
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [workspaceName, setWorkspaceName] = useState<string>('');
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [setting, setSetting] = useState<Setting>(emptySetting);
  const storageKey = "SIMPLE_TAB_MANAGER_KEY_TEST"

  useEffect(() => {
    setLoading(true);
    chrome.tabs.query({}).then((currentTabs) => {
      const _tabs = currentTabs.map((t) => {
        const tab: Tab = {
          id: t.id,
          url: t.url,
          faviconUrl: t.favIconUrl,
          title: t.title,
        }
        return tab
      })
      return setTabs(_tabs)
    }).then(() => {
      return refreshWorkspaces()
    }).then(() => setLoading(false));
  }, [])

  const handleChangeWorkspaceName: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setWorkspaceName(target.value);
  };

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    console.log('on submit')

    Promise.all([
      chrome.storage.local.get(workspacesKey).then((values) => (values[workspacesKey] ?? []) as Workspace[]),
      chrome.tabs.query({}),
    ]).then(([currentWorkspaces, currentTabs]) => {
      const newWorkspace: Workspace = {
        workspaceName,
        tabs: currentTabs.map((t) => {
          const tab: Tab = {
            id: t.id,
            url: t.url,
            faviconUrl: t.favIconUrl,
            title: t.title,
          }
          return tab
        }),
      }
      const newWorkspaces = [...currentWorkspaces, newWorkspace]
      let keyValue: { [key: string]: any } = {}
      keyValue[workspacesKey] = newWorkspaces
      console.log('submit', keyValue)
      return chrome.storage.local.set(keyValue)
    }).then(() => {
      return refreshWorkspaces()
    })
  };

  const refreshWorkspaces: () => Promise<void> = () => {
    return chrome.storage.local.get(workspacesKey).then((values) => {
      console.log('refresh values:', values)
      return (values[workspacesKey] ?? []) as Workspace[]
    }
    ).then((workspaces) => {
      setWorkspaces(workspaces)
    })
  }

  const changeWorkspace = (workspace: Workspace) => {
    return chrome.tabs.query({}).then((currentChromeTabs) => {
      // 先頭要素は削除しない
      currentChromeTabs.shift()
      currentChromeTabs.shift()
      return Promise
        .all(currentChromeTabs.map((chromeTab) => {
          return chrome.tabs.remove(chromeTab.id ?? NaN);
        }))
        .then(() => {
          return Promise.all(workspace.tabs.map((tab) => {
            return chrome.tabs.create({
              url: tab.url ?? ''
            })
          }))
        });
    })
  }

  const listTabs = (tabs: Tab[]) => tabs.map((tab) => <li key={tab.id}><Image src={tab.faviconUrl ?? ''} alt="favicon" /><a href={tab.url}>{tab.id}:{tab.title}</a></li>);

  const listWorkspaces = workspaces.map((workspace) => <li key={workspace.workspaceName}><Button onClick={() => changeWorkspace(workspace)}>{workspace.workspaceName}</Button>
    <ul>{listTabs(workspace.tabs)}</ul>
  </li>)

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Head>
        <title>Simple Tab Manager</title>
      </Head>
      <form >
        <Input type="text" value={workspaceName} onChange={handleChangeWorkspaceName}></Input>
        <Button type="submit" onClick={handleSubmit}>Submit</Button>
      </form>
      <main className={styles.main}>
        <h2>Current Tabs</h2>
        <ul>{listTabs(tabs)}</ul>
        <h2>Workspaces</h2>
        <ul>{listWorkspaces}</ul>
      </main>
    </>
  )
}
