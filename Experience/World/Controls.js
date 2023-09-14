import * as THREE from 'three';

import Experience from "../Experience.js";
import GSAP from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
import ASScroll from '@ashthornton/asscroll'

export default class Controls{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;
        this.room.children.forEach((child) => {
            if(child.name === "screen") {
                this.screen = child;
            }
            if(child.name === "luckycat") {
                this.luckycat = child;
            }
        });
        this.progress = 0;
        this.dummyCurve = new THREE.Vector3(0, 0, 0);
        GSAP.registerPlugin(ScrollTrigger);

        this.setSmoothScroll();
        this.setScrollTrigger();
    }

    setupASScroll() {
        // https://github.com/ashthornton/asscroll
        const asscroll = new ASScroll({
            ease: 0.1,
            disableRaf: true,
        });

        GSAP.ticker.add(asscroll.update);

        ScrollTrigger.defaults({
            scroller: asscroll.containerElement,
        });

        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
            scrollTop(value) {
                if (arguments.length) {
                    asscroll.currentPos = value;
                    return;
                }
                return asscroll.currentPos;
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
            },
            fixedMarkers: true,
        });

        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", asscroll.resize);

        requestAnimationFrame(() => {
            asscroll.enable({
                newScrollElements: document.querySelectorAll(
                    ".gsap-marker-start, .gsap-marker-end, [asscroll]"
                ),
            });
        });
        return asscroll;
    }

    setSmoothScroll(){
        this.asscroll = this.setupASScroll();
    }

    setScrollTrigger(){
        ScrollTrigger.matchMedia({
            // Desktop mode
            "(min-width: 969px)": () => {
                this.firstMoveTimeline = new GSAP.timeline({ 
                    scrollTrigger:{
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 2,
                        invalidateOnRefresh: true,
                    }
                 });
                 this.firstMoveTimeline.to(this.camera.perspectiveCamera.position, {
                    x: () => {
                        return this.sizes.width * 0.000410417;
                    },//0.788,
                    y: () => {
                        return this.sizes.height * -0.00025;
                    },
                    //-0.27,
                    z: 4,
                 },"samea"
                 );
                 this.firstMoveTimeline.to(this.camera.perspectiveCamera.rotation, {
                    y: () => {
                        return this.sizes.height * -0.00025;
                    },
                    //-0.27,
                 },"samea"
                 );

                 this.secondMoveTimeline = new GSAP.timeline({ 
                    scrollTrigger:{
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 2,
                        invalidateOnRefresh: true,
                    }
                 });
                 this.secondMoveTimeline.to(this.camera.perspectiveCamera.position, {
                    x: 3,
                    y: () => {
                        return -0.3;
                    },
                    z: 4 ,
                 },"sameb"
                 );
                 this.secondMoveTimeline.to(this.camera.perspectiveCamera.rotation, {
                    x: -0.27,
                    y: -0.5,
                    z: -0.16,
                 }, "sameb"
                 );

                 this.thirdMoveTimeline = new GSAP.timeline({ 
                    scrollTrigger:{
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 2,
                        invalidateOnRefresh: true,
                    }
                 });
                 this.thirdMoveTimeline.to(this.camera.perspectiveCamera.position, {
                    y: 5,
                    z: 7,
                 },"samec"
                 );
                 this.thirdMoveTimeline.to(this.camera.perspectiveCamera.rotation, {
                    x: 0,
                    y: 0,
                    z: 0,
                 }, "samec"
                 );

                 this.fourthMoveTimeline = new GSAP.timeline({ 
                    scrollTrigger:{
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 7,
                        invalidateOnRefresh: true,
                    }
                 });
                 this.fourthMoveTimeline.to(this.luckycat.position, {
                    x: -3.2,
                    y: 4.8,
                    z: 1.8
                 },"samed" 
                 );
                 this.fourthMoveTimeline.to(this.luckycat.rotation, {
                    x: 0.1,
                    z: 0.2,
                 },  "samed"
                 );
            },
            // Mobile mode
            "(max-width: 968px)": () => {
                this.firstMoveTimeline = new GSAP.timeline({ 
                    scrollTrigger:{
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                 });
                 this.firstMoveTimeline.to(this.camera.perspectiveCamera.position, {
                    x: 3,
                 },
                 );
                 this.secondMoveTimeline = new GSAP.timeline({ 
                    scrollTrigger:{
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 2,
                        invalidateOnRefresh: true,
                    }
                 });
                 this.secondMoveTimeline.to(this.camera.perspectiveCamera.position, {
                    x: 3,
                    y: () => {
                        return -0.3;
                    },
                    z: 3.5,
                 },"same2"
                 );
                 this.secondMoveTimeline.to(this.camera.perspectiveCamera.rotation, {
                    y: -0.57,
                 }, "same2"
                 );
                 this.thirdMoveTimeline = new GSAP.timeline({ 
                    scrollTrigger:{
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 2,
                        invalidateOnRefresh: true,
                    }
                 });
                 this.thirdMoveTimeline.to(this.camera.perspectiveCamera.position, {
                    y: 5,
                    z: 4,
                 },
                 );

                 this.fourthMoveTimeline = new GSAP.timeline({ 
                    scrollTrigger:{
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 7,
                        invalidateOnRefresh: true,
                    }
                 });
                 this.fourthMoveTimeline.to(this.luckycat.position, {
                    x: -2,
                    y: 5,
                 },"same4" 
                 );
                 this.fourthMoveTimeline.to(this.luckycat.rotation, {
                    x: 0.2,
                    z: 0.2,
                 },  "same4"
                 );
            },

            "all": function() {

            }
              
          }); 
    }

    resize(){
        
    }

    update() {
            //this.curve.getPointAt(this.progress % 1, this.dummyCurve);
            //this.progress+=0.001;
            //this.camera.perspectiveCamera.position.copy(this.dummyCurve);
           // this.camera.perspectiveCamera.lookAt(2, -0.05, 1.7);
        
    }

}
