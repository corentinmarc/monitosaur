import { MonitorResponse } from 'entities/monitor';

export interface MonitorService {
  getMonitorKPI: () => Promise<MonitorResponse>;
}

const monitorServiceFactory = (monitoringUrl: string): MonitorService => {
  const getMonitorKPI = () => {
    return fetch(monitoringUrl)
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
