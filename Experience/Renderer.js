import * as THREE from 'three';
import { EventEmitter } from "events";
import Experience from "./Experience.js";
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader.js";
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { RGBShiftShader } from "three/examples/jsm/shaders/RGBShiftShader.js";
import GSAP from "gsap";

export default class Renderer extends EventEmitter{
    constructor() {
        super();
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;
        this.world = this.experience.world;

        this.counter = 0.0;
        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        };
            this.setRenderer();
            this.effectAdder();
            this.onMouseMove();
    }

    setRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
        });

        this.renderer.physicallyCorrectLights = true;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.CineonToneMapping;
        this.renderer.toneMappingExposure = 0.5;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFShadowMap;
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
    }
    
    effectAdder(){
        this.effectComposer = new EffectComposer(this.renderer);
        this.effectComposer.setSize(this.sizes.width, this.sizes.height);
        this.effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
        this.renderPass = new RenderPass(this.scene, this.camera.perspectiveCamera);
        this.effectComposer.addPass(this.renderPass);

        this.rgbShiftPass = new ShaderPass(RGBShiftShader);
        this.rgbShiftPass.uniforms['amount'].value = 0.0012;
        this.effectComposer.addPass(this.rgbShiftPass);

        this.gammaCorrectionPass = new ShaderPass(GammaCorrectionShader);
        this.effectComposer.addPass(this.gammaCorrectionPass);

        this.vertShader = document.getElementById('vertexShader').textContent;
        this.fragShader = document.getElementById('fragmentShader').textContent;
        
        this.myEffect = {
            uniforms: {
            "tDiffuse": { value: null },
            "amount": { value: this.counter }
            },
            vertexShader: this.vertShader,
            fragmentShader: this.fragShader
        }

        this.customPass = new ShaderPass(this.myEffect);
        this.customPass.renderToScreen = true;
        this.effectComposer.addPass(this.customPass);
        }

    onMouseMove(){
        window.addEventListener("mousemove", (e)=>{
            this.terp = ((e.clientX - window.innerWidth) / window.innerWidth) + 0.2;
            this.lerp.target = this.terp;
        })
    }

    resize(){
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
    }

    update() {
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );
        this.renderer.render(this.scene, this.camera.perspectiveCamera);
        this.rgbShiftPass.uniforms['amount'].value = 0.0012 + (this.lerp.current*0.007);
        this.counter += 0.01;
        this.customPass.uniforms["amount"].value = this.counter;
        this.effectComposer.render();
    }

}