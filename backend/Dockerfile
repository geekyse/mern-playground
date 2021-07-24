FROM node:14

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /app

# Copying source files
COPY . .


RUN yarn install
RUN yarn run build

# Running the app
CMD [ "yarn", "start" ]
