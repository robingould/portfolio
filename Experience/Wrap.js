export default class Wrap extends EventEmitter{
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
}