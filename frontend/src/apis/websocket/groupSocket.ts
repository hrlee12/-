import SockJS from 'sockjs-client';

interface StatusMessage {
  userId: number;
  status: string;
}

export class GroupSocket {
  private sock: WebSocket | null = null;
  private messageCallback: ((data: StatusMessage[]) => void) | null = null;
  public connected: boolean = false;
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private readonly memberId: number | null;
  private readonly partyId: number;

  constructor(memberId: number | null, partyId: number) {
    this.memberId = memberId;
    this.partyId = partyId;
  }

  public connect(): void {
    const url = `https://mogaknyang-back.duckdns.org/status?memberId=${this.memberId}&partyId=${this.partyId}`;

    if (!this.sock) {
      this.sock = new SockJS(url);

      this.sock.onopen = () => {
        this.connected = true;
        console.log('WebSocket connected');
      };

      this.sock.onmessage = (event) => {
        const messageBody = event.data;
        console.log('Received message:', messageBody);
        if (messageBody === 'ping') {
          this.sendPong();
        } else {
          const parsedData = JSON.parse(messageBody);
          const statusMessages: StatusMessage[] = Object.entries(
            parsedData,
          ).map(([userId, status]) => ({
            userId: Number(userId),
            status: status as string,
          }));
          this.handleMessage(statusMessages);
        }
      };

      this.sock.onclose = () => {
        console.log('WebSocket is closed');
        this.connected = false;
        this.reconnect(); // 연결이 끊어지면 재연결 시도
      };

      this.sock.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.reconnect(); // 오류가 발생해도 재연결 시도
      };
    }
  }

  public disconnect(): void {
    if (this.sock && this.connected) {
      this.sock.close();
      this.connected = false;
      console.log('WebSocket is closed');
      this.sock = null;
      if (this.reconnectTimeout) {
        clearTimeout(this.reconnectTimeout);
      }
    } else {
      console.log('WebSocket is not connected');
    }
  }

  private sendPong(): void {
    if (this.sock && this.connected) {
      this.sock.send('pong');
    } else {
      console.error('WebSocket is not connected');
    }
  }

  private reconnect(): void {
    if (!this.connected) {
      console.log('Attempting to reconnect...');
      this.reconnectTimeout = setTimeout(() => this.connect(), 5000); // 5초 후 재연결 시도
    }
  }

  public onMessage(callback: (data: StatusMessage[]) => void): void {
    this.messageCallback = callback;
  }

  private handleMessage(data: StatusMessage[]): void {
    console.log('Processing message:', data);
    if (this.messageCallback) {
      this.messageCallback(data);
    }
  }
}
