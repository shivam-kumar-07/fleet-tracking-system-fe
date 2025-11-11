'use client';
import { io } from 'socket.io-client';
let socket: any;
export const getSocket = () => {
  if (!socket)
    socket = io(process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:3000', {
      transports: ['websocket'],
      path: '/socket.io/',
    });
  return socket;
};
