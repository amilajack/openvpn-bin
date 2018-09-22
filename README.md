openvpn-bin
===========
[![Build Status](https://travis-ci.org/amilajack/openvpn-bin.svg?branch=master)](https://travis-ci.org/amilajack/openvpn-bin)
[![NPM version](https://badge.fury.io/js/@amilajack/openvpn-bin.svg)](http://badge.fury.io/js/@amilajack/openvpn-bin)
[![Dependency Status](https://img.shields.io/david/amilajack/openvpn-bin.svg)](https://david-dm.org/amilajack/openvpn-bin)
[![npm](https://img.shields.io/npm/dm/@amilajack/openvpn-bin.svg?maxAge=2592000)]()

Initialize a Open Vpn Instance on Mac, Windows & Linux.

Designed to be used with [node-openvpn](https://www.npmjs.com/package/node-openvpn).

## Installation
```bash
npm install openvpn-bin
```

## Docs
* [Class: OpenVPNBin](#openvpnbin)
  * [Constructor([openvpnPath])](#openvpnbin_constructor)
  * [Constructor([vpnOpts])](#openvpnclient_constructor)
  * [.initialize()](#openvpnclient_initialize)
  * [.shutdown()](#openvpnclient_shutdown)
* [vpnclient.connect([openvpnPath],[vpnOpts])](#module_initialize)


<a name="openvpnclient_constructor"></a>
#### Constructor

Argument: **vpnOpts** Object passed to .initialize()

```json
{
  // management console host, defualts 
  "host": '127.0.0.1',to 127.0.0.1 
  // set the port for the management console, recommended
  // this is omited so openvpn-bin finds available port for you
  "port": 1337,
  // defualts to 2
  "scriptSecurity": 2,
  // path of openvpn config file, 
  "config": 'config.ovpn',defualts to config.ovpn
  // set the current working 
  "cwd": process.cwd(),directory for openvpn, defualts to process.cwd()
  // optional, should be only used for mac and linux (for dns)
  "up": '',
  // optional, should be only used for mac and linux (for dns)
  "down": ''
}
```

Argument: **openvpnPath** String passed to .initialize() with absolute or relative path to openvpn executable

```js
path.normalize('../bin/openvpn.exe')
```

<a name="openvpnclient_initialize"></a>
#### .initialize()

Returns Promice on sucsessfull startup of openvpn:

```json
{
  "port": "spesifyed or auto found port",
  "host": "spesifyed or defualt 127.0.0.1"
}
```

<a name="openvpnclient_disconnect"></a>
#### .shutdown()

It returns a Promise that is fulfilled when OpenVpn instance is terminated


<a name="module_initialize"></a>
### module.initialize([openvpnPath],[vpnOpts]) 

Initialize OpenVpn Instance using **[openvpnPath]** **[vpnOpts]** arguments

## Support
If you're having any problem, please [raise an issue](https://github.com/luigiplr/openvpn-bin/issues/new) on GitHub and I'll  be happy to help.

## Contribute
- Issue Tracker: [github.com/luigiplr/openvpn-bin/issues](https://github.com/luigiplr/openvpn-bin/issues)
- Source Code: [github.com/luigiplr/openvpn-bin](https://github.com/luigiplr/openvpn-bin)

## License
The project is licensed under the GPL-3.0 license.
