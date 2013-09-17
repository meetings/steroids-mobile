Meetings Mobile
---------------

# Install

	npm install -g yeoman phantomjs templatizer
	bundle

# Building for the web

  nvm use 0.8
	yeoman web

## AppGyver builds

  nvm use 0.8
	yeoman ios
  yeoman android

Creates build desired build to agapp directory

## Developing

	yeoman server

## Mobile app developing

  yeoman ios || android
  cd agapp
  nvm use 0.10     # Use latest version for Steroids and 0.8 for Yeoman
  steroids connect

When you want to push new build to steroids scanner, run 'yeoman ios || android' again and trigger steroids connects update (press enter in terminal that runs steroids connect)



