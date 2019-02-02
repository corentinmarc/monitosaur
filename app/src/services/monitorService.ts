import { MonitorResponse } from 'entities/monitor';

export interface MonitorService {
  getMonitorKPI: () => Promise<MonitorResponse>;
}

const fetchOptions: {
  method: 'GET',
  mode: 'cors',
  cache: 'no-store'
} = {
  method: 'GET',
  mode: 'cors',
  cache: 'no-store' 
};

const monitorServiceFactory = (monitoringUrl: string): MonitorService => {
  const getMonitorKPI = () => {
    return fetch(monitoringUrl, fetchOptions)
      .then((response) => {
        if (!response.ok) {
          console.error(response.statusText);
        }
        return response.json();
      });
  };

  return {
    getMonitorKPI,
  };
};

export default monitorServiceFactory;
