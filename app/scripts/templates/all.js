(function () {
var root = this, exports = {};

// The jade runtime:
var jade=function(exports){Array.isArray||(Array.isArray=function(arr){return"[object Array]"==Object.prototype.toString.call(arr)}),Object.keys||(Object.keys=function(obj){var arr=[];for(var key in obj)obj.hasOwnProperty(key)&&arr.push(key);return arr}),exports.merge=function merge(a,b){var ac=a["class"],bc=b["class"];if(ac||bc)ac=ac||[],bc=bc||[],Array.isArray(ac)||(ac=[ac]),Array.isArray(bc)||(bc=[bc]),ac=ac.filter(nulls),bc=bc.filter(nulls),a["class"]=ac.concat(bc).join(" ");for(var key in b)key!="class"&&(a[key]=b[key]);return a};function nulls(val){return val!=null}return exports.attrs=function attrs(obj,escaped){var buf=[],terse=obj.terse;delete obj.terse;var keys=Object.keys(obj),len=keys.length;if(len){buf.push("");for(var i=0;i<len;++i){var key=keys[i],val=obj[key];"boolean"==typeof val||null==val?val&&(terse?buf.push(key):buf.push(key+'="'+key+'"')):0==key.indexOf("data")&&"string"!=typeof val?buf.push(key+"='"+JSON.stringify(val)+"'"):"class"==key&&Array.isArray(val)?buf.push(key+'="'+exports.escape(val.join(" "))+'"'):escaped&&escaped[key]?buf.push(key+'="'+exports.escape(val)+'"'):buf.push(key+'="'+val+'"')}}return buf.join(" ")},exports.escape=function escape(html){return String(html).replace(/&(?!(\w+|\#\d+);)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")},exports.rethrow=function rethrow(err,filename,lineno){if(!filename)throw err;var context=3,str=require("fs").readFileSync(filename,"utf8"),lines=str.split("\n"),start=Math.max(lineno-context,0),end=Math.min(lines.length,lineno+context),context=lines.slice(start,end).map(function(line,i){var curr=i+start+1;return(curr==lineno?"  > ":"    ")+curr+"| "+line}).join("\n");throw err.path=filename,err.message=(filename||"Jade")+":"+lineno+"\n"+context+"\n\n"+err.message,err},exports}({});

// create our folder objects

// commentForm.jade compiled template
exports.commentForm = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        var __indent = [];
        buf.push('\n<div id="comment-box">\n  <div class="left">\n    <div class="container">\n      <textarea id="comment-input" data-role="none" rows="1" placeholder="Tap to comment"></textarea>\n    </div>\n  </div>\n  <div class="right"><a data-role="none" data-enhance="false" href="#" class="send-comment">Send</a></div>\n</div>');
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
        var __indent = [];
        if (!user_image) var user_image = app.defaults.user_image;
        buf.push("<img");
        buf.push(attrs({
            src: user_image,
            "class": "mtngs-profile-image"
        }, {
            src: true
        }));
        buf.push("/>\n<h3>");
        var __val__ = user_name;
        buf.push(escape(null == __val__ ? "" : __val__));
        buf.push('</h3>\n<p class="info">');
        var __val__ = date_ago;
        buf.push(escape(null == __val__ ? "" : __val__));
        buf.push("</p>\n<p>");
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
        var __indent = [];
        buf.push("\n<h3>Are you sure?</h3>\n<p>");
        var __val__ = "Choose " + time + " for the meeting. We will immediately notify all participants.";
        buf.push(escape(null == __val__ ? "" : __val__));
        buf.push('</p><a id="confirm-option" data-theme="b" type="button">Save and notify</a><a data-theme="a" type="button" class="reset">Cancel</a>');
    }
    return buf.join("");
};

// footer.jade compiled template
exports.footer = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        var __indent = [];
        buf.push('\n<div data-role="footer" data-position="fixed" data-id="meeting-footer" data-theme="c" data-tap-toggle="false">\n  <div data-role="navbar" data-grid="a" class="meeting-navbar">\n    <ul>\n      <li>');
        if (active === "meetings") {
            buf.push('<a id="nav-meetings" href="index.html" data-icon="custom" data-transition="fade" class="ui-btn-active ui-state-persist">Meetings</a>');
        } else {
            buf.push('<a id="nav-meetings" href="index.html" data-icon="custom" data-transition="fade">Meetings</a>');
        }
        buf.push("\n      </li>\n      <li>");
        if (active === "settings") {
            buf.push('<a id="nav-settings" href="settings.html" data-icon="custom" data-transition="fade" class="ui-btn-active ui-state-persist">Settings</a>');
        } else {
            buf.push('<a id="nav-settings" href="settings.html" data-icon="custom" data-transition="fade">Settings</a>');
        }
        buf.push("\n      </li>\n    </ul>\n  </div>\n</div>");
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
        var __indent = [];
        buf.push('\n<div class="logo">\n  <h1 class="meetings-logo"></h1>\n</div>\n<div id="login-form" data-role="fieldcontain" class="ui-hide-label">\n  <input id="email" data-theme="b" type="text" name="email" value="" placeholder="Email"/><a data-theme="b" type="button" class="login">Request login link</a>\n  <p style="text-align:center;">OR</p><a data-theme="b" type="button" class="register">Register new account</a>\n</div>\n<div class="no-mobile-link"><a id="no-mobile" href="#">Switch to normal website</a></div>');
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
        var __indent = [];
        buf.push("<a");
        buf.push(attrs({
            href: show_url
        }, {
            href: true
        }));
        buf.push(">");
        if (fetch_type === "media") {
            buf.push('<span class="material-image ui-li-thumb ui-corner-tl"></span>');
        } else if (fetch_type === "page") {
            buf.push('<span class="material-text ui-li-thumb ui-corner-tl"></span>');
        } else {
            buf.push('<span class="material-other ui-li-thumb ui-corner-tl"></span>');
        }
        buf.push("\n  <h3>");
        var __val__ = title;
        buf.push(escape(null == __val__ ? "" : __val__));
        buf.push("</h3>");
        if (author_name !== "") {
            buf.push("\n  <p>");
            var __val__ = "By " + author_name + " " + time_ago;
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

// materialView.jade compiled template
exports.materialView = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        var __indent = [];
        if (fetch_type !== "") {
            if (fetch_type === "media") {
                buf.push("\n<h3>");
                var __val__ = title;
                buf.push(escape(null == __val__ ? "" : __val__));
                buf.push("</h3>");
                var __val__ = content;
                buf.push(null == __val__ ? "" : __val__);
            } else {
                buf.push("\n<h3>");
                var __val__ = title;
                buf.push(escape(null == __val__ ? "" : __val__));
                buf.push("</h3>");
                if (title == "Agenda" && content == "") {
                    buf.push('\n<p class="notruncation">Agenda is empty.</p>');
                } else if (title == "Action Points" && content == "") {
                    buf.push('\n<p class="notruncation">Action points are empty.</p>');
                } else {
                    buf.push('\n<p class="notruncation">');
                    var __val__ = content;
                    buf.push(null == __val__ ? "" : __val__);
                    buf.push("</p>");
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
        var __indent = [];
        buf.push("<a");
        buf.push(attrs({
            href: "meeting.html?id=" + id
        }, {
            href: true
        }));
        buf.push(">\n  <h3>");
        var __val__ = title;
        buf.push(escape(null == __val__ ? "" : __val__));
        buf.push("</h3>\n  <p>");
        var __val__ = location;
        buf.push(escape(null == __val__ ? "" : __val__));
        buf.push('</p>\n  <div class="top-bar"><span class="left">');
        var __val__ = date_string || "Being Scheduled";
        buf.push(escape(null == __val__ ? "" : __val__));
        buf.push('</span><span class="right">');
        var __val__ = time_string;
        buf.push(escape(null == __val__ ? "" : __val__));
        buf.push("</span></div>");
        if (participants.length) {
            buf.push('\n  <div class="participants">');
            participants = _.sortBy(participants, function(p) {
                if (p.is_creator) return 0; else if (p.rsvp_status === "yes") return 1; else if (p.rsvp_status === "no") return 3; else return 2;
            });
            participants.forEach(function(participant) {
                {
                    buf.push('\n    <div class="wrap">');
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
                    if (date_string == "") {
                        buf.push("\n      <!-- Time not set-->");
                    } else if (participant.rsvp_status === "yes") {
                        buf.push('<span class="rsvp yes"></span>');
                    } else if (participant.rsvp_status === "no") {
                        buf.push('<span class="rsvp no"></span>');
                    } else {
                        buf.push('<span class="rsvp unknown"></span>');
                    }
                    buf.push("\n    </div>");
                }
            });
            buf.push("\n  </div>");
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
        var __indent = [];
        buf.push("\n<h3>");
        var __val__ = title;
        buf.push(escape(null == __val__ ? "" : __val__));
        buf.push("</h3>");
        if (date_string) {
            buf.push('\n<p class="mtngs-calendar">');
            var __val__ = date_string + ", " + time_string + " " + timezone_string;
            buf.push(escape(null == __val__ ? "" : __val__));
            buf.push("</p>");
        }
        if (location) {
            if (location === "On Skype" || location === "Online" || location === "Location not known") {
                buf.push('\n<p class="mtngs-location">');
                var __val__ = location;
                buf.push(escape(null == __val__ ? "" : __val__));
                buf.push("</p>");
            } else {
                buf.push('\n<p class="mtngs-location"><a');
                buf.push(attrs({
                    target: "_blank",
                    href: "https://maps.google.com/maps?daddr=" + location
                }, {
                    target: true,
                    href: true
                }));
                buf.push(">");
                var __val__ = location;
                buf.push(escape(null == __val__ ? "" : __val__));
                buf.push("</a></p>");
            }
        }
        buf.push('\n<div id="next-action-bar"></div>\n<!-- Skype button-->');
        if (skype_url) {
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
        buf.push('\n<div id="progress-bar"></div>\n<!-- Participants-->\n<ul data-role="listview" data-inset="true">\n  <li><a href="#" class="open-participant-view">\n      <h3>');
        var __val__ = "Participants";
        buf.push(escape(null == __val__ ? "" : __val__));
        buf.push('</h3>\n      <div class="participant-list"></div>');
        if (participants.length) {
            buf.push('\n      <div class="participants">');
            participants = _.sortBy(participants, function(p) {
                if (p.is_creator) return 0; else if (p.rsvp_status === "yes") return 1; else if (p.rsvp_status === "no") return 3; else return 2;
            });
            participants.forEach(function(participant) {
                {
                    buf.push('\n        <div class="wrap">');
                    if (participant.image !== "") {
                        buf.push("<img");
                        buf.push(attrs({
                            src: participant.image,
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
                    if (date_string == "") {
                        buf.push("\n          <!-- Time not set-->");
                    } else if (participant.rsvp_status === "yes") {
                        buf.push('<span class="rsvp yes"></span>');
                    } else if (participant.rsvp_status === "no") {
                        buf.push('<span class="rsvp no"></span>');
                    } else {
                        buf.push('<span class="rsvp unknown"></span>');
                    }
                    buf.push("\n        </div>");
                }
            });
            buf.push("\n      </div>");
        }
        buf.push("</a></li>\n</ul>");
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
        var __indent = [];
        buf.push('\n<div class="notice">\n  <p>Problems with the internets...</p>\n</div>');
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
        var __indent = [];
        buf.push("\n<li>");
        var c = user.proposal_answers[proposal.id] ? user.proposal_answers[proposal.id] : "no";
        if (mode === "choose") c = "choose";
        buf.push("<a");
        buf.push(attrs({
            href: "#",
            "data-option-id": proposal.id,
            "data-time": proposal.date_string + " " + proposal.time_string,
            "class": "option-" + c
        }, {
            href: true,
            "data-option-id": true,
            "class": true,
            "data-time": true
        }));
        buf.push('>\n    <div class="top-bar"><span class="left">');
        var __val__ = proposal.date_string;
        buf.push(escape(null == __val__ ? "" : __val__));
        buf.push('</span><span class="right">');
        var __val__ = proposal.time_string;
        buf.push(escape(null == __val__ ? "" : __val__));
        buf.push("</span></div>\n    <!--span.right=time_string-->");
        if (participants.length) {
            buf.push('\n    <div class="participants">');
            participants = _.sortBy(participants, function(p) {
                if (p.proposal_answers[proposal.id] === "yes") return 1; else if (p.proposal_answers[proposal.id] === "no") return 3; else return 2;
            });
            participants.forEach(function(p) {
                {
                    buf.push('\n      <div class="wrap">');
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
                    if (p.proposal_answers[proposal.id] === "yes") {
                        buf.push('<span class="rsvp yes"></span>');
                    } else if (p.proposal_answers[proposal.id] === "no") {
                        buf.push('<span class="rsvp no"></span>');
                    } else {
                        buf.push('<span class="rsvp unknown"></span>');
                    }
                    buf.push("\n      </div>");
                }
            });
            buf.push("\n    </div>");
        }
        buf.push("</a>\n</li>");
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
        var __indent = [];
        buf.push("<a");
        buf.push(attrs({
            href: show_url
        }, {
            href: true
        }));
        buf.push('>\n  <div class="wrap ui-li-thumb">');
        if (image) {
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
        if (proposal_answers && _.size(proposal_answers) > 0) {
            buf.push("\n    <!-- Scheduling-->");
        } else if (rsvp_status === "yes") {
            buf.push('<span class="rsvp yes"></span>');
        } else if (rsvp_status === "no") {
            buf.push('<span class="rsvp no"></span>');
        } else {
            buf.push('<span class="rsvp unknown"></span>');
        }
        buf.push("\n  </div>\n  <h3>");
        var __val__ = name;
        buf.push(escape(null == __val__ ? "" : __val__));
        buf.push("</h3>");
        if (organization && organization_title) {
            buf.push("\n  <p>");
            var __val__ = organization + ", " + organization_title;
            buf.push(escape(null == __val__ ? "" : __val__));
            buf.push("</p>");
        }
        if (organization && !organization_title) {
            buf.push("\n  <p>");
            var __val__ = organization;
            buf.push(escape(null == __val__ ? "" : __val__));
            buf.push("</p>");
        }
        if (!organization && organization_title) {
            buf.push("\n  <p>");
            var __val__ = organization_title;
            buf.push(escape(null == __val__ ? "" : __val__));
            buf.push("</p>");
        }
        buf.push("</a>");
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
        var __indent = [];
        buf.push('\n<div class="ui-grid-a">\n  <div class="ui-block-a">');
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
        buf.push('\n  </div>\n  <div class="ui-block-b">');
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
        buf.push("\n  </div>\n</div>");
        if (name) {
            buf.push('\n<h3 style="margin-top:0px;padding-top:0px;margin-bottom:0px;margin-top:15px;">');
            var __val__ = name;
            buf.push(escape(null == __val__ ? "" : __val__));
            buf.push("</h3>");
        }
        if (organization && organization_title) {
            buf.push("\n<p>");
            var __val__ = organization + ", " + organization_title;
            buf.push(escape(null == __val__ ? "" : __val__));
            buf.push("</p>");
        }
        if (organization && !organization_title) {
            buf.push("\n<p>");
            var __val__ = organization;
            buf.push(escape(null == __val__ ? "" : __val__));
            buf.push("</p>");
        }
        if (!organization && organization_title) {
            buf.push("\n<p>");
            var __val__ = organization_title;
            buf.push(escape(null == __val__ ? "" : __val__));
            buf.push("</p>");
        }
        buf.push('\n<ul data-role="listview" data-inset="true" data-theme="a">\n  <li>\n    <p class="mtngs-email"><a');
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
            buf.push('\n    <p class="mtngs-mobile">');
            var __val__ = phone;
            buf.push(escape(null == __val__ ? "" : __val__));
            buf.push("</p>");
        }
        if (skype) {
            buf.push('\n    <p class="mtngs-skype">');
            var __val__ = skype;
            buf.push(escape(null == __val__ ? "" : __val__));
            buf.push("</p>");
        }
        if (linkedin) {
            buf.push('\n    <p class="mtngs-linkedin">');
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
            buf.push("</a>\n    </p>");
        }
        buf.push("\n  </li>\n</ul>");
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
        var __indent = [];
        buf.push('\n<!-- Progress bar-->\n<div class="bar wrapper">\n  <div class="bar-container">\n    <div class="text">');
        var __val__ = timeleft;
        buf.push(escape(null == __val__ ? "" : __val__));
        buf.push("</div>\n    <div");
        buf.push(attrs({
            style: "width:" + progress + "%",
            "class": "bar"
        }, {
            style: true
        }));
        buf.push("></div>\n  </div>\n</div>");
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
        var __indent = [];
        buf.push('\n<div class="rsvp-answer"><span class="text">Set your RSVP status:</span><a href="#" class="attending">Attending</a><a href="#" class="not-attending">Not attending</a></div>');
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
        var __indent = [];
        buf.push('\n<div class="scheduling-answer">');
        if (user_answered) {
            buf.push('\n  <p><a data-theme="b" href="#" class="answer-scheduling">Change scheduling answers</a></p>');
        } else {
            buf.push('\n  <p><a data-role="button" data-theme="b" href="#" class="answer-scheduling">Tap to answer scheduling</a></p>');
        }
        if (creator == 1) {
            if (all_answered) {
                buf.push('\n  <p><a data-role="button" data-theme="b" href="#" class="choose-date">Choose the time</a></p>');
            } else {
                buf.push('\n  <p><a data-theme="b" href="#" class="choose-date">Choose the time</a></p>');
            }
        }
        buf.push("\n</div>");
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
        var __indent = [];
        buf.push("\n<h3>About</h3>\n<p>\n   Meetin.gs is the smartest way to meet, online or face-to-face.\n  We put meetings on the cloud, accessible from any device.\n  To setup new meetings, go to www.meetin.gs on a desktop browser.\n</p>\n<p><a");
        buf.push(attrs({
            href: desktop_link
        }, {
            href: true
        }));
        buf.push('>Switch to desktop version</a></p><a data-theme="b" data-role="button" href="#" class="logout">Log Out</a>');
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
        var __indent = [];
        buf.push('<div class="main-div ui-content" data-role="content" role="main">\n<div data-role="content" role="main" class="main-div ui-content">\n  <h3>Sorry</h3>\n  <p>The mobile site is designed to work with modern browsers. Please update to Chrome, Firefox, Safari or Opera.</p>\n  <p><a');
        buf.push(attrs({
            href: app.defaults.desktop_link
        }, {
            href: true
        }));
        buf.push(">Switch to desktop version</a></p>\n</div>");
    }
    return buf.join("");
};


// attach to window or export with commonJS
if (typeof module !== "undefined") {
    module.exports = exports;
} else {
    root.templatizer = exports;
}

})();