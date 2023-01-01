---
title: "Segment Trees for overlapping intervals"
date: 2022-12-31T16:03:18+01:00
draft: false
tags: ["algorithms", "data structures", "segment trees", "p5js"]
---

Today we're gonna look into how to use segment trees to effeciently find intervals
that overlap with a given point.
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

Article content goes here.