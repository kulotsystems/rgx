// draw state diagram for ab*
function a_b_star(a, b) {
    // set label positions
    setCaptionPositions(70, 130);

    // draw NFA for a
    if(frame == 0) {
        drawArrow(13, 245, 37, 245, 7);
        drawState(75, 245, '0');
        drawCustLgArrowRight(107, 245, 147, 245, a, 119, 232);
        drawState(187, 245, '1');
        writeToLabelTop("<span class='a b'>" + a + "</span>" + b + "*");
        writeToLabelBot("Construct NFA for <u>" + a + "</u>");
    }

    // draw NFA for b
    else if(frame == 1) {
        drawState(269, 325, '2');
        drawCustLgArrowRight(300, 325, 339, 325, b, 320, 317);
        drawState(380, 325, '3');
        writeToLabelTop("<span class='a b'>" + a + b + "</span>*");
        writeToLabelBot("Construct NFA for <u>" + b + "</u>");
    }

    // draw NFA for b*
    else if(frame == 2) {
        drawArcArrow(324, 283, 90, 0.31, 0.677, 12, true);
        labelEpsilon(320, 393);
        drawCustLgArrowUpRight(401, 303, 430, 274, 3, 423, 301);
        drawAcceptingState(461, 244, '4');
        writeToLabelTop("<span class='a b'>" + a + b + "*</span>");
        writeToLabelBot("Construct NFA for <u>" + b + "*</u>");
    }

    // draw NFA for ab*
    else if(frame == 3) {
        drawCustLgArrowDownRight(211, 267, 239, 295, 3, 213, 299);
        drawArcArrow(324, 597, 390, 1.407, 1.590, 12, true);
        labelEpsilon(320, 199);
        writeToLabelTop("<span class='a b'>" + a + b + "*</span>");
        writeToLabelBot("Construct NFA for <u>" + a + b + "*</u>");
        frame = -1;
        pauseConstruct();
        setPlayLabel('refresh');
    }
    frame += 1;
}

// draw transition table for ab*
function drawTransTbl_a_b_star(a, b) {
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
            tblHtml += "<td class='br'>1</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>_</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>1</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>2, 4</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>2</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>3</td>";
            tblHtml += "<td>_</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>3</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>2, 4</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>*4</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>_</td>";
        tblHtml += "</tr>";
    tblHtml += "</tbody>";
    tblTransition.html(tblHtml);
}
