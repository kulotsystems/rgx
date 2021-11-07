var arrOperators = new Array('*', '?', '+', '|');

// the general parsing algorithm
function parseRgx(rgx) {
    var l = rgx.length;
    var expStack = new Array(); // Array => [ [ exp, (.|*), rgx] ]
    var indexOfPipe = rgx.indexOf('|');

    var proceed = false;

    if(indexOfPipe > 0) {
        var rgxL = rgx.length;
        if(rgx[0] == '(' && rgx.substr(rgxL-2, 1) == ')') {
            var insideRgx = rgx.substr(1, rgxL-3);
            proceed = areParenthesisMatched(insideRgx);
        }

        if(!proceed) {
            var e = new Array();
            for (var i = 0; i < rgxL; i++) {
                if (rgx[i] == '|') {
                    var leftRgx = rgx.substr(0, i);
                    if(areParenthesisMatched(leftRgx)) {
                        var d = new Array();

                        var rightRgx = rgx.substr(i + 1, rgx.length - i);

                        d.push(parseRgx(leftRgx));
                        d.push(parseRgx(rightRgx));

                        e.push(d);
                        e.push('|');
                        e.push(rgx);

                        expStack.push(e);
                        break;
                    }
                }
            }
            proceed = (e.length == 0);
        }
    }
    else
        proceed = true;
    if(proceed) {
        for (var i = 0; i < l; i++) {
            var c = rgx[i];
            var e = new Array();
            if (c == '(') {
                var str = "";
                var leftPCtr = 1;
                var rigtPCtr = 0;
                for (var j = i + 1; j < l; j++) {
                    var z = rgx[j];
                    if (z == '(')
                        leftPCtr += 1;
                    else if (z == ')')
                        rigtPCtr += 1;
                    if (leftPCtr == rigtPCtr)
                        break;
                    else
                        str += z;
                    i += 1;
                }
                i += 2;
                var d = '';
                try {
                    d = rgx[i];
                } catch (e) {
                    d = '';
                }
                e.push(parseRgx(str));
                if(isOperator(d) && d != '|') {
                    e.push(d);
                    e.push('(' + str + ')' + d);
                    expStack.push(e);
                }
                else if(!isOperator(d)) {
                    i -= 1;
                    e.push('.');
                    e.push('(' + str + ')');
                    expStack.push(e);
                }
            }
            else {
                var d = '';
                try {
                    d = rgx[i + 1];
                } catch (e) {
                    d = '';
                }

                if(isOperator(d) && d != '|') {
                    e.push(c);
                    e.push(d);
                    e.push(c + d);
                    i += 1;
                }
                else {
                    e.push(c);
                    e.push('.');
                    e.push(c);
                }
                expStack.push(e);
            }
        }
    }
    return expStack;
}

function removeSpaces(str) {
    if(str.indexOf(' ') > -1) {
        var newStr = '';
        for (var i = 0; i < str.length; i++) {
            if (str[i] != ' ')
                newStr += str[i];
        }
        return newStr;
    }
    else
        return str;
}

function simulate(rgx) {
    var allElementsDrawn = svg.find('*');
    allElementsDrawn.hide();
    var i = 0;
    simTimer = setInterval(function() {
        var e = svg.find('.' + simClasses[i].trim());
        if(e.length <= 0) {
            var j;
            for(j=i+1; j<=simClassCtr; j++) {
                e = svg.find('.' + simClasses[j].trim());
                if(e.length > 0) {
                    break;
                }
            }
            i = j;
        }
        e.fadeIn();
        spRgxProcessed.html(rgxProcessed[i]);
        i += 1;
        if(i >= simClassCtr + 1) {
            clearInterval(simTimer);
            setTimeout(function() {
                spRgxProcessed.html(rgx);
            }, simInterval)
        }

        var panelBody = svg.parent().parent();
        var panelBodyHeight = parseInt(panelBody.css('height'));
        var panelBodyWidth = parseInt(panelBody.css('width'));
        panelBody.animate({
            scrollTop: topCoordinates[i] - panelBodyHeight + stateDiameter * 2,
            scrollLeft: leftCoordinates[i] - panelBodyWidth + stateDiameter * 3
        }, 150);
    }, simInterval);
}

function getAlphaChars(input) {
    var str = '';
    for (var i = 0; i < input.length; i++) {
        var c = input[i];
        if(c != ' ') {
            switch(c) {
                case '.': c = 'concat'; break;
                case ',': c = 'and'; break;
                case '|': c = 'union'; break;
                case '*': c = 'closure'; break;
                case '?': c = 'question'; break;
                case '+': c = 'plus'; break;
                case '#': c = 'sharp'; break;
                case '(': c = 'leftpar'; break;
                case ')': c = 'rightpar'; break;
            }
            str += c;
        }
    }
    return str;
}

function pushSimulation(str, rgx) {
    simClassCtr += 1;
    simCurrentClass = ' ' + 'sim' + simClassCtr.toString() + str;
    simClasses.push(simCurrentClass.trim());
    rgxProcessed.push(rgx);

    topCoordinates.push(nxtY + stateRadius);
    leftCoordinates.push( + maxXRight);
}

function drawStateDiagram(expStack) {
    //alert("STACK: " + expStack);
    for(var i=0; i<expStack.length; i++) {
        var input = expStack[i][0];
        var operator = expStack[i][1];
        var rgx = expStack[i][2];

        //alert("input: " + input + "\noperator: " + operator + "\nrgx: " + rgx);

        //alert("Regex: " + rgx);


        var stackString = getAlphaChars(expStack.toString());

        if(operator != '*' && operator != '+' && operator != '|')
            pushSimulation(stackString, rgx);


        if(operator == '|') {
            var leftExpStack = input[0];
            var rightExpStack = input[1];

            var unionStartState = currentStateDrawn();
            var unionStartX = nxtX;
            var unionStartY = nxtY;

            drawArrowDown(e);
            drawState();
            drawStateDiagram(leftExpStack);

            var unionLastStateLeft = currentStateDrawn();
            var unionLeftX = nxtX;
            var unionLeftY = nxtY;

            nxtX = unionStartX;
            nxtY = unionStartY;

            // get maximum x right between next state and start state
            var maxX = unionStartX + stateRadius;

            for(var x = parseInt(unionStartState)+1; x<=parseInt(currentStateDrawn()); x++) {
                var q = svg.find('#q' + x.toString());
                var qMaxX = parseFloat(q.attr('cx')) + stateRadius;
                if(qMaxX > maxX) {
                    maxX = qMaxX;
                }
                try{
                    var texts = svg.find('.text' + x.toString());
                    for(var y=0; y<texts.length; y++) {
                        var textDim = texts[y].id.split('|');
                        var textX = parseFloat(textDim[0]);
                        if(textX > maxX) {
                            maxX = textX;
                        }
                    }
                }catch(e){}
            }

            var adjustX = maxX + (stateDiameter * 1.5);
            var adjustY = nxtY + stateDiameter;

            pushSimulation(stackString, '');
            drawCustArrowRightDown(e, adjustX, adjustY + stateRadius);
            transitions.pop();
            drawState();
            recordTransition(unionStartState, e, currentStateDrawn());
            drawStateDiagram(rightExpStack);

            var unionLastStateRight = currentStateDrawn();
            var unionRightX = nxtX;
            var unionRightY = nxtY;


            if(unionLeftY <= unionRightY) {
                nxtX = unionLeftX;
                nxtY = unionRightY + stateDiameter;
                pushSimulation(stackString, rgx);
                drawState();
                drawArrowDownFromTo(unionLastStateLeft, currentStateDrawn(), e);
                transitions.pop();
                recordTransition(unionLastStateLeft, e, currentStateDrawn());

                var unionEndState = currentStateDrawn();
                var unionEndX = nxtX;
                var unionEndY = nxtY;

                nxtX = unionRightX;
                nxtY = unionRightY;

                drawCustArrowLeftDown(e, unionEndX, unionEndY - stateRadius);
                transitions.pop();
                recordTransition(unionLastStateRight, e, unionEndState);
                nxtY += stateDiameter;
            }
            else {
                nxtX = unionLeftX;
                nxtY = unionLeftY;
                pushSimulation(stackString, rgx);
                drawArrowDown(e);
                drawState();

                var unionEndState = currentStateDrawn();
                var unionEndX = nxtX;
                var unionEndY = nxtY;

                nxtX = unionRightX;
                nxtY = unionRightY;


                var endOfLine = unionLeftY - stateRadius;
                if(nxtY < endOfLine) {
                    drawLine('', nxtX, nxtY + 4, nxtX, endOfLine);
                    transitions.pop();
                    constructArrowLeftDown(e, nxtX + 4, endOfLine - 4, unionEndX + stateRadius * Math.cos(Math.PI * 1.75), (unionEndY - stateRadius) + stateRadius * Math.sin(Math.PI * 1.75));
                }
                else {
                    drawCustArrowLeftDown(e, unionEndX, unionEndY - stateRadius);
                }
                transitions.pop();
                recordTransition(unionLastStateRight, e, unionEndState);
                nxtY += stateDiameter;
            }
        }

        else if(operator == '*') {
            var stateBeforeStar = currentStateDrawn();
            var stateBeforeConcat = stateCtr.toString();
            drawArrowRightDown(e);
            drawState();
            pushSimulation(stackString, rgx);
            if(input[0].length > 1)
                drawStateDiagram(input);
            else {
                pushSimulation(stackString, input);
                concatInput(input);
            }
            pushSimulation(stackString, rgx);
            drawArcArrowUp0000(e, stateBeforeConcat);
            drawArrowLeftDown(e);
            drawState();
            drawArrowDownFromTo(stateBeforeStar, currentStateDrawn(), e);
        }

        else if(operator == '?') {
            var stateBeforeConcat = currentStateDrawn();
            if(input[0].length > 1)
                drawStateDiagram(input);
            else {
                pushSimulation(stackString, input);
                concatInput(input);
            }

            if(!transitionExists(stateBeforeConcat, e, currentStateDrawn())) {
                pushSimulation(stackString, rgx);
                drawArcArrowDown2575(e, stateBeforeConcat);
            }
        }

        else if(operator == '+') {
            drawArrowDown(e);
            drawState();
            var stateBeforeConcat = currentStateDrawn();
            if(input[0].length > 1)
                drawStateDiagram(input);
            else {
                pushSimulation(stackString, input);
                concatInput(input);
            }
            pushSimulation(stackString, rgx);
            drawArcArrowUp2575(e, stateBeforeConcat);
            drawArrowDown(e);
            drawState();
        }

        else if(operator == '.') {
            if(input[0].length > 1)
                drawStateDiagram(input);
            else
                concatInput(input);
        }
    }
}

//----------------------------------------------------------------------------------------------------------------------
// draws an arrow down, input, and a destination state for concatenating a single input
function concatInput(a) {
    drawArrowDown(a);
    drawState();
}
// ---------------------------------------------------------------------------------------------------------------------

function isOperator(c) {
    return (arrOperators.indexOf(c) > -1);
}

// checks unmatched parenthesis
function areParenthesisMatched(rgx) {
    var leftPars = new Array();
    var rightPars = new Array();
    var l = rgx.length;
    for(var i=0; i<l; i++) {
        if(rgx[i] == '(')
            leftPars.push(i);
        else if(rgx[i] == ')') {
            if(leftPars.length == 0)
                rightPars.push(i);
            else
                leftPars.pop();
        }
    }
    var isMatched = true;
    if(leftPars.length != rightPars.length || (leftPars.length==1 && rightPars.length == 1 && leftPars[0] > rightPars[0]))
        isMatched = false;
    return isMatched;
}

// checks leading or double operators
function areOperatorsValid(rgx) {
    var isValid = true;
    var l = rgx.length;
    if(isOperator(rgx[0]))
        isValid = false;
    else {
        for(var i=0; i<(l-1); i++) {
            if((rgx[i]=='*' || rgx[i]=='?' || rgx[i] == '+') && rgx[i+1] == '|')
                continue;
            if (isOperator(rgx[i]) && isOperator(rgx[i + 1])) {
                isValid = false;
                break;
            }
        }
    }
    return isValid;
}
