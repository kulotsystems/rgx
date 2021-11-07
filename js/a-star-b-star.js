// draw state diagram for a*b*
function a_star_b_star(a, b) {
    // set label positions
    setCaptionPositions(20, 80);

    // draw NFA for a
    if(frame == 0) {
        drawState(201, 250, '1');
        drawCustLgArrowRight(232, 250, 271, 250, a, 252, 242);
        drawState(312, 250, '2');
        writeToLabelTop("<span class='a b'>" + a + "</span>*" + b + "*");
        writeToLabelBot("Construct NFA for <u>" + a + "</u>");
    }

    // draw NFA for a*
    else if(frame == 1) {
        drawArcArrow(256, 208, 90, 0.31, 0.676, 12, true);
        labelEpsilon(252, 291);
        drawCustLgArrowUpRight(334, 227, 364, 197, 3, 337, 208);
        drawState(393, 169, '3');
        writeToLabelTop("<span class='a b'>" + a + "*</span>" + b + "*");
        writeToLabelBot("Construct NFA for <u>" + a + "*</u>");
    }

    // draw NFA for b
    else if(frame == 2) {
        drawState(201, 361, '4');
        drawCustLgArrowRight(232, 361, 271, 361, b, 252, 382);
        drawState(312, 361, '5');
        writeToLabelTop("<span class='a b'>" + a + "*" + b + "</span>*");
        writeToLabelBot("Construct NFA for <u>" + b + "</u>");
    }

    // draw NFA for b*
    else if(frame == 3) {
        drawArcArrow(256, 318, 90, 0.31, 0.675, 12, true);
        labelEpsilon(251, 426);
        drawCustLgArrowDownRight(335, 383, 365, 413, 3, 356, 397);
        drawAcceptingState(392, 443, '6');
        writeToLabelTop("<span class='a b'>" + a + "*" + b + "*</span>");
        writeToLabelBot("Construct NFA for <u>" + b + "*</u>");
    }

    // connect a* and b*
    else if(frame == 4) {
        drawArcArrow(215, 155, 182, 0.080, 0.48, 12, true);
        labelEpsilon(347, 297);
        writeToLabelTop("<span class='a b'>" + a + "*" + b + "*</span>");
        writeToLabelBot("Construct NFA for <u>" + a + "*" + b + "*</u>");
    }

    // draw NFA for a*b*
    else if(frame == 5) {
        drawArrow(51, 169, 79, 169, 7);
        drawState(119, 170, '0');
        drawCustLgArrowDownRight(142, 192, 172, 221, 3, 165, 208);
        drawArcArrow(256, 521, 389, 1.406, 1.592, 12, true);
        labelEpsilon(253, 123);
        drawArcArrow(39, 305, 391, 1.908, 0.093, 12, true);
        labelEpsilon(437, 310);
        writeToLabelTop("<span class='a b'>" + a + "*" + b + "*</span>");
        writeToLabelBot("Construct NFA for <u>" + a + "*" + b + "*</u>");
        frame = -1;
        pauseConstruct();
        setPlayLabel('refresh');
    }
    frame += 1;
}

// draw transition table for a*b*
function drawTransTbl_a_star_b_star(a, b) {
    tblTransition.html('');
    var tblHtml = "";
    tblHtml += "<thead>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>&nbsp;</td>";
            tblHtml += "<td class='br'>" + a + "</td>";
            tblHtml += "<td class='br'>" + b + "</td>";
            tblHtml += "<td>&epsilon;</td>";
        tblHtml += "</tr>";
    tblHtml += "</thead>";
    tblHtml += "<tbody>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>0</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>1, 3, 6</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>1</td>";
            tblHtml += "<td class='br'>2</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>_</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>2</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>3, 6</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>3</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>4, 6</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>4</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>5</td>";
            tblHtml += "<td>_</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>5</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>6</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>*6</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>_</td>";
        tblHtml += "</tr>";
    tblHtml += "</tbody>";
    tblTransition.html(tblHtml);
}
