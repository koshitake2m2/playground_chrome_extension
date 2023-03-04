import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  IconButton,
  Input,
} from '@mui/material';
import Image from 'next/image';
import { di } from '@/di/di';
import { Tab, Workspace } from '@/domain/model';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';

const emptyWorkspace: Workspace = {
  id: '',
  name: '',
  tabs: [],
  updatedAt: new Date(),
};

export default function Home() {
  const [isLoading, setLoading] = useState(false);
  // FIXME: tabs.onCreated,onUpdatedでopenedをsave.
  // FIXME: openedをクローズしたら、
  const [currentWorkspace, setCurrentWorkspace] =
    useState<Workspace>(emptyWorkspace);
  // const [workspaceName, setWorkspaceName] = useState<string>('');
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);

  const refreshWorkspaces: () => Promise<void> = async () => {
    const workspaces = await di.workspaceRepository.findAll();
    setWorkspaces(workspaces);
  };

  useEffect(() => {
    setLoading(true);
    di.tabRepository
      .findCurrent({ pinned: false })
      .then((currentTabs) => {
        setCurrentWorkspace({
          id: di.idGenerator.generate(),
          name: '',
          tabs: currentTabs,
          updatedAt: new Date(),
        });
        return refreshWorkspaces();
      })
      .then(() => setLoading(false));
  }, []);

  const handleChangeWorkspaceName: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    setCurrentWorkspace({
      id: currentWorkspace.id,
      name: target.value,
      tabs: currentWorkspace.tabs,
      updatedAt: new Date(),
    });
  };

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();

    await di.workspaceRepository.create(currentWorkspace);
    setCurrentWorkspace({
      id: di.idGenerator.generate(),
      name: currentWorkspace.name,
      tabs: currentWorkspace.tabs,
      updatedAt: new Date(),
    });
    await refreshWorkspaces();
  };

  const changeWorkspace = async (workspace: Workspace) => {
    const currentTabs = await di.tabRepository.findCurrent({ pinned: false });
    await di.tabRepository.remove(currentTabs);
    return await di.tabRepository.create(workspace.tabs);
  };

  const removeWorkspace = async (workspace: Workspace) => {
    await di.workspaceRepository.remove(workspace);
    await refreshWorkspaces();
  };

  /**
   * JSX
   */

  const listTabsElements = (tabs: Tab[]) =>
    tabs.map((tab) => (
      <li key={tab.id}>
        <Image src={tab.faviconUrl ?? ''} alt='' width='16' height='16' />
        <a href={tab.url}>{tab.title}</a>
      </li>
    ));

  const workspaceElement = (workspace: Workspace) => (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Button onClick={() => changeWorkspace(workspace)}>
            {workspace.name}
          </Button>
          <IconButton
            onClick={() => removeWorkspace(workspace)}
            disabled={workspace.id === currentWorkspace.id}
          >
            <DeleteIcon />
          </IconButton>
        </AccordionSummary>
        <AccordionDetails>
          <ul>{listTabsElements(workspace.tabs)}</ul>
        </AccordionDetails>
      </Accordion>
    </>
  );

  const listWorkspacesElements = workspaces.map((workspace) =>
    workspaceElement(workspace)
  );

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
          value={currentWorkspace.name}
          onChange={handleChangeWorkspaceName}
        ></Input>
        <Button type='submit' onClick={handleSubmit}>
          Submit
        </Button>
      </form>
      <main className={styles.main}>
        <h2>Current Tabs</h2>
        <>{workspaceElement(currentWorkspace)}</>
        <h2>Workspaces</h2>
        <>{listWorkspacesElements}</>
      </main>
    </>
  );
}
