---
title: "Multiple p5js Canvases on One Page"
date: 2023-01-01T20:37:14+01:00
draft: false
tags: ["hugo", "p5js", "canvas"]
toc: true
---

It was fairly easy to set up integration of p5js into my blog posts if I
needed only one canvas per post. Having multiple canvases turned out to be
a bit more complicated. Since I spent several hours setting it up, I can
as well write a post about it.

### Two modes of p5js

It turns out there are two modes that p5 can work with: global and instance.
Read more here: https://github.com/processing/p5.js/wiki/p5.js-overview#instantiation--namespace

In global mode you define `setup()` and `draw()` like this:

```javascript
function setup() {
    createCanvas(400, 400);
}
function draw() {
    background(220);
}
```

In instance mode you need to wrap your code in a closure:

```javascript
const s = ( p ) => {
    p.setup = () => {
        p.createCanvas(400, 400);
    }
    p.draw = () => {
        p.background(220);
    }
};
new p5(s, 'container-id');
```

This nuance with wrapping your code in a closure is not how I wanted my js
patches to look like, thus I went for global mode. The challenge was that
in that case we gotta resort to iframes.

### My solution

To make it more manageable and avoid code duplication, I had to create the
following:

1. A shortcode in `layouts/shortcode/p5js.html` that would create an iframe with a given id and src:
```text
{{- $id := .Get "id" -}}
{{- $width := .Get "width" -}}
{{- $height := .Get "height" -}}
{{- $dir := printf "content/%s" .Page.File.Dir | printf "%s" -}}
<iframe srcdoc='
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.5.0/p5.min.js"></script>
<script src="/js/p5js-global.js"></script>
{{ if (where (readDir $dir) "Name" "page.js") }}
<script src="page.js"></script>
{{ end }}
<div class="p5js" id="p5js-container" style="width: {{ $width }}; height: {{ $height }};"></div>
<script src="{{ $id }}.js"></script>
' id="iframe-{{ $id }}" style="width: {{ $width }}; height: {{ $height }}; overflow: hidden;"  scrolling="no" frameborder="0">
  <p>Your browser does not support iframes.</p>
</iframe>
```
2. A global js file `static/js/p5js-global.js` that contains canvas setup code:
```javascript
function mySetupCanvas() {
    const divId = 'p5js-container'
    var div = document.getElementById(divId);
    sandboxWidth = div.offsetWidth
    sandboxHeight = div.offsetHeight
    var canvas = createCanvas(sandboxWidth, sandboxHeight);
    canvas.parent(divId);
    return [sandboxWidth, sandboxHeight]
}
```
3. If I want to share code between different p5 snippets, I create a `page.js` file
in the same folder as the post. This file is included in the iframe if it exists,
for example:
```javascript
function drawCursor() {
    drawingContext.setLineDash([2, 20])
    background(255)
    stroke(color(0, 100, 0))
    line(mouseX, 0, mouseX, height)
}
```
4. In the post I use the shortcode like this:
```text
\{\{< p5js id="v1-particles" width="100%" height="400px" >}}
```
5. I create a `v1-particles.js` file in the same folder as the post.
This file contains the code for the p5 sketch. The minimal necessary boilerplate
initialization code is:
```javascript
function setup() {
    mySetupCanvas()
}
function draw() {
    background(220)
}
```

### Further work

It would interesting to try the following:

1. Implement inline mode so that I don't have to create a separate file for
each p5 sketch.
2. Implement integration with d3.js.
3. Try Observable: https://quarto.org/docs/computations/ojs.html
4. Maybe try pyscript: https://pyscript.net/examples/