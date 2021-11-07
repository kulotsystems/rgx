// draw state diagram for abc*
function a_b_c_star(a, b, c) {
    // set caption positions
    setCaptionPositions(100, 140);

    // draw NFA for a
    if(frame == 0) {
        drawSmState(96, 262, '0');
        drawSmArrowRight(120, 262, a, 126, 255);
        drawSmState(171, 262, '1');
        writeToLabelTop("<span class='a b'>" + a + "</span>" + b + c + "*");
        writeToLabelBot("Construct NFA for <u>" + a + "</u>");
    }

    // draw NFA for b
    else if(frame == 1) {
        drawSmArrowRight(194, 262, b, 198, 257);
        drawSmState(244, 262, '2');
        writeToLabelTop("<span class='a b'>" + a + b + "</span>" + c + "*");
        writeToLabelBot("Construct NFA for <u>" + b + "</u>");
    }

    // draw NFA for c
    else if(frame == 2) {
        drawSmState(297, 313, '3');
        drawSmArrowRight(322, 313, c, 327, 308);
        drawSmState(371, 313, '4');
        writeToLabelTop("<span class='a b'>" + a + b + c + "</span>" + "*");
        writeToLabelBot("Construct NFA for <u>" + c + "</u>");
    }

    // draw NFA for c*
    else if(frame == 3) {
        drawArcArrow(331, 272, 74, 0.34, 0.64, 10, true);
        labelSmEpsilon(328, 360);
        drawSmArrowUpRight(389, 297, 3, 384, 288);
        drawSmAcceptingState(424, 262, '5');
        writeToLabelTop("<span class='a b'>" + a + b + c + "*</span>");
        writeToLabelBot("Construct NFA for <u>" +  c + "*</u>");
    }

    // draw NFA for abc*
    else if(frame == 4) {
        drawArrow(44, 262, 67, 262, 6);
        drawSmArrowDownRight(261, 278, 3, 270, 282);
        drawArcArrow(331, 616, 377, 1.441, 1.562, 10, true);
        labelSmEpsilon(328, 235);
        writeToLabelTop("<span class='a b'>" + a + b + c + "*</span>");
        writeToLabelBot("Construct NFA for <u>" + a + b + c + "*</u>");
        frame = -1;
        pauseConstruct();
        setPlayLabel('refresh');
    }
    frame += 1;
}

// draw transition table for abc*
function drawTransTbl_a_b_c_star(a, b, c) {
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
            tblHtml += "<td class='br'>1</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>_</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>1</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>2</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>_</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>2</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>3, 5</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>3</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>4</td>";
            tblHtml += "<td>_</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>4</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>3, 5</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>*5</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>_</td>";
        tblHtml += "</tr>";
    tblHtml += "</tbody>";
    tblTransition.html(tblHtml);
}
