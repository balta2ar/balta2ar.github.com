var sketch = ( p5 ) => {
var that = this

let intervals = null
let tree = null
let yOff = 0
let nIntervals = 0
let sandboxWidth = 0
let sandboxHeight = 0
const yStep = 5

function Node(b, e) {
    this.b = b
    this.e = e
    this.left = null
    this.right = null
    this.key = 0
    this.aux = []
}

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

var cVisited
var cBuilt
var cOut
var cBreak
function mark(eps, level, s, t, col, yBase, wOffset) {
    p5.fill(col)
    p5.stroke(col)
    p5.rect(eps[s].v+wOffset, yBase+yStep*level, eps[t].v-eps[s].v-wOffset*2, 2)
}

function markEndpoints(eps) {
    for (let i = 0; i < eps.length-1; i++) { mark(eps, 0, i, i, cBreak, 10, -1) }
}

function buildSegmentTree(intervals) {
    let tree = {}

    eps = buildEndpoints(intervals)
    markEndpoints(eps)

    _build = (level, s, t) => {
        var v = new Node(s, t)
        mark(eps, level, s, t, cBuilt, 20, 2)
        if (s+1 == t) { return v }
        const m = Math.floor((s+t)/2)
        v.key = m
        v.left = _build(level+1, s, m)
        v.right = _build(level+1, m, t)
        return v
    }

    let root = _build(0, 0, eps.length-1)

    _insert = (v, b, e) => {
        if ((b <= v.b) && (v.e <= e)) {
            v.aux.push([eps[b].v, eps[e].v, eps[b].ix])
            return
        }
        if (b < v.key) { _insert(v.left, b, e) }
        if (v.key < e) { _insert(v.right, b, e) }
    }

    var seen = {}
    for (const [i, ep] of eps.entries()) {
        if (seen[ep.ix] === undefined) { seen[ep.ix] = i }
        else { _insert(root, seen[ep.ix], i) }
    }

    _extend = (out, values) => { for (const v of values) { out.add(v) } }
    var numVisited = 0
    _query = (level, v, q) => {
        numVisited += 1
        var out = new Set()
        if (!v) { return out }
        mark(eps, level, v.b, v.e, cVisited, 20, 2)
        if ((eps[v.b].v <= q) && (q <= eps[v.e].v)) {
            if (v.aux.length > 0) { mark(eps, level, v.b, v.e, cOut, 20, 2) }
            _extend(out, v.aux)
        }
        if (q <= eps[v.key].v) { _extend(out, _query(level+1, v.left, q)) }
        if (q >= eps[v.key].v) { _extend(out, _query(level+1, v.right, q)) }
        return out
    }

    tree.query = q => {
        numVisited = 0
        return [Array.from(_query(0, root, q)), numVisited]
    }
    return tree
}

function randomIntervals(n) {
    let intervals = [];
    for (let i = 0; i < n; i++) {
        let start = p5.random(0, sandboxWidth)
        let end = start + p5.random(0, (sandboxWidth - start) / 2)
        intervals.push([start, end, i])
    }
    return intervals;
}

function drawIntervals(intervals, color) {
    p5.drawingContext.setLineDash([10, 0])
    for (const [l, r, ix] of intervals) {
        p5.fill(color)
        p5.stroke(color)
        // line(l, yOff+yStep*ix, r, yOff+yStep*ix)
        p5.rect(l, yOff+yStep*ix, r-l, 2)
        p5.text(ix, l, yOff+yStep*ix-2)
    }
}

function drawCursor() {
    p5.drawingContext.setLineDash([2, 20])
    p5.background(255)
    p5.stroke(p5.color(0, 100, 0))
    p5.line(p5.mouseX, 0, p5.mouseX, p5.height)
}

p5.setup = function() {
    console.log(`containerId: ${that.containerId}`)
    [sandboxWidth, sandboxHeight] = initCanvas(p5, p5.containerId)
    
    p5.frameRate(5)
    p5.randomSeed(0)
    p5.background(255)
    yOff = 10
    nIntervals = 10
    intervals = randomIntervals(nIntervals)
    cVisited = p5.color(28, 228, 128)
    cBuilt = p5.color(128, 128, 128)
    cOut = p5.color(28, 128, 228)
    cBreak = p5.color(228, 28, 228)
}

function drawEndpoints(eps) {
    const wOffset = 2
    for (let s = 0; s < eps.length-1; s++) { 
        fill(cBreak)
        stroke(cBreak)
        const x = eps[s].v-wOffset
        const y = nIntervals*yStep+10
        rect(x, y, 2, 30)
        text(eps[s].ix, x+4, y+30)
    }
}

build = (eps, level, s, t) => {
    var v = new Node(s, t)
    mark(eps, level, s, t, cBuilt, 20, 2)
    if (s+1 == t) { return v }
    const m = Math.floor((s+t)/2)
    v.key = m
    v.left = build(eps, level+1, s, m)
    v.right = build(eps, level+1, m, t)
    return v
}

p5.draw = function() {
    drawCursor()
    drawIntervals(intervals, p5.color(0, 0, 0))
    eps = buildEndpoints(intervals)
    // drawEndpoints(eps)
    let root = build(eps, 0, 0, eps.length-1)

}

}