$(function() {
    var navbar = $('#navbar');
    var main = $('.main');
    var navBrand = navbar.find('.navbar-brand');
    function adjustPositioning() {
        if(window.innerWidth <= 500)
            navBrand.html('Regex to NFA');
        else
            navBrand.html('Regular Expression to NFA Converter and Simulator');
        var navBarHeight = parseInt(navbar.css('height'));
        main.css({'top':(navBarHeight + 5).toString() + 'px'});
    }
    adjustPositioning();
    window.onresize = adjustPositioning;
});