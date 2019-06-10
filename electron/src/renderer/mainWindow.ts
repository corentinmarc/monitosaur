import createFrontApp from '../../../app/src/index';
import { remote } from 'electron';
import { MainProcessInterface } from '../main/main';

const mainProcess: MainProcessInterface = remote.require('./main');
type GetMetrics = () => Promise<ReturnType<MainProcessInterface['getMetrics']>>;

const getMetrics: GetMetrics = () => {
  return new Promise((resolve) => resolve(mainProcess.getMetrics()));
};

createFrontApp(getMetrics);
