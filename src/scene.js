import * as THREE from 'three';


// We set variables for a scene, a camera, a renderer, the object stars and the geometry starGeo
let scene, camera, renderer, star, stars, starGeo;
// We set the variables for original velocity and acceleration
let originalVelocity = 0; // Velocidad original
let originalAcceleration = 0.00001;

// Function to initialize the scene
function init() {

    // We create the scene, the camera and the renderer
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 1;
    camera.rotation.x = Math.PI / 2;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);


    // We create the Geometry: stars particle
    starGeo = new THREE.Geometry();
    // a loop to create each vertex of star
    for (let i = 0; i < 10000; i++) {
        star = new THREE.Vector3(
            Math.random() * 600 - 300,
            Math.random() * 600 - 300,
            Math.random() * 600 - 300
        );
        // Then we set the original velocity and acceleration
        star.velocity = originalVelocity;
        star.acceleration = originalAcceleration;
        // And add each vertex to the geometry: starGeo
        starGeo.vertices.push(star);
    }

    // We load the texture and set its color, size and map the texture
    let sprite = new THREE.TextureLoader().load('../assets/star.png');
    // We create the Points Material
    let starMaterial = new THREE.PointsMaterial({
        color: 0xaaaaaa,
        size: 0.5,
        map: sprite
    });

    // We create stars, that is Point Object and assign them to starGeo with starMaterial
    stars = new THREE.Points(starGeo, starMaterial);
    // and then we add the stars to the scene
    scene.add(stars);
    
    // We add an event to listen if the page is resized and then apply the resize with onWindowResize
    window.addEventListener("resize", onWindowResize, false);
    
    // Initialize the animate() function to make a loop animation
    animate();
}

// Function to resize the window and position of the camera
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Function to make loop animation
function animate() {
    // We modify the velocity and the position of each star
    starGeo.vertices.forEach(p => {
        p.velocity += p.acceleration
        p.y -= p.velocity;
        // if each star position in Y is less than -200
        if (p.y < -200) {
            // then set the position to somewhere between [-200, 200] and restart its velocity to 0
            p.y = Math.random() * 200;
            p.velocity = 0;
        }
    });

    // we set the verticesNeedUpdate to true, and this tell the starGeo object that have to update its position
    starGeo.verticesNeedUpdate = true;
    // we set a rotation effect to look more realistic
    stars.rotation.y += 0.001;

    // renders the scene and camera to the renderer 
    renderer.render(scene, camera);
    
    // this means that in the end of this function we want to make a loop to this entire function
    requestAnimationFrame(animate);
}

//initialize the scene
init();

// flag to ask if the stars have accelerated
let isAccelerated = false;

// function to accelerate the stars
export function accelerate() {
    if (!isAccelerated) {
        starGeo.vertices.forEach(p => {
            p.acceleration = 0.1;
            // p.velocity += p.acceleration;
        }) 
        isAccelerated = true;
    }

    setTimeout(() => {
        if (isAccelerated) {
            starGeo.vertices.forEach(p => {
                p.acceleration = -0.05;
            });
        }
    }, 1000);

    setTimeout(() => {
        if (isAccelerated) {
            starGeo.vertices.forEach(p => {
                p.acceleration = originalAcceleration;
                p.velocity = originalVelocity;
            });
            isAccelerated = false;
        }
        console.log('You have reached your destination')
    }, 1500);
}