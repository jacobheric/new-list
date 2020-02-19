FROM node:10-slim

#
# default to production
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# default to port 3000 for node, 9229 and 9230 tests/debug
ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT 9229 9230

RUN npm i npm@latest -g

RUN mkdir /opt/list
WORKDIR /opt/list
COPY package.json package-lock.json* ./
COPY src ./src
RUN chown -R node:node /opt/list

USER node
RUN npm install --no-optional && npm cache clean --force
ENV PATH /opt/list/node_modules/.bin:$PATH

#
# coming soon
# HEALTHCHECK --interval=30s CMD node health.js

RUN npm run build

CMD [ "node", "./dist/index.js" ]
