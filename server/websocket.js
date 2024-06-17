const express = require('express'); 
const http = require('http'); 
const WebSocket = require('ws'); 

const app = express(); 
const server = http.createServer(app); 
const wsServer = new WebSocket.Server({ server }); 

let reactionCounts = {
    bullish: 15,
    bearish: 13
};

let clientVotes = new Map(); // Track votes by clients

wsServer.on('connection', (ws) => {
    // Send initial counts to new connection
    ws.send(JSON.stringify(reactionCounts));

    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            if (!clientVotes.has(ws)) {
                if (data.reaction === 'bullish') {
                    reactionCounts.bullish += 1;
                    clientVotes.set(ws, 'bullish');
                } else if (data.reaction === 'bearish') {
                    reactionCounts.bearish += 1;
                    clientVotes.set(ws, 'bearish');
                }

                // Broadcast updated counts to all clients
                wsServer.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify(reactionCounts));
                    }
                });
            }
        } catch (error) {
            console.error("Error processing message: ", error);
        }
    });

    ws.on('error', (error) => {
        console.error("WebSocket error: ", error);
    });

    ws.on('close', () => {
        console.log("Client disconnected");
        // Remove the client's vote when they disconnect
        if (clientVotes.has(ws)) {
            const vote = clientVotes.get(ws);
            if (vote === 'bullish') {
                reactionCounts.bullish -= 1;
            } else if (vote === 'bearish') {
                reactionCounts.bearish -= 1;
            }
            clientVotes.delete(ws);
        }
    });
});

server.listen(8080, () => {
    console.log("Server currently listens to port 8080");
});
