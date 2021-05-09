function main(){
        const canvas = document.querySelector('#c');
        const renderer = new THREE.WebGLRenderer({canvas});

        const fov = 75;
        const aspect = 2;
        const near = 0.1;
        const far = 100;
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.z = 2;

        const scene = new THREE.Scene();

        {
          const color = 0xffffff;
          const intensity = 1;
          const lighting = new THREE.DirectionalLight(color, intensity);
          lighting.position.set(-1,2,4);
          scene.add(lighting)
        }

        const boxWidth = 1;
        const boxHeight = 1;
        const boxDepth = 1;
        const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
        
        function makeCubes(geometry, color, x){
          const material = new THREE.MeshPhongMaterial({color});
          const cube = new THREE.Mesh(geometry, material);
          scene.add(cube);
          cube.position.x = x;
          return cube;
        }
        const cubes=[
          makeCubes(geometry, 0x0000ff, 0),
          makeCubes(geometry, 0x00ff00, -2),
          makeCubes(geometry, 0xff0000, 2)
        ];

        function resizeRendererToDisplaySize(renderer){
          const height = canvas.clientHeight;
          const width = canvas.clientWidth;
          const needResize = canvas.width !== width || canvas.height !== height;
          if(needResize){
            renderer.setSize(width, height, false);
          }
          return needResize;
        }

        function render_rotate(time){
          time *= 0.001;

          if(resizeRendererToDisplaySize(renderer)){
          // const canvas = renderer.domElement();
          camera.aspect = canvas.clientWidth/ canvas.clientHeight;
          camera.updateProjectionMatrix();
          }

          cubes.forEach((cube, change)=>{
            const speed = 1 + change*(0.1);
            const rot = time * speed;
            cube.rotation.x = rot;
            cube.rotation.y = rot;
          });
          renderer.render(scene, camera);
          requestAnimationFrame(render_rotate);
        }
        requestAnimationFrame(render_rotate);
      }

  main();