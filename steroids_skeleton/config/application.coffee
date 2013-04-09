# -- Required settings --

# old application.json configs:
#{
#  "id": 1006,
#  "pin_code": "9903",
#  "identification_hash": "8ec852c914d6bb0e1229a77b7fb913767e08774680f94b2e9dfedd3740b9f88a",
#  "name": "Meetin.gs Mobile",
#  "framework": "0.9.2",
#  "navigation_bar_style": "black",
#  "status_bar_style": "black",
#  "fullscreen": false,
#  "fullscreen_start_url": "",
#  "client_version": "edge",
#  "background_eval_js_string": "",
#  "bottom_bars": [
#    {
#      "id": 1818,
#      "position": 0,
#      "title": "Meetings",
#      "target_url": "http://localhost:13101/index.html",
#      "image_path": "meetings.png"
#    },
#    {
#      "id": 1817,
#      "position": 1,
#      "title": "Settings",
#      "target_url": "http://localhost:13101/settings.html",
#      "image_path": "settings.png"
#    }
#  ]
#}


steroids.config.name = "New Application"

# -- Location --
# Defines starting location for applications without a tab bar.
# Tabs will override this value.
# Can be one of these:
#   - file URL (relative to www, f.e. index.html)
#   - http://localhost/ (serves files locally from www, f.e. http://localhost/index.html would serve index.html)
#   - http://www.google.com (directly from internet)

<!-- start build include: ios -->
steroids.config.location = "http://localhost/appstart.html"
<!-- stop build include -->
<!-- start build include: android -->
steroids.config.location = "appstart.html"
<!-- stop build include -->

# -- Tabs --
#
# A boolean to enable tab bar (on bottom)
# This will override steroids.config.location (that is for single webview apps, like in PhoneGap)
# Default: false
#
# steroids.config.tabBar.enabled = true
#
# Array with objects to specify which tabs are created on app startup
#
# Tab object properties are:
# - title: text to show in tab title
# - icon: path to icon file (f.e. images/icon@2x.png)
# - location: like steroids.config.location, can be one of these:
#   - file URL (relative to www, f.e. index.html)
#   - http://localhost/index.html (serves files locally from www, f.e. http://localhost/index.html would serve www/index.html)
#   - http://www.google.com (directly from internet)
#
# steroids.config.tabBar.tabs = [
#   {
#     title: "Index"
#     icon: "icons/shoebox@2x.png"
#     location: "http://localhost/index.html"
#   },
#   {
#     title: "Internet"
#     icon: "icons/telescope@2x.png"
#     location: "http://www.google.com"
#   }
# ]

# -- Status bar --
# Sets status bar visible (carrier, clock, battery status)
# Default: false

steroids.config.statusBar.enabled = true

# -- Colors --
# Color values can be set in hex codes, eg. #ffbb20
# Setting these values override values set by the application theme in steroids.config.theme
# Default for all attributes: ""

steroids.config.navigationBar.tintColor = "#00aeef"
steroids.config.navigationBar.titleColor = "#ffffff"
steroids.config.navigationBar.titleShadowColor = "#000000"

steroids.config.navigationBar.buttonTintColor = "#363636"
steroids.config.navigationBar.buttonTitleColor = "#ffffff"
steroids.config.navigationBar.buttonShadowColor = "#000000"

# steroids.config.tabBar.tintColor = ""
# steroids.config.tabBar.tabTitleColor = ""
# steroids.config.tabBar.tabTitleShadowColor = ""
# steroids.config.tabBar.selectedTabTintColor = ""
#
# Can be used to set an indicator image for the selected tab (can be bigger than the tab)
# Default: ""
# steroids.config.tabBar.selectedTabBackgroundImage = ""
#
# Built-in iOS theme, values: black and default
# Default: "default"
#
# steroids.config.theme = "default"
