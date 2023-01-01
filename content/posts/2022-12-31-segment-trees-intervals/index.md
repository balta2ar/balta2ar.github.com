---
title: "Segment Trees for overlapping intervals"
date: 2022-12-31T16:03:18+01:00
draft: false
tags: ["algorithms", "data structures", "segment trees", "p5js"]
math: true
---

Segment trees are a data structure that can be used for a variety of problems.
Usually, I've seen them used for range queries, but they can also be used for
finding overlapping intervals.

When applied to the problem of answering range queries (e.g. sum on an interval),
the key idea with segment trees is to split the problem space into smaller parts
during preprocessing, so that during query we can visit only a small part of the
problem space. Exactly the same idea is used for finding overlapping intervals.

One important remark is that we're considering fixed intervals, i.g. we know all
intervals in advance before we do any preprocessing, and we can't insert/remove
intervals after preprocessing.

Let's consider 10 random intervals. We can generate them using the following code:

```javascript
function randomIntervals(n) {
    let intervals = [];
    for (let i = 0; i < n; i++) {
        let start = random(0, containerWidth)
        let end = start + random(0, (containerWidth - start) / 2)
        intervals.push([start, end, i])
    }
    return intervals;
}
```

and they look like this:

<div class="p5js" id="v1-intervals" style="width: 100%; height: 100px;"></div>
<script src = "v1-intervals.js"></script>

Instead of working directly with $n$ float coordinates, we'll convert intervals to
an array of $N = 2n$ endpoints, which we will also sort by their value. On the picture
above the endpoints are marked with magenta vertical lines.

It's important to both sort the endpoints by value and keep the reference to the
original interval index. We don't need to know whether that inteval is a start or
an end, but we'll need indices later.

```javascript
function Endpoint(v, ix) {
    this.v = v
    this.ix = ix
}
function buildEndpoints(intervals) {
    eps = []
    for (const [ix, [start, end]] of intervals.entries()) {
        eps.push(new Endpoint(start, ix))
        eps.push(new Endpoint(end, ix))
    }
    eps.sort((a, b) => a.v - b.v)
    return eps
}
```

The next step is to build the auxilary nodes in the tree.
```javascript
function Node(b, e) {
    this.b = b
    this.e = e
    this.left = null
    this.right = null
    this.key = 0
    this.aux = []
}
```

More

{{< p5js id="v2-build" width="100%" height="100px" >}}

Note that

2 Note that

3 Note that

<!-- 
```javascript
function drawCursor() {
    drawingContext.setLineDash([2, 20])
    background(255)
    stroke(color(0, 100, 0))
    line(mouseX, 0, mouseX, height)
}
```
and then
```python
from dataclasses import dataclass, field
from typing import Optional, List, Tuple, Callable
from math import floor

@dataclass
class Endpoint:
    v: float
    ix: int
```

Visualization of the algorithm:

<div class="p5js" id="v1-intervals" style="width: 100%; height: 400px;"></div>
<script src = "v1-intervals.js"></script>

Article content goes here. -->
