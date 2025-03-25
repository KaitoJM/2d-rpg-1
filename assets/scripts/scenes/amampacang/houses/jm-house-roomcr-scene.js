import {
  SCENE_MAP_ASSET_KEYS,
  SCENE_OBJECT_TILESET_ASSET_KEYS,
  SCENE_TILESET_ASSET_KEYS,
} from '../../../assets/asset-keys.js';
import { SCENE_KEYS } from './../../scene-keys.js';
import { BaseWalkableScene } from '../../base-walkable-scene.js';
import { DIRECTION } from '../../../common/direction.js';
import Toilet from '../../../components/objects/indoor/toilet.object.js';
import WashingMachine from '../../../components/objects/indoor/washing-machine.object.js';

export class JMHouseRoomCRScene extends BaseWalkableScene {
  /** @type {Phaser.Physics.Arcade.Sprite} */
  #doorOut;
  /** @type {Phaser.Physics.Arcade.Sprite} */
  #toilet;

  constructor() {
    super(SCENE_KEYS.JM_HOUSE_ROOMCR_SCENE, 288, 224);
  }

  create(data) {
    const { x = null, y = null, facing = null } = data || {};
    super.create(x, y, facing);

    this.buildMap(
      SCENE_MAP_ASSET_KEYS.JM_HOUSE_ROOMCR_MAP,
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
    this.#toilet = new Toilet(this, 96, 64, character, true);

    this.#doorOut = this.physics.add
      .sprite(32, 64, SCENE_OBJECT_TILESET_ASSET_KEYS.INDOOR_FURNITURE, 9)
      .setOrigin(0);

    this.#doorOut.setImmovable(true);
    this.physics.add.collider(
      this.character.characterGameObject,
      this.#doorOut,
      () => {
        this.scene.start(SCENE_KEYS.JM_HOUSE_SCENE, {
          x: 274,
          y: 265,
          facing: DIRECTION.LEFT,
        });
      }
    );
  }
}
