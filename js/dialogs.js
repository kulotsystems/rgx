var alertDialog, divAlert, alertMessage, btnAlertOK, confirmDialog, divConfirm, confirmMessage, btnConfirmYes, btnConfirmNo;
var popupDialog, divPopup, popupTitle, popupContent, spanClosePopup, divOpacityPopup;

$(function(){
   var p = window.parent.document;

   alertDialog = $(p.getElementById('alert'));
   divAlert = $(p.getElementById('divalert'));
   alertMessage = $(p.getElementById('alertMessage'));
   btnAlertOK = $(p.getElementById('btnAlertOK'));

   confirmDialog = $(p.getElementById('confirm'));
   divConfirm = $(p.getElementById('divconfirm'));
   confirmMessage = $(p.getElementById('confirmMessage'));
   btnConfirmYes = $(p.getElementById('btnConfirmYes'));
   btnConfirmNo = $(p.getElementById('btnConfirmNo'));

   divOpacityPopup = $(p.getElementById('divOpacityPopup'));
   popupDialog = $(p.getElementById('popup'));
   divPopup = $(p.getElementById('divPopup'));
   popupTitle = $(p.getElementById('popupTitle'));
   popupContent = $(p.getElementById('popupContent'));
   spanClosePopup = $(p.getElementById('spanClosePopup'));

   btnConfirmNo.on('click', function(){
      hideConfirmDialog();
   });

   btnAlertOK.on('click', function(){
      hideAlertDialog();
   });

   spanClosePopup.on('click', function(){
       hidePopupDialog();
   });
});

function showPopupDialog(e, t){
    divPopup.parent().css({'padding-top':window.parent.scrollY.toString() + 'px'});
    popupContent.html('');
    var eclone = e.clone();
    eclone.css({'display' : 'block'});
    popupContent.append(eclone);
    divPopup.css({
        'margin-bottom':'1%'
    });
    divOpacityPopup.fadeIn(20, function(){
        divPopup.animate({'margin-bottom':'0%'}, 100);
        popupDialog.fadeIn(100);
        popupTitle.html(t);
    });
}

function hidePopupDialog(){
    popupDialog.fadeOut(1, function(){
        popupContent.html('');
    });
    divOpacityPopup.fadeOut(200);
    divPopup.animate({'margin-bottom' : '1%'}, 200, function() {
        divPopup.css({'max-width':'500px'});
        divOpacityPopup.css({'opacity':'0.4'});
    });
    popupDialog.css({'position':'absolute'});
}

function showConfirmDialog(msg)
{
    btnConfirmYes.off();

    confirmMessage.html('&nbsp;');
    btnConfirmYes.html('&nbsp;');
    btnConfirmNo.html('&nbsp;');

    divConfirm.slideUp(1);
    divConfirm.css({'max-width':'16.5em'});
    confirmDialog.fadeIn(1, function(){
        divConfirm.slideDown(80);
        divConfirm.animate({'margin-bottom': '20%', 'max-width':'19.8em'}, 160, function(){
            confirmMessage.html(msg);
            btnConfirmYes.html('Yes');
            btnConfirmNo.html('No');
        });
    });
}

function showAlertDialog(msg)
{
    alertMessage.html('&nbsp;');
    btnAlertOK.html('&nbsp;');

    divAlert.slideUp(1);
    divAlert.css({'max-width':'16.5em'});
    alertDialog.fadeIn(1, function(){
        divAlert.slideDown(80);
        divAlert.animate({'margin-bottom': '20%', 'max-width':'19.8em'}, 160, function(){
            alertMessage.html(msg);
            btnAlertOK.html('Okay');
        });
    });
}

function hideAlertDialog()
{
    divAlert.animate({'margin-bottom' : '10%'}, 150);
    alertDialog.fadeOut(150);
}

function hideConfirmDialog()
{
    divConfirm.animate({'margin-bottom' : '10%'}, 150);
    confirmDialog.fadeOut(150);
    confirmDialog.css({'position':'fixed'});
    divConfirm.parent().css({'padding-top':'0px'});
    btnConfirmYes.off();
}