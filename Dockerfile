# Use the official Node.js image from the Docker Hub
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache for npm install
COPY package*.json ./

# Run npm install to install dependencies
#RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Accept PLATFORM_BASEURL as a build argument
#ARG REACT_APP_PLATFORM_BASEURL
#ARG REACT_APP_PAYMENT_INTENT_KEY

# Create the .env file in the src folder with PLATFORM_BASEURL
#RUN echo "REACT_APP_PLATFORM_BASEURL=$REACT_APP_PLATFORM_BASEURL" > /app/.env
#    echo "REACT_APP_PAYMENT_INTENT_KEY=$REACT_APP_PAYMENT_INTENT_KEY" >> /app/.env
	
# Increase Node.js memory limit to prevent out-of-memory errors
ENV NODE_OPTIONS="--max-old-space-size=6144"

# Run npm run build to build the application
#RUN npm run build

# Expose the port that the application will run on
EXPOSE 3000

# Command to start the application
CMD ["npm", "start"]