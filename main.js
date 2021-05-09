function main(){
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({canvas});

  const scene = new THREE.Scene();

  const fov = 75;
  const aspect = 2;
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 12;

  const boxWidth = 3;
  const boxHeight = 5;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  const material = new THREE.MeshBasicMaterial({color:0xff0000});

  const book = new THREE.Mesh(geometry, material);

  function resizeRenderToDisplay(renderer){
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if(needResize){
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  if(resizeRenderToDisplay(renderer)){
    camera.aspect = canvas.clientWidth/canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  scene.add(book);
  function render_rotate(time){
    time *= 0.001;
    book.rotation.x = time;
    book.rotation.y = time;
    renderer.render(scene, camera);
    requestAnimationFrame(render_rotate);
  }
  requestAnimationFrame(render_rotate);
}
main();