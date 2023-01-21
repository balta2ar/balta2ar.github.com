---
title: "Running programs in a separate networking namespace as a systemd service"
date: 2023-01-21T17:10:37+01:00
draft: false
tags: ["linux", "openvpn", "namespace", "systemd"]
---

In my case I needed to run [resilio sync](https://www.resilio.com/) in a separate networking namespace, which
had internet access over a VPN connection. This [wonderful script](https://github.com/slingamn/namespaced-openvpn) helps to create a networking interface for an OpenVPN connection.
To automate openvpn startup, I made the following systemd service file:
```ini
[Unit]
Description=Namespaces OpenVPN
After=local-fs.target network.target

[Service]
Type=simple
WorkingDirectory=/path/to/nordvpn/config/files
ExecStart=/path/to/namespaced-openvpn --config /path/to/nordvpn/config/files/us.ovpn
Restart=always

[Install]
WantedBy=default.target
```
and enabled it
```bash
sudo cp namespaced-openvpn.service /etc/systemd/system/
sudo systemctl start namespaced-openvpn.service
sudo systemctl enable namespaced-openvpn.service
```
And similarly for resilio
```ini
[Unit]
Description=Resilio Sync running in Namespace Mode (through vpn)
After=local-fs.target network.target
BindsTo=namespaced-openvpn.service
After=namespaced-openvpn.service

[Service]
Type=simple
NetworkNamespacePath=/var/run/netns/protected
ExecStart=/usr/bin/rslsync --config %h/.config/resilio-sync/config.json --log /dev/stdout --nodaemon
Restart=always

[Install]
WantedBy=default.target
```
and
```bash
sudo cp resilio-sync.service /etc/systemd/system/
systemctl --user start resilio-sync.service
systemctl --user enable resilio-sync.service
```
By default, namespaced-openvpn uses name `protected` for the networking
namespace. You can see that value in `NetworkNamespacePath` setting.