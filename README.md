Meetings Mobile
---------------

# Dependencies for build

	gem install compass

	# Do these in order so that incompatible versions will not be installed

	curl https://raw.github.com/creationix/nvm/master/install.sh | sh
	nvm install 0.8.25

        # open new shell?

	nvm use 0.8.25

	# nvm yeoman can't find these unless installed without -g to source dir
	npm install findit@0.1.2
	npm install templatizer@0.0.10

	npm install -g yeoman@0.9.6
	npm install -g phantomjs


# Build for development

	source build.sh

# Building for the web

	yeoman web

## AppGyver builds

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



