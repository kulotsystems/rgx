// draw state diagram for a
function a(a) {
    // set caption positions
    setCaptionPositions(150, 170);

    // draw NFA for a
    if(frame == 0) {
        drawArrow(151, 306, 178, 306, 7);
        drawState(221, 306, '0');
        drawAcceptingState(331, 306, '1');
        drawCustLgArrowRight(257, 306, 291, 306, a, 270, 290);
        writeToLabelTop("<span class='a b'>" + a + "</span>");
        writeToLabelBot("Construct NFA for <u>" + a + "</u>");
        frame = 0;
        pauseConstruct();
        setPlayLabel('refresh');
    }
}

// draw transition table of a
function drawTransTbl_a(a) {
    tblTransition.html('');
    var tblHtml = "";
    tblHtml += "<thead>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>&nbsp;</td>";
            tblHtml += "<td>" + a + "</td>";
        tblHtml += "</tr>";
    tblHtml += "</thead>";
    tblHtml += "<tbody>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>0</td>";
            tblHtml += "<td>1</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>1</td>";
            tblHtml += "<td>_</td>";
        tblHtml += "</tr>";
    tblHtml += "</tbody>";
    tblTransition.html(tblHtml);
}


