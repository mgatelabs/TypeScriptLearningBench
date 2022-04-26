import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WorldMap } from 'src/app/shared/world-map';
import { WorldTiles } from 'src/app/shared/world-tiles';

import * as THREE from 'three';

@Component({
  selector: 'app-hello-world-game',
  templateUrl: './hello-world-game.component.html',
  styleUrls: ['./hello-world-game.component.scss']
})
export class HelloWorldGameComponent implements OnInit, AfterViewInit {

  // High Level

  private planeGeometry = new THREE.PlaneGeometry( 64, 64, 1, 1 );

  // Low Level Setup
  @ViewChild('canvas')
  private canvasRef: ElementRef;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.loadTextures();
  }

  private camera!: THREE.Camera;

  private renderer!: THREE.WebGLRenderer;

  private scene!: THREE.Scene;

  private loader = new THREE.TextureLoader();

  private textureMap: Map<String, THREE.Texture> = new Map<
  String,
  THREE.Texture
>();

/**
   *
   * @param assetPath Used to convert a texture load event into a Promise
   * @returns Promise of (THREE.Texture)
   */
 private getTexturePromise(assetPath: string): Promise<THREE.Texture> {
  let loader = this.loader;
  let map = this.textureMap;

  return new Promise(function (resolve, reject) {
    function loadDone(texture: THREE.Texture) {
      map.set(
        assetPath,
        texture
      );
      resolve(texture); // it went ok!
    }
    loader.load(assetPath, loadDone);
  });
}

private tilesetLookup: Map<WorldTiles, THREE.MeshBasicMaterial> = new Map();

private buildTileSetTexture(index:number): THREE.MeshBasicMaterial {
  const newText = this.textureMap.get('assets/images/Dungeon_Tileset.png')!.clone();

  let x = index % 10;
  let y = 9 - Math.floor(index / 10);

  newText.offset.x = x / 10.0;
  newText.offset.y = y / 10.0;

  newText.repeat.x = 0.1;
  newText.repeat.y = 0.1;

  //newText.

  return new THREE.MeshBasicMaterial({
    map: newText,
  });
}

private map?:WorldMap = undefined;

private loadTextures() {

  Promise.all([
    this.getTexturePromise('assets/images/Dungeon_Tileset.png'),
    this.getTexturePromise('assets/images/Dungeon_Character.png'),
    this.getTexturePromise('assets/images/Dungeon_Character_2.png'),
  ]).then(() => {

    // Row 1
    this.tilesetLookup.set(WorldTiles.wall_left_1, this.buildTileSetTexture(0));
    this.tilesetLookup.set(WorldTiles.wall_top_1, this.buildTileSetTexture(1));
    this.tilesetLookup.set(WorldTiles.wall_top_2, this.buildTileSetTexture(2));
    this.tilesetLookup.set(WorldTiles.wall_top_3, this.buildTileSetTexture(3));
    this.tilesetLookup.set(WorldTiles.wall_top_4, this.buildTileSetTexture(4));
    this.tilesetLookup.set(WorldTiles.wall_right_1, this.buildTileSetTexture(5));

    this.tilesetLookup.set(WorldTiles.floor1, this.buildTileSetTexture(6));
    this.tilesetLookup.set(WorldTiles.floor2, this.buildTileSetTexture(7));
    this.tilesetLookup.set(WorldTiles.floor3, this.buildTileSetTexture(8));
    this.tilesetLookup.set(WorldTiles.floor4, this.buildTileSetTexture(9));
    this.tilesetLookup.set(WorldTiles.floor1, this.buildTileSetTexture(16));
    this.tilesetLookup.set(WorldTiles.floor2, this.buildTileSetTexture(17));
    this.tilesetLookup.set(WorldTiles.floor3, this.buildTileSetTexture(18));
    this.tilesetLookup.set(WorldTiles.floor4, this.buildTileSetTexture(19));
    this.tilesetLookup.set(WorldTiles.floor1, this.buildTileSetTexture(26));
    this.tilesetLookup.set(WorldTiles.floor2, this.buildTileSetTexture(27));
    this.tilesetLookup.set(WorldTiles.floor3, this.buildTileSetTexture(28));
    this.tilesetLookup.set(WorldTiles.floor4, this.buildTileSetTexture(29));

    // Row 2
    this.tilesetLookup.set(WorldTiles.wall_left_2, this.buildTileSetTexture(10));
    this.tilesetLookup.set(WorldTiles.wall_right_2,this.buildTileSetTexture(15));

    // Row 3
    this.tilesetLookup.set(WorldTiles.wall_left_3, this.buildTileSetTexture(20));
    this.tilesetLookup.set(WorldTiles.wall_right_3,this.buildTileSetTexture(25));

    // Row 4
    this.tilesetLookup.set(WorldTiles.wall_left_4, this.buildTileSetTexture(30));
    //this.tilesetLookup.set(WorldTiles.floor9, this.buildTileSetTexture(31));
    //this.tilesetLookup.set(WorldTiles.floor10, this.buildTileSetTexture(32));
    //this.tilesetLookup.set(WorldTiles.floor11, this.buildTileSetTexture(33));
    //this.tilesetLookup.set(WorldTiles.floor12, this.buildTileSetTexture(34));
    this.tilesetLookup.set(WorldTiles.wall_right_4,this.buildTileSetTexture(35));

    // Row 5
    this.tilesetLookup.set(WorldTiles.wall_bottom_left_1, this.buildTileSetTexture(40));
    this.tilesetLookup.set(WorldTiles.wall_bottom_1, this.buildTileSetTexture(41));
    this.tilesetLookup.set(WorldTiles.wall_bottom_2, this.buildTileSetTexture(42));
    this.tilesetLookup.set(WorldTiles.wall_bottom_3, this.buildTileSetTexture(43));
    this.tilesetLookup.set(WorldTiles.wall_bottom_4, this.buildTileSetTexture(44));
    this.tilesetLookup.set(WorldTiles.wall_bottom_right_1,this.buildTileSetTexture(45));

    this.tilesetLookup.set(WorldTiles.space_void,this.buildTileSetTexture(79));

    this.map = new WorldMap(10,10);

    let m = this.map!;

    m.world[5][5].tile = WorldTiles.floor1;
    m.world[5][6].tile = WorldTiles.floor2;
    m.world[4][5].tile = WorldTiles.floor3;
    m.world[4][6].tile = WorldTiles.floor4;

    this.createScene();
    this.createRenderer();
    //this.createInteractionManager();
    //this.addInteraction();
    //this.update(0);
  });
}

  private createCamera() {
    let aspectRatio = 800.0 / 600.0;

      this.camera = new THREE.OrthographicCamera(0, 800, 600, 0, 0.1, 50);
      this.camera.position.x = 0;
      this.camera.position.y = 0;
      this.camera.position.z = 10;

      //this.camera.lookAt(400,300,0);

  }

  private createScene() {
    this.scene = new THREE.Scene();
    this.createCamera();

    let m = this.map!;

    for (let y = 0; y < m.height; y++) {
      for (let x = 0; x < m.width; x++) {

        let tile = m.world[y][x];

        if (tile.tile == WorldTiles.space_void) {
          continue;
        }

        const plane = new THREE.Mesh( this.planeGeometry, this.tilesetLookup.get(tile.tile));
        plane.position.x = x * 64;
        plane.position.y = y * 64;
        plane.position.z = 0;
  
        this.scene.add( plane );

      }
    }

    /*
    {
      const plane = new THREE.Mesh( this.planeGeometry, this.tilesetLookup.get(WorldTiles.wall_left_1));
      plane.position.x = 400;
      plane.position.y = 300;
      plane.position.z = 0;

      this.scene.add( plane );
    }

    {
      const plane = new THREE.Mesh( this.planeGeometry, this.tilesetLookup.get(WorldTiles.wall_top_3));
      plane.position.x = 400 + 64;
      plane.position.y = 300;
      plane.position.z = 0;

      this.scene.add( plane );
    }

    {
      const plane = new THREE.Mesh( this.planeGeometry, this.tilesetLookup.get(WorldTiles.wall_right_2));
      plane.position.x = 400 + 128;
      plane.position.y = 300;
      plane.position.z = 0;

      this.scene.add( plane );
    }

    {
      const plane = new THREE.Mesh( this.planeGeometry, new THREE.MeshBasicMaterial({ color: 0xffffff }));
      plane.position.x = 0;
      plane.position.y = 0;
      plane.position.z = 0;
  
      //this.scene.add( plane );
    }
    */

  }

  private createRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: false,
      alpha: false,
    });
    this.renderer.setPixelRatio(1);
    this.renderer.setClearColor(0x000000, 1);

    //var sizes = this.getCanvasSize();
    this.renderer.setSize(800, 600);

    this.renderer.render(this.scene, this.camera);
  }

}
