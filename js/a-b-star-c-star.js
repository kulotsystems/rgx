// draw state diagram for ab*c*
function a_b_star_c_star(a, b, c) {
    // set caption positions
    setCaptionPositions(100, 140);

    // draw NFA for a
    if(frame == 0) {
        drawSmState(47, 262, '0');
        drawSmArrowRight(71, 262, a, 80, 254);
        drawSmState(122, 262, '1');
        writeToLabelTop("<span class='a b'>" + a + "</span>" + b + "*" + c + "*");
        writeToLabelBot("Construct NFA for <u>" + a + "</u>");
    }

    // draw NFA for b
    else if(frame == 1) {
        drawSmState(175, 313, '2');
        drawSmArrowRight(199, 313, b, 206, 305);
        drawSmState(249, 313, '3');
        writeToLabelTop("<span class='a b'>" + a + b + "</span>" + "*" + c + "*");
        writeToLabelBot("Construct NFA for <u>" + b + "</u>");
    }

    // draw NFA for b*
    else if(frame == 2) {
        drawArcArrow(209, 272, 74, 0.34, 0.642, 10, true);
        labelSmEpsilon(205, 359);
        drawSmArrowUpRight(267, 297, 3, 262, 288);
        drawSmState(302, 262, '4');
        writeToLabelTop("<span class='a b'>" + a + b + "*</span>" + c + "*");
        writeToLabelBot("Construct NFA for <u>" + b + "*</u>");
    }

    // draw NFA for c
    else if(frame == 3) {
        drawSmState(355, 313, '5');
        drawSmArrowRight(379, 313, c, 387, 306);
        drawSmState(429, 313, '6');
        writeToLabelTop("<span class='a b'>" + a + b + "*" + c + "</span>*");
        writeToLabelBot("Construct NFA for <u>" + c + "</u>");
    }

    // draw NFA for c*
    else if(frame == 4) {
        drawArcArrow(389, 272, 74, 0.34, 0.642, 10, true);
        labelSmEpsilon(385, 359);
        drawSmArrowUpRight(447, 297, 3, 441, 288);
        drawSmAcceptingState(482, 262, '7');
        writeToLabelTop("<span class='a b'>" + a + b + "*" + c + "*</span>");
        writeToLabelBot("Construct NFA for <u>" + c + "*</u>");
    }

    // draw NFA for ab*c*
    else if(frame == 5) {
        drawArrow(3, 262, 18, 262, 6);
        drawSmArrowDownRight(140, 278, 3, 148, 282);
        drawArcArrow(209, 616, 377, 1.441, 1.562, 10, true);
        labelSmEpsilon(205, 236);
        drawSmArrowDownRight(319, 278, 3, 327, 281);
        drawArcArrow(389, 616, 377, 1.441, 1.562, 10, true);
        labelSmEpsilon(385, 236);
        writeToLabelTop("<span class='a b'>" + a + b + "*" + c + "*</span>");
        writeToLabelBot("Construct NFA for <u>" + a + b + "*" + c + "*</u>");
        frame = -1;
        pauseConstruct();
        setPlayLabel('refresh');
    }
    frame += 1;
}

// draw transition table for ab*c*
function drawTransTbl_a_b_star_c_star(a, b, c) {
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
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>2,4,5,7</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>2</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>3</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>2</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>3</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>4,5,7</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>4</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>5, 7</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>5</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>6</td>";
            tblHtml += "<td>_</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>6</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>5, 7</td>";
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
