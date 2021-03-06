export interface Commands {
    listServices: string;
    readServiceConf: string;
    deployService: string;
    undeployService: string;
    startService: string;
    killService: string;
    checkService: string;
    updateService: string;
    viewServiceLogs: string;
}
declare const _default: {
    password: string;
    saveStateInterval: number;
    clientsKeepAliveInterval: number;
    commands: {
        [operatingSystem: string]: Commands;
    };
    serviceBrokerUrl: string;
    siteName: string;
    serviceName: string;
    service: {
        name: string;
        capabilities: string[];
        priority: number;
    };
};
export default _default;
