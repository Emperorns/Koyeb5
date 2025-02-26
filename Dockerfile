FROM node:18-alpine

WORKDIR /app
COPY . .

# Debug step - List files before installation
RUN ls -la src/db/models/Account.js && \
    echo "File exists!" || echo "FILE MISSING!"

RUN npm install --production
CMD ["node", "src/bot.js"]
