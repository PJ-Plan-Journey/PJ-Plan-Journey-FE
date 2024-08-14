import { Client } from '@stomp/stompjs';

const useStomp = () => {
  const [stompClient, setStompClient] = useState(null);

  const connect = () => {
    const token = localStorage.getItem('accessToken');
    const client = new Client({
      brokerURL: import.meta.env.VITE_WEB_SOCKET_URL,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      debug: (str) => console.log('웹소켓 디버그:', str),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: (frame) => {
        console.log('웹소켓 연결 성공:', frame);
        setStompClient(client);
      },
      onStompError: (error) => console.error('웹소켓 에러발생:', error),

      onWebSocketClose: () => {
        setStompClient(null);
        console.log('웹소켓 연결해제');
      },
    });

    client.activate();
  };

  const disconnect = () => {
    if (stompClient) {
      stompClient.deactivate();
      setStompClient(null);
      console.log('웹소켓 연결해제');
    } else {
      console.error('연결이 되어 있지 않음');
    }
  };

  const subscribe = (destination, callback) => {
    if (stompClient && stompClient.connected) {
      stompClient.subscribe(destination, (message) => callback(message));
    } else {
      console.error('연결이 되어 있지 않음');
    }
  };

  const sendMessage = (destination, body) => {
    if (stompClient && stompClient.connected) {
      stompClient.publish({ destination, body });
    } else {
      console.error('연결이 되어 있지 않음');
    }
  };

  return { stompClient, connect, disconnect, subscribe, sendMessage };
};

export default useStomp;
