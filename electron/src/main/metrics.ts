import os from 'os';

export const getMetrics = () => {
  const cpus = os.cpus().length;
  const loadAvg = os.loadavg()[0]/cpus;
  const freemem = os.freemem();
  const totalmem = os.totalmem();
  const timestamp = Date.now();

  return {
    cpus,
    loadAvg,
    freemem,
    totalmem,
    timestamp,
  };
};