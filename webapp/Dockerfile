# pull official base image
# 

#
# Then, build the image with:
#
# docker build -f Dockerfile -t kyc-webapp .
#
# Then run the container using:
#
# docker run -i --rm -p 9000:9000 kyc-webapp
FROM node:16.13.1

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install 
#RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . ./

# start app
CMD ["npm", "run", "start:dev"]
