var mainLayout = null, contentLayout = null;
var mapView = null;

function initMainLayout() {
    mainLayout = $('body').layout({
        name: "mainLayout",
        applyDefaultStyles: false,
        // Header
        north__paneSelector: "#header",
        north__size: "auto",
        north__resizable: false,
        north__closable: false,
        north__spacing_open: 0,
        
        
        // Footer
        south__paneSelector: "#footer",
        south__size: "auto",
        south__resizable: false,
        south__closable: false,
        south__spacing_open: 0,

        center__paneSelector: "#content",
        
    });    
};

function initContentLayout() {
    mainLayout = $('#content').layout({
        name: "contentLayout",
        applyDefaultStyles: false,
        north__paneSelector: ".north",
        north__size: "auto",
        north__resizable: false,
        north__closable: false,
        north__spacing_open: 0,
        //north__showOverflowOnHover:  true,

        center__paneSelector: ".center",

        east__paneSelector: ".east",
        east__size: 350
    });    
};

function initGDMap() {
    mapView = new GD_Map("map_view");
};

function showMainLayout() {
    // show the layout after initializing children components
    $('body').removeClass('invisible');
    $('body').css('visibility','visible');
};

$(document).ready(function(){
    initMainLayout();
    initContentLayout();
    initGDMap();

    showMainLayout();
});