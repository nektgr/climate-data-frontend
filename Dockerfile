FROM node:18-alpine

WORKDIR /app

# Copy only the package.json and package-lock.json for dependency installation
COPY package.json package-lock.json ./

# Install dependencies using npm
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the frontend port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
