export default class Service {
  constructor(public host: string, public port: number) {}
  url() {
    return `http://${this.host}:${this.port}`;
  }
}

export const getServiceFromEnv = (hostEnv: string, portEnv: string) => {
  const host = process.env[hostEnv];
  if (!host) {
    return undefined;
  }
  const port = process.env[portEnv];
  if (!port) {
    return undefined;
  }
  const portNum = Number(port);
  if (isNaN(portNum)) {
    return undefined;
  }
  return new Service(host, portNum);
};
