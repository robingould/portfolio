import * as THREE from 'three';

import Experience from "../Experience.js";
import GSAP from "gsap";

export default class Room{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        };

        this.setModel();
        this.onMouseMove();
    }

    setModel(){
        this.actualRoom.children.forEach(child=>{
            child.castShadow = true;
            child.recieveShadow = true;

            if(child instanceof THREE.Group){
                child.children.forEach((groupchild)=> {
                    groupchild.castShadow = true;
                    groupchild.recieveShadow = true;
                });
            }

            if(child.name === "screen"){
                child.material = new THREE.MeshBasicMaterial({
                    //map: this.resources.items.peguig,
                    
                });
            }

            if(child.name === "screen2"){
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.crtbars,
                });
            }
            if(child.name === "screen3"){
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.crtbars,
                });
            }
            if(child.name === "oscilloscope"){
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.oscilloscope,
                });
            }
            
        });
        this.scene.add(this.actualRoom);
        this.actualRoom.position.x = 3;
        this.actualRoom.rotation.y = Math.PI / 2;

    }

    onMouseMove(){
        window.addEventListener("mousemove", (e)=>{
            this.rotation = (((e.clientX - window.innerWidth) / 2)*2) / window.innerWidth - 0.5;
            this.lerp.target = this.rotation;
        })
    }

    resize(){
        
    }

    update() {
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        this.actualRoom.rotation.y =  (Math.PI / 2) + (this.lerp.current * 0.07) ;
    }

}
