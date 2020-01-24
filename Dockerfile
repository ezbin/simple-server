FROM centos:7

# Install node.js
RUN curl -sL https://rpm.nodesource.com/setup_12.x | bash -
RUN yum install -y nodejs

RUN mkdir /app
COPY index.js /app
COPY package.json /app

USER 1000
EXPOSE 8080
WORKDIR /app
CMD ["npm", "run", "server"]
