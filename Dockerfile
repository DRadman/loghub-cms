# Stage 1: Build Angular Application
FROM node:20.11.0 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install Angular CLI globally
RUN npm install -g @angular/cli@17.1.3

# Copy the rest of the application code
COPY . .

# Build the Angular application with server-side rendering
RUN ng build --prod --ssr

# Stage 2: Serve Angular Application using Node.js
FROM node:20.11.0 AS serve

# Set the working directory in the container
WORKDIR /app

# Copy the built Angular SSR application from the previous stage
COPY --from=build /app/dist /app/dist

# Install express server
RUN npm install express

# Copy server.js (or whatever your SSR server file is named) to the working directory
COPY server.js .

# Expose the port that express server will run on
EXPOSE 4200

# Command to run the SSR server
CMD ["node", "server.js"]