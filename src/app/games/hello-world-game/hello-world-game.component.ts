import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Injectable, OnInit, ViewChild } from '@angular/core';
import { WorldMap } from 'src/app/shared/world-map';
import { WorldTiles } from 'src/app/shared/world-tiles';

import * as THREE from 'three';

@Injectable({
  providedIn:  'root'
  })
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

  constructor(private http: HttpClient) { }

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

    // Row 6
    this.tilesetLookup.set(WorldTiles.wall_cap_left_1, this.buildTileSetTexture(50));
    this.tilesetLookup.set(WorldTiles.wall_bottom_5, this.buildTileSetTexture(51));
    this.tilesetLookup.set(WorldTiles.wall_bottom_6, this.buildTileSetTexture(52));
    this.tilesetLookup.set(WorldTiles.wall_cap_right_1, this.buildTileSetTexture(53));
    this.tilesetLookup.set(WorldTiles.wall_cap_left_2, this.buildTileSetTexture(54));
    this.tilesetLookup.set(WorldTiles.wall_cap_right_2,this.buildTileSetTexture(55));

    this.tilesetLookup.set(WorldTiles.space_void,this.buildTileSetTexture(79));

    this.map = new WorldMap(0,1);
    let m = this.map!;

    this.http.get('assets/maps/001.csv', { responseType: 'text'}).subscribe(data => {
      const lines = data.split("\n");

      var addLine = false;
      for (var y= lines.length - 1; y >= 0; y--) {
        var line = lines[y];
        line = line.trim();

        if (line.length == 0) {
          continue;
        }

        if (addLine) {
          m.addRow();
        } else {
          addLine = true;
        }
        const pieces = line.split(',');
        for (const p of pieces) {
          const tile = m.addTile();
          console.log(p);
          if (p === 'X') {
            tile.tile = WorldTiles.wall_top_1;
            tile.wall = true;
          } else{ 
            tile.tile = WorldTiles.floor1;
          }
        }
      }


      for (let y = 0; y < m.height; y++) {
        for (let x = 0; x < m.width; x++) {  
          let tile = m.world[y][x];
          if (tile.wall === true) {         
            const tl = m.isWall(x - 1, y + 1);
            const t = m.isWall(x, y + 1);
            const tr = m.isWall(x + 1, y + 1);

            const l = m.isWall(x - 1, y);
            const c = m.isWall(x, y);
            const r = m.isWall(x + 1, y);

            const bl = m.isWall(x - 1, y - 1);
            const b = m.isWall(x, y - 1);
            const br = m.isWall(x + 1, y - 1);

            if (tl && t && tr && l && r && bl && b && br) {
              tile.tile = WorldTiles.space_void;
            } else if (!l && r && t && b) {
              tile.tile = WorldTiles.wall_right_1;
            } else if (l && !r && t && b) {
              tile.tile = WorldTiles.wall_left_2;
            } else if (l && r && t && b && !br) {
              tile.tile = WorldTiles.wall_left_1;
            } else if (l && r && t && b && !tr) {
              tile.tile = WorldTiles.wall_bottom_left_1;
            } else if (l && r && t && b && !tl) {
              tile.tile = WorldTiles.wall_bottom_right_1;
            } else if (l && r && !t && b) {
              tile.tile = WorldTiles.wall_bottom_1;
            } else if (l && !r && !t && !tr && b) {
              tile.tile = WorldTiles.wall_cap_right_1;
            } else if (!l && r && !t && !tl && b) {
              tile.tile = WorldTiles.wall_cap_left_1;
            } else if (l && r && t && b && !bl) {
              tile.tile = WorldTiles.wall_right_1;
            }
          }
        }
      }

      this.createScene();
      this.createRenderer();
    });

    
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
        plane.position.x = (x * 64) + 32;
        plane.position.y = (y * 64) + 32;
        plane.position.z = 0;
  
        this.scene.add( plane );
      }
    }

  }

  private createRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: false,
      alpha: false,
    });
    this.renderer.setPixelRatio(1);
    this.renderer.setClearColor(0x24131A, 1);

    //var sizes = this.getCanvasSize();
    this.renderer.setSize(800, 600);

    this.renderer.render(this.scene, this.camera);
  }

}
