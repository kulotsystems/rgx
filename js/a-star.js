// draw state diagram for a*
function a_star(a) {
    // set caption positions
    setCaptionPositions(100, 100);

    // draw NFA for a
    if(frame == 0) {
        drawState(217, 307, '1');
        drawCustLgArrowRight(248, 307, 287, 307, a, 267, 301);
        drawState(326, 307, '2');
        writeToLabelTop("<span class='a b'>" + a + "</span>" + "*");
        writeToLabelBot("Construct NFA for <u>" + a + "</u>");
    }

    // draw NFA for a*
    else if(frame == 1) {
        drawArcArrow(271, 332, 77, 1.29, 1.71, 12, true);
        labelEpsilon(266, 245);
        drawCustLgArrowRight(357, 307, 397, 307, 3, 376, 300);
        drawAcceptingState(437, 307, '3');
        writeToLabelTop("<span class='a b'>" + a + "*</span>");
        writeToLabelBot("Construct NFA for <u>" + a + "*</u>");
    }

    // finalize NFA for a*
    else if(frame == 2) {
        writeToLabelTop();
        writeToLabelBot();
        frame += 1;
        drawArrow(25, 307, 64, 307, 7);
        drawState(104, 307, '0');
        drawCustLgArrowRight(136, 307, 175, 307, 3, 150, 301);
        drawArcArrow(271, 208, 210, 0.22, 0.785, 12, false);
        labelEpsilon(266, 410);
        writeToLabelTop("<span class='a b'>" + a + "*</span>");
        writeToLabelBot("Construct NFA for <u>" + a + "*</u>");
        frame = -1;
        pauseConstruct();
        setPlayLabel('refresh');
    }
    frame += 1;
}

// draw transition table for a*
function drawTransTbl_a_star(a) {
    tblTransition.html('');
    var tblHtml = "";
    tblHtml += "<thead>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>&nbsp;</td>";
            tblHtml += "<td class='br'>" + a + "</td>";
            tblHtml += "<td>&epsilon;</td>";
        tblHtml += "</tr>";
    tblHtml += "</thead>";
    tblHtml += "<tbody>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>0</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>1, 3</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>1</td>";
            tblHtml += "<td class='br'>2</td>";
            tblHtml += "<td>_</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>2</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>1, 3</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>*3</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>_</td>";
        tblHtml += "</tr>";
    tblHtml += "</tbody>";
    tblTransition.html(tblHtml);
}
