# Step 1: Build the React app
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app source code
COPY . .

# Build the React app for production
RUN npm run build

# Step 2: Serve the built app with a web server
FROM nginx:alpine

# Copy the build directory from the build stage to Nginx's HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx to serve the app
CMD ["nginx", "-g", "daemon off;"]