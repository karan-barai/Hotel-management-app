FROM node:20.11.0
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN npm install
COPY . .
EXPOSE 3000
RUN npx prisma generate
RUN mkdir —p ./configs
RUN chown node ./configs
RUN npm run build
CMD ["npm", "run", "start"]