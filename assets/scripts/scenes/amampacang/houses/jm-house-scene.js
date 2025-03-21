import {
  SCENE_MAP_ASSET_KEYS,
  SCENE_OBJECT_TILESET_ASSET_KEYS,
  SCENE_TILESET_ASSET_KEYS,
} from '../../../assets/asset-keys.js';
import { SCENE_KEYS } from './../../scene-keys.js';
import { BaseWalkableScene } from '../../base-walkable-scene.js';

export class JMHouseScene extends BaseWalkableScene {
  /** @type {Phaser.Physics.Arcade.Sprite} */
  #sofa1;
  /** @type {Phaser.Physics.Arcade.Sprite} */
  #sofa2;
  /** @type {Phaser.Physics.Arcade.Sprite} */
  #sofalonghalf1;
  /** @type {Phaser.Physics.Arcade.Sprite} */
  #sofalonghalf2;
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

  constructor() {
    super(SCENE_KEYS.JM_HOUSE_SCENE, 320, 352);
  }

  create() {
    super.create();

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
    this.#sofa1 = this.physics.add
      .sprite(96, 45, SCENE_OBJECT_TILESET_ASSET_KEYS.INDOOR_FURNITURE, 4)
      .setOrigin(0);
    this.#sofa2 = this.physics.add
      .sprite(160, 45, SCENE_OBJECT_TILESET_ASSET_KEYS.INDOOR_FURNITURE, 4)
      .setOrigin(0);
    this.#sofalonghalf1 = this.physics.add
      .sprite(52, 84, SCENE_OBJECT_TILESET_ASSET_KEYS.INDOOR_FURNITURE, 5)
      .setOrigin(0);
    this.#sofalonghalf2 = this.physics.add
      .sprite(52, 116, SCENE_OBJECT_TILESET_ASSET_KEYS.INDOOR_FURNITURE, 10)
      .setOrigin(0);
    this.#doorRoom1 = this.physics.add
      .sprite(224, 96, SCENE_OBJECT_TILESET_ASSET_KEYS.INDOOR_FURNITURE, 1)
      .setOrigin(0);
    this.#doorRoom2 = this.physics.add
      .sprite(224, 192, SCENE_OBJECT_TILESET_ASSET_KEYS.INDOOR_FURNITURE, 1)
      .setOrigin(0);
    this.#doorOut1 = this.physics.add
      .sprite(128, 32, SCENE_OBJECT_TILESET_ASSET_KEYS.INDOOR_FURNITURE, 0)
      .setOrigin(0);
    this.#doorOut2 = this.physics.add
      .sprite(32, 160, SCENE_OBJECT_TILESET_ASSET_KEYS.INDOOR_FURNITURE, 3)
      .setOrigin(0);
    this.#doorCR = this.physics.add
      .sprite(288, 256, SCENE_OBJECT_TILESET_ASSET_KEYS.INDOOR_FURNITURE, 6)
      .setOrigin(0);

    this.#sofa1.setImmovable(true);
    this.#sofa2.setImmovable(true);
    this.#sofalonghalf1.setImmovable(true);
    this.#sofalonghalf2.setImmovable(true);
    this.#doorRoom1.setImmovable(true);
    this.#doorRoom2.setImmovable(true);
    this.#doorOut1.setImmovable(true);
    this.#doorOut2.setImmovable(true);
    this.#doorCR.setImmovable(true);

    // Add collisions between the player and sofas
    this.physics.add.collider(this.character.characterGameObject, this.#sofa1);
    this.physics.add.collider(this.character.characterGameObject, this.#sofa2);
    this.physics.add.collider(
      this.character.characterGameObject,
      this.#sofalonghalf1
    );
    this.#sofalonghalf1.body.setSize(32, 20);
    this.#sofalonghalf1.body.setOffset(0, 10);
    this.#sofalonghalf1.setDepth(11);

    this.physics.add.collider(
      this.character.characterGameObject,
      this.#sofalonghalf2
    );
    this.physics.add.collider(
      this.character.characterGameObject,
      this.#doorRoom1,
      () => {
        console.log('collide door room 1');
      }
    );
    this.physics.add.collider(
      this.character.characterGameObject,
      this.#doorRoom2,
      () => {
        console.log('collide door room 2');
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
        console.log('collide door CR');
      }
    );
  }
}
