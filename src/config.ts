import * as dotenv from "dotenv"

dotenv.config();

export interface Commands {
  listServices: string;
  readServiceConf: string;
  writeServiceConf: string;
  deployService: string;
  undeployService: string;
  startService: string;
  killService: string;
  checkService: string;
  updateService: string;
  viewServiceLogs: string;
}

export default {
  saveStateInterval: 30*1000,
  clientsKeepAliveInterval: 30*1000,

  commands: <{[operatingSystem: string]: Commands}> {
    unix: {
      listServices: "ls ${deployFolder}",
      readServiceConf: "cat ${deployFolder}/${serviceName}/.env",
      writeServiceConf: "cat > ${deployFolder}/${serviceName}/.env",
      deployService: "cd ${deployFolder} && git clone ${repoUrl} ${serviceName} && cd ${serviceName} && npm i --only=prod",
      undeployService: "rm -rf ${deployFolder}/${serviceName}",
      startService: "(cd ${deployFolder}/${serviceName} && npm start 1>stdout.log 2>stderr.log) </dev/null 1>/dev/null 2>/dev/null &",
      killService: "kill -9 ${pid}",
      checkService: "kill -0 ${pid}",
      updateService: "cd ${deployFolder}/${serviceName} && git pull && npm i --only=prod",
      viewServiceLogs: "cd ${deployFolder}/${serviceName} && touch stdout.log stderr.log && tail -n ${lines} stdout.log && tail -n ${lines} stderr.log 1>&2",
    },
    windows: {
      listServices: "dir /B ${deployFolder}",
      readServiceConf: "type ${deployFolder}/${serviceName}/.env",
      writeServiceConf: "type con > ${deployFolder}/${serviceName}/.env",
      deployService: "cd ${deployFolder} && git clone ${repoUrl} ${serviceName} && cd ${serviceName} && npm i --only=prod",
      undeployService: "rm -rf ${deployFolder}/${serviceName}",
      startService: "cd ${deployFolder}/${serviceName} && start npm start 1^>stdout.log 2^>stderr.log",
      killService: "taskkill /F ${pid}",
      checkService: "powershell Get-Process -Id ${pid}",
      updateService: "cd ${deployFolder}/${serviceName} && git pull && npm i --only=prod",
      viewServiceLogs: "cd ${deployFolder}/${serviceName} && (if not exist stdout.log copy NUL stdout.log) && (if not exist stderr.log copy NUL stderr.log) && powershell Get-Content -Tail ${lines} stdout.log && powershell Get-Content -Tail ${lines} stderr.log 1>&2",
    }
  },

  // service broker info
  serviceBrokerUrl: process.env.SERVICE_BROKER_URL,

  // service deployment info
  siteName: process.env.SITE_NAME,
  serviceName: process.env.SERVICE_NAME,

  // the service provided by this module
  service: {
    name: "service-manager",
    capabilities: <string[]> null,
    priority: 100
  }
}
