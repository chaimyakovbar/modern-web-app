import config from '../config/config';

class CICDWebSocketService {
    constructor() {
        this.ws = null;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = config.backend.websocket.reconnectAttempts;
        this.reconnectInterval = config.backend.websocket.reconnectInterval;
        this.onStatusUpdate = null;
        this.onConnectionChange = null;
        this.isConnecting = false;
        this.pendingMessage = null; // Message waiting for connection
        this.websocketUrl = config.backend.websocketUrl;
    }

    // Connect to WebSocket
    connect(url = null) {
        // Use provided URL or default from config
        const wsUrl = url || this.websocketUrl;
        if (this.isConnecting || (this.ws && this.ws.readyState === WebSocket.OPEN)) {
            console.log('WebSocket already connected or connecting');
            return;
        }

        this.isConnecting = true;
        console.log(`🔌 Connecting to WebSocket: ${wsUrl}`);
        console.log(`   Config: maxAttempts=${this.maxReconnectAttempts}, interval=${this.reconnectInterval}ms`);

        try {
            this.ws = new WebSocket(wsUrl);

            this.ws.onopen = () => {
                console.log('✅ WebSocket connected successfully');
                this.isConnecting = false;
                this.reconnectAttempts = 0;
                if (this.onConnectionChange) {
                    this.onConnectionChange(true);
                }
                // שליחת הודעה ממתינה אם יש אחת
                this._sendPendingMessage();
            };

            this.ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    console.log('Received from backend:', data);

                    // אם זה הודעת סטטוס - מספר פורמטים אפשריים
                    if (data.type === 'statusUpdate' || data.statuses || Array.isArray(data)) {
                        let statuses = [];

                        // אם זה מערך ישירות
                        if (Array.isArray(data)) {
                            statuses = data;
                        }
                        // אם יש statuses בתוך האובייקט
                        else if (data.statuses && Array.isArray(data.statuses)) {
                            statuses = data.statuses;
                        }
                        // אם זה אובייקט בודד עם status
                        else if (data.status || data.name) {
                            statuses = [data];
                        }
                        // אם זה אובייקט עם type: statusUpdate
                        else if (data.type === 'statusUpdate' && data.data) {
                            statuses = Array.isArray(data.data) ? data.data : [data.data];
                        }

                        if (statuses.length > 0 && this.onStatusUpdate) {
                            this.onStatusUpdate(statuses);
                        }
                    }
                } catch (error) {
                    console.error('Error parsing WebSocket message:', error);
                }
            };

            this.ws.onerror = (error) => {
                console.error('❌ WebSocket error:', error);
                console.error('WebSocket URL:', wsUrl);
                console.error('Ready state:', this.ws?.readyState);
                this.isConnecting = false;
                if (this.onConnectionChange) {
                    this.onConnectionChange(false);
                }
            };

            this.ws.onclose = (event) => {
                console.log('🔌 WebSocket disconnected', {
                    code: event.code,
                    reason: event.reason,
                    wasClean: event.wasClean
                });
                this.isConnecting = false;
                if (this.onConnectionChange) {
                    this.onConnectionChange(false);
                }
                // Clear pending message when connection closes
                this.pendingMessage = null;
                this.attemptReconnect(wsUrl);
            };
        } catch (error) {
            console.error('WebSocket connection error:', error);
            this.isConnecting = false;
            this.attemptReconnect(wsUrl);
        }
    }

    // Attempt to reconnect
    attemptReconnect(url = null) {
        const wsUrl = url || this.websocketUrl;
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            console.log(`🔄 Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
            setTimeout(() => {
                this.connect(wsUrl);
            }, this.reconnectInterval);
        } else {
            console.error('Max reconnection attempts reached');
        }
    }

    // שליחת דרישת הרצה לבק
    sendRunRequest(runData) {
        // אם החיבור לא פעיל, נסה להתחבר מחדש
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
            console.warn('WebSocket is not connected. Attempting to connect...');

            // אם זה לא בתהליך חיבור, נסה להתחבר
            if (!this.isConnecting && (!this.ws || this.ws.readyState === WebSocket.CLOSED)) {
                this.connect();
            }

            // שמור את ההודעה לשליחה אחרי החיבור
            if (!this.pendingMessage) {
                this.pendingMessage = runData;

                // נסה לשלוח אחרי המתנה קצרה (אם החיבור יצליח)
                setTimeout(() => {
                    if (this.ws && this.ws.readyState === WebSocket.OPEN && this.pendingMessage) {
                        this._sendPendingMessage();
                    } else {
                        console.error('Failed to connect or timeout. Cannot send run request.');
                        this.pendingMessage = null;
                    }
                }, 2000);
            }

            return false;
        }

        return this._sendMessage(runData);
    }

    // פונקציה פרטית לשליחת הודעה
    _sendMessage(runData) {
        try {
            const message = JSON.stringify({
                type: 'runRequest',
                data: runData
            });

            console.log('Sending run request to backend:', runData);
            this.ws.send(message);
            return true;
        } catch (error) {
            console.error('Error sending run request:', error);
            return false;
        }
    }

    // פונקציה לשליחת הודעה ממתינה
    _sendPendingMessage() {
        if (this.pendingMessage && this.ws && this.ws.readyState === WebSocket.OPEN) {
            console.log('Sending pending message after reconnection');
            this._sendMessage(this.pendingMessage);
            this.pendingMessage = null;
        }
    }

    // הגדרת callback לקבלת עדכוני סטטוס
    setStatusUpdateCallback(callback) {
        this.onStatusUpdate = callback;
    }

    // הגדרת callback לשינוי מצב חיבור
    setConnectionChangeCallback(callback) {
        this.onConnectionChange = callback;
    }

    // סגירת החיבור
    disconnect() {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
        this.reconnectAttempts = this.maxReconnectAttempts; // למנוע חיבור מחדש
    }

    // בדיקה אם החיבור פעיל
    isConnected() {
        return this.ws && this.ws.readyState === WebSocket.OPEN;
    }
}

// יצירת instance יחיד (Singleton)
const cicdWebSocketService = new CICDWebSocketService();

export default cicdWebSocketService;

