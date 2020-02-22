import multiscope from './multiscope';
import { CommitlintPlugin } from './type';

const multiScopePlugin: CommitlintPlugin = {
  rules: {
    multiscope,
  },
};

export = multiScopePlugin;
