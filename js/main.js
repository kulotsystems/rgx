var g;
var txtRegex, btnConvert, divLabelTop, divLabelBot, divCover, esc, spPlay, tblTransition;
var frame = 0;
var tmrTransition;

var tmrArrowRight = new Array();
var tmrArrowUpRight = new Array();
var tmrArrowDownRight = new Array();
var draw_interval = 1100;

var p = '';   // regex patern
var rgx = ''; // entered regex
var foundRegex = false;

$(function() {
    // a function to setup everything on load
    setupCanvas();
    // set global variables
    txtRegex = $('#txtRegex'); txtRegex.focus();
    btnConvert = $('#btnConvert');
    divLabelTop = $('#divLabelTop');
    divLabelBot = $('#divLabelBot');
    divCover = $('#divCover');
    spPlay = $('#spPlay');
    esc = $('#esc');
    tblTransition = $('#tblTransition');
    setupCanvas();

    function playPause() {
        if(spPlay.hasClass('glyphicon-pause')) {
            pauseConstruct();
            setPlayLabel('play');
        }
        else if(spPlay.hasClass('glyphicon-play')) {
            construct();
            setPlayLabel('pause');
        }
        else if(spPlay.hasClass('glyphicon-refresh')) {
            divLabelTop.find('span').removeClass('b');
            writeToLabelBot("");
            setupCanvas();
            construct();
        }
        esc.focus();
    }
    spPlay.on('click', playPause);
    divCover.on('click', playPause);
});

function setupCanvas() {
    var x = document.getElementById("g");
    g = x.getContext('2d');
    g.clearRect(0, 0, x.width, x.height);
}

// starts the automaton construction
function construct() {
    foundRegex = true;
    setupCanvas();
    setPlayLabel('pause');
    tmrTransition = setInterval(function() {
        // a
        if(p == 'a') {
            a(rgx);
            drawTransTbl_a(rgx);
        }

        // ab
        else if(p == 'ab') {
            a_b(rgx[0], rgx[1]);
            drawTransTbl_a_b(rgx[0], rgx[1]);
        }

        // a*
        else if(p == 'a*') {
            a_star(rgx[0]);
            drawTransTbl_a_star(rgx[0]);
        }

        // abc
        else if(p == 'abc') {
            a_b_c(rgx[0], rgx[1], rgx[2]);
            drawTransTbl_a_b_c(rgx[0], rgx[1], rgx[2]);
        }

        // a*b
        else if(p == 'a*b') {
            a_star_b(rgx[0], rgx[2]);
            drawTransTbl_a_star_b(rgx[0], rgx[2]);
        }

        // ab*
        else if(p == 'ab*') {
            a_b_star(rgx[0], rgx[1]);
            drawTransTbl_a_b_star(rgx[0], rgx[1]);
        }

        // a*b*
        else if(p == 'a*b*') {
            a_star_b_star(rgx[0], rgx[2]);
            drawTransTbl_a_star_b_star(rgx[0], rgx[2]);
        }

        // a*bc
        else if(p == 'a*bc') {
            a_star_b_c(rgx[0], rgx[2], rgx[3]);
            drawTransTbl_a_star_b_c(rgx[0], rgx[2], rgx[3]);
        }

        // ab*c
        else if(p == 'ab*c') {
            a_b_star_c(rgx[0], rgx[1], rgx[3]);
            drawTransTbl_a_b_star_c(rgx[0], rgx[1], rgx[3]);
        }

        // abc*
        else if(p == 'abc*') {
            a_b_c_star(rgx[0], rgx[1], rgx[2]);
            drawTransTbl_a_b_c_star(rgx[0], rgx[1], rgx[2]);
        }

        // a*|b
        else if(p == 'a*|b') {
            a_star_union_b(rgx[0], rgx[3]);
            drawTransTbl_a_star_union_b(rgx[0], rgx[3]);
        }

        // a|b*
        else if(p == 'a|b*') {
            a_union_b_star(rgx[0], rgx[2]);
            drawTransTbl_a_union_b_star(rgx[0], rgx[2]);
        }

        // a*bc*
        else if(p == 'a*bc*') {
            a_star_b_c_star(rgx[0], rgx[2], rgx[3]);
            drawTransTbl_a_star_b_c_star(rgx[0], rgx[2], rgx[3]);
        }

        // a*b*c
        else if(p == 'a*b*c') {
            a_star_b_star_c(rgx[0], rgx[2], rgx[4]);
            drawTransTbl_a_star_b_star_c(rgx[0], rgx[2], rgx[4]);
        }

        // ab*c*
        else if(p == 'ab*c*') {
            a_b_star_c_star(rgx[0], rgx[1], rgx[3]);
            drawTransTbl_a_b_star_c_star(rgx[0], rgx[1], rgx[3]);
        }

        // a*b*c*
        else if(p == 'a*b*c*') {
            a_star_b_star_c_star(rgx[0], rgx[2], rgx[4]);
            drawTransTbl_a_star_b_star_c_star(rgx[0], rgx[2], rgx[4]);
        }

        // a|(b|c)
        else if(p == 'a|(b|c)') {
            a_union__b_union_c(rgx[0], rgx[3], rgx[5]);
            drawTransTbl_a_union__b_union_c(rgx[0], rgx[3], rgx[5]);
        }

        // (a|b)|c
        else if(p == '(a|b)|c') {
            a_union_b__union_c(rgx[1], rgx[3], rgx[6]);
            drawTransTbl_a_union_b__union_c(rgx[1], rgx[3], rgx[6]);
        }

        // (a*b*)*
        else if(p == '(a*b*)*') {
            a_star_b_star__star(rgx[1], rgx[3]);
            drawTransTbl_a_star_b_star__star(rgx[1], rgx[3]);
        }




        //a_union_b('a', 'b');
        //a('a');
        //a_star('a');
        //a_b('a', 'b');
        //a_union_b_star('a', 'b');
        //a_star_union_b('a', 'b');
        //a_star_b('a', 'b');
        //a_b_star('a', 'b');
        //a_star_b_star('a', 'b');
        //a_star_b_star__star('a', 'b');
        //a_b_c('a', 'b', 'c');
        //a_union__b_union_c('3', 'b', 'c');
        //a_union_b__union_c('a', 'b', 'c');
        //a_star_b_c('a', 'b', 'c');
        //a_b_star_c('a', 'b', 'c');
        //a_b_c_star('a', 'b', 'c');
        //a_star_b_star_c_star('a', 'b', 'c');
        //a_star_b_star_c('a', 'b', 'c');
        //a_b_star_c_star('a', 'b', 'c');
        //a_star_b_c_star('a', 'b', 'c');
    }, draw_interval);
}

// pauses the automaton construction
function pauseConstruct() {
    clearInterval(tmrTransition);
}

// draws a single-outlined circle for a state
function drawState(center_x, center_y, state_name) {
    g.fillStyle = "#000";
    g.lineWidth = 2;
    g.beginPath();
    g.arc(center_x, center_y, 28, 0, 2 * Math.PI);
    g.stroke();

    var fontSize = 24;
    g.font = fontSize.toString() + "px Arial";
    g.fillText(state_name, center_x - (fontSize/3), center_y + (fontSize/3));
}

// draws a double-outlined circle for accepting state
function drawAcceptingState(center_x, center_y, state_name) {
    drawState(center_x, center_y, state_name);
    g.beginPath();
    g.arc(center_x, center_y, 23, 0, 2 * Math.PI);
    g.stroke();
}

// draws a single-outlined circle for a small state
function drawSmState(center_x, center_y, state_name) {
    g.fillStyle = "#000";
    g.lineWidth = 1.5;
    g.beginPath();
    g.arc(center_x, center_y, 21, 0, 2 * Math.PI);
    g.stroke();

    var fontSize = 22;
    g.font = fontSize.toString() + "px Arial";
    g.fillText(state_name, center_x - (fontSize/3.5), center_y + (fontSize/3));
}

// draws a double-outlined circle for a small accepting state
function drawSmAcceptingState(center_x, center_y, state_name) {
    drawSmState(center_x, center_y, state_name);
    g.beginPath();
    g.arc(center_x, center_y, 18, 0, 2 * Math.PI);
    g.stroke();
}

// writes an epsilon beside an arrow or arc
function labelEpsilon(x, y) {
    g.font = "22px Century Gothic";
    g.fillStyle = "green";
    g.fillText('\u03B5', x, y);
}
function labelSmEpsilon(x, y) {
    g.font = "19px Century Gothic";
    g.fillStyle = "green";
    g.fillText('\u03B5', x, y);
}

// writes the input symbol beside an arrow or arc
function labelInput(c, x, y) {
    g.font = "22px Century Gothic";
    g.fillStyle = "blue";
    g.fillText(c, x, y);
}
function labelSmInput(c, x, y) {
    g.font = "18px Century Gothic";
    g.fillStyle = "blue";
    g.fillText(c, x, y);
}

// highlights the current symbol of the regex being converted
function writeToLabelTop(html) {
    divLabelTop.html(html)
}

// writes the current step in constructing the automaton
function writeToLabelBot(html) {
    divLabelBot.html(html);
}

// sets play|pause|refresh icon
function setPlayLabel(lbl) {
    spPlay.removeClass('glyphicon glyphicon-play');
    spPlay.removeClass('glyphicon glyphicon-pause');
    spPlay.removeClass('glyphicon glyphicon-refresh');
    spPlay.addClass('glyphicon glyphicon-' + lbl);
}

// draws a line with arrow head
function drawArrow(fromx, fromy, tox, toy, head_w){
    var headlen = 1;
    var angle = Math.atan2(toy-fromy,tox-fromx);

    //starting path of the arrow from the start square to the end square and drawing the stroke
    g.beginPath();
    g.moveTo(fromx, fromy);
    g.lineTo(tox, toy);
    g.strokeStyle = "#000";
    g.lineWidth = (head_w >= 7) ? 2 : 1.5;
    g.stroke();

    //starting a new path from the head of the arrow to one of the sides of the point
    g.beginPath();
    g.moveTo(tox, toy);
    g.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),toy-headlen*Math.sin(angle-Math.PI/7));

    //path from the side point of the arrow, to the other side point
    g.lineTo(tox-headlen*Math.cos(angle+Math.PI/7),toy-headlen*Math.sin(angle+Math.PI/7));

    //path from the side point back to the tip of the arrow, and then again to the opposite side point
    g.lineTo(tox, toy);
    g.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),toy-headlen*Math.sin(angle-Math.PI/7));

    //draws the paths created above
    g.strokeStyle = "#000";
    g.lineWidth = head_w;
    g.stroke();
    g.fillStyle = "#000";
    g.fill();
}

// draws small animated arrow to the right
function drawSmArrowRight(start_x, start_y, label, label_x, label_y) {
    arrowRight(start_x, start_y, label, label_x, label_y, 20, 6, 10);
}
// draws custom animated arrow to the right
function drawCustArrowRight(start_x, start_y, end_x, end_y, label, label_x, label_y) {
    arrowRight(start_x, start_y, label, label_x, label_y, end_x - start_x, 6, 7);
}
// draws large custom animated arrow to the right
function drawCustLgArrowRight(start_x, start_y, end_x, end_y, label, label_x, label_y) {
    arrowRight(start_x, start_y, label, label_x, label_y, (end_x - start_x), 7, 6);
}
function arrowRight(start_x, start_y, label, label_x, label_y, max_length, arrow_size, interval) {
    var length = 3;
    tmrArrowRight.push(setInterval(function() {
        if(length <= max_length) {
            g.clearRect(start_x-(arrow_size-5), start_y - 7, length -1, 14);
            drawArrow(start_x, start_y, start_x + length, start_y, arrow_size);
        }
        else {
            if(arrow_size < 7)
                drawSmLabel(label, label_x, label_y);
            else
                drawLgLabel(label, label_x, label_y);
            setTimeout(function() {
                for(var i=0; i<tmrArrowRight.length; i++) {
                    clearInterval(tmrArrowRight[i]);
                }
            }, 1);
        }
        length += 1;
    }, interval));
}

// draws a small animated arrow going to upper right
function drawSmArrowUpRight(start_x, start_y, label, label_x, label_y) {
    arrowUpRight(start_x, start_y, label, label_x, label_y, 13, 6, 20);
}
// draws a custom animated arrow going to upper right
function drawCustArrowUpRight(start_x, start_y, end_x, end_y, label, label_x, label_y) {
    arrowUpRight(start_x, start_y, label, label_x, label_y, (end_x - start_x), 6, 15);
}
// draws a large custom animated arrow going to upper right
function drawCustLgArrowUpRight(start_x, start_y, end_x, end_y, label, label_x, label_y) {
    arrowUpRight(start_x, start_y, label, label_x, label_y, (end_x - start_x), 7, 15);
}
function arrowUpRight(start_x, start_y, label, label_x, label_y, max_length, arrow_size, interval) {
    var length = 7;
    tmrArrowUpRight.push(setInterval(function() {
        if(length <= max_length) {
            g.clearRect(start_x - (arrow_size - 6), start_y - (max_length + 1), (max_length + 6), max_length + (arrow_size-5));
            drawArrow(start_x, start_y, start_x + length, start_y - length, arrow_size);
        }
        else {
            if(arrow_size < 7)
                drawSmLabel(label, label_x, label_y);
            else
                drawLgLabel(label, label_x, label_y);
            setTimeout(function() {
                for(var i=0; i<tmrArrowUpRight.length; i++) {
                    clearInterval(tmrArrowUpRight[i]);
                }
            }, 1);
        }
        length += 1;
    }, interval));
}

// draws a small animated arrow going to bottom right
function drawSmArrowDownRight(start_x, start_y, label, label_x, label_y) {
    arrowDownRight(start_x, start_y, label, label_x, label_y, 13, 6, 20);
}
// draws a small custom animated arrow going to bottom right
function drawCustArrowDownRight(start_x, start_y, end_x, end_y, label, label_x, label_y) {
    arrowDownRight(start_x, start_y, label, label_x, label_y, end_x - start_x, 6, 15);
}
// draws a large custom animated arrow going to bottom right
function drawCustLgArrowDownRight(start_x, start_y, end_x, end_y, label, label_x, label_y) {
    arrowDownRight(start_x, start_y, label, label_x, label_y, (end_x - start_x), 7, 15);
}
function arrowDownRight(start_x, start_y, label, label_x, label_y, max_length, arrow_size, interval) {
    var length = 7;
    tmrArrowDownRight.push(setInterval(function() {
        if(length <= max_length) {
            g.clearRect(start_x, start_y - (arrow_size - 6), (max_length + 6), max_length + (arrow_size - 6));
            drawArrow(start_x, start_y, start_x + length, start_y + length, arrow_size);
        }
        else {
            if(arrow_size < 7)
                drawSmLabel(label, label_x, label_y);
            else
                drawLgLabel(label, label_x, label_y);
            setTimeout(function() {
                for(var i=0; i<tmrArrowDownRight.length; i++) {
                    clearInterval(tmrArrowDownRight[i]);
                }
            }, 1);
        }
        length += 1;
    }, interval));
}

// draws a small animated arrow going to bottom left
function drawSmArrowDownLeft(start_x, start_y, label, label_x, label_y) {
    arrowDownRight(start_x, start_y, label, label_x, label_y, 13, 6, 20);
}
// draws a small custom animated arrow going to bottom left
function drawCustArrowDownLeft(start_x, start_y, end_x, end_y, label, label_x, label_y) {
    arrowDownLeft(start_x, start_y, label, label_x, label_y, end_x - start_x, 6, 15);
}
// draws a large custom animated arrow going to bottom left
function drawCustLgArrowDownLeft(start_x, start_y, end_x, end_y, label, label_x, label_y) {
    arrowDownLeft(start_x, start_y, label, label_x, label_y, (start_x - end_x), 7, 15);
}
function arrowDownLeft(start_x, start_y, label, label_x, label_y, max_length, arrow_size, interval) {
    var length = 7;
    tmrArrowDownRight.push(setInterval(function() {
        if(length <= max_length) {
            g.clearRect(start_x - max_length-3 , start_y , (max_length + 7), max_length + (arrow_size - 6));
            drawArrow(start_x, start_y, start_x - length, start_y + length, arrow_size);
        }
        else {
            if(arrow_size < 7)
                drawSmLabel(label, label_x, label_y);
            else
                drawLgLabel(label, label_x, label_y);
            setTimeout(function() {
                for(var i=0; i<tmrArrowDownRight.length; i++) {
                    clearInterval(tmrArrowDownRight[i]);
                }
            }, 1);
        }
        length += 1;
    }, interval));
}

// draws a small label on a specified location after arrow's animation
function drawSmLabel(label, label_x, label_y) {
    if(parseInt(label) == 3 && typeof label != 'string') {
        labelSmEpsilon(label_x, label_y);
    }
    else {
        labelSmInput(label, label_x, label_y);
    }
}

// draws a large label on a specified location after arrow's animation
function drawLgLabel(label, label_x, label_y) {
    if(parseInt(label) == 3 && typeof label != 'string') {
        labelEpsilon(label_x, label_y);
    }
    else {
        labelInput(label, label_x, label_y);
    }
}

// draws ArcTo
function drawArc(center_x, center_y, radius, start_angle, end_angle) {
    g.lineWidth = 1.7;
    g.beginPath();
    g.arc(center_x, center_y, radius, Math.PI * start_angle, Math.PI * end_angle);
    g.stroke();
}

// draws an arrow head on a specific location
function drawArrowhead(startx, starty, endx, endy, sizex, sizey) {
    var angle =  Math.atan2((endy - starty), (endx - startx));
    var hx = sizex / 2;
    var hy = sizey / 2;

    g.translate((startx ), (starty));
    g.rotate(angle);
    g.translate(-hx,-hy);

    g.fillStyle = "#000";
    g.beginPath();
    g.moveTo(0,0);
    g.lineTo(0,1*sizey);
    g.lineTo(1*sizex,1*hy);
    g.closePath();
    g.fill();

    g.translate(hx,hy);
    g.rotate(-angle);
    g.translate(-startx,-starty);
}

// draws an arc with arrow
function drawArcArrow(center_x, center_y, radius, start_angle, end_angle, arrow_size, clockwise) {
    drawArc(center_x, center_y, radius, start_angle, end_angle);
    var x1, y1, x2, y2;
    if(clockwise) {
        x1 = center_x + radius * Math.cos(Math.PI * end_angle - 0.01);
        y1 = center_y + radius * Math.sin(Math.PI * end_angle - 0.01);
        x2 = center_x + radius * Math.cos(Math.PI * end_angle + 0.01);
        y2 = center_y + radius * Math.sin(Math.PI * end_angle + 0.01);
    }
    else {
        x1 = center_x + radius * Math.cos(Math.PI * start_angle + 0.01);
        y1 = center_y + radius * Math.sin(Math.PI * start_angle + 0.01);
        x2 = center_x + radius * Math.cos(Math.PI * start_angle - 0.01);
        y2 = center_y + radius * Math.sin(Math.PI * start_angle - 0.01);
    }
    drawArrowhead(x1, y1, x2, y2, arrow_size, arrow_size);
}

// sets top caption's top and bottom label's bottom
function setCaptionPositions(topTop, botBot) {
    divLabelTop.css({'top':topTop.toString() + 'px'});
    divLabelBot.css({'bottom' : botBot.toString() + 'px'});
}

