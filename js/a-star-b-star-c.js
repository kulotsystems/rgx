// draw state diagram for a*b*c
function a_star_b_star_c(a, b, c) {
    // set caption positions
    setCaptionPositions(100, 140);

    // draw NFA for a
    if(frame == 0) {
        drawSmState(100, 313, '1');
        drawSmArrowRight(124, 313, a, 132, 306);
        drawSmState(174, 313, '2');
        writeToLabelTop("<span class='a b'>" + a + "</span>*" + b + "*" + c);
        writeToLabelBot("Construct NFA for <u>" + a + "</u>");
    }

    // draw NFA for a*
    else if(frame == 1) {
        drawArcArrow(134, 272, 74, 0.34, 0.642, 10, true);
        labelSmEpsilon(131, 360);
        drawSmArrowUpRight(192, 297, 3, 187, 287);
        drawSmState(227, 262, '3');
        writeToLabelTop("<span class='a b'>" + a + "*</span>" + b + "*" + c);
        writeToLabelBot("Construct NFA for <u>" + a + "*</u>");
    }

    // draw NFA for b
    else if(frame == 2) {
        drawSmState(280, 313, '4');
        drawSmArrowRight(304, 313, b, 311, 306);
        drawSmState(354, 313, '5');
        writeToLabelTop("<span class='a b'>" + a + "*" + b + "</span>*" + c);
        writeToLabelBot("Construct NFA for <u>" + b + "</u>");
    }

    // draw NFA for b* {
    else if(frame == 3) {
        drawArcArrow(314, 272, 74, 0.34, 0.642, 10, true);
        labelSmEpsilon(311, 360);
        drawSmArrowUpRight(372, 297, 3, 367, 287);
        drawSmState(407, 262, '6');
        writeToLabelTop("<span class='a b'>" + a + "*" + b + "*</span>" + c);
        writeToLabelBot("Construct NFA for <u>" + b + "*</u>");
    }

    // draw NFA for c {
    else if(frame == 4) {
        drawSmArrowRight(431, 262, c, 440, 254);
        drawSmAcceptingState(482, 262, '7');
        writeToLabelTop("<span class='a b'>" + a + "*" + b + "*" + c + "</span>");
        writeToLabelBot("Construct NFA for <u>" + c + "</u>");
    }

    // draw NFA for a*b*c
    else if(frame == 5) {
        drawArrow(3, 262, 18, 262, 6);
        drawSmState(47, 262, '0');
        drawSmArrowDownRight(65, 279, 3, 74, 283);
        drawArcArrow(134, 616, 377, 1.441, 1.562, 10, true);
        labelSmEpsilon(130, 236);
        drawSmArrowDownRight(245, 279, 3, 253, 282);
        drawArcArrow(314, 616, 377, 1.441, 1.562, 10, true);
        labelSmEpsilon(311, 235);
        writeToLabelTop("<span class='a b'>" + a + "*" + b + "*" + c + "</span>");
        writeToLabelBot("Construct NFA for <u>" + a + "*" + b + "*" + c + "</u>");
        frame = -1;
        pauseConstruct();
        setPlayLabel('refresh');
    }
    frame += 1;
}

// draw transition table for a*b*c
function drawTransTbl_a_star_b_star_c(a, b, c) {
    tblTransition.html('');
    var tblHtml = "";
    tblHtml += "<thead>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>&nbsp;</td>";
            tblHtml += "<td class='br'>" + a + "</td>";
            tblHtml += "<td class='br'>" + b + "</td>";
            tblHtml += "<td class='br'>" + c + "</td>";
            tblHtml += "<td>&epsilon;</td>";
        tblHtml += "</tr>";
    tblHtml += "</thead>";
    tblHtml += "<tbody>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>0</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>1,3,4,6</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>1</td>";
            tblHtml += "<td class='br'>2</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>_</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>2</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>3,4,6</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>3</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>4,6</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>4</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>5</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>_</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>5</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>6</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>6</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>7</td>";
            tblHtml += "<td>_</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>*7</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>_</td>";
        tblHtml += "</tr>";
    tblHtml += "</tbody>";
    tblTransition.html(tblHtml);
}
