import {
  SCENE_MAP_ASSET_KEYS,
  SCENE_OBJECT_TILESET_ASSET_KEYS,
  SCENE_TILESET_ASSET_KEYS,
} from '../../../assets/asset-keys.js';
import { SCENE_KEYS } from './../../scene-keys.js';
import { BaseWalkableScene } from '../../base-walkable-scene.js';

export class JMHouseRoom2Scene extends BaseWalkableScene {
  /** @type {Phaser.Physics.Arcade.Sprite} */
  #doorOut;

  constructor() {
    super(SCENE_KEYS.JM_HOUSE_ROOM2_SCENE, 288, 224);
  }

  create(data) {
    const { x = 75, y = 70 } = data || {};
    super.create(x, y);

    this.buildMap(
      SCENE_MAP_ASSET_KEYS.JM_HOUSE_ROOM2_MAP,
      'cement-house-indoor',
      SCENE_TILESET_ASSET_KEYS.CEMENT_HOUSE_TILESET,
      [1, 2, 3, 5, 6, 7, 8, 9, 10, 14, 17, 25, 26, 30, 33, 34, 35, 37, 38]
    );

    this.#createRoomObjects();
  }

  update() {
    super.update();
  }

  #createRoomObjects() {
    this.#doorOut = this.physics.add
      .sprite(32, 64, SCENE_OBJECT_TILESET_ASSET_KEYS.INDOOR_FURNITURE, 3)
      .setOrigin(0);

    this.#doorOut.setImmovable(true);
    this.physics.add.collider(
      this.character.characterGameObject,
      this.#doorOut,
      () => {
        this.scene.start(SCENE_KEYS.JM_HOUSE_SCENE, { x: 210, y: 200 });
      }
    );
  }
}
