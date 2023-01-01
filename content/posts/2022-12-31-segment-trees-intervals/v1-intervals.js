let intervals = null
let tree = null
let yOff = 0
let nIntervals = 0
let wWidth = 0
let wHeight = 0
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

function buildSegmentTree(intervals) {
    let tree = {}

    const cVisited = color(28, 228, 128)
    const cBuilt = color(128, 128, 128)
    const cOut = color(28, 128, 228)
    const cBreak = color(228, 28, 228)
    mark = (level, s, t, col, yBase, wOffset) => {
        fill(col)
        stroke(col)
        rect(eps[s].v+wOffset, yBase+yStep*level, eps[t].v-eps[s].v-wOffset*2, 2)
    }

    eps = []
    for (const [ix, [start, end]] of intervals.entries()) {
        eps.push(new Endpoint(start, ix))
        eps.push(new Endpoint(end, ix))
    }
    eps.sort((a, b) => a.v - b.v)
    for (let i = 0; i < eps.length-1; i++) { mark(0, i, i, cBreak, 10, -1) }

    _build = (level, s, t) => {
        var v = new Node(s, t)
        mark(level, s, t, cBuilt, 20, 2)
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
        mark(level, v.b, v.e, cVisited, 20, 2)
        if ((eps[v.b].v <= q) && (q <= eps[v.e].v)) {
            if (v.aux.length > 0) { mark(level, v.b, v.e, cOut, 20, 2) }
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
        let start = random(0, wWidth)
        let end = start + random(0, (wWidth - start) / 2)
        intervals.push([start, end, i])
    }
    return intervals;
}

function drawIntervals(intervals, color) {
    drawingContext.setLineDash([10, 0])
    for (const [l, r, ix] of intervals) {
        fill(color)
        stroke(color)
        // line(l, yOff+yStep*ix, r, yOff+yStep*ix)
        rect(l, yOff+yStep*ix, r-l, 2)
    }
}

function drawCursor() {
    drawingContext.setLineDash([2, 20])
    background(255)
    stroke(color(0, 100, 0))
    line(mouseX, 0, mouseX, height)
}

function setup() {
    var divId = 'v1-intervals'
    var div = document.getElementById(divId);
    wWidth = div.offsetWidth
    wHeight = div.offsetHeight
    var canvas = createCanvas(wWidth, wHeight);
    canvas.parent(divId);

    // randomSeed(0)
    yOff = 100
    nIntervals = Math.floor((wWidth - yOff) / (yStep)) * 1
    intervals = randomIntervals(nIntervals)
    // tree = buildSegmentTree(intervals)

    background(255)
}

function draw() {
    drawCursor()
    drawIntervals(intervals, color(0, 0, 0))
    tree = buildSegmentTree(intervals)
    const [ivs, n] = tree.query(mouseX)
    drawIntervals(ivs, color(255, 0, 0))

    fill(0)
    stroke(0)
    textSize(32)
    const label = `${n}/${intervals.length}`
    text(label, 10, wHeight/4)
}
