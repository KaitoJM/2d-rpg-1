import {
  SCENE_MAP_ASSET_KEYS,
  SCENE_OBJECT_TILESET_ASSET_KEYS,
  SCENE_TILESET_ASSET_KEYS,
} from '../../../assets/asset-keys.js';
import { SCENE_KEYS } from './../../scene-keys.js';
import { BaseWalkableScene } from '../../base-walkable-scene.js';
import { DIRECTION } from '../../../common/direction.js';
import DoorLeft from '../../../components/objects/indoor/door-left.object.js';
import BedSingle from '../../../components/objects/indoor/bed-single.object.js';
import Desk from '../../../components/objects/indoor/desk.object.js';

export class JMHouseRoom2Scene extends BaseWalkableScene {
  /** @type {Phaser.Physics.Arcade.Sprite} */
  #doorOut;
  /** @type {Phaser.Physics.Arcade.Sprite} */
  #bed;
  /** @type {Phaser.Physics.Arcade.Sprite} */
  #desk;

  constructor() {
    super(SCENE_KEYS.JM_HOUSE_ROOM2_SCENE, 288, 224);
  }

  create(data) {
    const { x = null, y = null, facing = null } = data || {};
    super.create(x, y, facing);

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
    const character = this.character.characterGameObject;
    this.#doorOut = new DoorLeft(this, 32, 64, character, {
      scene: SCENE_KEYS.JM_HOUSE_SCENE,
      x: 230,
      y: 170,
      playerPosition: DIRECTION.LEFT,
    });

    this.#bed = new BedSingle(this, 192, 52, character, true);
    this.#desk = new Desk(this, 128, 52, character, true);
  }
}
