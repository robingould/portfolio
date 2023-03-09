import * as THREE from 'three';

import Experience from "../Experience.js";
import { SpotLight } from "three/src/lights/SpotLight.js";

export default class Environment {
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        this.setSunlight();
    }

    setSunlight(){
        const spotLight = new THREE.SpotLight(0xf79463, 20.0, 100, Math.PI / 2, 1 );
        spotLight.position.set( 3, 0, 10 );
        spotLight.target.position.set(3, -1, 3);
        
        spotLight.castShadow = true;
        spotLight.shadow.mapSize.set(2048,2048)
        
        this.scene.add( spotLight );
        this.scene.add( spotLight.target );

        const ambientLight = new THREE.AmbientLight(0xdcd0ff, 0.09);
        this.scene.add(ambientLight);
    }
    resize(){
        
    }

    update() {

    }

}