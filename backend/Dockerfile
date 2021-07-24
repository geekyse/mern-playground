FROM node:14

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /app

# Copying source files
COPY . .


# Building app
RUN rm .env
RUN mv .env.prod .env

RUN yarn install
RUN yarn run build

# Running the app
CMD [ "yarn", "start" ]
