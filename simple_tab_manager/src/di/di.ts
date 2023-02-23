import {
  TabRepository,
  ChromeTabRepository,
  WorkspaceRepository,
  ChromeWorkspaceRepository,
} from '@/repository/repository';

export interface Dependencies {
  tabRepository: TabRepository;
  workspaceRepository: WorkspaceRepository;
}

// TODO: for Local Development
// const isProd = process.env.NODE_ENV === 'production'
export const di: Dependencies = {
  tabRepository: new ChromeTabRepository(),
  workspaceRepository: new ChromeWorkspaceRepository(),
};
