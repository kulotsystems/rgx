// draw state diagram for (a*b*)*
function a_star_b_star__star(a, b) {
    // set label positions
    setCaptionPositions(30, 100);

    // draw NFA for a
    if(frame == 0) {
        drawSmState(218, 270, '3');
        drawSmArrowRight(243, 270, a, 250, 263);
        drawSmState(292, 270, '4');
        writeToLabelTop("(<span class='a b'>" + a + "</span>*" + b + "*)*");
        writeToLabelBot("Construct NFA for <u>" + a + "</u>");
    }

    // draw NFA for a*
    else if(frame == 1) {
        drawArcArrow(255, 235, 68, 0.34, 0.644, 10, true);
        labelSmEpsilon(249, 300);
        drawSmArrowUpRight(310, 254, 3, 305, 242);
        drawSmState(345, 219, '2');
        writeToLabelTop("(<span class='a b'>" + a + "*</span>" + b + "*)*");
        writeToLabelBot("Construct NFA for <u>" + a + "*</u>");
    }

    // draw NFA for b
    else if(frame == 2) {
        drawSmState(218, 342, '5');
        drawSmArrowRight(243, 342, b, 249, 358);
        drawSmState(291, 343, '6');
        writeToLabelTop("(<span class='a b'>" + a + "*" + b + "</span>*)*");
        writeToLabelBot("Construct NFA for <u>" + b + "</u>");
    }
    // draw NFA for b*
    else if(frame == 3) {
        drawArcArrow(255, 308, 68, 0.34, 0.646, 10, true);
        labelSmEpsilon(250, 391);
        drawSmArrowDownRight(310, 359, 3, 319, 363);
        drawSmState(345, 394, '7');
        writeToLabelTop("(<span class='a b'>" + a + "*" + b + "*</span>)*");
        writeToLabelBot("Construct NFA for <u>" + b + "*</u>");
    }

    // draw NFA for a*b*
    else if(frame == 4) {
        drawArcArrow(231, 206, 121, 0.1, 0.476, 10, true);
        labelSmEpsilon(320, 301);
        writeToLabelTop("(<span class='a b'>" + a + "*" + b + "*</span>)*");
        writeToLabelBot("Construct NFA for <u>" + b + "*</u>");
    }

    // finalize NFA for a*b*
    else if(frame == 5) {
        drawSmState(165, 219, '1');
        drawSmArrowDownRight(183, 236, 3, 193, 241);
        drawArcArrow(255, 528, 331, 1.431, 1.567, 10, true);
        labelSmEpsilon(249, 193);
        drawArcArrow(39, 309, 332, 1.929, 0.066, 10, true);
        labelSmEpsilon(376, 303);
        writeToLabelTop("(<span class='a b'>" + a + "*" + b + "*</span>)*");
        writeToLabelBot("Construct NFA for <u>" + b + "*</u>");
    }

    // draw NFA for (a*b*)*
    else if(frame == 6) {
        drawArcArrow(266, 298, 131, 0.34, 1.145, 10, true);
        labelSmEpsilon(160, 400);
        writeToLabelTop("<span class='a b'>(" + a + "*" + b + "*)*</span>");
        writeToLabelBot("Construct NFA for <u>(" + a + "*" + b + "*)*</u>");
    }

    // finalize NFA for (a*b*)*
    else if(frame == 7) {
        drawArrow(42, 219, 60, 219, 6);
        drawSmState(91, 219, '0');
        drawArrow(115, 219, 134, 219, 6);
        labelSmEpsilon(121, 214);
        drawSmArrowRight(370, 394, 3, 377, 387);
        drawSmAcceptingState(419, 394, '8');
        drawArcArrow(240, 320, 190, 1.228, 0.079, 10, true);
        labelSmEpsilon(344, 157);
        writeToLabelTop("<span class='a b'>(" + a + "*" + b + "*)*</span>");
        writeToLabelBot("Construct NFA for <u>(" + a + "*" + b + "*)*</u>");
        frame = -1;
        pauseConstruct();
        setPlayLabel('refresh');
    }
    frame += 1;
}

// draw transition table for (a*b*)*
function drawTransTbl_a_star_b_star__star(a, b) {
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
            tblHtml += "<td>1,2,3,5,7,8</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>1</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>2,3,5,7,8</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>2</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>5, 7, 8</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>3</td>";
            tblHtml += "<td class='br'>4</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>_</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>4</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>2,3,5,7,8</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>5</td>";
            tblHtml += "<td class='br'>6</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>_</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>6</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>5, 7, 8</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>7</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>_</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>*8</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>_</td>";
        tblHtml += "</tr>";
    tblHtml += "</tbody>";
    tblTransition.html(tblHtml);
}

