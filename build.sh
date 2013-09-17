# Run this file with "source build.sh" to get the current shell environment.

nvm use 0.8 && \
  yeoman ios --force && \
  cd agapp && \
  nvm use 0.10 && \
  steroids connect ; \
  cd -
