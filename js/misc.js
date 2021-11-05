// sorts a list of input based on character codes
function sortInputs(s) {
    var sorted = new Array();
    var codes = new Array();
    var l = s.length;
    var hasEpsilon = false;

    for(var i=0; i < l; i++) {
        if(s[i] != '') {
            if (s[i] != '&epsilon;')
                codes.push(s[i].charCodeAt(0));
            else
                hasEpsilon = true;
        }
    }

    // sort the codes through selection sort
    for(var i=0; i<(l-1); i++) {
        var min = i;
        for(var j=i+1; j<l; j++) {
            if(codes[j] < codes[min])
                min = j;
        }
        if(i != min) {
            var temp = codes[i];
            codes[i] = codes[min];
            codes[min] = temp;
        }
    }
    for(var i=0; i < l; i++) {
        for(var j=0; j < l; j++) {
            if(codes[i] == s[j].charCodeAt(0)) {
                sorted.push(s[j]);
            }
        }
    }
    if(hasEpsilon) {
        sorted.push('&epsilon;');
    }
    return sorted;
}

// removes repeated inputs in a list
function filterUnique(s) {
    var l = s.length;
    for(var i=0; i<(l-1); i++) {
        for(var j=(i+1); j<l; j++) {
            if(s[j] != '~*@|-') {
                if (s[i] == s[j]) {
                    s[j] = '~*@|-';
                }
            }
        }
    }
    var t = new Array();
    for(var i=0; i<l; i++) {
        if(s[i] != '~*@|-') {
            t.push(s[i]);
        }
    }
    return t;
}
