<a id="readme-top"></a>

[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![project_license][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<br />
<div align="center">
<h3 align="center">Chick Check</h3>

  <p align="center">
    A mobile app (React Native/Expo) that monitors poultry farm environmental conditions in real-time using IoT sensors.
    <br />
    <a href="https://github.com/elfatairy/chick-check/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/elfatairy/chick-check/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## What It Monitors
- Temperature
- Humidity
- Ammonia levels
- Light intensity

## Key Features
- **Live Dashboard**: Displays current readings with color-coded indicators
- **Smart Alerts**: Sends push notifications when conditions exceed safe thresholds
  - Temperature outside 18-25°C
  - Ammonia ≥2.5 PPM
- **Historical Analytics**: Monthly charts showing 30-day trends
- **Database View**: Detailed data table filtered by date

## Tech Stack
- React Native & Expo
- Firebase Realtime Database
- Node.js backend for monitoring & alerts

## Purpose
Helps poultry farmers remotely monitor critical environmental factors that affect bird health and productivity, receiving instant alerts when intervention is needed.

### Built With

- [![Expo][Expo]][Expo-url]
- [![React Native][React-Native]][React-Native-url]
- [![Firebase][Firebase]][Firebase-url]

<!-- Installation -->

## Installation

### Prerequisites
- Node.js >= 18
- npm or yarn
- Expo CLI (optional, but recommended)
- Expo Go app on your mobile device (for testing)
- Firebase project with Firestore enabled

### Setup

1. Clone the repo
   ```sh
   git clone https://github.com/elfatairy/chick-check.git
   cd chick-check
   ```

2. Install dependencies
   ```sh
   npm install
   ```

3. Configure Firebase
   
   Create a `firebase.ts` file inside the `src` folder based on the example file:
   ```sh
   # Copy the example file
   cp src/firebase.ts.example src/firebase.ts
   ```
   
   Then edit `src/firebase.ts` and add your Firebase configuration:
   ```typescript
   import { initializeApp } from 'firebase/app';
   import { getFirestore } from 'firebase/firestore';
   import { getAuth } from 'firebase/auth';

   const firebaseConfig = {
     apiKey: "your_api_key",
     authDomain: "your_auth_domain",
     projectId: "your_project_id",
     storageBucket: "your_storage_bucket",
     messagingSenderId: "your_messaging_sender_id",
     appId: "your_app_id"
   };

   const app = initializeApp(firebaseConfig);
   export const db = getFirestore(app);
   export const auth = getAuth(app);
   ```

4. Start the Expo development server
   ```sh
   npx expo start
   ```
   
   Or if you have Expo CLI installed globally:
   ```sh
   expo start
   ```

5. Run the app
   - Scan the QR code with **Expo Go** (Android) or **Camera** app (iOS)
   - Press `a` for Android emulator
   - Press `i` for iOS simulator (macOS only)
   - Press `w` to run in web browser

## Arduino Setup

### Prerequisites
- Arduino IDE installed
- Arduino board (e.g., ESP32, ESP8266, Arduino Uno with WiFi module)
- Required sensors connected to the Arduino

### Setup

1. Open Arduino IDE

2. Install required libraries
   - Go to **Sketch → Include Library → Manage Libraries**
   - Install the following libraries:
     - WiFi (for ESP32/ESP8266) or WiFiNINA (for Arduino)
     - Firebase Arduino Client Library
     - DHT sensor library (if using DHT sensors)
     - Any other sensor-specific libraries

3. Open the Arduino sketch
   ```
   Open arduino/main/main.ino in Arduino IDE
   ```

4. Configure WiFi and Firebase credentials
   
   Edit the configuration section in the sketch:
   ```cpp
   // WiFi credentials
   const char* ssid = "your_wifi_ssid";
   const char* password = "your_wifi_password";
   
   // Firebase credentials
   #define FIREBASE_HOST "your_firebase_project.firebaseio.com"
   #define FIREBASE_AUTH "your_firebase_database_secret"
   ```

5. Select your board and port
   - **Tools → Board** → Select your Arduino board
   - **Tools → Port** → Select the COM port your Arduino is connected to

6. Upload the code to Arduino
   - Click the **Upload** button (→) or press `Ctrl+U`
   - Wait for the upload to complete

7. Open Serial Monitor
   - **Tools → Serial Monitor** (or press `Ctrl+Shift+M`)
   - Set baud rate to `115200`
   - Monitor the sensor data and connection status

### Change git remote (optional)
```sh
git remote set-url origin your_github_username/your_repo_name
git remote -v # confirm the changes
```

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Omar Hassan - [@omar_elfat76510](https://x.com/omar_elfat76510) - elfatairy@omarhassan.net

Project Link: [https://github.com/elfatairy/chick-check](https://github.com/elfatairy/chick-check)

Portfolio: [https://omarhassan.net](https://omarhassan.net)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/elfatairy/chick-check.svg?style=for-the-badge
[contributors-url]: https://github.com/elfatairy/chick-check/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/elfatairy/chick-check.svg?style=for-the-badge
[forks-url]: https://github.com/elfatairy/chick-check/network/members
[stars-shield]: https://img.shields.io/github/stars/elfatairy/chick-check.svg?style=for-the-badge
[stars-url]: https://github.com/elfatairy/chick-check/stargazers
[issues-shield]: https://img.shields.io/github/issues/elfatairy/chick-check.svg?style=for-the-badge
[issues-url]: https://github.com/elfatairy/chick-check/issues
[license-shield]: https://img.shields.io/github/license/elfatairy/chick-check.svg?style=for-the-badge
[license-url]: https://github.com/elfatairy/chick-check/blob/main/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/omar-hassan-81888320b/
[HTML5]: https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white
[HTML5-url]: https://developer.mozilla.org/en-US/docs/Web/HTML
[CSS3]: https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white
[CSS3-url]: https://developer.mozilla.org/en-US/docs/Web/CSS
[JavaScript]: https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black
[JavaScript-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[Expo]: https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white
[Expo-url]: https://expo.dev/
[React-Native]: https://img.shields.io/badge/React%20Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-Native-url]: https://reactnative.dev/
[Formik]: https://img.shields.io/badge/Formik-172B4D?style=for-the-badge&logo=formik&logoColor=white
[Formik-url]: https://formik.org/
[Yup]: https://img.shields.io/badge/Yup-2D3748?style=for-the-badge&logo=yup&logoColor=white
[Yup-url]: https://github.com/jquense/yup
[Arduino]: https://img.shields.io/badge/Arduino-00979D?style=for-the-badge&logo=arduino&logoColor=white
[Arduino-url]: https://www.arduino.cc/
[Node.js]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/
[Firebase]: https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black
[Firebase-url]: https://firebase.google.com/
[React-Router]: https://img.shields.io/badge/React%20Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white
[React-Router-url]: https://reactrouter.com/
[Three.js]: https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white
[Three-url]: https://threejs.org/
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Typescript.js]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=D9E8F5
[Typescript-url]: https://www.typescriptlang.org
[Supabase]: https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=ffffff
[Supabase-url]: https://supabase.com
[Tailwind]: https://img.shields.io/badge/Tailwind-3178C6?style=for-the-badge&logo=tailwindcss&logoColor=ffffff
[Tailwind-url]: https://tailwindcss.com
[Motion.dev]: https://img.shields.io/badge/motion-dev-black.svg?logo=data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDI0IDkiIHdpZHRoPSIyNCIgaGVpZ2h0PSI5Ij4NCiAgPHRpdGxlPk1vdGlvbjwvdGl0bGU+DQogIDxwYXRoIGZpbGw9IiNmZmY0MmIiDQogICAgZD0iTSA5LjA2MiAwIEwgNC4zMiA4Ljk5MiBMIDAgOC45OTIgTCAzLjcwMyAxLjk3MSBDIDQuMjc3IDAuODgyIDUuNzA5IDAgNi45MDIgMCBaIE0gMTkuNjU2IDIuMjQ4IEMgMTkuNjU2IDEuMDA2IDIwLjYyMyAwIDIxLjgxNiAwIEMgMjMuMDA5IDAgMjMuOTc2IDEuMDA2IDIzLjk3NiAyLjI0OCBDIDIzLjk3NiAzLjQ5IDIzLjAwOSA0LjQ5NiAyMS44MTYgNC40OTYgQyAyMC42MjMgNC40OTYgMTkuNjU2IDMuNDkgMTkuNjU2IDIuMjQ4IFogTSA5Ljg3MiAwIEwgMTQuMTkyIDAgTCA5LjQ1IDguOTkyIEwgNS4xMyA4Ljk5MiBaIE0gMTQuOTc0IDAgTCAxOS4yOTQgMCBMIDE1LjU5MiA3LjAyMSBDIDE1LjAxOCA4LjExIDEzLjU4NSA4Ljk5MiAxMi4zOTIgOC45OTIgTCAxMC4yMzIgOC45OTIgWiI+PC9wYXRoPg0KPC9zdmc+
[Motion-url]: https://motion.dev/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com
