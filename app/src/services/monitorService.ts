import { MonitorResponse } from 'entities/monitor';
import { MONITORING_URL } from 'constants/monitor';

export interface MonitorService {
  getMonitorKPI: () => Promise<MonitorResponse>;
}

const fetchOptions: {
  method: 'GET',
  mode: 'cors',
  cache: 'no-store',
} = {
  method: 'GET',
  mode: 'cors',
  cache: 'no-store',
};

const defaultGetMetrics = () => fetch(MONITORING_URL, fetchOptions)
  .then((response) => {
    if (!response.ok) {
      console.error(response.statusText);
    }
    return response.json();
  });

const monitorServiceFactory = (
  getMetrics: () => Promise<MonitorResponse> = defaultGetMetrics,
): MonitorService => {

  return {
    getMonitorKPI: getMetrics,
  };
};

export default monitorServiceFactory;
