import nats, {Stan} from 'node-nats-streaming';


class NatsWrapper {
    // `by adding ?` telling  typescript this error will be defined later.
    private _client?: Stan;

    connect(clusterId: string, clientId:string, url:string) {
        this._client = nats.connect(clusterId, clientId, {url});
    
        return new Promise <void> ((resolve, reject) => {
            this._client!.on('connect', () => {
                // this function is invoked when nats connects successfully
                console.log('Connected to NATS');
                resolve();
            });

            this._client!.on('error', (err) => {
                reject(err);
            });
        });

    }
}


export const natsWrapper = new NatsWrapper();