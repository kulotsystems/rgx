var stateCtr = 0;
var e = '&epsilon;';
var isAcceptingState = false;
var stateRadius = 16;
var stateDiameter = stateRadius * 2;
var tblTransition;
var btnConvert, txtRegex;
var svg;

var svgWidth = 0;
var svgHeight = 0;
var transitions = new Array(); // 2D Array => [ [qFrom, input, qTo] ]
var nxtX, nxtY;

var svgMaxHeight = 545;
var svgMaxWidth = 555;

var maxXRight = 0;

var simClassCtr = 0;
var simCurrentClass = '';
var simClasses = new Array();
var rgxProcessed = new Array();
var topCoordinates = new Array();
var leftCoordinates = new Array();
var simInterval = 1300;
var spRgxProcessed;


var simTimer;


$(function() {
    svg = $('#svg').find('g');
    tblTransition = $('#tblTransition');
    btnConvert = $('#btnConvert');
    txtRegex = $('#txtRegex');
    spRgxProcessed = $('#spRgxProcessed');

    txtRegex.on('keyup', function() {
        checkEnteredRegex(txtRegex.val().trim());
    });

    // enables the convert button if the entered regex is valid
    function checkEnteredRegex(rgx) {
        if(rgx == '') {
            btnConvert.attr('disabled', true);
        }
        else {
            btnConvert.attr('disabled', false);
        }
    }

    // EVENT: click of btnConvert
    btnConvert.on('click', function() {
        var rgx = txtRegex.val().trim();
        resetSVG();
        if(rgx.indexOf('(') > -1 || rgx.indexOf(')') > -1) {
            if(!areParenthesisMatched(rgx)) {
                rgx = '';
                showAlertDialog("Invalid Regular Expression. Unmatched parenthesis.");
            }
        }
        if(!areOperatorsValid(rgx)) {
            showAlertDialog("Invalid Regular Expression");
        }
        else if(rgx != '') {
            concatInput('');
            drawStateDiagram(parseRgx(rgx));
            drawAcceptingState();
            drawTransitionTable();
            simulate(rgx);
        }
    });
});


// draws a state [with radius = stateRadius] in the current [nxtX, nxtY] location
function drawState() {
    var q = stateCtr.toString();
    var cx = nxtX;
    var cy = nxtY + stateRadius;
    var circ = "<circle id='q" + q + "' class='Q" + simCurrentClass + "' cx='" + cx.toString() + "' cy='" + cy.toString() + "' r='" + stateRadius.toString() + "'></circle>";
    var text = "<text class='state text center-align" + simCurrentClass + "' x='" + cx.toString() + "' y='" + (cy + 2).toString() + "'>" + q + "</text>";
    addSvgHtml(circ + text);
    nxtY += stateDiameter;
    stateCtr += 1;
    isAcceptingState = false;

    if(cx + stateRadius > maxXRight)
        maxXRight = cx + stateRadius;

    adjustSvgSize();
}

// draws a smaller circle inside a state for accepting state
function drawAcceptingState() {
    var lastState = svg.find('#q' + (stateCtr - 1).toString());
    var cx = lastState.attr('cx');
    var cy = lastState.attr('cy');
    circ = "<circle class='Q" + simCurrentClass + "' cx='" + cx.toString() + "' cy='" + cy.toString() + "' r='" + (stateRadius - 3).toString() + "'></circle>";
    addSvgHtml(circ);
}

// draws a straight arrow going to bottom [with height = stateDiameter] and a given input symbol
function drawArrowDown(a) {
    var endY = nxtY + stateDiameter;
    var line = "<line class='arrow" + simCurrentClass + "' x1='" + nxtX.toString() + "' y1='" + (nxtY + 3).toString() + "' x2='" + nxtX.toString() + "' y2='" + (endY-3).toString() + "'></line>";
    var extraClass = (a == e) ? ' epsilon' : '';
    var text = "<text class='text" + extraClass + simCurrentClass + "' x='" + (nxtX + 4).toString() + "' y='" + (nxtY + stateRadius).toString() + "'>" + a + "</text>";
    addSvgHtml(line + text);
    nxtY += stateDiameter;
    recordTransition(currentStateDrawn(), a, stateCtr.toString());
}

// draws a straight line (without arrow head) along with an input
function drawLine(a, x1, y1, x2, y2) {
    var line = "<line class='arrow" + simCurrentClass + "' style='marker-end: none' x1='" + x1.toString() + "' y1='" + y1.toString() + "' x2='" + x2.toString() + "' y2='" + y2.toString() + "'></line>";
    var extraClass = (a == e) ? ' epsilon' : '';
    var text = "<text class='text" + extraClass + simCurrentClass + "' x='" + (((x1 + x2)/2) + 3).toString() + "' y='" + (((y1 + y2)/2) - 3).toString() + "'>" + a + "</text>";
    addSvgHtml(line + text);
    nxtX = x2;
    nxtY = y2;
}

// draws a straight arrow going to bottom left [with length = stateDiameter] and a given input symbol
function drawArrowLeftDown(a) {
    var cx = nxtX;
    var cy = nxtY - stateRadius;
    var px = cx + stateRadius * Math.cos(Math.PI * 0.75);
    var py = cy + stateRadius * Math.sin(Math.PI * 0.75);
    var l = stateDiameter * (Math.sin(45));
    constructArrowLeftDown(a, px, py, px - l, py + l);
}

// draws a straight arrow going to bottom left and a given input symbol that connects to a state
function drawCustArrowLeftDown(a, cx2, cy2) {
    var cx1 = nxtX;
    var cy1 = nxtY - stateRadius;
    var px1 = cx1 + stateRadius * Math.cos(Math.PI * 0.75);
    var py1 = cy1 + stateRadius * Math.sin(Math.PI * 0.75);
    var px2 = cx2 + stateRadius * Math.cos(Math.PI * 1.75);
    var py2 = cy2 + stateRadius * Math.sin(Math.PI * 1.75);
    constructArrowLeftDown(a, px1, py1, px2, py2);
}

// the general instructions for drawing an arrow going to bottom left
function constructArrowLeftDown(a, x1, y1, x2, y2) {
    var line = "<line class='arrow" + simCurrentClass + "' x1='" + (x1 - 4).toString() + "' y1='" + (y1 + 4).toString() + "' x2='" + (x2 + 4).toString() + "' y2='" + (y2 - 4).toString() + "'></line>";
    var midX = (x1 + x2) / 2;
    var midY = (y1 + y2) / 2;
    var extraClass = (a == e) ? ' epsilon' : '';
    var text = "<text class='text" + extraClass + simCurrentClass + "' x='" + (midX + 4).toString() + "' y='" + (midY + 4).toString() + "'>" + a + "</text>";
    var cx2 = x2 - stateRadius * Math.cos(Math.PI * 1.75);
    var cy2 = y2 - stateRadius * Math.sin(Math.PI * 1.75);
    nxtX = cx2 + stateRadius * Math.cos(Math.PI * 1.5);
    nxtY = cy2 + stateRadius * Math.sin(Math.PI * 1.5);
    recordTransition(currentStateDrawn(), a, stateCtr.toString());
    addSvgHtml(line + text);
}

// draws a straight arrow going to bottom right [with length = stateDiameter] and a given input symbol
function drawArrowRightDown(a) {
    var cx = nxtX;
    var cy = nxtY - stateRadius;
    var px = cx + stateRadius * Math.cos(Math.PI * 0.25);
    var py = cy + stateRadius * Math.sin(Math.PI * 0.25);
    var l = stateDiameter * (Math.sin(45));
    constructArrowRightDown(a, px, py, px + l, py + l);
}

// draws a straight arrow going to bottom right and a given input symbol that connects to a state
function drawCustArrowRightDown(a, cx2, cy2) {
    var cx1 = nxtX;
    var cy1 = nxtY - stateRadius;
    var px1 = cx1 + stateRadius * Math.cos(Math.PI * 0.25);
    var py1 = cy1 + stateRadius * Math.sin(Math.PI * 0.25);
    var px2 = cx2 + stateRadius * Math.cos(Math.PI * 1.25);
    var py2 = cy2 + stateRadius * Math.sin(Math.PI * 1.25);
    constructArrowRightDown(a, px1, py1, px2, py2);
}

// the general instructions for drawing an arrow going to bottom right
function constructArrowRightDown(a, x1, y1, x2, y2) {
    var line = "<line class='arrow" + simCurrentClass + "' x1='" + (x1 + 4).toString() + "' y1='" + (y1 + 4).toString() + "' x2='" + (x2 - 4).toString() + "' y2='" + (y2 - 4).toString() + "'></line>";
    var midX = (x1 + x2) / 2;
    var midY = (y1 + y2) / 2;
    var extraClass = (a == e) ? ' epsilon' : '';
    var text = "<text class='text" + extraClass + simCurrentClass + "' x='" + (midX + 4).toString() + "' y='" + (midY - 4).toString() + "'>" + a + "</text>";
    var cx2 = x2 - stateRadius * Math.cos(Math.PI * 1.25);
    var cy2 = y2 - stateRadius * Math.sin(Math.PI * 1.25);
    nxtX = cx2 + stateRadius * Math.cos(Math.PI * 1.5);
    nxtY = cy2 + stateRadius * Math.sin(Math.PI * 1.5);
    recordTransition(currentStateDrawn(), a, stateCtr.toString());
    addSvgHtml(line + text);
}

// draws a curve arrow from Math.PI*0.25 of lower state UP TO Math.PI*1.75 of upper state.
function drawArcArrowUp2575(a, qTo) {
    drawArcArrow(a, qTo, 'Up2575');
}

// draws a curve arrow from Math.PI*0 of lower state UP T0 Math.PI*0 of upper state.
function drawArcArrowUp0000(a, qTo) {
    drawArcArrow(a, qTo, 'Up0000');
}

// draws a curve arrow from Math.PI*0.25 of upper state DOWN TO Math.PI*1.75 of upper state.
function drawArcArrowDown2575(a, qFrom) {
    drawArcArrow(a, qFrom, 'Down2575');
}

// the general instructions for drawing an arc arrow
function drawArcArrow(a, qToOrFrom, type) {
    var q = svg.find('#q' + qToOrFrom);

    var cx1 = parseFloat(q.attr('cx'));
    var cy1 = parseFloat(q.attr('cy'));

    var px1, py1;

    switch(type) {
        case 'Up2575':
        {
            px1 = cx1 + stateRadius * Math.cos(Math.PI * 1.75) + 2;
            py1 = cy1 + stateRadius * Math.sin(Math.PI * 1.75) + 2;
        }break;
        case 'Up0000':
        {
            px1 = cx1 + stateRadius * Math.cos(0) + 2;
            py1 = cy1 + stateRadius * Math.sin(0) + 2;
        }break;
        case 'Down2575':
        {
            px1 = cx1 + stateRadius * Math.cos(Math.PI * 0.25) + 2;
            py1 = cy1 + stateRadius * Math.sin(Math.PI * 0.25) + 2;
        }break;
    }

    var cx2 = nxtX;
    var cy2 = nxtY - stateRadius;

    var px2, py2;
    switch(type) {
        case 'Up2575':
        {
            px2 = cx2 + stateRadius * Math.cos(Math.PI * 0.25) + 2;
            py2 = cy2 + stateRadius * Math.sin(Math.PI * 0.25) + 2;
        }break;
        case 'Up0000':
        {
            px2 = cx2 + stateRadius * Math.cos(0) + 2;
            py2 = cy2 + stateRadius * Math.sin(0) + 2;
        }break;
        case 'Down2575':
        {
            px2 = cx2 + stateRadius * Math.cos(Math.PI * 1.75) + 2;
            py2 = cy2 + stateRadius * Math.sin(Math.PI * 1.75) + 2;
        }break;
    }

    var l = py2 - py1;

    // determine the maxX between states
    var maxX = cx1;
    var ctr = 0;
    for(var i=(parseInt(qToOrFrom)+1); i<(stateCtr-1); i++) {
        var cx = parseFloat(svg.find('#q' + i.toString()).attr('cx'));
        if(cx > maxX)
            maxX = cx;
        ctr += 1;
    }
    var qx =  l * 0.45 - (cx1 - maxX);
    //if(type=='Down2575' || type=='Up2575')
    //    qx += qx*0.10;
    var vx = l * 0.9;
    var rx = px2 + qx;

    var y1 = py2 - vx;
    var y2 = py1 + vx;

    var path = "<path class='arrow" + simCurrentClass + "' d='M";
    if(type == 'Up2575' || type == 'Up0000') {
        path += px2.toString() + "," + py2.toString() + " C" + rx.toString() + "," + y2.toString() + "," + rx.toString() + "," + y1.toString() + "," + px1.toString() + "," + py1.toString() + "'></path>";
        recordTransition(currentStateDrawn(), a, qToOrFrom);
    }
    else if(type == 'Down2575') {
        path += px1.toString() + "," + py1.toString() + " C" + rx.toString() + "," + y1.toString() + "," + rx.toString() + "," + y2.toString() + "," + px2.toString() + "," + py2.toString() + "'></path>";
        recordTransition(qToOrFrom, a, currentStateDrawn());
    }

    var midX1 = (rx + px1) / 2;
    var midX2 = ((rx + midX1) / 2);
    var tx = midX2 + 2;

    var ty = py1 + (l * 0.5);
    var extraClass = (a == e) ? ' epsilon' : '';
    var text = "<text class='text text" + qToOrFrom + "" + extraClass + simCurrentClass + "' id='" + tx.toString() + '|' + ty.toString() + "' x='" + tx.toString() + "' y='" + ty.toString() + "'>" + a + "</text>";

    addSvgHtml(path + text);

    if(tx > maxXRight)
        maxXRight = tx;

    adjustSvgSize();
}

// draws a straight arrow going down from state A to state B and a given input symbol
function drawArrowDownFromTo(pA, pB, a) {
    qA = svg.find('#q' + pA);
    qB = svg.find('#q' + pB);

    var x1 = parseFloat(qA.attr('cx'));
    var y1 = parseFloat(qA.attr('cy')) + stateRadius + 3;
    var x2 = parseFloat(qB.attr('cx'));
    var y2 = parseFloat(qB.attr('cy')) - stateRadius - 3;

    var line = "<line class='arrow" + simCurrentClass + "' x1='" + x1.toString() + "' y1='" + y1.toString() + "' x2='" + x2.toString() + "' y2='" + y2.toString() + "'></line>";

    var tx = x1 + 4;
    var ty = y1 + ((y2 - y1) / 2);

    var extraClass = (a == e) ? ' epsilon' : '';
    var text = "<text class='text" + extraClass + simCurrentClass + "' x='" + tx.toString() + "' y='" + ty.toString() + "'>" + a + "</text>";

    recordTransition(pA, a, pB);
    addSvgHtml(line + text);
}

// draws a red dot [with diameter = 6] for testing a given coordinate
function testMarker(cx, cy) {
    var dot = "<circle cx='" + cx.toString() + "' cy='" + cy.toString() + "' r='3' fill='red'></circle>";
    svg.html(svg.html() + dot);
}

// stores the transition made
function recordTransition(qFrom, a, qTo) {
    var transition = new Array();
    transition.push(qFrom);
    transition.push(a);
    transition.push(qTo);
    transitions.push(transition);
}

function transitionExists(qFrom, a, qTo) {
    var alreadyExists = false;
    for(var i=0; i<transitions.length; i++) {
        //alert("transitions | transition\n" + transitions[i] + "\n" + transition);
        if(transitions[i][0] == qFrom &&  transitions[i][1] == a && transitions[i][2] == qTo) {
            alreadyExists = true;
            break;
        }
    }
    return alreadyExists;
}

function currentStateDrawn() {
    return (stateCtr - 1).toString();
}

function drawTransitionTable() {
    tblTransition.html('');

    var tblHtml = '';
    // get and write inputs on table header
    var inputsReceived = new Array();
    var tL = transitions.length;

    for(var i=0; i<tL; i++) {
        inputsReceived.push(transitions[i][1]);
    }
    inputsReceived = sortInputs(filterUnique(inputsReceived));
    tblHtml += "<thead>";
        tblHtml += "<tr>";
        tblHtml += "<td class='br'>&nbsp;</td>";
        var iL = inputsReceived.length;
        for(var i=0; i<iL; i++) {
            var className = (i != (iL-1)) ? " class='br'" : "";
            tblHtml += "<td" + className + ">" + inputsReceived[i] + "</td>";
        }
        tblHtml += "</tr>";
    tblHtml += "</thead>";

    // tabulate the transition of each state!
    tblHtml += "<tbody>";
    for(var i=0; i<stateCtr; i++) {
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>" + i.toString() + "</td>";
            for(var j=0; j<iL; j++) {
                var tFunc = new Array();
                for(var k=0; k<tL; k++) {
                    if(transitions[k][0] == i.toString() && transitions[k][1] == inputsReceived[j]) {
                        tFunc.push(transitions[k][2]);
                    }
                }
                var className = (j != (iL-1)) ? " class='br'" : "";
                tblHtml += "<td" + className + ">";
                tblHtml += tFunc.join(', ');
                tblHtml += "</td>";
            }
        tblHtml += "</tr>";
    }
    tblHtml += "</tbody>";
    tblTransition.html(tblHtml);
}

// updates the SVG
function addSvgHtml(html) {
    svg.html(svg.html() + html);
}

function resetSVG() {
    clearInterval(simTimer);
    simClassCtr = 0;
    simCurrentClass = ' startstate';
    simClasses = new Array();
    rgxProcessed = new Array();
    rgxProcessed.push('');
    simClasses.push(simCurrentClass);
    topCoordinates = new Array();
    topCoordinates.push(0);
    leftCoordinates = new Array();
    leftCoordinates.push(0);


    svgWidth = svgMaxWidth;
    svgHeight = svgMaxHeight;
    svg.css({'height' : svgHeight.toString() + 'px'});
    svg.css({'width' : svgWidth.toString() + 'px'});
    nxtX = stateDiameter * 1.5;
    maxXRight = nxtX + stateRadius;
    nxtY = 20;
    stateCtr = 0;
    transitions = new Array();
    //var defaultHTML = "<defs id='markerDefs'><marker id='arrow' markerWidth='9' markerHeight='7' refx='8' refy='4' orient='auto' markerUnits='strokeWidth'><path d='M0,0 L0,7 L9,4 Z' fill='#000'></path></marker></defs>";
    svg.html('');
    tblTransition.html('');
}

function adjustSvgSize() {
    if(nxtY > svgHeight) {
        svgHeight = nxtY + stateRadius;
        svg.parent().css({'height' : svgHeight.toString() + 'px'});
    }
    if(maxXRight > svgWidth) {
        svgWidth = maxXRight + stateRadius;
        svg.parent().css({'width' : svgWidth.toString() + 'px'});
    }
}