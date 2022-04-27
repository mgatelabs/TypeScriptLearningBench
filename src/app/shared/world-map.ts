import { ReturnStatement } from "@angular/compiler";
import { WorldTile } from "./world-tile";

export class WorldMap {

    public world:WorldTile[][] = []; 

    constructor(public width: number, public height:number) {
        for (let y= 0; y < height; y++){
            let row = [];
            for (let x= 0; x < width; x++){            
                row.push(new WorldTile());
            }
            this.world.push(row);
        }    
    }

    public addTile(): WorldTile {
        var t = new WorldTile();
        var row: WorldTile[] = this.world[this.height - 1];
        row.push(t);
        if (row.length > this.width) {
            this.width = row.length;
        }
        return t;
    }

    public addRow() {
        this.world.push([]);
        this.height = this.world.length;
    }

    public isWall(x: number, y:number) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return true;
        }
        return this.world[y][x].wall;
    }

}
