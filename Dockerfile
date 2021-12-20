### Multi Stage Build ###

### Estágio 1 - Obter o source e gerar o build ###
FROM node:lastest AS ng-builder
RUN mkdir -p /app
WORKDIR /app
COPY . /app
RUN npm install
COPY . /app
RUN $(npm bin)/ng build --prod


### Estágio 2 - Subir o source para o servidor NGINX com a app Angular ###
FROM NGINX
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=ng-builder /app/dist/front-web /usr/share/nginx/html

EXPOSE 80