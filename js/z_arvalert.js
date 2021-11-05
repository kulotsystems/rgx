var arvAlert, divAlert, alertMessage, btnArvAlertOK, arvConfirm, divConfirm, confirmMessage, btnArvConfirmYes, btnArvConfirmNo;
var arvPopup, divPopup, popupTitle, popupContent, spanClosePopup, divopacityPopup;

$(function(){
   var p = window.parent.document;

   arvAlert = $(p.getElementById('arvalert'));
   divAlert = $(p.getElementById('divalert'));
   alertMessage = $(p.getElementById('alertMessage'));
   btnArvAlertOK = $(p.getElementById('btnArvAlertOK'));

   arvConfirm = $(p.getElementById('arvconfirm'));
   divConfirm = $(p.getElementById('divconfirm'));
   confirmMessage = $(p.getElementById('confirmMessage'));
   btnArvConfirmYes = $(p.getElementById('btnArvConfirmYes'));
   btnArvConfirmNo = $(p.getElementById('btnArvConfirmNo'));

   divopacityPopup = $(p.getElementById('divopacityPopup'));
   arvPopup = $(p.getElementById('arvpopup'));
   divPopup = $(p.getElementById('divpopup'));
   popupTitle = $(p.getElementById('popupTitle'));
   popupContent = $(p.getElementById('popupContent'));
   spanClosePopup = $(p.getElementById('spanClosePopup'));

   btnArvConfirmNo.on('click', function(){
      hideArvConfirm();
   });

   btnArvAlertOK.on('click', function(){
      hideArvAlert();
   });

   spanClosePopup.on('click', function(){
       hideArvPopup();
   });
});

function showArvPopup(e, t){
    divPopup.parent().css({'padding-top':window.parent.scrollY.toString() + 'px'});
    popupContent.html('');
    var eclone = e.clone();
    eclone.css({'display' : 'block'});
    popupContent.append(eclone);
    divPopup.css({
        'margin-bottom':'1%'
    });
    divopacityPopup.fadeIn(20, function(){
        divPopup.animate({'margin-bottom':'0%'}, 100);
        arvPopup.fadeIn(100);
        popupTitle.html(t);
    });
}

function hideArvPopup(){
    arvPopup.fadeOut(1, function(){
        popupContent.html('');
    });
    divopacityPopup.fadeOut(200);
    divPopup.animate({'margin-bottom' : '1%'}, 200, function() {
        divPopup.css({'max-width':'500px'});
        divopacityPopup.css({'opacity':'0.4'});
    });
    arvPopup.css({'position':'absolute'});
}

function showArvConfirm(msg)
{
    btnArvConfirmYes.off();

    confirmMessage.html('&nbsp;');
    btnArvConfirmYes.html('&nbsp;');
    btnArvConfirmNo.html('&nbsp;');

    divConfirm.slideUp(1);
    divConfirm.css({'max-width':'16.5em'});
    arvConfirm.fadeIn(1, function(){
        divConfirm.slideDown(80);
        divConfirm.animate({'margin-bottom': '20%', 'max-width':'19.8em'}, 160, function(){
            confirmMessage.html(msg);
            btnArvConfirmYes.html('Yes');
            btnArvConfirmNo.html('No');
        });
    });
}

function showArvAlert(msg)
{
    alertMessage.html('&nbsp;');
    btnArvAlertOK.html('&nbsp;');

    divAlert.slideUp(1);
    divAlert.css({'max-width':'16.5em'});
    arvAlert.fadeIn(1, function(){
        divAlert.slideDown(80);
        divAlert.animate({'margin-bottom': '20%', 'max-width':'19.8em'}, 160, function(){
            alertMessage.html(msg);
            btnArvAlertOK.html('Okay');
        });
    });
}

function hideArvAlert()
{
    divAlert.animate({'margin-bottom' : '10%'}, 150);
    arvAlert.fadeOut(150);
}

function hideArvConfirm()
{
    divConfirm.animate({'margin-bottom' : '10%'}, 150);
    arvConfirm.fadeOut(150);
    arvConfirm.css({'position':'fixed'});
    divConfirm.parent().css({'padding-top':'0px'});
    btnArvConfirmYes.off();
}