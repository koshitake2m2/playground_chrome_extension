import { IdGenerator, MathRandomIdGenerator } from '@/domain/model';
import {
  TabRepository,
  ChromeTabRepository,
  WorkspaceRepository,
  ChromeWorkspaceRepository,
} from '@/repository/repository';

export interface Dependencies {
  idGenerator: IdGenerator;
  tabRepository: TabRepository;
  workspaceRepository: WorkspaceRepository;
}

// TODO: for Local Development
// const isProd = process.env.NODE_ENV === 'production'
export const di: Dependencies = {
  idGenerator: new MathRandomIdGenerator(),
  tabRepository: new ChromeTabRepository(),
  workspaceRepository: new ChromeWorkspaceRepository(),
};
