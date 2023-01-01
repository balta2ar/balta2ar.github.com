function mySetupCanvas() {
    const divId = 'p5js-container'
    var div = document.getElementById(divId);
    sandboxWidth = div.offsetWidth
    sandboxHeight = div.offsetHeight
    var canvas = createCanvas(sandboxWidth, sandboxHeight);
    canvas.parent(divId);
    return [sandboxWidth, sandboxHeight]
}