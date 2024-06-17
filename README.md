# KrypBiT

KrypBiT is a responsive web application for tracking Bitcoin prices and news. It is designed to adapt and provide an optimal viewing experience on a variety of devices, from desktop computers to mobile phones.

## 🌟 Features

- **Responsive Design**: The website is designed to adapt to any device screen size, providing an optimal viewing and interaction experience across a wide range of devices.

- **Navigation Bar**: Contains links to different sections of the website. Includes a hamburger menu for smaller screen sizes.

- **Landing Section**: Contains a header with a brief description of the website and two buttons that link to the Bitcoin chart and news sections.

- **Bitcoin Chart Section**: Displays a Bitcoin chart and some information about Bitcoin. Includes a user reaction feature where users can express their sentiment about Bitcoin. The chart is updated in real-time using a WebSocket connection with Binance's streaming API.

- **Bitcoin News Section**: Intended to display news related to Bitcoin. The news content is dynamically populated using JavaScript. News articles are fetched from the NewsAPI and displayed on the webpage when it loads.

- **User Reactions**: Users can express their sentiment about Bitcoin by clicking on the 'bullish' or 'bearish' buttons. The total count of each reaction is displayed on the webpage and updated in real-time using a WebSocket connection with a local server.

- **Footer**: Contains links to different sections of the website and copyright information.

## 💻 Installation

To install the necessary packages, navigate to the server directory and run the following commands:

```bash
cd server
npm install ws
npm install http
npm install express
```

# 🌐 APIs Used

This application uses the following APIs:

- **Crypto News API**: This API is used to fetch the latest Bitcoin-related news articles. [Crypto news website](https://newsdata.io/crypto-news-api)

- **Binance API**: This API is used to get real-time Bitcoin price updates. [Binance Website](https://www.binance.com/en/binance-api)

- **Google Fonts API**: This API is used to apply custom fonts to the website. [Google Font Website](https://fonts.google.com/)

## 🚀 Running the Application

Follow these steps to run the application:

1. Open your terminal.

2. Navigate to the server directory by typing the following command and pressing Enter:

    ```bash
    cd server
    ```

3. Start the WebSocket server by typing the following command and pressing Enter:

    ```bash
    node websocket.js
    ```

4. After starting the WebSocket server, locate the `index.html` file in your project directory.

5. To view the application in your browser, you'll need to use a live server. If you're using Visual Studio Code, you can install the "Live Server" extension. Once installed, right-click on the `index.html` file and select "Open with Live Server".
