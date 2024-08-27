<template>
  <div ref="container" class="obj-viewer"></div>
</template>

<script setup lang="ts">
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Define the event emitter
const emit = defineEmits(['loadComplete']);

const container = ref<HTMLElement | null>(null);

onMounted(async () => {
  const scene = new THREE.Scene();
  let davidMind: THREE.Object3D | null = null;
  let davidHead: THREE.Object3D | null = null;
  let isDavidMindVisible = true;

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 5);
  camera.lookAt(scene.position);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0);

  if (container.value) {
    renderer.setSize(container.value.clientWidth, container.value.clientHeight);
    container.value.appendChild(renderer.domElement);
  }

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.9);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  const loader = new GLTFLoader().setPath('/3D/');

  // Function to load a model asynchronously
  async function loadModel(name: string, position: THREE.Vector3, scale: THREE.Vector3): Promise<THREE.Object3D> {
    return new Promise((resolve, reject) => {
      loader.load(
        name,
        (gltf) => {
          const model = gltf.scene;
          model.position.set(position.x, position.y, position.z);
          model.scale.set(scale.x, scale.y, scale.z);
          const geometry = (model.children[0] as THREE.Mesh).geometry;
          geometry.center();
          resolve(model);
        },
        undefined,
        (error) => {
          console.error('An error happened', error);
          reject(error);
        }
      );
    });
  }

  // Initial positions and scales for both objects
  const initialPosition = new THREE.Vector3(0, 1.7, 0);
  const scale = new THREE.Vector3(0.01, 0.012, 0.01);

  const resizeObserver = new ResizeObserver(() => {
    if (container.value) {
      renderer.setSize(container.value.clientWidth, container.value.clientHeight);
      camera.aspect = container.value.clientWidth / container.value.clientHeight;
      camera.updateProjectionMatrix();
    }
  });
  resizeObserver.observe(container.value);

  try {
    // Load models asynchronously
    [davidMind, davidHead] = await Promise.all([
      loadModel('DavidMind.glb', initialPosition, scale),
      loadModel('DavidHead.glb', initialPosition, scale)
    ]);

    // Add the first model to the scene
    scene.add(davidMind!);

    // Emit an event indicating that the models are loaded and rendered
    emit('loadComplete', true);

    const blue = new THREE.Color('rgba(0, 255, 255, 0.5)');
    const purple = new THREE.Color('rgba(255, 0, 255, 0.5)');

    let factor = 1;
    let dir = 0.01;

    function lerpColor(color1: THREE.Color, color2: THREE.Color, factor: number) {
      return color1.clone().lerp(color2, factor);
    }

    const animate = () => {
      requestAnimationFrame(animate);

      if (davidMind && davidHead) {
        if (isDavidMindVisible) {
          davidMind.rotation.y += 0.06;
          if (davidMind.rotation.y >= Math.PI * 2.8) {
            davidMind.rotation.y = 0;
            scene.remove(davidMind);
            scene.add(davidHead);
            isDavidMindVisible = false;
          }
        } else {
          davidHead.rotation.y += 0.06;
          if (davidHead.rotation.y >= Math.PI * 2.52) {
            davidHead.rotation.y = -2.28;
            scene.remove(davidHead);
            scene.add(davidMind);
            isDavidMindVisible = true;
          }
        }
      }

      if (factor <= 0 || factor >= 1) dir *= -1;
      factor += dir;

      directionalLight.color = lerpColor(blue, purple, factor);
      renderer.render(scene, camera);
    };

    animate();
  } catch (error) {
    console.error('Error loading models:', error);
    emit('loadComplete', false);
  }
});

</script>

<style lang="scss">
.obj-viewer {
  width: 100%;
  height: 100%;
  overflow: hidden;

  canvas {
    height: 100% !important;
    width: 100% !important;
    min-width: 100% !important;
    scale: 2;
    margin-top: 200px;
  }
}
</style>
