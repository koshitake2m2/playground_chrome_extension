import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react';
import { Button, Input } from '@mui/material';
import Image from 'next/image';
import { di } from '@/di/di';
import { Tab, Workspace } from '@/domain/model';

export default function Home() {
  const [isLoading, setLoading] = useState(false);
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [workspaceName, setWorkspaceName] = useState<string>('');
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);

  useEffect(() => {
    setLoading(true);
    di.tabRepository
      .findCurrent({ pinned: false })
      .then((currentTabs) => {
        setTabs(currentTabs);
        return refreshWorkspaces();
      })
      .then(() => setLoading(false));
  }, []);

  const handleChangeWorkspaceName: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    setWorkspaceName(target.value);
  };

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();

    const currentTabs = await di.tabRepository.findCurrent({ pinned: false });
    const newWorkspace: Workspace = {
      workspaceName,
      tabs: currentTabs,
    };

    await di.workspaceRepository.create(newWorkspace);
    await refreshWorkspaces();
  };

  const refreshWorkspaces: () => Promise<void> = async () => {
    const workspaces = await di.workspaceRepository.findAll();
    setWorkspaces(workspaces);
  };

  const changeWorkspace = async (workspace: Workspace) => {
    const currentTabs = await di.tabRepository.findCurrent({ pinned: false });
    await di.tabRepository.remove(currentTabs);
    return await di.tabRepository.create(workspace.tabs);
  };

  const listTabs = (tabs: Tab[]) =>
    tabs.map((tab) => (
      <li key={tab.id}>
        <Image src={tab.faviconUrl ?? ''} alt='favicon' />
        <a href={tab.url}>
          {tab.id}:{tab.title}
        </a>
      </li>
    ));

  const listWorkspaces = workspaces.map((workspace) => (
    <li key={workspace.workspaceName}>
      <Button onClick={() => changeWorkspace(workspace)}>
        {workspace.workspaceName}
      </Button>
      <ul>{listTabs(workspace.tabs)}</ul>
    </li>
  ));

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Head>
        <title>Simple Tab Manager</title>
      </Head>
      <form>
        <Input
          type='text'
          value={workspaceName}
          onChange={handleChangeWorkspaceName}
        ></Input>
        <Button type='submit' onClick={handleSubmit}>
          Submit
        </Button>
      </form>
      <main className={styles.main}>
        <h2>Current Tabs</h2>
        <ul>{listTabs(tabs)}</ul>
        <h2>Workspaces</h2>
        <ul>{listWorkspaces}</ul>
      </main>
    </>
  );
}
