import {Expose} from "class-transformer";
export class SubscribeRdo {
    @Expose()
    public endpoint: string;

    @Expose()
    public expirationTime: string;

    @Expose()
    public auth: string;

    @Expose()
    public p256dh: string;
}