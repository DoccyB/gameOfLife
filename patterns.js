// turn one cell on/off
function singleClick (cellNumber) {
    if (onOff[cellNumber] == false) {
        onOff[cellNumber] = true;
    } else {
        onOff[cellNumber] = false;
    }
}

// Creates bar across the grid
function horizontalBar () {
    let start = (grid.length / 2) - (grid.length / 2) % xCells;
    for (i = start; i < start + xCells; i++) {
        onOff[i] = true;
    }
    displayCells();
}

// Creates glider in the center
function glider (cellNumber) {

    onOff[cellNumber] = true;
    onOff[cellNumber + 1] = true;
    onOff[cellNumber + 2] = true;
    onOff[cellNumber + xCells] = true;
    onOff[cellNumber + (xCells * 2) + 1] = true;
    displayCells();
}

function pulsar (cellNumber) {

    onOff[cellNumber] = true;
    for (i = cellNumber - 2; i < cellNumber + 3; i++){
        onOff[i - (3 * xCells)] = true;
        onOff[i + (3 * xCells)] = true;
    }
    displayCells();
}
