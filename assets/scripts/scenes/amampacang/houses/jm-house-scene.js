import {
  SCENE_MAP_ASSET_KEYS,
  SCENE_TILESET_ASSET_KEYS,
} from '../../../assets/asset-keys.js';
import { SCENE_KEYS } from './../../scene-keys.js';
import { BaseWalkableScene } from '../../base-walkable-scene.js';

export class JMHouseScene extends BaseWalkableScene {
  constructor() {
    super(SCENE_KEYS.JM_HOUSE_SCENE, 320, 352);
  }

  create() {
    super.create();

    this.buildMap(
      SCENE_MAP_ASSET_KEYS.JM_HOUSE_MAP,
      'cement-house-indoor',
      SCENE_TILESET_ASSET_KEYS.CEMENT_HOUSE_TILESET,
      [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 14, 17, 18, 22, 25, 26, 30, 33, 34, 35,
        36, 37, 38,
      ]
    );
  }

  update() {
    super.update();
  }
}
