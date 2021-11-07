// draw state diagram for abc
function a_b_c(a, b, c) {
    // set label positions
    setCaptionPositions(170, 180);

    // draw NFA for for a
    if(frame == 0) {
        drawState(97, 326, '0');
        drawCustLgArrowRight(129, 326, 169, 327, a, 148, 315);
        drawState(209, 326, '1');
        writeToLabelTop("<span class='a b'>" + a + "</span>" + b + c);
        writeToLabelBot("Construct NFA for <u>" + a + "</u>");
    }
    // draw NFA for b
    else if(frame == 1) {
        drawCustLgArrowRight(241, 326, 280, 326, b, 259, 315);
        drawState(320, 326, '2');
        writeToLabelTop("<span class='a b'>" + a + b + "</span>" + c);
        writeToLabelBot("Construct NFA for <u>" + b + "</u>");
    }
    // draw NFA for c
    else if(frame == 2) {
        drawCustLgArrowRight(352, 326, 393, 326, c, 371, 315);
        drawAcceptingState(431, 325, '3');
        writeToLabelTop("<span class='a b'>" + a + b + c + "</span>");
        writeToLabelBot("Construct NFA for <u>" + c + "</u>");
    }

    // draw NFA for abc
    else if(frame == 3) {
        drawArrow(29, 326, 56, 326, 7);
        writeToLabelTop("<span class='a b'>" + a + b + c + "</span>");
        writeToLabelBot("Construct NFA for <u>" + a + b + c + "</u>");
        frame = -1;
        pauseConstruct();
        setPlayLabel('refresh');
    }
    frame += 1;
}

// draw transition table for abc
function drawTransTbl_a_b_c(a, b, c) {
    tblTransition.html('');
    var tblHtml = "";
    tblHtml += "<thead>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>&nbsp;</td>";
            tblHtml += "<td class='br'>" + a + "</td>";
            tblHtml += "<td class='br'>" + b + "</td>";
            tblHtml += "<td>" + c + "</td>";
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
            tblHtml += "<td class='br'>2</td>";
            tblHtml += "<td>_</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>2</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>3</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>*3</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>_</td>";
        tblHtml += "</tr>";
    tblHtml += "</tbody>";
    tblTransition.html(tblHtml);
}