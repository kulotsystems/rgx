// draw state diagram for a*b
function a_star_b(a, b) {
    // set label positions
    setCaptionPositions(70, 130);

    // draw NFA for a
    if(frame == 0) {
        drawState(156, 325, '1');
        drawCustLgArrowRight(187, 325, 226, 325, a, 206, 313);
        drawState(267, 325, '2');
        writeToLabelTop("<span class='a b'>" + a + "</span>*" + b);
        writeToLabelBot("Construct NFA for <u>" + a + "</u>");
    }

    // draw NFA for a*
    else if(frame == 1) {
        drawArcArrow(211, 283, 90, 0.3, 0.676, 12, true);
        labelEpsilon(208, 391);
        drawCustLgArrowUpRight(289, 302, 317, 273, 3, 311, 300);
        drawState(348, 244, '3');
        writeToLabelTop("<span class='a b'>" + a + "*</span>" + b);
        writeToLabelBot("Construct NFA for <u>" + a + "*</u>");
    }

    // draw NFA for b
    else if(frame == 2) {
        drawCustLgArrowRight(380, 244, 419, 244, b, 396, 238);
        drawAcceptingState(459, 244, '4');
        writeToLabelTop("<span class='a b'>" + a + "*" + b + "</span>");
        writeToLabelBot("Construct NFA for <u>" + b + "</u>");
    }

    // finalize NFA for a*b
    else if(frame == 3) {
        drawArrow(13, 244, 35, 244, 7);
        drawState(75, 244, '0');
        drawCustLgArrowDownRight(99, 267, 126, 295, 3, 100, 299);
        drawArcArrow(211, 597, 390, 1.40699, 1.59, 12, true);
        labelEpsilon(208, 199);
        writeToLabelTop("<span class='a b'>" + a + "*" + b + "</span>");
        writeToLabelBot("Construct NFA for <u>" + a + "*" + b + "</u>");
        frame = -1;
        pauseConstruct();
        setPlayLabel('refresh');
    }
    frame += 1;
}

// draw transition table for a*b
function drawTransTbl_a_star_b(a, b) {
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
            tblHtml += "<td>1, 3</td>";
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
            tblHtml += "<td>1</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>3</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>4</td>";
            tblHtml += "<td>_</td>";
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
