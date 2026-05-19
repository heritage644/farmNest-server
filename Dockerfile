FROM node:20

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project
COPY . .

# Compile TypeScript -> dist/
RUN npm run build

# Expose app port
EXPOSE 3000

# Start the server
CMD ["npm", "start"]