var mainLayout = null;

function initMainLayout() {
    mainLayout = $('body').layout({
        name: "mainLayout",
        //applyDefaultStyles: true,
        // Header
        north__paneSelector: "#header",
        north__size: "auto",
        // Footer
        south__paneSelector: "#footer",
        south__size: "auto",
        center__paneSelector: "#content_center",
        east__paneSelector: "#content_east",
        east__size: 200
    });    
};

function showMainLayout() {
    // show the layout after initializing children components
    $('body').removeClass('invisible');
    $('body').css('visibility','visible');
};

$(document).ready(function(){
    initMainLayout();
    
    showMainLayout();
});