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

}
