var cVisited
var cBuilt
var cOut
var cBreak

function drawCursor() {
    drawingContext.setLineDash([2, 20])
    background(255)
    stroke(color(0, 100, 0))
    line(mouseX, 0, mouseX, height)
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