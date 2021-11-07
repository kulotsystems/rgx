$(function() {
    btnConvert.on('click', function() {
        rgx = txtRegex.val().trim();
        txtRegex.val(rgx);
        var rgx_len = rgx.length;
        foundRegex = false;

        // a
        if(rgx_len == 1) {
            p = 'a';
            construct();
        }

        else if(rgx_len == 2 && rgx.indexOf('+') == -1 && rgx.indexOf('/') == -1 && rgx.indexOf('-') == -1 && rgx.indexOf('=') == -1) {
            // ab
            if(rgx.indexOf('*') == -1) {
                p = 'ab';
                construct();
            }

            // a*
            else if(rgx.indexOf('*') == 1) {
                p = 'a*';
                construct();
            }
        }

        else if(rgx_len == 3 && rgx.indexOf('+') == -1 && rgx.indexOf('/') == -1 && rgx.indexOf('-') == -1 && rgx.indexOf('=') == -1) {
            // abc
            if(rgx.indexOf('*') == -1 && rgx.indexOf('|') == -1) {
                p = 'abc';
                construct();
            }

            else if(rgx.indexOf('*') > -1) {
                if(rgx.indexOf('*') == 1) {
                    // a*b
                    p = 'a*b';
                    construct();
                }

                else if(rgx.indexOf('*') == 2) {
                    // ab*
                    p = 'ab*';
                    construct();
                }
            }
        }

        else if(rgx_len == 4 && rgx.indexOf('+') == -1 && rgx.indexOf('/') == -1 && rgx.indexOf('-') == -1 && rgx.indexOf('=') == -1) {
            if(rgx.indexOf('|') > -1) {
                if(rgx.indexOf('*') > -1) {
                    if(rgx.indexOf('*') == 1) {
                        p = 'a*|b';
                        construct();
                    }
                    else if(rgx.indexOf('*') == 3) {
                        p = 'a|b*';
                        construct();
                    }
                }
                else {
                    if(rgx.indexOf('|') == 1) {
                        p = 'a|ba';
                    }
                }
            }

            else if(countChar('*', rgx) == 2 ) {
                if(rgx[1] == '*' && rgx[3] == '*') {
                    p = 'a*b*';
                    construct();
                }
            }
            else {
                if(rgx[1] == '*') {
                    p = 'a*bc';
                    construct();
                }
                else if(rgx[2] == '*') {
                    p = 'ab*c';
                    construct();
                }
                else if(rgx[3] == '*') {
                    p = 'abc*';
                    construct();
                }
            }
        }

        else if(rgx_len == 5 && rgx.indexOf('+') == -1 && rgx.indexOf('/') == -1 && rgx.indexOf('-') == -1 && rgx.indexOf('=') == -1) {
            if(rgx.indexOf('*') > -1) {
                if(countChar('*', rgx) == 2) {
                    if(rgx[1] == '*' && rgx[4] == '*') {
                        p = 'a*bc*';
                        construct();
                    }
                    else if(rgx[1] == '*' && rgx[3] == '*') {
                        p = 'a*b*c';
                        construct();
                    }
                    else if(rgx[2] == '*' && rgx[4]) {
                        p = 'ab*c*';
                        construct();
                    }
                }
            }
        }

        else if(rgx_len == 6 && rgx.indexOf('+') == -1 && rgx.indexOf('/') == -1 && rgx.indexOf('-') == -1 && rgx.indexOf('=') == -1) {
            if(rgx.indexOf('*') > -1) {
                if(countChar('*', rgx) == 3) {
                    if(rgx[1] == '*' && rgx[3] == '*' && rgx[5]) {
                        p = 'a*b*c*';
                        construct();
                    }
                }
            }
        }

        else if(rgx_len == 7 && rgx.indexOf('+') == -1 && rgx.indexOf('/') == -1 && rgx.indexOf('-') == -1 && rgx.indexOf('=') == -1) {
            if(rgx.indexOf('|') > -1) {
                if(countChar('|', rgx) == 2) {
                    if(rgx[1] == '|' && rgx[4] == '|') {
                        p = 'a|(b|c)';
                        construct();
                    }
                    else if(rgx[2] == '|' && rgx[5] == '|') {
                        p = '(a|b)|c';
                        construct();
                    }
                }
            }
            else if(rgx.indexOf('*') > -1) {
                if(countChar('*', rgx) == 3){
                    p = '(a*b*)*';
                    construct();
                }
            }
        }


        if(!foundRegex ) {
            alert("The simulation for the entered regex is not yet available.");
        }
    });

    txtRegex.on('keyup', function() {
        checkEnteredRegex(txtRegex.val().trim());
    });

    // enables the convert button if the entered regex is valid
    function checkEnteredRegex(rgx) {
        if(rgx == '') {
            btnConvert.attr('disabled', true);
        }
        else {
            btnConvert.attr('disabled', false);
        }
    }

    function countChar(chr, str) {
        var l = str.length;
        var c = 0;
        for(var i=0; i<l; i++) {
            if(str[i] == chr) {
                c++;
            }
        }
        return c;
    }
});
