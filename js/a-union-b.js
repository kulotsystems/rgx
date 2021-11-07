// draw state diagram for a|b
function a_union_b(a, b) {
    // set caption positions
    setCaptionPositions(100, 100);

    // draw NFA for a
    if(frame == 0) {
        drawState(201, 243, '1');
        drawState(311, 243, '2');
        drawCustLgArrowRight(232, 244, 272, 244, a, 250, 230);
        writeToLabelTop("<span class='a b'>" + a + "</span>|" + b);
        writeToLabelBot("Construct NFA for <u>" + a + "</u>");
    }

    // draw NFA for b
    else if(frame == 1) {
        drawState(200, 402, '3');
        drawState(312, 403, '4');
        drawCustLgArrowRight(232, 402, 271, 402, b, 250, 428);
        writeToLabelTop("<span class='a b'>" + a + "</span>|<span class='a b'>" + b + "</span>");
        writeToLabelBot("Construct NFA for <u>" + b + "</u>");
    }

    // apply union
    else if(frame == 2) {
        drawArrow(60, 322, 79, 322, 7);
        drawState(120, 322, '0');
        drawCustLgArrowUpRight(142, 300, 172, 270, 3, 144, 278);
        drawCustLgArrowDownRight(143, 345, 172, 374, 3, 144, 381);
        writeToLabelTop("<span class='a b'>" + a + "|" + b + "</span>");
        writeToLabelBot("Construct NFA for <u>" + a + "|" + b + "</u>");
    }

    // draw accepting state
    else if(frame == 3) {
        drawCustLgArrowDownRight(333, 267, 362, 294, 3, 356, 278);

        drawCustLgArrowUpRight(333, 379, 363, 350, 3, 356, 381);

        drawAcceptingState(393, 322, '5');
        writeToLabelTop("<span class='a b'>" + a + "|" + b + "</span>");
        writeToLabelBot("Construct NFA for <u>" + a + "|" + b + "</u>");
        frame = -1;
        pauseConstruct();
        setPlayLabel('refresh');
    }
    frame += 1;
}

// draw transition table of a|b
function drawTransTbl_a_union_b(a, b) {
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
            tblHtml += "<td>5</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>3</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>4</td>";
            tblHtml += "<td>_</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>4</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>5</td>";
        tblHtml += "</tr>";
        tblHtml += "<tr>";
            tblHtml += "<td class='br'>*5</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td class='br'>_</td>";
            tblHtml += "<td>_</td>";
        tblHtml += "</tr>";
    tblHtml += "</tbody>";
    tblTransition.html(tblHtml);
}