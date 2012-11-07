Meetings Mobile
---------------

# Install

	npm install

Which installs yeoman and grunt globally.

	bundle

Which installs compass


# Building

	yeoman build

## AppGyver Build

	yeoman build && rm -rf agapp/views && mv dist agapp/views

* build process complains about /appgyver/cordova.js and /appgyver/appgyver.js, because they are on the device, not in the project.


## Developing

	yeoman start


