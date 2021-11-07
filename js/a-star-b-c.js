// draw state diagram for a*bc
function a_star_b_c(a, b, c) {
    // set caption positions
    setCaptionPositions(100, 140);

    // draw NFA for a
    if(frame == 0) {
        drawSmState(149, 313, '1');
        drawSmArrowRight(174, 313, a, 178, 307);
        drawSmState(223, 313, '2');
        writeToLabelTop("<span class='a b'>" + a + "</span>*" + b + c);
        writeToLabelBot("Construct NFA for <u>" + a + "</u>");
    }

    // draw NFA for a*
    else if(frame == 1) {
        drawArcArrow(183, 272, 74, 0.34, 0.642, 10, true);
        labelSmEpsilon(181, 360);
        drawSmArrowUpRight(241, 297, 3, 235, 290);
        drawSmState(276, 262, '3');
        writeToLabelTop("<span class='a b'>" + a + "*</span>" + b + c);
        writeToLabelBot("Construct NFA for <u>" + a + "*</u>");
    }

    // draw NFA for b
    else if(frame == 2) {
        drawSmArrowRight(300, 262, b, 307, 256);
        drawSmState(351, 262, '4');
        writeToLabelTop("<span class='a b'>" + a + "*" + b + "</span>" + c);
        writeToLabelBot("Construct NFA for <u>" + b + "</u>");
    }

    // draw NFA for c
    else if(frame == 3) {
        drawSmArrowRight(375, 262, c, 384, 256);
        drawSmAcceptingState(425, 262, '5');
        writeToLabelTop("<span class='a b'>" + a + "*" + b + c + "</span>");
        writeToLabelBot("Construct NFA for <u>" + c + "</u>");
    }

    // draw NFA for a*bc
    else if(frame == 4){
        drawArrow(44, 262, 67, 262, 6);
        drawSmState(96, 262, '0');
        drawSmArrowDownRight(113, 278, 3, 121, 280);
        drawArcArrow(183, 616, 377, 1.441, 1.562, 10, true);
        labelSmEpsilon(180, 235);
        writeToLabelTop("<span class='a b'>" + a + "*" + b + c + "</span>");
        writeToLabelBot("Construct NFA for <u>" + a + "*" + b + c + "</u>");
        frame = -1;
        pauseConstruct();
        setPlayLabel('refresh');
    }
    frame += 1;
}

// draw transition table for a*bc
function drawTransTbl_a_star_b_c(a, b, c) {
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
            tblHtml += "<td>1</td>";
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
            tblHtml += "<td>1, 3</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>3</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>4</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>_</td>";
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
