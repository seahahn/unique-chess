import { WebSocketServer } from 'ws';
import { verify } from 'jsonwebtoken';
import { prisma } from '@unique-chess/database';

// Load environment variables
const PORT = process.env.PORT || 8080;
const JWT_SECRET = process.env.JWT_SECRET || 'development-secret';

// Create WebSocket server
const wss = new WebSocketServer({ port: Number(PORT) });

console.log(`WebSocket server is running on port ${PORT}`);

// Connection tracking
const clients = new Map();
const gameRooms = new Map();

// Handle new connections
wss.on('connection', (ws, req) => {
  console.log('New client connected');

  // Generate a unique client ID
  const clientId = Math.random().toString(36).substring(2, 15);
  clients.set(ws, { id: clientId });

  // Send welcome message
  ws.send(JSON.stringify({
    type: 'connection',
    message: 'Connected to Unique Chess WebSocket server',
    clientId
  }));

  // Handle incoming messages
  ws.on('message', async (message) => {
    try {
      const data = JSON.parse(message.toString());
      console.log('Received message:', data);

      // Handle authentication
      if (data.type === 'authenticate') {
        try {
          // Verify JWT token
          const token = data.token;
          const decoded = verify(token, JWT_SECRET);

          // Update client with user info
          clients.set(ws, {
            id: clientId,
            userId: decoded.sub,
            authenticated: true
          });

          ws.send(JSON.stringify({
            type: 'authentication_result',
            success: true,
            message: 'Authentication successful'
          }));

          console.log(`Client ${clientId} authenticated as user ${decoded.sub}`);
        } catch (error) {
          ws.send(JSON.stringify({
            type: 'authentication_result',
            success: false,
            message: 'Authentication failed'
          }));
          console.error('Authentication error:', error);
        }
      }

      // Handle joining a game room
      else if (data.type === 'join_game') {
        const gameId = data.gameId;
        const client = clients.get(ws);

        // Check if authenticated
        if (!client.authenticated) {
          ws.send(JSON.stringify({
            type: 'error',
            message: 'Authentication required to join a game'
          }));
          return;
        }

        // Add client to game room
        if (!gameRooms.has(gameId)) {
          gameRooms.set(gameId, new Set());
        }

        gameRooms.get(gameId).add(ws);
        clients.get(ws).gameId = gameId;

        ws.send(JSON.stringify({
          type: 'game_joined',
          gameId,
          message: `Joined game ${gameId}`
        }));

        // Broadcast to other clients in the room
        broadcastToRoom(gameId, {
          type: 'player_joined',
          gameId,
          playerId: client.userId
        }, ws);

        console.log(`Client ${clientId} joined game ${gameId}`);
      }

      // Handle game moves
      else if (data.type === 'make_move') {
        const client = clients.get(ws);
        const gameId = client.gameId;

        // Check if in a game
        if (!gameId) {
          ws.send(JSON.stringify({
            type: 'error',
            message: 'Not in a game'
          }));
          return;
        }

        // TODO: Validate move with chess engine
        // TODO: Update game state in database

        // Broadcast move to all clients in the room
        broadcastToRoom(gameId, {
          type: 'move_made',
          gameId,
          move: data.move,
          playerId: client.userId
        });

        console.log(`Move in game ${gameId} by player ${client.userId}: ${data.move}`);
      }

      // Handle chat messages
      else if (data.type === 'chat_message') {
        const client = clients.get(ws);
        const gameId = client.gameId;

        // Check if in a game
        if (!gameId) {
          ws.send(JSON.stringify({
            type: 'error',
            message: 'Not in a game'
          }));
          return;
        }

        // TODO: Store chat message in database

        // Broadcast chat message to all clients in the room
        broadcastToRoom(gameId, {
          type: 'chat_message',
          gameId,
          message: data.message,
          senderId: client.userId,
          timestamp: new Date().toISOString()
        });

        console.log(`Chat in game ${gameId} from ${client.userId}: ${data.message}`);
      }

    } catch (error) {
      console.error('Error processing message:', error);
      ws.send(JSON.stringify({
        type: 'error',
        message: 'Invalid message format'
      }));
    }
  });

  // Handle disconnection
  ws.on('close', () => {
    const client = clients.get(ws);
    console.log(`Client ${client.id} disconnected`);

    // Remove from game room if in one
    if (client.gameId && gameRooms.has(client.gameId)) {
      const room = gameRooms.get(client.gameId);
      room.delete(ws);

      // Broadcast disconnect to room
      if (client.userId) {
        broadcastToRoom(client.gameId, {
          type: 'player_left',
          gameId: client.gameId,
          playerId: client.userId
        });
      }

      // Clean up empty rooms
      if (room.size === 0) {
        gameRooms.delete(client.gameId);
        console.log(`Game room ${client.gameId} removed (empty)`);
      }
    }

    // Remove client from tracking
    clients.delete(ws);
  });
});

// Utility function to broadcast to all clients in a game room
function broadcastToRoom(gameId: string, message: any, excludeClient?: WebSocket) {
  if (!gameRooms.has(gameId)) return;

  const room = gameRooms.get(gameId);
  const messageStr = JSON.stringify(message);

  room.forEach(client => {
    if (client !== excludeClient && client.readyState === 1) {
      client.send(messageStr);
    }
  });
}

// Handle process termination
process.on('SIGINT', () => {
  wss.close();
  console.log('WebSocket server shut down');
  process.exit(0);
});