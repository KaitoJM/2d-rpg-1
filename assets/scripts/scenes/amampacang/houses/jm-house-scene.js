import {
  SCENE_MAP_ASSET_KEYS,
  SCENE_OBJECT_TILESET_ASSET_KEYS,
  SCENE_TILESET_ASSET_KEYS,
} from '../../../assets/asset-keys.js';
import { SCENE_KEYS } from './../../scene-keys.js';
import { BaseWalkableScene } from '../../base-walkable-scene.js';
import { DIRECTION } from '../../../common/direction.js';
import DoorRight from '../../../components/objects/indoor/door-right.object.js';
import DoorLeft from '../../../components/objects/indoor/door-left.object.js';
import DoorUp from '../../../components/objects/indoor/door-up.object.js';
import SofaShort from '../../../components/objects/indoor/sofa-short.object.js';
import SofaLong from '../../../components/objects/indoor/sofa-long.object.js';
import TableWoodLong from '../../../components/objects/indoor/table-wood-long.object.js';
import TableWood from '../../../components/objects/indoor/table-wood.object.js';
import TvFlatRight from '../../../components/objects/indoor/tvFlatRight.object.js';

export class JMHouseScene extends BaseWalkableScene {
  /** @type {Phaser.Physics.Arcade.Sprite} */
  #sofa1;
  /** @type {Phaser.Physics.Arcade.Sprite} */
  #sofa2;
  /** @type {Phaser.Physics.Arcade.Sprite} */
  #sofalong;
  /** @type {Phaser.Physics.Arcade.Sprite} */
  #longtable;
  /** @type {Phaser.Physics.Arcade.Sprite} */
  #doorRoom1;
  /** @type {Phaser.Physics.Arcade.Sprite} */
  #doorRoom2;
  /** @type {Phaser.Physics.Arcade.Sprite} */
  #doorOut1;
  /** @type {Phaser.Physics.Arcade.Sprite} */
  #doorOut2;
  /** @type {Phaser.Physics.Arcade.Sprite} */
  #doorCR;
  /** @type {Phaser.Physics.Arcade.Sprite} */
  #tv;
  /** @type {Phaser.Physics.Arcade.Sprite} */
  #dinningTable;

  constructor() {
    super(SCENE_KEYS.JM_HOUSE_SCENE, 320, 352);
  }

  create(data) {
    const { x = null, y = null, facing = null } = data || {};
    super.create(x, y, facing);

    this.buildMap(
      SCENE_MAP_ASSET_KEYS.JM_HOUSE_MAP,
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
    this.#doorRoom1 = new DoorRight(this, 224, 64, character);
    this.#doorRoom2 = new DoorRight(this, 224, 160, character);
    this.#doorOut1 = new DoorUp(this, 128, 32, character);
    this.#doorOut2 = new DoorLeft(this, 32, 160, character);
    this.#sofa1 = new SofaShort(this, 96, 45, character, true);
    this.#sofa2 = new SofaShort(this, 160, 45, character, true);
    this.#sofalong = new SofaLong(this, 52, 84, character, true);
    this.#longtable = new TableWoodLong(this, 116, 94, character, true);
    this.#dinningTable = new TableWood(this, 96, 224, character, true);
    this.#tv = new TvFlatRight(this, 222, 110, character);

    this.#doorCR = this.physics.add
      .sprite(288, 256, SCENE_OBJECT_TILESET_ASSET_KEYS.INDOOR_FURNITURE, 9)
      .setOrigin(0);

    this.#doorCR.setImmovable(true);

    // Add collisions between the player and sofas
    this.physics.add.collider(
      this.character.characterGameObject,
      this.#doorRoom1,
      () => {
        this.scene.start(SCENE_KEYS.JM_HOUSE_ROOM1_SCENE, {
          x: 55,
          y: 78,
          facing: DIRECTION.RIGHT,
        });
      }
    );
    this.physics.add.collider(
      this.character.characterGameObject,
      this.#doorRoom2,
      () => {
        this.scene.start(SCENE_KEYS.JM_HOUSE_ROOM2_SCENE, {
          x: 55,
          y: 78,
          facing: DIRECTION.RIGHT,
        });
      }
    );
    this.physics.add.collider(
      this.character.characterGameObject,
      this.#doorOut1,
      () => {
        console.log('collide door out 1');
      }
    );
    this.physics.add.collider(
      this.character.characterGameObject,
      this.#doorOut2,
      () => {
        console.log('collide door out 2');
      }
    );
    this.physics.add.collider(
      this.character.characterGameObject,
      this.#doorCR,
      () => {
        this.scene.start(SCENE_KEYS.JM_HOUSE_ROOMCR_SCENE, {
          x: 75,
          y: 70,
          facing: DIRECTION.RIGHT,
        });
      }
    );
  }
}
