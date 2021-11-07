// draw state diagram for ab*c
function a_b_star_c(a, b, c) {
    // set caption positions
    setCaptionPositions(100, 140);

    // draw NFA for a
    if(frame == 0) {
        drawSmState(96, 262, '0');
        drawSmArrowRight(120, 262, a, 126, 256);
        drawSmState(171, 262, '1');
        writeToLabelTop("<span class='a b'>" + a + "</span>" + b + "*" + c);
        writeToLabelBot("Construct NFA for <u>" + a + "</u>");
    }

    // draw NFA for b
    else if(frame == 1) {
        drawSmState(224, 313, '2');
        drawSmArrowRight(249, 313, b, 254, 308);
        drawSmState(298, 313, '3');
        writeToLabelTop("<span class='a b'>" + a + b + "</span>*" + c);
        writeToLabelBot("Construct NFA for <u>" + b + "</u>");
    }

    // draw NFA for b*
    else if(frame == 2) {
        drawArcArrow(258, 272, 74, 0.34, 0.642, 10, true);
        labelSmEpsilon(255, 360);
        drawSmArrowUpRight(316, 297, 3, 310, 289);
        drawSmState(351, 262, '4');
        writeToLabelTop("<span class='a b'>" + a + b + "*</span>" + c);
        writeToLabelBot("Construct NFA for <u>" + b + "*</u>");
    }

    // draw NFA for c
    else if(frame == 3) {
        drawSmArrowRight(375, 262, c, 384, 256);
        drawSmAcceptingState(425, 262, '5');
        writeToLabelTop("<span class='a b'>" + a + b + "*" + c + "</span>");
        writeToLabelBot("Construct NFA for <u>" + c + "</u>");
    }

    // draw NFA for ab*c
    else if(frame == 4) {
        drawArrow(44, 262, 67, 262, 6);
        drawSmArrowDownRight(188, 278, 3, 198, 283);
        drawArcArrow(258, 616, 377, 1.441, 1.562, 10, true);
        labelSmEpsilon(255, 235);
        writeToLabelTop("<span class='a b'>" + a + b + "*" + c + "</span>");
        writeToLabelBot("Construct NFA for <u>" + a + b + "*" + c + "</u>");
        frame = -1;
        pauseConstruct();
        setPlayLabel('refresh');
    }
    frame += 1;
}

// draw transition table for ab*c
function drawTransTbl_a_b_star_c(a, b, c) {
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
            tblHtml += "<td>2</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>2</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>3</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>_</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>3</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>2, 4</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>4</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>5</td>";
            tblHtml += "<td>_</td>";
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
