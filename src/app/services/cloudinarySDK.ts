import { Cloudinary } from '@cloudinary/url-gen';
import cloudinaryConfig from '../configs/cloudinaryConfig';

export default class CloudinaryManager {
    private readonly cld: Cloudinary;

    constructor() {
        this.cld = new Cloudinary({
            cloud: cloudinaryConfig,
            url: {
                secure: true,
            },
        });
    }

    public getVideoUrl(name: string): string {
        const currName = name.replace(/\s/gm, '_');
        const video = this.cld.video(`fitOn-clone/${currName}`);

        return video.toURL();
    }
}
