// draw state diagram for a*b*c*
function a_star_b_star_c_star(a, b, c) {
    // set label positions
    setCaptionPositions(40, 75);

    // draw NFA for a
    if(frame == 0) {
        drawSmState(153, 257, '1');
        drawSmArrowRight(178, 257, a, 183, 251);
        drawSmState(227, 257, '2');
        writeToLabelTop("<span class='a b'>" + a + "</span>*" + b + "*" + c + "*");
        writeToLabelBot("Construct NFA for <u>" + a + "</u>");
    }

    // draw NFA for a*
    else if(frame == 1) {
        drawArcArrow(187, 216, 74, 0.34, 0.64, 10, true);
        labelSmEpsilon(185, 303);
        drawSmArrowUpRight(245, 241, 3, 241, 230);
        drawSmState(280, 206, '3');
        writeToLabelTop("<span class='a b'>" + a + "*</span>" + b + "*" + c + "*");
        writeToLabelBot("Construct NFA for <u>" + a + "*</u>");
    }

    // draw NFA for b
    else if(frame == 2) {
        drawSmState(227, 332, '4');
        drawSmArrowRight(251, 332, b, 257, 326);
        drawSmState(301, 332, '5');
        writeToLabelTop("<span class='a b'>" + a + "*" + b + "</span>*" + c + "*");
        writeToLabelBot("Construct NFA for <u>" + b + "</u>");
    }

    // draw NFA for b*
    else if(frame == 3) {
        drawArcArrow(261, 291, 74, 0.34, 0.64, 10, true);
        labelSmEpsilon(258, 377);
        drawSmArrowUpRight(319, 316, 3, 314, 308);
        drawSmState(355, 281, '6');
        writeToLabelTop("<span class='a b'>" + a + "*" + b + "*</span>" + c + "*");
        writeToLabelBot("Construct NFA for <u>" + b + "*</u>");
    }

    // draw NFA for c
    else if(frame == 4) {
        drawSmState(302, 406, '7');
        drawSmArrowRight(326, 406, c, 331, 400);
        drawSmState(376, 406, '8');
        writeToLabelTop("<span class='a b'>" + a + "*" + b + "*" + c + "</span>*");
        writeToLabelBot("Construct NFA for <u>" + c + "</u>");
    }

    // draw NFA for c*
    else if(frame == 5) {
        drawArcArrow(336, 365, 74, 0.34, 0.64, 10, true);
        labelSmEpsilon(333, 452);
        drawSmArrowUpRight(394, 390, 3, 390, 380);
        drawSmAcceptingState(429, 355, '9');
        writeToLabelTop("<span class='a b'>" + a + "*" + b + "*" + c + "*</span>");
        writeToLabelBot("Construct NFA for <u>" + c + "*</u>");
    }

    // draw NFA for a*b*c*
    else if(frame == 6) {
        drawArcArrow(164, 200, 124, 0.076, 0.32, 10, true);
        labelSmEpsilon(266, 282);
        drawArcArrow(237, 275, 124, 0.076, 0.32, 10, true);
        labelSmEpsilon(341, 354);
        writeToLabelTop("<span class='a b'>" + a + "*" + b + "*" + c + "*</span>");
        writeToLabelBot("Construct NFA for <u>" + a + "*" + b + "*" + c + "*</u>");
    }

    // finalize NFA for a*b*c*
    else if(frame == 7){
        drawArrow(48, 206, 70, 206, 6);
        drawSmState(100, 206, '0');
        drawSmArrowDownRight(118, 222, 3, 127, 226);
        drawArcArrow(187, 560, 377, 1.442, 1.562, 10, true);
        labelSmEpsilon(184, 180);
        drawArrow(297, 222, 334, 260, 6);
        labelSmEpsilon(315, 237);
        drawArrow(371, 297, 409, 335, 6);
        labelSmEpsilon(389, 311);
        writeToLabelTop("<span class='a b'>" + a + "*" + b + "*" + c + "*</span>");
        writeToLabelBot("Construct NFA for <u>" + a + "*" + b + "*" + c + "*</u>");
        frame = -1;
        pauseConstruct();
        setPlayLabel('refresh');
    }
    frame += 1;
}

// draw transition table for a*b*c*
function drawTransTbl_a_star_b_star_c_star(a, b, c) {
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
    tblHtml += "<tbody style='font-size: 0.93em'>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>0</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>1,3,4,6,7,9</td>";
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
            tblHtml += "<td>3,4,6,7,9</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>3</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>4,6,7,9</td>";
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
            tblHtml += "<td>6,7,9</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>6</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>7,9</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>7</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>8</td>";
            tblHtml += "<td>_</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>8</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>7,9</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>*9</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>_</td>";
        tblHtml += "</tr>";
    tblHtml += "</tbody>";
    tblTransition.html(tblHtml);
}