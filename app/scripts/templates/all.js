(function () {
var root = this, exports = {};

// The jade runtime:
var jade=function(exports){Array.isArray||(Array.isArray=function(arr){return"[object Array]"==Object.prototype.toString.call(arr)}),Object.keys||(Object.keys=function(obj){var arr=[];for(var key in obj)obj.hasOwnProperty(key)&&arr.push(key);return arr}),exports.merge=function merge(a,b){var ac=a["class"],bc=b["class"];if(ac||bc)ac=ac||[],bc=bc||[],Array.isArray(ac)||(ac=[ac]),Array.isArray(bc)||(bc=[bc]),ac=ac.filter(nulls),bc=bc.filter(nulls),a["class"]=ac.concat(bc).join(" ");for(var key in b)key!="class"&&(a[key]=b[key]);return a};function nulls(val){return val!=null}return exports.attrs=function attrs(obj,escaped){var buf=[],terse=obj.terse;delete obj.terse;var keys=Object.keys(obj),len=keys.length;if(len){buf.push("");for(var i=0;i<len;++i){var key=keys[i],val=obj[key];"boolean"==typeof val||null==val?val&&(terse?buf.push(key):buf.push(key+'="'+key+'"')):0==key.indexOf("data")&&"string"!=typeof val?buf.push(key+"='"+JSON.stringify(val)+"'"):"class"==key&&Array.isArray(val)?buf.push(key+'="'+exports.escape(val.join(" "))+'"'):escaped&&escaped[key]?buf.push(key+'="'+exports.escape(val)+'"'):buf.push(key+'="'+val+'"')}}return buf.join(" ")},exports.escape=function escape(html){return String(html).replace(/&(?!(\w+|\#\d+);)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")},exports.rethrow=function rethrow(err,filename,lineno){if(!filename)throw err;var context=3,str=require("fs").readFileSync(filename,"utf8"),lines=str.split("\n"),start=Math.max(lineno-context,0),end=Math.min(lines.length,lineno+context),context=lines.slice(start,end).map(function(line,i){var curr=i+start+1;return(curr==lineno?"  > ":"    ")+curr+"| "+line}).join("\n");throw err.path=filename,err.message=(filename||"Jade")+":"+lineno+"\n"+context+"\n\n"+err.message,err},exports}({});

// create our folder objects

// addParticipantView.jade compiled template
exports.addParticipantView = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        buf.push('<div id="edit-form" data-role="fieldcontain" class="form-full-width"><div id="participant-name-wrapper"><p>Please provide a valid email address for your participant.</p><input id="participant-name" data-theme="b" type="text" name="participant-name" placeholder="Name"/></div><p><input id="participant-email" data-theme="b" type="text" name="participant-email" placeholder="Type a name or email"/></p><ul data-role="list-view" data-inset="true" class="suggestions"></ul><div class="controls"><a id="submitAddParticipant" data-theme="b" type="button">Add participant</a></div></div>');
    }
    return buf.join("");
};

// calendarAllowAccessView.jade compiled template
exports.calendarAllowAccessView = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        buf.push('<div data-role="header" data-id="header" data-position="fixed" data-theme="d" data-tap-toggle="false"><h1> </h1><a href="#" data-theme="b" class="allow-access-done ui-btn-right">Done</a></div><div id="calendar-sync" data-role="content" class="main-div"><div class="connectivity"></div><div class="loader"><span class="loader"></span></div><div class="content"><div class="content"><h3>Please allow calendar access</h3><p>In order to sync meetings with your iPhone, you should enable calendar access by following the steps below.</p><ol id="calendar-access-steps"><li class="step-settings">Open iPhone Settings</li><li class="step-privacy">Tap Privacy</li><li class="step-calendar">Tap Calendars</li><li class="step-meetings">Set "Meetin.gs" to ON</li></ol></div></div></div>');
    }
    return buf.join("");
};

// commentForm.jade compiled template
exports.commentForm = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        buf.push('<div id="comment-box"><div class="left"><div class="container"><textarea id="comment-input" data-role="none" rows="1" placeholder="Tap to comment"></textarea></div></div><div class="right"><a data-role="none" data-enhance="false" href="#" class="send-comment">Send</a></div></div>');
    }
    return buf.join("");
};

// commentInListView.jade compiled template
exports.commentInListView = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        if (!user_image) var user_image = app.defaults.user_image;
        buf.push("<img");
        buf.push(attrs({
            src: user_image,
            "class": "mtngs-profile-image"
        }, {
            src: true
        }));
        buf.push("/><h3>");
        var __val__ = user_name;
        buf.push(escape(null == __val__ ? "" : __val__));
        buf.push('</h3><p class="info">');
        var __val__ = moment.unix(date_epoch).fromNow();
        buf.push(escape(null == __val__ ? "" : __val__));
        buf.push("</p><p>");
        var __val__ = content;
        buf.push(null == __val__ ? "" : __val__);
        buf.push("</p>");
    }
    return buf.join("");
};

// confirmSchedulingChoose.jade compiled template
exports.confirmSchedulingChoose = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        buf.push("<h3>Are you sure?</h3><p>");
        var __val__ = "Choose " + time + " for the meeting. We will immediately notify all participants.";
        buf.push(escape(null == __val__ ? "" : __val__));
        buf.push('</p><a id="confirm-option" data-theme="b" type="button">Save and notify</a><a data-theme="a" type="button" class="reset">Cancel</a>');
    }
    return buf.join("");
};

// connectivityError.jade compiled template
exports.connectivityError = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        buf.push('<div id="connectivity-error">');
        if (locals.type === "nointernet") {
            buf.push('<h1>No connectivity</h1><p>Please, check your internet connection.</p><a href="#" data-role="button" class="reconnect">Retry</a>');
        } else {
            buf.push('<h1>Connection timed out</h1><p>Your action seems to take longer than it should. Please, try again.</p><a href="#" data-role="button" class="reconnect">Reload</a>');
        }
        buf.push("</div>");
    }
    return buf.join("");
};

// editMaterialPanel.jade compiled template
exports.editMaterialPanel = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        buf.push('<ul id="side-bar" data-role="listview" data-theme="c">');
        if (locals.fetch_type === "page") {
            buf.push('<li><a id="nav-edit" href="#" data-transition="fade"><i class="icon-edit"></i>Edit</a></li>');
        }
        buf.push('<li><a id="nav-rename" href="#" data-transition="fade"><i class="icon-rename"></i>Rename</a></li>');
        if (locals.download_url) {
            buf.push('<li><a id="nav-download" href="#" data-transition="fade"><i class="icon-download"></i>Download</a></li>');
        }
        if (locals.creator_id === app.auth.user) {
            buf.push('<li><a id="nav-remove" href="#" data-transition="fade"><i class="icon-delete"></i>Remove</a></li>');
        }
        buf.push("</ul>");
    }
    return buf.join("");
};

// editMeetingPanel.jade compiled template
exports.editMeetingPanel = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        buf.push('<ul id="side-bar" data-role="listview" data-theme="c"><li><a id="nav-edit-title" href="#" data-transition="fade"><span class="ui-icon menu-icon-edit"></span>Edit title</a></li><li><a id="nav-edit-location" href="#" data-transition="fade"><span class="ui-icon menu-icon-editlocation"></span>Edit location</a></li><li><a id="nav-edit-time" href="#" data-transition="fade"><span class="ui-icon menu-icon-edittime"></span>Edit time</a></li>');
        if (locals.creator_id === app.auth.user) {
            buf.push('<li><a id="nav-remove" href="#" data-transition="fade"><span class="ui-icon menu-icon-remove"></span>Remove</a></li>');
        }
        buf.push("</ul>");
    }
    return buf.join("");
};

// editStepCommunicationsView.jade compiled template
exports.editStepCommunicationsView = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        buf.push('<div id="edit-form" data-role="fieldcontain" class="form-full-width"><p>Choose live communication tool:</p><div class="controls ui-grid-a"><div class="ui-block-a"><a id="submitStepCommunicationsSkype" data-theme="b" data-role="button"><i class="icon-teleconf"></i>Skype</a></div><div class="ui-block-b"><a id="submitStepCommunications" data-theme="b" data-role="button"><i class="icon-cross"></i>None</a></div></div></div>');
    }
    return buf.join("");
};

// editStepDateAndTimeSetupView.jade compiled template
exports.editStepDateAndTimeSetupView = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        buf.push('<div id="edit-form" data-role="fieldcontain" class="form-full-width"><ul id="date-selection" data-role="listview" data-inset="true"><li data-icon="false"><div class="ui-grid-a"><div class="ui-block-a">Starts</div><div class="ui-block-b"> ');
        var beginString = DateFormat.dateTimeInputString(begin_epoch);
        buf.push("<input");
        buf.push(attrs({
            id: "meeting-begin-date",
            "data-theme": "b",
            type: "datetime-local",
            name: "meeting-begin-date",
            value: beginString,
            placeholder: "Starts"
        }, {
            "data-theme": true,
            type: true,
            name: true,
            value: true,
            placeholder: true
        }));
        buf.push('/></div></div></li><li data-icon="false"><div class="ui-grid-a"><div class="ui-block-a">Ends</div><div class="ui-block-b"> ');
        var endString = DateFormat.dateTimeInputString(end_epoch);
        buf.push("<input");
        buf.push(attrs({
            id: "meeting-end-date",
            "data-theme": "b",
            type: "datetime-local",
            name: "meeting-end-date",
            value: endString,
            placeholder: "Ends"
        }, {
            "data-theme": true,
            type: true,
            name: true,
            value: true,
            placeholder: true
        }));
        buf.push('/></div></div></li></ul><div class="controls"><a id="submitStepDateAndTimeFinish" data-theme="b" type="button">');
        if (id != null) {
            buf.push("Save");
        } else {
            buf.push("Done");
        }
        buf.push("</a></div></div>");
    }
    return buf.join("");
};

// editStepDateAndTimeView.jade compiled template
exports.editStepDateAndTimeView = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        buf.push('<div id="edit-form" data-role="fieldcontain" class="form-full-width"><div class="controls"><a id="submitStepDateAndTimeSetup" data-theme="b" type="button">Set date & time</a></div><p class="separator">OR</p><div class="controls"><a id="submitStepDateAndTime" data-theme="b" type="button">Time not known</a></div></div>');
    }
    return buf.join("");
};

// editStepLocationView.jade compiled template
exports.editStepLocationView = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        buf.push('<div id="edit-form" data-role="fieldcontain" class="form-full-width">');
        var l = location === "Location not known" ? "" : location;
        buf.push("<input");
        buf.push(attrs({
            id: "meeting-location",
            "data-theme": "b",
            type: "text",
            name: "meeting-location",
            value: l,
            placeholder: "Meeting location"
        }, {
            "data-theme": true,
            type: true,
            name: true,
            value: true,
            placeholder: true
        }));
        buf.push('/><div class="controls"><a id="submitStepLocation" data-theme="b" type="button"> ');
        if (id != null) {
            buf.push("Save");
        } else {
            buf.push("Continue        ");
        }
        buf.push('</a></div><p class="separator">OR</p><div class="controls"><a id="submitStepLocationOnline" data-theme="b" type="button">Meeting is online</a></div></div>');
    }
    return buf.join("");
};

// editStepSkypeNameView.jade compiled template
exports.editStepSkypeNameView = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        buf.push('<div id="edit-form" data-role="fieldcontain" class="form-full-width"><input');
        buf.push(attrs({
            id: "meeting-skype-account",
            "data-theme": "b",
            type: "text",
            name: "skype-account",
            value: skype_account,
            placeholder: "Skype account to call"
        }, {
            "data-theme": true,
            type: true,
            name: true,
            value: true,
            placeholder: true
        }));
        buf.push('/><div class="controls"><a id="submitStepSkypeName" data-theme="b" type="button"> ');
        if (id != null) {
            buf.push("Save");
        } else {
            buf.push("Continue");
        }
        buf.push("</a></div></div>");
    }
    return buf.join("");
};

// editStepTitleView.jade compiled template
exports.editStepTitleView = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        buf.push('<div id="edit-form" data-role="fieldcontain" class="form-full-width">');
        var t = title === "Untitled meeting" ? "" : title;
        buf.push("<input");
        buf.push(attrs({
            id: "meeting-title",
            "data-theme": "b",
            type: "text",
            name: "meeting-title",
            value: t,
            placeholder: "Meeting title"
        }, {
            "data-theme": true,
            type: true,
            name: true,
            value: true,
            placeholder: true
        }));
        buf.push('/><div class="controls"><a id="submitStepTitle" data-theme="b" type="button"> ');
        if (id != null) {
            buf.push("Save");
        } else {
            buf.push("Continue");
        }
        buf.push("</a></div></div>");
    }
    return buf.join("");
};

// highlightedMeetingInListView.jade compiled template
exports.highlightedMeetingInListView = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        buf.push("<a");
        buf.push(attrs({
            href: "meeting.html?id=" + id
        }, {
            href: true
        }));
        buf.push(">");
        if (highlight["type"] == "add_agenda") {
            buf.push('<i class="task-icon icon-edit"></i>');
        } else if (highlight["type"] == "suggest_dates") {
            buf.push('<i class="task-icon icon-calendar"></i>');
        } else if (highlight["type"] == "confirm_time") {
            buf.push('<i class="task-icon icon-time"></i>');
        } else {
            buf.push('<i class="task-icon icon-add"></i>');
        }
        buf.push('<span class="message">');
        var __val__ = highlight["message"] + ": ";
        buf.push(escape(null == __val__ ? "" : __val__));
        buf.push('</span><span class="title">');
        var __val__ = title;
        buf.push(escape(null == __val__ ? "" : __val__));
        buf.push("</span></a>");
    }
    return buf.join("");
};

// loginView.jade compiled template
exports.loginView = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        buf.push('<div class="logo"><h1 class="meetings-logo"></h1></div><div id="login-form" data-role="fieldcontain">');
        if (0) {
            buf.push('<a id="google-login" hre="#" data-role="button">Connect with Google</a><p class="separator">OR</p><a id="facebook-login"></a><p class="separator">OR</p>');
        }
        buf.push('<input id="email" data-theme="b" type="text" name="email" value="" placeholder="Enter your email address..."/><div class="controls"><a data-theme="b" type="button" class="login_or_register">Send</a></div></div><div id="pin-form" data-role="fieldcontain" class="pin-entry"><div data-role="field-contain"><table style="width:100%;"><tr><td style="width:20%;"><label for="pin">PIN:</label></td><td style="width:60%;"><input id="pin" data-theme="b" type="tel" name="pin" value="" placeholder="PIN..."/></td></tr></table><a data-theme="b" type="button" class="check-pin">Continue</a></div></div>');
        if (0) {
            buf.push('<div id="google-connect-form" data-role="fieldcontain" style="display:none" class="connect-entry"><div data-role="field-contain"><table style="width:100%;"><tr><td style="width:20%;"><label for="google-connect-email">Email:</label></td><td style="width:60%;"><input id="google-connect-email" data-theme="b" type="text" name="pin" value="" placeholder="your@email.com..."/></td></tr></table><a id="google-connect" data-theme="b" type="button">Continue</a></div></div>');
        }
        buf.push('<div id="profile-form" data-role="field-contain"><p>Profile form here</p></div><div class="no-mobile-link"><a id="no-mobile" href="#">Switch to normal website</a></div>');
    }
    return buf.join("");
};

// materialEditView.jade compiled template
exports.materialEditView = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        buf.push('<div data-role="header" data-id="meeting-header" data-position="fixed" data-theme="d" data-tap-toggle="false"><a href="#" data-theme="b" class="edit-material-cancel">Cancel</a><h1>Edit material</h1><a href="#" data-theme="b" class="edit-material-save">Save</a></div><div data-role="content" class="main-div"><div class="connectivity"></div><div class="loader"><span class="loader"></span></div><div class="content"><div class="material_content">');
        if (error_message) {
            buf.push("<p>");
            var __val__ = error_message;
            buf.push(escape(null == __val__ ? "" : __val__));
            buf.push("</p>");
        } else {
            buf.push("<textarea>");
            var __val__ = model.content;
            buf.push(escape(null == __val__ ? "" : __val__));
            buf.push("</textarea>");
        }
        buf.push("</div></div></div>");
    }
    return buf.join("");
};

// materialInListView.jade compiled template
exports.materialInListView = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        buf.push('<a href="href">');
        if (fetch_type === "media") {
            buf.push('<span class="material-image ui-li-thumb ui-corner-tl"></span>');
        } else if (fetch_type === "page") {
            buf.push('<span class="material-text ui-li-thumb ui-corner-tl"></span>');
        } else {
            buf.push('<span class="material-other ui-li-thumb ui-corner-tl"></span>');
        }
        buf.push("<h3>");
        var __val__ = title;
        buf.push(escape(null == __val__ ? "" : __val__));
        buf.push("</h3>");
        if (author_name !== "") {
            buf.push("<p>");
            var __val__ = "By " + author_name + " " + moment.unix(created_epoch).fromNow();
            buf.push(escape(null == __val__ ? "" : __val__));
            buf.push("</p>");
        }
        buf.push('<span class="ui-li-count">');
        var __val__ = comment_count;
        buf.push(escape(null == __val__ ? "" : __val__));
        buf.push("</span></a>");
    }
    return buf.join("");
};

// materialRenameView.jade compiled template
exports.materialRenameView = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        buf.push('<div data-role="header" data-id="header" data-position="fixed" data-theme="d" data-tap-toggle="false"><a href="#" data-theme="b" class="rename-material-cancel">Cancel</a><h1>Rename material</h1></div><div data-role="content" class="main-div"><div class="connectivity"></div><div class="loader"><span class="loader"></span></div><div class="content"><div class="content"><div id="edit-form" data-role="fieldcontain" class="form-full-width"><input');
        buf.push(attrs({
            id: "material-title",
            "data-theme": "b",
            type: "text",
            name: "material-title",
            value: model.title,
            placeholder: "Title"
        }, {
            "data-theme": true,
            type: true,
            name: true,
            value: true,
            placeholder: true
        }));
        buf.push('/><div class="controls"><a data-theme="b" type="button" class="rename-material-save">Save</a></div></div></div></div></div>');
    }
    return buf.join("");
};

// materialView.jade compiled template
exports.materialView = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        if (model.fetch_type !== "") {
            if (model.fetch_type === "media") {
                buf.push("<h3>");
                var __val__ = model.title;
                buf.push(escape(null == __val__ ? "" : __val__));
                buf.push("</h3>");
                var __val__ = model.content;
                buf.push(null == __val__ ? "" : __val__);
            } else {
                if (current_edit) {
                    buf.push('<div id="locked">');
                    if (current_edit.creator_id == auth_user_id) {
                        buf.push('<p>This document is locked by you. </p><a href="#" class="open-continued-material-edit">Continue interrupted edit?</a>');
                    } else {
                        buf.push("<p>");
                        var __val__ = "This document is locked by " + current_edit.creator_name + ".";
                        buf.push(escape(null == __val__ ? "" : __val__));
                        buf.push("</p>");
                    }
                    buf.push("</div><h3>");
                    var __val__ = model.title;
                    buf.push(escape(null == __val__ ? "" : __val__));
                    buf.push('</h3><p class="notruncation">');
                    var __val__ = current_edit.content;
                    buf.push(null == __val__ ? "" : __val__);
                    buf.push("</p>");
                } else {
                    buf.push("<h3>");
                    var __val__ = model.title;
                    buf.push(escape(null == __val__ ? "" : __val__));
                    buf.push("</h3>");
                    if (model.title == "Agenda" && model.content == "") {
                        buf.push('<p class="notruncation">Agenda is empty.</p>');
                    } else if (model.title == "Action Points" && model.content == "") {
                        buf.push('<p class="notruncation">Action points are empty.</p>');
                    } else {
                        buf.push('<p class="notruncation">');
                        var __val__ = model.content;
                        buf.push(null == __val__ ? "" : __val__);
                        buf.push("</p>");
                    }
                }
            }
        }
    }
    return buf.join("");
};

// meetingInListView.jade compiled template
exports.meetingInListView = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        buf.push("<a");
        buf.push(attrs({
            href: "meeting.html?id=" + id
        }, {
            href: true
        }));
        buf.push("><h3>");
        var __val__ = title;
        buf.push(escape(null == __val__ ? "" : __val__));
        buf.push("</h3><p>");
        var __val__ = location;
        buf.push(escape(null == __val__ ? "" : __val__));
        buf.push('</p><div class="top-bar">');
        var dateString = DateFormat.dateString(begin_epoch, end_epoch);
        var timeString = DateFormat.timeString(begin_epoch, end_epoch);
        if (dateString) {
            buf.push('<span class="left">');
            var __val__ = dateString;
            buf.push(escape(null == __val__ ? "" : __val__));
            if (locals.source === "google") {
                buf.push('<i style="margin-left:14px;font-size:12px;position:relative;top:1px;" class="icon-google"></i>');
            } else if (locals.source && locals.source.indexOf("phone") !== -1) {
                buf.push('<i style="margin-left:14px;font-size:12px;position:relative;top:1px;" class="icon-mobile"></i>');
            }
            buf.push('</span><span class="right">');
            var __val__ = timeString;
            buf.push(escape(null == __val__ ? "" : __val__));
            buf.push("</span>");
        } else {
            buf.push('<span class="left">');
            var __val__ = "Scheduling in progress";
            buf.push(escape(null == __val__ ? "" : __val__));
            buf.push("</span>");
        }
        buf.push("</div>");
        if (participants.length) {
            buf.push('<div class="participants">');
            participants = _.sortBy(participants, function(p) {
                if (p.is_creator) return 0; else if (p.rsvp_status === "yes") return 1; else if (p.rsvp_status === "no") return 3; else return 2;
            });
            participants.forEach(function(participant) {
                {
                    buf.push('<div class="wrap">');
                    if (participant.image !== "") {
                        buf.push("<img");
                        buf.push(attrs({
                            src: participant.image,
                            width: "20",
                            height: "20"
                        }, {
                            src: true,
                            width: true,
                            height: true
                        }));
                        buf.push("/>");
                    } else {
                        buf.push('<span class="placeholder-20"></span>');
                    }
                    if (dateString == "") {
                        buf.push("<!-- Time not set-->");
                    }
                    if (participant.rsvp_status === "yes") {
                        buf.push('<span class="rsvp yes"></span>');
                    } else if (participant.rsvp_status === "no") {
                        buf.push('<span class="rsvp no"></span>');
                    } else {
                        buf.push('<span class="rsvp unknown"></span>');
                    }
                    buf.push("</div>");
                }
            });
            buf.push("</div>");
        }
        buf.push("</a>");
    }
    return buf.join("");
};

// meetingView.jade compiled template
exports.meetingView = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        buf.push("<h3>");
        var __val__ = title;
        buf.push(escape(null == __val__ ? "" : __val__));
        buf.push("</h3>");
        var dateString = DateFormat.dateAndTimeString(begin_epoch, end_epoch);
        if (dateString) {
            buf.push('<p class="mtngs-calendar"><i class="icon-calendar"></i>');
            var __val__ = dateString;
            buf.push(escape(null == __val__ ? "" : __val__));
            buf.push("</p>");
        } else {
            buf.push('<p class="mtngs-calendar"><i class="icon-calendar"></i>Scheduling in progress</p>');
        }
        if (location) {
            if (/skype/i.test(location) || location === "Online" || location === "Location not known") {
                buf.push('<p class="mtngs-location"><i class="icon-location"></i>');
                var __val__ = location;
                buf.push(escape(null == __val__ ? "" : __val__));
                buf.push("</p>");
            } else {
                buf.push('<p class="mtngs-location"><i class="icon-location"></i><a href="#" class="open-map-link">');
                var __val__ = location;
                buf.push(escape(null == __val__ ? "" : __val__));
                buf.push("</a></p>");
            }
        }
        buf.push('<div id="next-action-bar"></div><!-- Skype button-->');
        if (locals.skype_url && !is_draft) {
            buf.push("<a");
            buf.push(attrs({
                id: "skype_button",
                href: skype_url,
                "data-role": "button",
                "data-icon": "mtngs-skype",
                "data-theme": "b"
            }, {
                href: true,
                "data-role": true,
                "data-icon": true,
                "data-theme": true
            }));
            buf.push(">Join Skype conference</a>");
        }
        buf.push('<div id="progress-bar"></div><!-- Participants-->');
        if (is_draft) {
            if (participants.length <= 1) {
                buf.push('<a href="#" data-theme="b" data-role="button" class="open-add-participant-view">Add participants</a>');
            } else {
                buf.push('<a href="#" data-theme="b" data-role="button" class="open-send-invites-view">Send invites</a>');
            }
        }
        buf.push('<ul id="participant-list" data-role="listview" data-inset="true"><li><a href="#" class="open-participant-view"><h3>');
        var __val__ = "Participants";
        buf.push(escape(null == __val__ ? "" : __val__));
        buf.push('</h3><div id="participants" class="participants"></div></a></li></ul><!-- Materials--><ul id="materials_list" data-role="listview" data-inset="true" data-theme="a"></ul>');
        if (0) {
            buf.push('<a href="#materialsPopup" data-rel="popup" data-theme="b" type="button">Add materials</a>');
        }
        buf.push('<div id="materialsPopup" data-role="popup" data-overlay-theme="a" data-theme="c" class="ui-corner-all"><div data-role="content" data-theme="d" class="ui-corner-bottom ui-content"><h3 class="ui-title">Choose source</h3><a href="#" data-role="button" data-theme="a" class="add-photo-material">Camera</a><a href="#" data-role="button" data-theme="a">Existing photo</a><a href="#" data-role="button" data-rel="back" data-theme="c">Cancel</a></div></div>');
        if (app.options.build !== "web") {
            buf.push('<div class="photo-upload"><a href="#" data-role="button" data-theme="b" class="add-photo-material">Take photo</a><div id="upload_progress"></div><div class="file-save-form"><div class="left"><input id="file-upload-id" type="hidden"/><input id="file-upload-name" type="text" placeholder="Filename..." data-theme="b"/></div><div class="right"><a href="#" data-role="button" data-theme="b" class="save-photo-material ui-disabled">Save</a></div></div><div style="display:none;" class="save-text"><p>Saving material...</p></div></div>');
        }
    }
    return buf.join("");
};

// noMeetingsView.jade compiled template
exports.noMeetingsView = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        buf.push('<a href="#" data-theme="b" data-role="button" class="open-add-meeting-view"><i class="icon-add"> </i>Add a meeting</a>');
        if (showPhoneConnect) {
            buf.push('<a href="#" data-theme="b" data-role="button" class="phone-connect-meeting-view"> <i class="icon-calendar"></i>Sync from phone calendar</a>');
        }
        if (!model.google_connected) {
            buf.push('<a href="#" data-theme="b" data-role="button" class="google-connect-meeting-view"><i class="icon-google"></i>Sync from Google Calendar</a>');
        }
    }
    return buf.join("");
};

// noticeBar.jade compiled template
exports.noticeBar = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        buf.push('<div class="notice"><p>Problems with the internets...</p></div>');
    }
    return buf.join("");
};

// optionInListView.jade compiled template
exports.optionInListView = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        buf.push("<li>");
        var c = user.proposal_answers[proposal.id] ? user.proposal_answers[proposal.id] : "no";
        if (mode === "choose") c = "choose";
        var dateString = DateFormat.dateString(proposal.begin_epoch, proposal.end_epoch);
        var timeString = DateFormat.timeString(proposal.begin_epoch, proposal.end_epoch);
        buf.push("<a");
        buf.push(attrs({
            href: "#",
            "data-option-id": proposal.id,
            "data-time": dateString + " " + timeString,
            "class": "option-" + c
        }, {
            href: true,
            "data-option-id": true,
            "class": true,
            "data-time": true
        }));
        buf.push('><div class="top-bar"><span class="left">');
        var __val__ = dateString;
        buf.push(escape(null == __val__ ? "" : __val__));
        buf.push('</span><span class="right">');
        var __val__ = timeString;
        buf.push(escape(null == __val__ ? "" : __val__));
        buf.push("</span></div><!--span.right=timeString-->");
        if (participants.length) {
            buf.push('<div class="participants">');
            participants = _.sortBy(participants, function(p) {
                if (p.proposal_answers && p.proposal_answers[proposal.id] === "yes") return 1; else if (p.proposal_answers && p.proposal_answers[proposal.id] === "no") return 3; else return 2;
            });
            participants.forEach(function(p) {
                {
                    buf.push('<div class="wrap">');
                    if (p.image !== "") {
                        buf.push("<img");
                        buf.push(attrs({
                            src: p.image,
                            width: "20",
                            height: "20"
                        }, {
                            src: true,
                            width: true,
                            height: true
                        }));
                        buf.push("/>");
                    } else {
                        buf.push('<span class="placeholder-20"></span>');
                    }
                    if (p.proposal_answers && p.proposal_answers[proposal.id] === "yes") {
                        buf.push('<span class="rsvp yes"></span>');
                    } else if (p.proposal_answers && p.proposal_answers[proposal.id] === "no") {
                        buf.push('<span class="rsvp no"></span>');
                    } else {
                        buf.push('<span class="rsvp unknown"></span>');
                    }
                    buf.push("</div>");
                }
            });
            buf.push("</div>");
        }
        buf.push("</a></li>");
    }
    return buf.join("");
};

// panel.jade compiled template
exports.panel = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        var a = "";
        if (active === "meetings") a = "ui-btn-active";
        buf.push('<ul id="side-bar" data-role="listview" data-theme="c"><li');
        buf.push(attrs({
            "data-theme": "c",
            "class": a
        }, {
            "data-theme": true,
            "class": true
        }));
        buf.push('><a id="nav-meetings" href="index.html" data-transition="fade"><span class="ui-icon menu-icon-meetings"></span>Meetings</a></li><li data-role="list-divider" data-theme="c">GET TIPS FOR BETTER MEETINGS</li><li><a id="nav-facebook" href="#" data-transition="fade"><span class="ui-icon menu-icon-facebook"></span>Like us on Facebook</a></li><li><a id="nav-twitter" href="#" data-transition="fade"><span class="ui-icon menu-icon-twitter"></span>Follow us on Twitter</a></li><li data-role="list-divider" data-theme="c">OTHER</li><li><a id="nav-support" href="#" data-transition="fade"><span class="ui-icon menu-icon-support"></span>Support</a></li>');
        if (app.options.build === "web") {
            buf.push('<li><a id="nav-tos" href="#" data-transition="fade"><span class="ui-icon menu-icon-tos"></span>Terms of Service</a></li>');
        }
        buf.push('<li><a id="nav-edit-profile" href="profile.html" data-transition="fade"><span class="ui-icon menu-icon-edit-profile"></span>Edit profile</a></li><li><a id="nav-logout" href="#" data-transition="fade"><span class="ui-icon menu-icon-logout"></span>Logout</a></li></ul>');
        if (app.options.build === "web") {
            buf.push('<a href="#" class="no-mobile">Switch to normal website</a>');
        }
    }
    return buf.join("");
};

// participantInListView.jade compiled template
exports.participantInListView = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        buf.push('<a href="href"><div class="wrap ui-li-thumb">');
        if (locals.image) {
            buf.push("<img");
            buf.push(attrs({
                src: image,
                width: "60"
            }, {
                src: true,
                width: true
            }));
            buf.push("/>");
        } else {
            buf.push('<span class="placeholder-60"></span>');
        }
        if (locals.proposal_answers && _.size(proposal_answers) > 0) {
            buf.push("<!-- Scheduling-->");
        } else if (locals.rsvp_status && rsvp_status === "yes") {
            buf.push('<span class="rsvp yes"></span>');
        } else if (locals.rsvp_status && rsvp_status === "no") {
            buf.push('<span class="rsvp no"></span>');
        } else {
            buf.push('<span class="rsvp unknown"></span>');
        }
        buf.push("</div><h3>");
        var __val__ = name;
        buf.push(escape(null == __val__ ? "" : __val__));
        buf.push("</h3>");
        if (organization && organization_title) {
            buf.push("<p>");
            var __val__ = organization + ", " + organization_title;
            buf.push(escape(null == __val__ ? "" : __val__));
            buf.push("</p>");
        }
        if (organization && !organization_title) {
            buf.push("<p>");
            var __val__ = organization;
            buf.push(escape(null == __val__ ? "" : __val__));
            buf.push("</p>");
        }
        if (!organization && organization_title) {
            buf.push("<p>");
            var __val__ = organization_title;
            buf.push(escape(null == __val__ ? "" : __val__));
            buf.push("</p>");
        }
        buf.push("</a>");
    }
    return buf.join("");
};

// participantInMeetingView.jade compiled template
exports.participantInMeetingView = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        if (locals.image !== "") {
            buf.push("<img");
            buf.push(attrs({
                src: locals.image,
                width: "30",
                height: "30"
            }, {
                src: true,
                width: true,
                height: true
            }));
            buf.push("/>");
        } else {
            buf.push('<span class="placeholder-30"></span>');
        }
        if (locals.rsvp_status === "yes") {
            buf.push('<span class="rsvp yes"></span>');
        } else if (locals.rsvp_status === "no") {
            buf.push('<span class="rsvp no"></span>');
        } else {
            buf.push('<span class="rsvp unknown"></span>');
        }
    }
    return buf.join("");
};

// participantView.jade compiled template
exports.participantView = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        buf.push('<div class="ui-grid-a"><div class="ui-block-a">');
        if (image) {
            buf.push("<img");
            buf.push(attrs({
                src: image,
                "class": "mtngs-profile-image"
            }, {
                src: true
            }));
            buf.push("/>");
        } else {
            buf.push('<span class="placeholder-100 mtngs-profile-image"></span>');
        }
        buf.push('</div><div class="ui-block-b">');
        var ipad = navigator.userAgent.match(/iPad/i) != null;
        if (phone && !ipad) {
            buf.push("<a");
            buf.push(attrs({
                href: "tel:" + phone,
                "data-role": "button",
                "data-theme": "b"
            }, {
                href: true,
                "data-role": true,
                "data-theme": true
            }));
            buf.push(">");
            var __val__ = "Call";
            buf.push(escape(null == __val__ ? "" : __val__));
            buf.push("</a>");
        }
        if (phone) {
            buf.push("<a");
            buf.push(attrs({
                href: "sms:" + phone,
                "data-role": "button",
                "data-theme": "b"
            }, {
                href: true,
                "data-role": true,
                "data-theme": true
            }));
            buf.push(">");
            var __val__ = "SMS";
            buf.push(escape(null == __val__ ? "" : __val__));
            buf.push("</a>");
        }
        if (skype) {
            buf.push("<a");
            buf.push(attrs({
                href: "skype:" + skype,
                "data-role": "button",
                "data-theme": "b"
            }, {
                href: true,
                "data-role": true,
                "data-theme": true
            }));
            buf.push(">");
            var __val__ = "Skype";
            buf.push(escape(null == __val__ ? "" : __val__));
            buf.push("</a>");
        }
        buf.push("</div></div>");
        if (name) {
            buf.push('<h3 style="margin-top:0px;padding-top:0px;margin-bottom:0px;margin-top:15px;">');
            var __val__ = name;
            buf.push(escape(null == __val__ ? "" : __val__));
            buf.push("</h3>");
        }
        if (organization && organization_title) {
            buf.push("<p>");
            var __val__ = organization + ", " + organization_title;
            buf.push(escape(null == __val__ ? "" : __val__));
            buf.push("</p>");
        }
        if (organization && !organization_title) {
            buf.push("<p>");
            var __val__ = organization;
            buf.push(escape(null == __val__ ? "" : __val__));
            buf.push("</p>");
        }
        if (!organization && organization_title) {
            buf.push("<p>");
            var __val__ = organization_title;
            buf.push(escape(null == __val__ ? "" : __val__));
            buf.push("</p>");
        }
        buf.push('<ul data-role="listview" data-inset="true" data-theme="a"><li><p class="mtngs-email"><a');
        buf.push(attrs({
            style: "font-weight:normal;color:#555;",
            href: "mailto:" + email
        }, {
            style: true,
            href: true
        }));
        buf.push(">");
        var __val__ = email;
        buf.push(escape(null == __val__ ? "" : __val__));
        buf.push("</a></p>");
        if (phone) {
            buf.push('<p class="mtngs-mobile">');
            var __val__ = phone;
            buf.push(escape(null == __val__ ? "" : __val__));
            buf.push("</p>");
        }
        if (skype) {
            buf.push('<p class="mtngs-skype">');
            var __val__ = skype;
            buf.push(escape(null == __val__ ? "" : __val__));
            buf.push("</p>");
        }
        if (linkedin) {
            buf.push('<p class="mtngs-linkedin">');
            if (linkedin.indexOf("http") === -1) linkedin = "http://" + linkedin;
            buf.push("<a");
            buf.push(attrs({
                style: "font-weight:normal;color:#555;",
                href: linkedin
            }, {
                style: true,
                href: true
            }));
            buf.push(">");
            var __val__ = "LinkedIn Profile";
            buf.push(escape(null == __val__ ? "" : __val__));
            buf.push("</a></p>");
        }
        buf.push("</li></ul>");
    }
    return buf.join("");
};

// profileView.jade compiled template
exports.profileView = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        buf.push('<div id="signup-form" data-role="fieldcontain" class="form-full-width">');
        if (app.options.build !== "web") {
            buf.push('<div class="ui-grid-a"><div class="ui-block-a"><div');
            buf.push(attrs({
                id: "profile-image",
                style: "background-image:url(" + image + ")",
                "class": "mtngs-profile-image"
            }, {
                style: true
            }));
            buf.push("><div");
            buf.push(attrs({
                id: "image-placeholder",
                style: "visibility:" + (image ? "hidden" : "visible")
            }, {
                style: true
            }));
            buf.push('><p id="status-text">Set picture</p></div></div></div><div class="ui-block-b"><div class="input-top"><input');
            buf.push(attrs({
                id: "user-firstname",
                "data-theme": "b",
                type: "text",
                name: "user-firstname",
                value: first_name,
                placeholder: "First name"
            }, {
                "data-theme": true,
                type: true,
                name: true,
                value: true,
                placeholder: true
            }));
            buf.push('/></div><div class="input-bottom"><input');
            buf.push(attrs({
                id: "user-lastname",
                "data-theme": "b",
                type: "text",
                name: "user-firstname",
                value: last_name,
                placeholder: "Last name",
                "class": "corners-bottom"
            }, {
                "data-theme": true,
                type: true,
                name: true,
                value: true,
                placeholder: true
            }));
            buf.push("/></div></div></div>");
        } else {
            buf.push("<p><input");
            buf.push(attrs({
                id: "user-firstname",
                "data-theme": "b",
                type: "text",
                name: "user-firstname",
                value: first_name,
                placeholder: "First name"
            }, {
                "data-theme": true,
                type: true,
                name: true,
                value: true,
                placeholder: true
            }));
            buf.push("/></p><p><input");
            buf.push(attrs({
                id: "user-lastname",
                "data-theme": "b",
                type: "text",
                name: "user-firstname",
                value: last_name,
                placeholder: "Last name",
                "class": "corners-bottom"
            }, {
                "data-theme": true,
                type: true,
                name: true,
                value: true,
                placeholder: true
            }));
            buf.push("/></p>");
        }
        buf.push("<p><input");
        buf.push(attrs({
            id: "user-organization",
            "data-theme": "b",
            type: "text",
            name: "user-organization",
            value: organization,
            placeholder: "Organization"
        }, {
            "data-theme": true,
            type: true,
            name: true,
            value: true,
            placeholder: true
        }));
        buf.push("/></p><p><input");
        buf.push(attrs({
            id: "user-title",
            "data-theme": "b",
            type: "text",
            name: "user-title",
            value: organization_title,
            placeholder: "Title"
        }, {
            "data-theme": true,
            type: true,
            name: true,
            value: true,
            placeholder: true
        }));
        buf.push("/></p><p><input");
        buf.push(attrs({
            id: "user-phone",
            "data-theme": "b",
            type: "text",
            name: "user-phone",
            value: phone,
            placeholder: "Phone"
        }, {
            "data-theme": true,
            type: true,
            name: true,
            value: true,
            placeholder: true
        }));
        buf.push("/></p><p><input");
        buf.push(attrs({
            id: "user-skype",
            "data-theme": "b",
            type: "text",
            name: "user-skype",
            value: skype,
            placeholder: "Skype"
        }, {
            "data-theme": true,
            type: true,
            name: true,
            value: true,
            placeholder: true
        }));
        buf.push('/></p><div class="controls"><a data-theme="b" type="button" class="save-profile-data">Save</a></div>');
        if (tos_accepted != 1) {
            buf.push('<p class="tos-disclaimer">By proceeding you accept the <a href="#" class="open-tos-page">Terms of service</a>.</p>');
        }
        buf.push("</div>");
    }
    return buf.join("");
};

// progressBar.jade compiled template
exports.progressBar = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        buf.push('<!-- Progress bar--><div class="bar wrapper"><div class="bar-container">');
        if (progress_text) {
            buf.push('<div class="text">');
            var __val__ = progress_text;
            buf.push(escape(null == __val__ ? "" : __val__));
            buf.push("</div>");
        }
        buf.push("<div");
        buf.push(attrs({
            style: "width:" + progress + "%",
            "class": "bar"
        }, {
            style: true
        }));
        buf.push("></div></div></div>");
    }
    return buf.join("");
};

// rsvpBarView.jade compiled template
exports.rsvpBarView = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        buf.push('<div class="rsvp-answer"><span class="text">Set your RSVP status:</span><a href="#" class="yes-attending">Attending</a><a href="#" class="not-attending">Not attending</a></div>');
    }
    return buf.join("");
};

// schedulingBarView.jade compiled template
exports.schedulingBarView = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        buf.push('<div class="scheduling-answer">');
        if (user_answered) {
            buf.push('<p><a data-role="button" data-theme="b" href="#" class="answer-scheduling">Change your responses</a></p>');
        } else {
            buf.push('<p><a data-role="button" data-theme="b" href="#" class="answer-scheduling">Tap to answer scheduling</a></p>');
        }
        if (creator == 1) {
            if (all_answered) {
                buf.push('<p><a data-role="button" data-theme="b" href="#" class="choose-date">Choose the time</a></p>');
            } else {
                buf.push('<p><a data-role="button" data-theme="b" href="#" class="choose-date">Choose the time</a></p>');
            }
        }
        buf.push("</div>");
    }
    return buf.join("");
};

// sendInvitesView.jade compiled template
exports.sendInvitesView = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        buf.push('<div id="invite-form" data-role="fieldcontain" class="form-full-width"><p><input');
        buf.push(attrs({
            id: "invite-subject",
            "data-theme": "b",
            type: "text",
            name: "invite-subject",
            value: invite_greetings["subject"],
            placeholder: "Topic"
        }, {
            "data-theme": true,
            type: true,
            name: true,
            value: true,
            placeholder: true
        }));
        buf.push('/></p><p><textarea id="invite-message" data-theme="b" rows="5" cols="40" name="invite-message" placeholder="Message">');
        var __val__ = invite_greetings["content"];
        buf.push(escape(null == __val__ ? "" : __val__));
        buf.push('</textarea></p><p><label><input id="invite-require-rsvp" data-theme="a" type="checkbox" name="invite-require-rsvp"/>Require RSVP</label></p><div class="controls"><button data-theme="b" type="button" class="save-meeting-invite">Send</button></div></div>');
    }
    return buf.join("");
};

// settingsView.jade compiled template
exports.settingsView = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        buf.push("<h3>About</h3><p> Meetin.gs is the smartest way to meet, online or face-to-face.\nWe put meetings on the cloud, accessible from any device.\nTo setup new meetings, go to www.meetin.gs on a desktop browser.</p><p><a");
        buf.push(attrs({
            href: desktop_link
        }, {
            href: true
        }));
        buf.push(">Switch to desktop version</a></p>");
        if (location.host.indexOf("dev") !== -1) {
            buf.push('<a data-theme="b" data-role="button" href="#" class="open-native">Launch native app</a>');
        }
        buf.push('<a data-theme="b" data-role="button" href="#" class="logout">Log Out</a>');
    }
    return buf.join("");
};

// updateBrowser.jade compiled template
exports.updateBrowser = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        buf.push('<div class="main-div ui-content" data-role="content" role="main"><div data-role="content" role="main" class="main-div ui-content"><h3>Sorry</h3><p>The mobile site is designed to work with modern browsers. Please update to Chrome, Firefox, Safari or Opera.</p><p><a');
        buf.push(attrs({
            href: app.defaults.desktop_link
        }, {
            href: true
        }));
        buf.push(">Switch to desktop version</a></p></div>");
    }
    return buf.join("");
};


// attach to window or export with commonJS
if (typeof module !== "undefined") {
    module.exports = exports;
} else if (typeof define === "function" && define.amd) {
    define(exports);
} else {
    root.templatizer = exports;
}

})();