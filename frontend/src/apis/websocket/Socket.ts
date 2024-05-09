import SockJS from 'sockjs-client';

export class Socket {
  private sock: WebSocket | null = null;

  public connect(url: string): void {
    if (!this.sock) {
      this.sock = new SockJS(url);

      this.sock.onopen = () => {
        console.log('WebSocket connected');
      };

      this.sock.onmessage = (event: MessageEvent) => {
        console.log('Received message:', event.data);
        this.handleMessage(event.data);
      };

      this.sock.onclose = () => {
        console.log('WebSocket is closed');
        this.sock = null;
      };

      this.sock.onerror = (error: Event) => {
        console.error('WebSocket error:', error);
      };
    }
  }

  public disconnect(): void {
    if (this.sock) {
      this.sock.close();
      this.sock = null;
    }
  }

  public sendMessage(message: string): void {
    if (this.sock && this.sock.readyState === SockJS.OPEN) {
      this.sock.send(message);
    }
  }

  private handleMessage(data: string): void {
    console.log('Processing message:', data);
  }
}
