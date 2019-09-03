import childProcess from 'child_process';
import fs from 'fs';
import getPort from 'get-port';

fs.existsAsync = path =>
  fs
    .openAsync(path, 'r')
    .then(() => true)
    .catch(() => false);

export async function shutdown() {
  return true;
}

function getSetArgs(args) {
  const newArgs = Object.assign(args, {
    host: '127.0.0.1',
    // port should *always* be set at this point but we will
    // defualt it anyway to 1337 just incase.
    port: 1337,
    scriptSecurity: 2,
    config: 'config.ovpn',
    cwd: process.cwd(),
    up: false,
    down: false
  });

  switch (process.platform) {
    case 'win32':
      return [
        '--management',
        newArgs.host,
        newArgs.port,
        '--config',
        newArgs.config,
        '--script-security',
        newArgs.scriptSecurity,
        '--management-query-passwords',
        '--management-hold',
        '--register-dns'
      ];
    case 'darwin': {
      const arg = [
        '--management',
        newArgs.host,
        newArgs.port,
        '--config',
        newArgs.config,
        '--script-security',
        newArgs.scriptSecurity,
        '--management-query-passwords',
        '--management-hold',
        '--daemon'
      ];
      if (newArgs.up) arg.push('--up', newArgs.up);
      if (newArgs.down) arg.push('--down', newArgs.down);
      return arg;
    }
    case 'linux': {
      const arg = [
        '--management',
        newArgs.host,
        newArgs.port,
        '--config',
        newArgs.config,
        '--script-security',
        newArgs.scriptSecurity,
        '--cd',
        newArgs.cwd,
        '--management-query-passwords',
        '--management-hold',
        '--daemon',
        '--dev',
        'tun0'
      ];
      if (newArgs.up) arg.push('--up', newArgs.up);
      if (newArgs.down) arg.push('--down', newArgs.down);
      return arg;
    }
    default:
      throw new Error('Unsupported platform');
  }
}

export async function initialize(openvpnpath, args) {
  const exists = fs.existsAsync(args.config);
  if (!exists) {
    console.info('OpenVpn Config file not found, defaulting to "config.ovpn"');
  }

  const newArgs = getSetArgs(
    !args.port
      ? {
          ...args,
          port: await getPort()
        }
      : args
  );

  childProcess.execFileSync(openvpnpath, newArgs);

  return {
    port: args.port,
    host: args.host
  };
}
