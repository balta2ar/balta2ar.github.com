---
layout: post
title: "Test new post"
date: 2013-04-09 11:37
comments: true
categories: fun tech
published: false
---

Hello, guys!

Today I would like to share some cool code with you. Stay tuned!

<!--more-->

So here is that magic code:

``` python Magic code
class SimpleFeedDelivery(object):
    def __init__(self, feed_, source, sink, config_):
        self.feed = feed_
        self.source = source
        self.sink = sink
        self.config = config_

    def source_path(self):
        return os.path.join(self.source.base_dir,
                            self.source.dir,
                            self.feed.name)

    def sink_path(self):
        return os.path.join(self.sink.base_dir,
                            self.source.dir,
                            self.feed.name)

    def run(self):
        rate = self.config.get(const.CONFIG_KEY_DOWNLOAD_RATE,
                               const.DEFAULT_DOWNLOAD_RATE)
        reader_ = self.source.open(self.source_path())
        rlim = reader.RateLimitReader(reader_, rate)
        rmeas = reader.MeasuredReader(rlim)
        self.sink.upload(rmeas, self.sink_path())
```
