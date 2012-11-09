var mainLayout = null,
    contentLayout = null, 
    contentCenterLayout = null, 
    contentCenterCenterLayout = null,
    contentEastLayout = null;

var mapView = null;

var currUserId = null;

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
    contentLayout = $('#content').layout({
        name: "contentLayout",
        applyDefaultStyles: false,
        north__paneSelector: ".north",
        north__size: "auto",
        north__resizable: false,
        north__closable: false,
        north__spacing_open: 0,
        north__showOverflowOnHover:  true,

        center__paneSelector: ".center",

        east__paneSelector: ".east",
        east__size: 250
    });

    contentCenterLayout = $('#content-center').layout({
        name: "contentCenterLayout",
        applyDefaultStyles: false,
        
        center__paneSelector: ".center",

        east__paneSelector: ".east",
        east__size: 250,
        east__initClosed: true

    });

    contentCenterCenterLayout = $('#content-center .center').layout({
        name: "contentCenterCenterLayout",
        applyDefaultStyles: false,
        
        center__paneSelector: ".center",

        south__paneSelector: ".south",
        south__size: 150,
        south__initClosed: true
    });


    contentEastLayout = $('#content-east').layout({
        name: "contentEastLayout",
        applyDefaultStyles: false,
        
        center__paneSelector: ".center",

        south__paneSelector: ".south",
        south__size: 350,
        south__initClosed: true
    });
};

// initialize the main toolbar for the forum
function initForumTB() {
    $('#forum_info').popover({
        'title' : renderForumInfoTitle,
        'content' : renderForumInfoContent,
        'placement' : 'bottom',
        'trigger' : 'click',
        'template': '<div class="popover wide_popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>',
        'html' : true
    });
    //$("#forum_info").click(onForumInfoClick);

    $("#forum_timeline").click(onForumTimelineClick);
    $("#forum_annotations").click(onForumAnnotationsClick);
    $("#forum_history").click(onForumHistoryClick);
    $("#forum_bookmarks").click(onForumBookmarksClick);
    $("#forum_contribute").click(onForumContributeClick);
    $("#forum_my_annotations").click(onForumMyAnnotationsClick);
};

function onForumInfoClick() {
    if($(this).hasClass('active')) {
        $('#forum_info').popover('hide');
        //$('#forum_info').popover('destroy');
    }
    else {
        $('#forum_info').popover('show');
    }
};

function renderForumInfoTitle() {
    return "Forum Title";
};

function renderForumInfoContent() {
    return "details about the forum details about the forum details about the forum details about the forum";
};

function onForumTimelineClick() {
    if($(this).hasClass('active')) {
        contentCenterCenterLayout.close("south");
    }
    else {
        contentCenterCenterLayout.open("south");
    }
    
};

function onForumAnnotationsClick() {
    if($(this).hasClass('active')) {
        contentCenterLayout.close("east");
    }
    else {
        contentCenterLayout.open("east");
    }
};

function onForumHistoryClick() {};

function onForumBookmarksClick() {};

function onForumContributeClick() {
    if($(this).hasClass('active')) {
        contentEastLayout.close("south");
    }
    else {
        contentEastLayout.open("south");
    }
};

function onForumMyAnnotationsClick() {};

function initUserInfo() {
    currUserId = null;
    $('#user_banner').empty();
    $('#signInOut').text('Sign In');
    $('#signInOut').click(onSignInOutClick);
    $('#sign_in_btn').click(onSignInBtnClick);
};

function onSignInOutClick() {
    if (currUserId === null) {
        // show the sign in window
        $('#logInModal').modal('show');
    }
    else {
        alert('sign out');
    }
};

function onSignInBtnClick() {
    alert('sign in');
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
    initUserInfo();
    initForumTB();
    initGDMap();

    showMainLayout();
});