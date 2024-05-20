import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

export class Socket {
  private sock: WebSocket | null = null;
  private stompClient: Stomp.Client | null = null;
  private messageCallback: ((data: string) => void) | null = null;
  public connected: boolean = false;

  public connect(url: string, partyId: number, jwtToken: number | null): void {
    if (!this.sock) {
      this.sock = new SockJS(url);
      this.stompClient = Stomp.over(this.sock);

      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };

      this.stompClient.connect(
        headers,
        (frame) => {
          this.connected = true;
          console.log('Connected: ' + frame);

          // 채팅을 수신할 구독 설정
          this.stompClient?.subscribe(`/sub/chat/${partyId}`, (message) => {
            console.log('Received message:', message.body);
            this.handleMessage(message.body);
          });
        },
        (error) => {
          console.error('WebSocket error:', error);
        },
      );
    }
  }

  public disconnect(): void {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.disconnect(() => {
        this.connected = false;
        console.log('WebSocket is closed');
        this.sock = null;
        this.stompClient = null;
      });
    } else {
      console.log('WebSocket is not connected');
    }
  }

  public sendMessage(partyId: number, message: string): void {
    if (this.stompClient && this.stompClient.connected) {
      console.log(`Sending message to /pub/chat/${partyId}`);
      this.stompClient.send(
        `/pub/chat/${partyId}`,
        {},
        JSON.stringify({ contents: message }),
      );
    } else {
      console.error('WebSocket is not connected');
    }
  }

  public onMessage(callback: (data: string) => void): void {
    this.messageCallback = callback;
  }

  private handleMessage(data: string): void {
    console.log('Processing message:', data);
    if (this.messageCallback) {
      this.messageCallback(data);
    }
  }
}
