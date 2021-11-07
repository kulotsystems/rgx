// draw state diagram for ab
function a_b(a, b) {
    // set label positions
    setCaptionPositions(150, 180);

    // draw NFA for for a
    if(frame == 0) {
        drawState(160, 296, '0');
        drawCustLgArrowRight(191, 296, 230, 296, a, 209, 284);
        drawState(270, 296, '1');
        writeToLabelTop("<span class='a b'>" + a + "</span>" + b);
        writeToLabelBot("Construct NFA for <u>" + a + "</u>");
    }

    // draw NFA for b
    else if(frame == 1) {
        drawArrow(87, 296, 120, 296, 7);
        drawCustLgArrowRight(303, 296, 341, 296, b, 319, 284);
        drawAcceptingState(381, 296, '2');
        writeToLabelTop("<span class='a b'>" + a + b + "</span>");
        writeToLabelBot("Construct NFA for <u>" + a + b + "</u>");
        frame = -1;
        pauseConstruct();
        setPlayLabel('refresh');
    }
    frame += 1;
}

// draw transition table for ab
function drawTransTbl_a_b(a, b) {
    tblTransition.html('');
    var tblHtml = "";
    tblHtml += "<thead>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>&nbsp;</td>";
            tblHtml += "<td class='br'>" + a + "</td>";
            tblHtml += "<td class='br'>" + b + "</td>";
        tblHtml += "</tr>";
    tblHtml += "</thead>";
    tblHtml += "<tbody>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>0</td>";
            tblHtml += "<td class='br'>1</td>";
            tblHtml += "<td class='br'>_</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>1</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>2</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>2</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
        tblHtml += "</tr>";
    tblHtml += "</tbody>";
    tblTransition.html(tblHtml);
}