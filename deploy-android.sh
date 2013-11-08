# Run this file with "source deploy.sh" to get the current shell environment.

nvm use 0.8 && \
  yeoman android --force && \
  cd agapp && \
  nvm use 0.10 && \
  steroids deploy ; \
  cd -
