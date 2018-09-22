import Promise from 'bluebird';
import _ from 'lodash';
import path from 'path';
import child_process from 'child_process';

const getPort = Promise.promisify(require('get-port'));
const fs = Promise.promisifyAll(require('fs'));

fs.existsAsync = function (path) {
  return fs
    .openAsync(path, 'r')
    .then(stats => true)
    .catch(stats => false);
};

export const initialize = function (openvpnpath, args) {
  return initialize(openvpnpath, args);
};

export const shutdown = function () {
  return shutdown();
};

function shutdown() {
  return new Promise(((resolve, reject) => {
    new Promise(((resolve, reject) => {}));
  }));
}

function initialize(openvpnpath, args) {
  return new Promise(((resolve, reject) => {
    fs.existsAsync(args.config)
      .then((exists) => {
        if (!exists) {
          return console.info(
            'OpenVpn Config file not found, defaulting to "config.ovpn"'
          );
        }
      })
      .then(() => {
        if (!args.port) {
          return new Promise(((resolve, reject) => {
            getPort()
              .then((port) => {
                args.port = port;
                resolve(args);
              })
              .catch(reject);
          }));
        }
        return args;
      })
      .then(getSetArgs)
      .then(setargs => child_process.execFileSync(openvpnpath, setargs))
      .then(() => {
        resolve({
          port: args.port,
          host: args.host
        });
      })
      .catch(reject);
  }));
}

function getSetArgs(args) {
  let newargs;
  args = _.defaults(args, {
    host: '127.0.0.1',
    port: 1337, // port should *always* be set at this point but we will defualt it anyway to 1337 just incase.
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
        args.host,
        args.port,
        '--config',
        args.config,
        '--script-security',
        args.scriptSecurity,
        '--management-query-passwords',
        '--management-hold',
        '--register-dns'
      ];
      break;
    case 'darwin':
      var arg = [
        '--management',
        args.host,
        args.port,
        '--config',
        args.config,
        '--script-security',
        args.scriptSecurity,
        '--management-query-passwords',
        '--management-hold',
        '--daemon'
      ];
      if (args.up) arg.push('--up', args.up);
      if (args.down) arg.push('--down', args.down);
      return arg;
    case 'linux':
      var arg = [
        '--management',
        args.host,
        args.port,
        '--config',
        args.config,
        '--script-security',
        args.scriptSecurity,
        '--cd',
        args.cwd,
        '--management-query-passwords',
        '--management-hold',
        '--daemon',
        '--dev',
        'tun0'
      ];
      if (args.up) arg.push('--up', args.up);
      if (args.down) arg.push('--down', args.down);
      return arg;
      break;
  }
}
