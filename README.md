# Xbox 360 Dashboard Interface 

## Project Overview

This project is a web-based emulation of the Xbox 360 dashboard, originally released in 2006. It aims to recreate the look and feel of the original interface using modern web technologies. This proof-of-concept demonstrates the capability to replicate classic UI/UX designs in a web environment.

## Features

- **Authentic UI Design**: Faithfully replicates the visual design of the Xbox 360 dashboard.
- **Navigation**: Smooth navigation through different menus and sections.
- **Animations**: Uses GSAP and CSS keyframes to create fluid animations similar to the original dashboard.
- **Custom Assets**: All assets are custom-created using Figma.
- **Responsive Design**: Ensures compatibility across various screen sizes and devices.

## Technologies Used

- **Frontend**:
  - React.js
  - Redux for state management
  - CSS for styling
  - GSAP and CSS keyframes for animations

- **Backend**:
  -When deployed for production, a separate repository hosts a server that runs on Netlify while hosting data on     Supabase
  -In development, mockdata is present to display information in relevant panels.

## Installation and Setup

To run this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   gh repo clone gilbert-p/xbox_dashboard
   cd xbox_dashboard
    ```
   
2. **Install Depenencies**:
    ```
    npm install
    ```

## Usage
 - Navigate through the dashboard using the keyboard or mouse.
 - Explore different sections and menus to experience the recreated interface.
## Future Enhancements
 - **Mobile Compatibility** : Enhance the mobile responsiveness and touch interactions.

## Contributing
 1. Fork the repository
 2. Create a new branch ```git checkout -b feature-branch```.
 3. Make your changes and commit them ```git commit -m 'Add some feature'```.
 4. Push to the branch ```git push origin feature-branch```.

## Acknowledgements
 - Inspired by the original Xbox 360 dashboard design and in particular **[Rowland Brown](https://rowlandbrown.com/)** who had a large contribution    in spearheading its design and development with the use of Petiephant's proprietary **XUI tool**.
 - Special thanks to the open-source community for the tools and libraries used in this project.
