# Use the official Node.js image to build the application
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Use the official Nginx image to serve the application
FROM nginx:alpine

# Copy the built files from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port the application runs on
EXPOSE 80

# Run Nginx
CMD ["nginx", "-g", "daemon off;"]
