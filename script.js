var scene, camera, renderer;
var ambientLight, sun, sky;

init();
animate();

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Ambient light
    ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Sun
    sun = new THREE.PointLight(0xfdb813, 1, 100);
    scene.add(sun);

    // Sky
    var skyGeometry = new THREE.SphereGeometry(100, 32, 32);
    var skyMaterial = new THREE.MeshBasicMaterial({ color: 0x87ceeb, side: THREE.BackSide });
    sky = new THREE.Mesh(skyGeometry, skyMaterial);
    scene.add(sky);

    camera.position.z = 5;
}

function animate() {
    requestAnimationFrame(animate);

    // Rotate sun to simulate sunrise effect
    sun.position.set(Math.sin(Date.now() * 0.001) * 50, Math.cos(Date.now() * 0.001) * 50, 0);

    // Gradually change ambient light color for sunrise effect
    var sunriseFactor = Math.min(1, (sun.position.y + 50) / 100);
    ambientLight.color.setHex(0x404040 + sunriseFactor * 0xc0c0c0);

    // Gradually change sky color for sunrise effect
    var skyColor = new THREE.Color(0x87ceeb).lerp(new THREE.Color(0xff6347), sunriseFactor);
    sky.material.color.copy(skyColor);

    renderer.render(scene, camera);
}
