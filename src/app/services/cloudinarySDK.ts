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
        let currName = name.replace(/[()&,]/, '');
        currName = currName.replace(/\s{1,2}|'/gm, '_');
        console.log(currName);

        const video = this.cld.video(`fitOn-clone/${currName}`);

        return video.toURL();
    }

    public getImageUrl(id: string, name: string): string {
        // let currName = name.replace(/[()&,]/, '');
        // currName = currName.replace(/\s{1,2}|'/gm, '_');
        console.log(name);

        const image = this.cld.video(`fitOn-clone/avatar/${id}/${name}`);
        console.log(image.toURL());
        return image.toURL();
    }
}
