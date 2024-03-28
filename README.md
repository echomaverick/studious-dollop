# Crime Alert Web App

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup](#setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Description

The Crime Alert Web App is a full-stack application built to allow users to report incidents and share alerts related to criminal activities. The app includes features such as incident reporting, real-time notifications, and a map interface to visualize reported incidents.

## Features

- **User Authentication:**

  - Secure user login and logout functionality.
  - User-specific notifications.

- **Incident Reporting:**

  - Enhanced security with Two-Factor Authentication (2FA) requiring one-time code for user verification.

- **Two-Factor Authentication (2FA):**

  - Users receive real-time notifications for new incidents.

- **Map Interface:**
  - Interactive map displaying reported incidents.

## Tech Stack

- **Frontend:**

  - ReactJS
  - Leaflet for maps

- **Backend:**

  - Node.js
  - Express.js
  - MongoDB for database

## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/crime-alert-web-app.git
   cd crime-alert-web-app
   ```

2. **Install dependencies:**

   ```bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd client
   npm install
   ```
   - If you are unable to install dependencies or encounter errors related to missing package.json or package-lock.json files, it's likely that these files have been excluded from version control. In this case, you can recreate them by running npm init in the server and client directories, and then reinstalling the dependencies with npm install.

3. **Database Configuration:**

   - Set up your MongoDB connection in `server/config/db.js`.

4. **Environment Variables:**

   - Create a `.env` file in the `server` directory and configure your environment variables.

5. **Run the application:**

   ```bash
   # Run the server
   cd server
   npm start

   # Run the frontend
   cd client
   npm start
   ```

## Usage

1. **User Registration/Login:**

   - Users can register or login to the web app.

2. **Incident Reporting:**

   - Logged-in users can report incidents by providing details and location.

3. **Two-Factor Authentication (2FA):**

   - Users are now required to authenticate using two factors, typically a password and a one-time code sent to their registered email or phone number. This added layer of security enhances account protection and reduces the risk of unauthorized access.

4. **Map Interface:**
   - Explore the map to visualize reported incidents.
  
5. **Additional Notes**
   - If you are unable to find `package.json` and `package-lock.json` files in the repository, they might have been removed from version control. To recreate them and install dependencies, follow the instructions provided in the "Setup" section above.


## Contributing

Contributions are welcome! Fork the repository and create a pull request.

## License

This project is licensed under the [Apache License 2.0](LICENSE).
