---
layout: post
title: "Bandwidth shaping in Linux"
date: 2013-11-23 17:01
comments: true
categories:
    - bash
    - tc
    - trickle
    - linux
    - traffic shaping
    - bandwidth
---

It's always been a problem for me to shape traffic in Linux. After Windows
experience with Outpost firewall I couldn't find an easy and convenient way
to shape traffic in Linux. Judging by the amount of similar questions over
the Internet it's unobvious not only to me but to many other users.

<!-- more -->

It appears there are different ways to achieve that in Linux. I personally found
two of them useful: [trickle][trickle] and [tc][tc].

## trickle

`trickle` is simple and easy to use, just run the program you want to limit
and specify the bandwith:

```
$ trickle -d 20kb wget http://mirror.rol.ru/archlinux/iso/2013.11.01/archlinux-2013.11.01-dual.iso
trickle: Could not reach trickled, working independently: No such file or directory
--2013-11-23 17:09:37--  http://mirror.rol.ru/archlinux/iso/2013.11.01/archlinux-2013.11.01-dual.iso
Resolving mirror.rol.ru (mirror.rol.ru)... 194.67.1.114
Connecting to mirror.rol.ru (mirror.rol.ru)|194.67.1.114|:80... connected.
HTTP request sent, awaiting response... 200 OK
Length: 541065216 (516M) [application/octet-stream]
Saving to: ‘archlinux-2013.11.01-dual.iso’

 0% [                                                                                      ] 144,540     20.0KB/s  eta 5h 53m
```

`trickle` works in userspace. It takes advantage of the unix loader preloading
functionality to intercept `read`/`write` calls. See the [paper][paper] for the
details.

## tc

tc is a different beast. It's quite a complex thing for a newbie like me though
it's powerful. tc allows you to create intricate rules to shape your traffic.
The problem is that only outgoing traffic can be shaped in a graceful way. In
incoming traffic you can only brutally drop packets.

This is nasty but luckily there is a way around called [The Intermediate
Functional Block device][ifb]. With this module you can reroute incoming traffic
from ifb device to eth0 so that the traffic will be treated as outgoing when
leaving ifb.

I should've propably taken a weekend to dig really deep into tc functionality
and master it but instead I went the easy way. After googling for a while I
found this brilliant question/answer and this script:

- [Tc: ingress policing and ifb mirroring][serverfault]
- [traffic-control.sh][script]

Inspired by this two wonderful sources I came up with my own version:

``` bash bandwidth.sh
#!/bin/sh

#
# $1 -- incoming bandwidth
# $2 -- outgoing bandwidth
#
# bandwidth.sh init -- modprobe && ip up
# bandwidth.sh x y  -- set incoming bandwidth to x, outgoing to y
# bandwidth.sh      -- remove limits
# bandwidth.sh - y  -- remove incoming limits, set outgoing limit
#

# init
# modprobe ifb numifbs=1
# ip link set dev ifb0 up # repeat for ifb1, ifb2, ...

PHY=eth0
VIR=ifb0
IN=$1
OUT=$2

function go() {
    echo "$*"
    eval "$*"
    return $?
}

if [ $# -eq 1 ]; then
    if [ $1 == "init" ]; then
        echo "Initializing"
        go modprobe ifb numifbs=1
        go ip link set dev ifb0 up
        exit 0
    fi
fi

[ "$IN" == "-" ] && IN=
[ "$OUT" == "-" ] && OUT=

go tc qdisc del dev $PHY root       # clear outgoing
go tc qdisc del dev $PHY ingress    # clear incoming
go tc qdisc del dev $VIR root       # clean incoming

[ $# -eq 0 ] && exit 0

go tc qdisc add dev $PHY handle ffff: ingress
go tc filter add dev $PHY parent ffff: protocol ip u32 match u32 0 0 action mirred egress redirect dev ifb0

if [ -n "$IN" ]; then
    # incoming
    go tc qdisc add dev $VIR root handle 1: htb default 10
    go tc class add dev $VIR parent 1: classid 1:1 htb rate $IN
    go tc class add dev $VIR parent 1:1 classid 1:10 htb rate $IN
fi

if [ -n "$OUT" ]; then
    # outgoing
    go tc qdisc add dev $PHY root handle 1: htb default 10
    go tc class add dev $PHY parent 1: classid 1:1 htb rate $OUT
    go tc class add dev $PHY parent 1:1 classid 1:10 htb rate $OUT
fi
```

You can also get the script [here][gist]. Now traffic shaping is a matter of
a couple of calls:

``` bash
sudo bandwidth.sh init          # load ifb kernel module
sudo bandwidth.sh 100kbps       # set incoming limit
sudo bandwidth.sh - 200kbps     # remove incoming limit, set outgoing limit
sudo bandwidth.sh 10kbps 20kbps # set both incoming & outgoing limits
```

The only thing that I miss now is shaping traffic for each process individually
and changing limits on the fly.

[trickle]: http://monkey.org/~marius/pages/?page=trickle
[tc]: http://tldp.org/HOWTO/Traffic-Control-HOWTO/intro.html
[paper]: http://monkey.org/~marius/trickle/trickle.pdf
[serverfault]: http://serverfault.com/questions/350023/tc-ingress-policing-and-ifb-mirroring
[script]: https://github.com/rfrail3/misc/blob/master/tc/traffic-control.sh
[ifb]: http://www.linuxfoundation.org/collaborate/workgroups/networking/ifb
[gist]: https://gist.github.com/balta2ar/7614370
