export interface MonitorResponse {
  cpus: number;
  loadAvg: number;
  freemem: number;
  totalmem: number;
  timestamp: number;
}

export interface MonitorEvolutionPoint {
  loadAvg: number;
  timestamp: number;
}
