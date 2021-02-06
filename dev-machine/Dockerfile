FROM node:14

# Env
ENV ENV_NAME dev
ENV NODE_ENV dev
ENV NODE_CONFIG_ENV dev

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /app

# Only copy the package.json file to work directory
COPY . .

# Building app

RUN yarn
RUN yarn build

# Running the app
CMD [ "yarn" , "dev" ]

EXPOSE 7001
