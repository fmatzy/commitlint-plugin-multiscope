import multiscope from './multiscope';
import { CommitlintPlugin } from './type';

export const multiScopePlugin: CommitlintPlugin = {
  rules: {
    multiscope,
  },
};

export default multiScopePlugin;
