const conn = new WebSocket('ws://localhost:8080'); // Update to 'wss://localhost:8080' if using HTTPS
let binanceWebSocket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');

let stockPriceElement = document.getElementById('coin__price');
let cryptoPriceElement = document.getElementById('price__btc');
let cryptoNameElement = document.getElementById('coin__name');

let lastPrice = null;
let hasVoted = false; // Track if the user has voted

// WEBSOCKET API TO ACCESS BITCOIN'S PRICE ON BINANCE
binanceWebSocket.onmessage = (event) => {
    let stockObject = JSON.parse(event.data);
    console.log(event.data);

    let price = parseFloat(stockObject.p).toFixed(2);

    stockPriceElement.innerText = price;
    stockPriceElement.style.color = !lastPrice || lastPrice === price ? '#f9a826' : price > lastPrice ? 'green' : 'red';

    stockPriceElement.innerHTML = '$ ' + stockPriceElement.innerText;

    lastPrice = price;

    let cryptoCoin = stockObject.s;

    cryptoNameElement.innerText = cryptoCoin;

    cryptoPriceElement.innerText = stockPriceElement.innerText;
}

// WIDGET TO DISPLAY BITCOIN CHART FROM TRADINGVIEW.COM
new TradingView.widget({
    "autosize": true,
    "symbol": "BINANCE:BTCUSDT",
    "interval": "240",
    "timezzone": "Etc/Utc",
    "theme": "dark",
    "style": "1",
    "locale": "en",
    "toolbar_bg": "#f1f3f6",
    "enable_publishing": true,
    "withdateranges": false,
    "hide_side_toolbar": false,
    "allow_symbol_change": true,
    "watchlist": [
        "BINANCE: BTCUSDT",
        "BINANCE:ETHUSDT"
    ],
    "details": true,
    "hotlist": true,
    "calendar": true,
    "studies": [
        "STD;SMA"
    ],
    "container_id": "chart",
    "show_popup_button": true,
    "popup_width": "1000",
    "popup_height": "650"
});

// API TO ACCESS BITCOIN NEWS FROM NEWSAPI.ORG
const apikey = 'ff33a8e2ddb5499ebd0cacc9816a606c';

const newsContainer = document.getElementById('newsContainer');

async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=bitcoin&pageSize=6&apikey=${apikey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching random news", error);
        return [];
    }
}

function truncateText(text, wordLimit) {
    const words = text.split(' ');
    if (words.length > wordLimit) {
        return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
}

function displayBlogs(articles) {
    newsContainer.innerHTML = "";
    articles.forEach((article) => {
        const news__wrap = document.createElement('div');
        news__wrap.classList.add("news__wrap");

        const news__description = document.createElement('div');
        news__description.classList.add("news__description");

        const news__img__wrapper = document.createElement('figure');
        news__img__wrapper.classList.add("news__img--wrapper");

        const img = document.createElement('img');
        img.classList.add("news__img");
        img.src = article.urlToImage;
        img.alt = article.title;

        const title = document.createElement("div");
        title.classList.add("news-t");
        title.textContent = article.title;

        const description = document.createElement('p');
        description.classList.add("news-p");
        description.textContent = truncateText(article.description, 20);

        news__description.appendChild(title);
        news__description.appendChild(description);
        news__img__wrapper.appendChild(img);
        news__wrap.appendChild(news__description);
        news__wrap.appendChild(news__img__wrapper);
        newsContainer.appendChild(news__wrap);
    });
}

(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch (error) {
        console.error("Error fetching random news", error);
    }
})();

// USER REACTIONS 
let bullishReacts = document.getElementById('bullish__reacts'); 
let bearishReacts = document.getElementById('bearish__reacts'); 

document.getElementById('bullish').addEventListener('click', () => {
    if (!hasVoted) {
        let currentCountBull = parseInt(bullishReacts.innerText); 
        bullishReacts.innerText = currentCountBull + 1 + ' Likes';
        conn.send(JSON.stringify({ reaction: 'bullish', count: currentCountBull + 1 })); 
        hasVoted = true; // Set vote status to true
    }
}); 

document.getElementById('bearish').addEventListener('click', () => {
    if (!hasVoted) {
        let currentCountBear = parseInt(bearishReacts.innerText); 
        bearishReacts.innerText = currentCountBear + 1 + ' DisLikes';
        conn.send(JSON.stringify({ reaction: 'bearish', count: currentCountBear + 1 })); 
        hasVoted = true; // Set vote status to true
    }
}); 

// WEBSOCKET MESSAGE HANDLER FOR UPDATES
conn.onmessage = (event) => {
    const message = JSON.parse(event.data); 
    if (message.bullish !== undefined) {
        bullishReacts.innerText = message.bullish + ' Likes';
    }
    if (message.bearish !== undefined) {
        bearishReacts.innerText = message.bearish + ' DisLikes';
    }
}

conn.onerror = (error) => {
    console.error("WebSocket error: ", error);
};

conn.onclose = () => {
    console.log("WebSocket connection closed");
};
