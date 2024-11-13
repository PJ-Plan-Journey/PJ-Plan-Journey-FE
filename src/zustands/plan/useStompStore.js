import { create } from 'zustand';
import { Client } from '@stomp/stompjs';

const useStompStore = create((set, get) => ({
  stompClient: null,
  connect: () => {
    const token = localStorage.getItem('accessToken');
    const client = new Client({
      brokerURL: import.meta.env.VITE_WEB_SOCKET_URL,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      debug: (str) => console.log('STOMP Debug:', str),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: (frame) => {
        console.log('STOMP Connected:', frame);
        set({ stompClient: client });
      },
      onStompError: (frame) => console.error('STOMP Error:', frame),
      onWebSocketClose: () => console.log('WebSocket Closed'),
    });

    client.activate();
  },
  disconnect: () => {
    const { stompClient } = get();
    if (stompClient) {
      stompClient.deactivate();
      set({ stompClient: null });
      console.log('STOMP Disconnected');
    } else {
      console.error('STOMP Client is not connected');
    }
  },
  subscribe: (destination, callback) => {
    const { stompClient } = get(); // 최신 상태를 가져옵니다.
    if (stompClient && stompClient.connected) {
      stompClient.subscribe(destination, (message) => {
        callback(message);
      });
    } else {
      console.error('STOMP Client is not connected');
    }
  },
  sendMessage: (destination, body) => {
    const { stompClient } = get();

    if (stompClient && stompClient.connected) {
      stompClient.publish({ destination, body });
    } else {
      console.error('STOMP Client is not connected');
    }
  },
}));

export default useStompStore;
