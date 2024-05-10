import { EventEmitter } from "events";
import Experience from "./Experience.js";
import GSAP from 'gsap';


export default class Preloader extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;
        this.world = this.experience.world;

        this.world.on('worldready', ()=>{
            this.playIntro();
        });
    }

    playIntro() {
        this.timeline = new GSAP.timeline();
        //this.timeline.to(".wrap", {
         //   x: "-10%",
         //   duration: 1,
         // });
          this.timeline.to(".preloader", {
            opacity: 0,
            duration: 3,
          });
          //this.timeline.fromTo(
         //   "nav",
          //  {
          //    opacity: 0,
          //  },
           // {
          //    opacity: 1,
           //   duration: 1,
           // },
          //  "-=2"
         // );
          
          this.timeline.fromTo(
            ".experience",
            {
              opacity: 0,
              y: -20,
            },
            {
              opacity: 1,
              duration: 1,
              y: 0,
            },
            "-=1.5"
          );
          this.timeline.to(".preloader", {
            scale: 0,
            duration: 1,
          });
        
        
    }
}

