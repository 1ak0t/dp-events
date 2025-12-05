import {Expose} from "class-transformer";

export class UploadRegisterImageRdo {
    @Expose()
    public registerImage: string;
}