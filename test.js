import argvFactory from 'minimist';
import path from 'path';
import { initialize } from '.';

const argv = argvFactory(process.argv.slice(2));

function getOpenVPNPath() {
  switch (process.platform) {
    case 'win32':
      return '../bin/openvpn.exe';
    case 'darwin':
      return '/usr/local/opt/openvpn/sbin/openvpn';
    case 'linux':
      return '/usr/local/opt/openvpn/sbin/openvpn';
    default:
      throw new Error('Unsupported platform');
  }
}

(async () => {
  if (argv.init) {
    const openvpnpath = path.normalize(getOpenVPNPath()); // path of openvpn exsecutable
    const args = {
      host: '127.0.0.1',
      port: 1337,
      scriptSecurity: 2,
      config: 'config.ovpn'
    };
    console.log(await initialize(openvpnpath, args));
  }

  if (argv.shutdown) {
    const openvpnpath = path.normalize(getOpenVPNPath());
    const args = {
      host: '127.0.0.1',
      port: 1337,
      scriptSecurity: 2,
      config: 'config.ovpn'
    };
    await initialize(openvpnpath, args);
  }
})();
