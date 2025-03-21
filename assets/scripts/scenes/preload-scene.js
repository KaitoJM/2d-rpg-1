import {
  CHARACTER_ASSET_KEYS,
  SCENE_BG_ASSET_KEYS,
  SCENE_MAP_ASSET_KEYS,
  SCENE_OBJECT_TILESET_ASSET_KEYS,
  SCENE_TILESET_ASSET_KEYS,
} from '../assets/asset-keys.js';
import Phaser from '../lib/phaser.js';
import { SCENE_KEYS } from './scene-keys.js';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({
      key: SCENE_KEYS.PRELOAD_SCENE,
    });
  }

  preload() {
    const imagePath = 'assets/images/';
    const jsonPath = 'assets/json';

    // load main character sheet
    this.load.spritesheet(
      CHARACTER_ASSET_KEYS.MC_SHEET,
      `${imagePath}/avatar/2drpg-mc.png`,
      {
        frameWidth: 32,
        frameHeight: 32,
      }
    );

    //load backgrounds
    this.load.tilemapTiledJSON(
      SCENE_MAP_ASSET_KEYS.JM_HOUSE_MAP,
      `${jsonPath}/maps/houses/jm-house-tilemap.json`
    );
    this.load.image(
      SCENE_TILESET_ASSET_KEYS.CEMENT_HOUSE_TILESET,
      `${imagePath}/maps/houses/cement-house-indoor.png`
    );

    //load objects
    this.load.spritesheet(
      SCENE_OBJECT_TILESET_ASSET_KEYS.INDOOR_FURNITURE,
      `${imagePath}/objects/indoor-forniture.png`,
      {
        frameWidth: 32,
        frameHeight: 32,
      }
    );
  }

  create() {
    this.scene.start(SCENE_KEYS.JM_HOUSE_SCENE);
  }
}
