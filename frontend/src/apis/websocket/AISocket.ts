import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

interface StatusMessage {
  memberId: number;
}

type MessageCallback = (data: StatusMessage) => void;

export class WarningSocket {
  private sock: WebSocket | null = null;
  private stompClient: Stomp.Client | null = null;
  private messageCallback: MessageCallback | null = null;
  public connected: boolean = false;
  private readonly partyId: number;
  private readonly memberId: number | null;

  constructor(memberId: number | null, partyId: number) {
    this.memberId = memberId;
    this.partyId = partyId;
  }

  public connect(url: string, jwtToken: number | null): void {
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

          // 구독 설정
          this.stompClient?.subscribe(
            `/sub/warning/${this.partyId}`,
            (message) => {
              console.log('Received message:', message.body);
              const parsedData: StatusMessage = JSON.parse(message.body);
              this.handleMessage(parsedData);
            },
          );
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

  public sendWarning(): void {
    if (
      this.stompClient &&
      this.stompClient.connected &&
      this.memberId !== null
    ) {
      const messageBody = JSON.stringify({ memberId: this.memberId });
      console.log('Publishing warning with body:', messageBody);
      this.stompClient.send(`/pub/warning/${this.partyId}`, {}, messageBody);
    } else {
      console.error('WebSocket is not connected or memberId is null');
    }
  }

  public onMessage(callback: MessageCallback): void {
    this.messageCallback = callback;
  }

  private handleMessage(data: StatusMessage): void {
    console.log('Processing message:', data);
    if (this.messageCallback) {
      this.messageCallback(data);
    }
  }
}
