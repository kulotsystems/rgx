// draw state diagram for a|(b|c)
function a_union__b_union_c(a, b, c) {
    // set label positions
    setCaptionPositions(70, 120);

    // draw NFA for a
    if(frame == 0) {
        drawSmState(196, 381, '1');
        drawCustArrowRight(221, 381, 254, 381, a, 236, 377);
        drawSmState(284, 381, '2');
        writeToLabelTop("<span class='a b'>" + a + "</span>|(" + b + "|" + c + ")");
        writeToLabelBot("Construct NFA for <u>" + a + "</u>");
    }

    // draw NFA for b
    else if(frame == 1) {
        drawSmState(248, 298, '4');
        drawSmArrowRight(272, 298, b, 280, 291);
        drawSmState(321, 298, '5');
        writeToLabelTop("<span class='a b'>" + a + "</span>|(<span class='a b'>" + b + "</span>" + "|" + c + ")");
        writeToLabelBot("Construct NFA for <u>" + b + "</u>");
    }

    // draw NFA for c
    else if(frame == 2) {
        drawSmState(248, 195, '6');
        drawSmArrowRight(272, 195, c, 280, 188);
        drawSmState(321, 195, '7');
        writeToLabelTop("<span class='a b'>" + a + "</span>|(<span class='a b'>" + b + "</span>" + "|<span class='a b'>" + c + "</span>)");
        writeToLabelBot("Construct NFA for <u>" + c + "</u>");
    }

    // draw NFA for b|c
    else if(frame == 3) {
        drawSmState(196, 247, '3');
        drawSmArrowUpRight(214, 231, 3, 208, 221);
        drawSmArrowDownRight(214, 263, 3, 208, 280);
        writeToLabelTop("<span class='a b'>" + a + "</span>|(<span class='a b'>" + b + "|" + c + "</span>)");
        writeToLabelBot("Construct NFA for <u>" + b + "|" + c + "</u>");
    }

    // finalize NFA for (b|c)
    else if(frame == 4) {
        drawSmArrowDownRight(339, 212, 3, 349, 217);
        drawSmArrowUpRight(339, 282, 3, 349, 290);
        drawSmState(374, 247, '8');
        writeToLabelTop("<span class='a b'>" + a + "</span>|<span class='a b'>(" + b + "|" + c + ")</span>");
        writeToLabelBot("Construct NFA for <u>(" + b + "|" + c + ")</u>");
    }

    // draw NFA for a|(b|c)
    else if(frame == 5) {
        drawArrow(80, 314, 103, 314, 6);
        drawSmState(133, 314, '0');
        drawCustArrowUpRight(151, 297, 177, 269, 3, 154, 282);
        drawCustArrowDownRight(151, 330, 177, 359, 3, 154, 356);
        writeToLabelTop("<span class='a b'>" + a + "|(" + b + "|" + c + ")</span>");
        writeToLabelBot("Construct NFA for <u>" + a + "|(" + b + "|" + c + ")</u>");
    }

    // finalize NFA for a|(b|c)
    else if(frame == 6){
        drawCustArrowRight(308, 381, 345, 381, 3, 323, 377);
        drawArrow(374, 270, 374, 351, 6);
        labelSmEpsilon(377, 322);
        drawSmAcceptingState(374, 381, '9');
        writeToLabelTop("<span class='a b'>" + a + "|(" + b + "|" + c + ")</span>");
        writeToLabelBot("Construct NFA for <u>" + a + "|(" + b + "|" + c + ")</u>");
        frame = -1;
        pauseConstruct();
        setPlayLabel('refresh');
    }
    frame += 1;
}

// draw transition table for a|(b|c)
function drawTransTbl_a_union__b_union_c(a, b, c) {
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
    tblHtml += "<tbody style='font-size: 0.93em'>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>0</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>1,3,4,6</td>";
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
            tblHtml += "<td>9</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>3</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>4, 6</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>4</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>5</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>_</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>5</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>8</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>6</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>7</td>";
            tblHtml += "<td>_</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>7</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>8, 9</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>8</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>9</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>*9</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>_</td>";
        tblHtml += "</tr>";
    tblHtml += "</tbody>";
    tblTransition.html(tblHtml);
}