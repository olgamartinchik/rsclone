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
        let currName = name.replace(/[\(\)&,]/, '');
        currName = currName.replace(/\s|'/gm, '_');
        const video = this.cld.video(`fitOn-clone/${currName}`);

        return video.toURL();
    }
}

//replace 
//  THIS{
    //     "title": "This Killer Workout Torches Calories",
    //     "description": "It's time to break a sweat! This 45-minute workout from celebrity trainer Jeanette Jenkins, who trains Pink and Alicia Keys, will help you burn up to 500 calories. How, you might ask? Because Jeanette keeps you moving the entire time!",
    //     "equipment": "none",
    //     "type": "cardio",
    //     "intensity": "high",
    //     "duration": 2753,
    //     "caloriesPerMinute": 0.1,
    //     "link": "https://www.youtube.com/embed/_Zem0_qsDg0",
    //     "img": "09"
    // },
    //TO THIS
    //{
    //     "title": "30-Minute No-Equipment Cardio and Core Workout",
    //     "description": "Get ready to tone your core with this no-equipment workout from the inspiring Massy Arias. This workout is perfect for all fitness levels and includes moves like dead bug, Superman, and bicycle crunches that will set your abs on fire!",
    //     "equipment": "none",
    //     "type": "cardio",
    //     "intensity": "high",
    //     "duration": 1803,
    //     "caloriesPerMinute": 0.1,
    //     "link": "https://www.youtube.com/embed/05fCNM9f0ic",
    //     "img": "09"
    // },

    //THIS
    // {
    //     "title": "Burn Calories in 30 Minutes Latin Dance Workout",
    //     "description": "Torch calories and have a blast with Equinox Zumba instructor, Nicole Steen.",
    //     "equipment": "none",
    //     "type": "dance",
    //     "intensity": "high",
    //     "duration": 1850,
    //     "caloriesPerMinute": 0.1666,
    //     "link": "https://www.youtube.com/embed/K9rLuxwTWlY",
    //     "img": "26"
    // },

    //TO THIS
    // {
    //     "title": "30-Minute Tabata Session",
    //     "description": "This calorie-torching cardio and sculpting workout is one of our hardest ever, but Equinox Tabata instructor Raneir Pollard's amazing energy will inspire you to fight for it. Tabata is a form of HIIT (high intensity interval training) that alternates between 20 seconds of intense bursts of work and 10 seconds of rest in four-minute rounds. You don't need any equipment for the workout, but do grab a towel and a bottle of water — you're going to need both.",
    //     "equipment": "none",
    //     "type": "dance",
    //     "intensity": "high",
    //     "duration": 1878,
    //     "caloriesPerMinute": 0.1666,
    //     "link": "https://www.youtube.com/embed/XIeCMhNWFQQ",
    //     "img": "26"
    // },
//update 
// {
//         "title": "35-Minute Full-Body Kickboxing Workout With Christa DiPaolo",
//         "description": "Are you ready for a knockout kickboxing workout? Join Christa DiPaolo, creator of the Boxing & Bubbles Online Fitness Community, for 35-minutes of non-stop movement. You'll power through 5 rounds of Christa's signature combos that will leave you strong and sweaty.",
//         "equipment": "none",
//         "type": "boxing",
//         "intensity": "medium",
//         "duration": 1939,
//         "caloriesPerMinute": 0.0633,
//         "link": "https://www.youtube.com/embed/uRZVnIEDK-Q",
//         "img": "20"
//     },
