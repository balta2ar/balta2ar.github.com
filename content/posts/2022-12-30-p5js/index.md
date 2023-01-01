---
title: "Using p5.js in Hugo blog posts"
date: 2022-12-30T12:03:18+01:00
draft: false
tags: ["visualization", "p5js", "hugo"]
---

This is a post where I'm experimenting with integrating p5.js into my blog posts.

Sample javascript code:

```javascript
function drawCursor() {
    drawingContext.setLineDash([2, 20])
    background(255)
    stroke(color(0, 100, 0))
    line(mouseX, 0, mouseX, height)
}
```

Sample python code:

```python
from dataclasses import dataclass, field
from typing import Optional, List, Tuple, Callable
from math import floor

@dataclass
class Endpoint:
    v: float
    ix: int
```

Sample visualization using p5.js:

<div class="p5js" id="v1-particles" style="width: 100%; height: 400px;"></div>
<script src = "v1-particles.js"></script>

More content goes here.