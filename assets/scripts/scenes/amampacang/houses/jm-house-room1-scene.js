import {
  SCENE_MAP_ASSET_KEYS,
  SCENE_OBJECT_TILESET_ASSET_KEYS,
  SCENE_TILESET_ASSET_KEYS,
} from '../../../assets/asset-keys.js';
import { SCENE_KEYS } from './../../scene-keys.js';
import { BaseWalkableScene } from '../../base-walkable-scene.js';
import { DIRECTION } from '../../../common/direction.js';
import DoorLeft from '../../../components/objects/indoor/door-left.object.js';

export class JMHouseRoom1Scene extends BaseWalkableScene {
  /** @type {Phaser.Physics.Arcade.Sprite} */
  #doorOut;

  constructor() {
    super(SCENE_KEYS.JM_HOUSE_ROOM1_SCENE, 288, 256);
  }

  create(data) {
    const { x = null, y = null, facing = null } = data || {};
    super.create(x, y, facing);

    this.buildMap(
      SCENE_MAP_ASSET_KEYS.JM_HOUSE_ROOM1_MAP,
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
    const character = this.character.characterGameObject;
    this.#doorOut = new DoorLeft(this, 32, 64, character);

    this.physics.add.collider(
      this.character.characterGameObject,
      this.#doorOut,
      () => {
        this.scene.start(SCENE_KEYS.JM_HOUSE_SCENE, {
          x: 230,
          y: 75,
          facing: DIRECTION.LEFT,
        });
      }
    );
  }
}
