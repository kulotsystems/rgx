// draw state diagram for a*|b
function a_star_union_b(a, b) {
    // set caption positions
    setCaptionPositions(60, 100);

    // draw NFA for a
    if(frame == 0) {
        drawState(256, 223, '2');
        drawCustLgArrowRight(287, 223, 327, 223, a, 306, 214);
        drawState(367, 223, '3');
        writeToLabelTop("<span class='a b'>" + a + "</span>*|" + b);
        writeToLabelBot("Construct NFA for <u>" + a +  "</u>");
    }

    // start drawing NFA for a*
    else if(frame == 1) {
        drawArcArrow(312, 211, 69, 0.225, 0.76, 12, true);
        labelEpsilon(308, 300);
        drawCustLgArrowDownRight(389, 246, 416, 274, 3, 392, 280);
        drawState(446, 302, '4');
        writeToLabelTop("<span class='a b'>" + a + "*</span>|" + b);
        writeToLabelBot("Construct NFA for <u>" + a + "*</u>");
    }

    // finalize drawing NFA for a*
    else if(frame == 2) {
        drawState(145, 223, '1');
        drawCustLgArrowRight(176, 223, 215, 223, 3, 194, 214);
        drawArcArrow(271, 328, 184, 1.27, 1.889, 12, true);
        labelEpsilon(323, 145);
        writeToLabelTop("<span class='a b'>" + a + "*</span>|" + b);
        writeToLabelBot("Construct NFA for <u>" + a + "*</u>");
    }

    // draw NFA for b
    else if(frame == 3) {
        drawState(145, 382, '5');
        drawCustLgArrowRight(176, 382, 216, 382, b, 192, 403);
        drawState(256, 382, '6');
        writeToLabelTop("<span class='a b'>" + a + "*</span>|" + "<span class='a b'>" + b + "</span>");
        writeToLabelBot("Construct NFA for <u>" + b + "</u>");
    }

    // start drawing NFA for a*|b
    else if(frame == 4) {
        drawArrow(1, 302, 23, 302, 7);
        drawCustLgArrowUpRight(87, 279, 115, 250, 3, 88, 261);
        drawState(64, 302, '0');
        drawCustLgArrowDownRight(87, 325, 115, 353, 3, 88, 354);
        writeToLabelTop("<span class='a b'>" + a + "*|" + b + "</span>");
        writeToLabelBot("Construct NFA for <u>" + a + "*|" + b + "</u>");
    }

    // finalize drawing NFA for a*|b
    else if(frame == 5) {
        drawCustLgArrowRight(288, 382, 326, 382, 3, 305, 403);
        drawCustLgArrowDownLeft(423, 324, 394, 353, 3, 413, 352);
        drawAcceptingState(367, 382, '7');
        writeToLabelTop("<span class='a b'>" + a + "*|" + b + "</span>");
        writeToLabelBot("Construct NFA for <u>" + a + "*|" + b + "</u>");
        frame = -1;
        pauseConstruct();
        setPlayLabel('refresh');
    }
    frame += 1;
}

// draw transition table of a*|b
function drawTransTbl_a_star_union_b(a, b) {
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
            tblHtml += "<td>1,2,4,5,7</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>1</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>2,4,7</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>2</td>";
            tblHtml += "<td class='br'>3</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>_</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>3</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>2,4,7</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>4</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>7</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>5</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>6</td>";
            tblHtml += "<td>_</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>6</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>7</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>*7</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>_</td>";
        tblHtml += "</tr>";
    tblHtml += "</tbody>";
    tblTransition.html(tblHtml);
}