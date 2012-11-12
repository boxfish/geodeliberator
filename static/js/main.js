var mainLayout = null,
    contentLayout = null, 
    contentCenterLayout = null, 
    contentCenterCenterLayout = null,
    contentEastLayout = null;

var mapView = null, tableView = null;

var currUser = null, currForum = null;

var apiUrl = "api/";

// initialize the main layout 
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

// initialize the content layout in the central panel
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
        east__size: 350,
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
    currForum = null;
    updateForumList();
    
    $('#forum_tb').hide();
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

// the callback when the forum information button is clicked
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
    if (currForum === null) {
        return "No Forum Selected Yet!";        
    }
    else {
        if (currForum.name) {
            return currForum.name;
        }
        else {
            return 'Forum ' + currForum.id;
        }
    }
};

function renderForumInfoContent() {
    if (currForum === null) {
        return "Select a forum from the dropdown list to see the detail";
    }
    else {
        if (currForum.description) {
            return currForum.description;
        }
        else {
            return 'No detail information is available.';
        }
    }
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
    currUser = null;
    updateUserInfo();
    $('#signInOut').click(onSignInOutClick);
    $('#sign_in_btn').click(onSignInBtnClick);
};

function onSignInOutClick() {
    if (currUser === null) {
        // show the sign in window
        $('#signInAlert').text('').hide();
        $('#logInModal').modal('show');
    }
    else {
        currUser = null;
        updateUserInfo();
        
        // reset the views to default
    }
};

function onSignInBtnClick() {
    var userName = $('#inputUserName').val();
    var password = $('#inputPassword').val();
    if (userName) {
        if (password) {
            /*
            var url = apiUrl + 'authentication/';
            $.get(url, {'userName': userName, 'password': password}, function(data) {
                if (data.success === true) {
                    onSignInSuccess(data);
                }
                else {
                    $('#signInAlert').text(data.errors.reason);         
                }
            });
            */
            var data;
            if (userName === 'Bo' && password === 'pass') {
                data = {
                    'success' : true,
                    'data' : {'userId': '11', "userName": 'Bo'}
                };
            }
            else {
                data = {
                    'success' : false,
                    'errors' : {'reason': 'Your username and password were incorrect.'}
                };
            }
            if (data.success === true) {
                onSignInSuccess(data);
            }
            else {
                $('#signInAlert').text(data.errors.reason).show();         
            }
        }
        else {
            $('#signInAlert').text('The password cannot be empty!').show();            
        }
    }
    else {
        $('#signInAlert').text('The user name cannot be empty!').show();
    }
};

function onSignInSuccess(data) {
    $('#logInModal').modal('hide');
    currUser = {'id' : data.data.userId};
    
    updateUserInfo();
    // load the forum list    
    updateForumList();             
};

function updateUserInfo() {
    if (currUser === null) {
        $('#user_banner').empty();
        $('#signInOut').text('Sign In');
    }
    else {
        //var url = apiUrl + 'user/';
        var url = "/static/data/user.json";
        params = {'userId': currUser.id};

        $.get(url, params, function(data) {
            if (data) {
                currUser = data;
                $('#user_banner').text(currUser.userName);
                $('#signInOut').text('Sign Out');
            }
        });
    } 
};

function updateForumList() {
    $('#forum_list').empty();
    //var url = apiUrl + 'forums/';
    var url = "/static/data/forums.json";
    var params = {};
    if (currUser) {
        params = {'userId': currUser.id};
    }
    $.get(url, params, function(data) {
        if (data) {
            if (data.participating) {
                $('#forum_list').append('<li class="nav-header">Participating</li>');
                for (var i = data.participating.length - 1; i >= 0; i--) {
                    var id = data.participating[i].id;
                    var name = data.participating[i].name;
                    $('<li><a href="#">' + name + '</a></li>')
                        .data('id', id)
                        .data('name', name)
                        .click(onForumListItemClick)
                        .appendTo($('#forum_list'));
                };
            }
            if (data.public) {
                $('#forum_list').append('<li class="nav-header">Public</li>');
                for (var i = data.public.length - 1; i >= 0; i--) {
                    var id = data.public[i].id;
                    var name = data.public[i].name;
                    $('<li><a href="#">' + name + '</a></li>')
                        .data('id', id)
                        .data('name', name)
                        .click(onForumListItemClick)
                        .appendTo($('#forum_list'));
                };
            }
        }
    });   
};

function onForumListItemClick() {
    var id = $(this).data('id');
    if (id) {
        if (currForum === null) {
            $('#forum_tb').show();
        }
        $('#current_forum').text($(this).data('name'));

        currForum = {'id' : id};
        updateForumInfo();
        updateAnnotationList();
    }
};

function updateForumInfo() {
    if (currForum !== null) {
        //var url = apiUrl + 'forum/';
        var url = "/static/data/forum.json";
        params = {'forumId': currForum.id};

        $.get(url, params, function(data) {
            if (data) {
                currForum = data;
            }
        });        
    }
};

function updateAnnotationList() {
    if (currForum !== null) {
        //var url = apiUrl + 'annotations/';
        var url = "/static/data/annotations.json";
        params = {'forumId': currForum.id};

        $.get(url, params, function(data) {
            if (data) {
                if (tableView) {
                    tableView.clear();
                    for (var i = data.annotations.length - 1; i >= 0; i--) {
                        tableView.addData(data.annotations[i]);
                    };
                }
            }
        });        
    }
};

function initGDMap() {
    mapView = new GD_Map("map_view");
};

function initGDTable() {
    tableView = new GD_Table('#anno_info_view');
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
    initGDTable();
    showMainLayout();
});