// TODO
export type TServicesStatus = 'default' | 'loading' | 'error'

export type TServiceType = 'HTTP' | 'REST'

interface IService {
  configured: boolean;
  description: string;
  id: string;
  metrics?: Metrics;
  name: string;
  published: boolean;
  type: TServiceType;
  versions?: IVersion[];
}

export interface IVersion {
  description: string;
  developer?: IDeveloper;
  id: string;
  name: string;
  updated_at: string;
}

export interface Metrics {
  errors: number;
  latency: number;
  requests: number;
  uptime: number;
}

export interface IDeveloper {
  avatar: string;
  email: string;
  id: string;
  name: string;
}
