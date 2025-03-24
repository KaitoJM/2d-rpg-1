import { SCENE_OBJECT_TILESET_ASSET_KEYS } from '../../../assets/asset-keys.js';
import { Character } from '../../character/character.js';

export default class DoorLeft extends Phaser.Physics.Arcade.Sprite {
  /** @type {Phaser.Scene} */
  #scene;
  /** @type {Phaser.Physics.Arcade.Sprite} */
  #character;
  /** @type {Phaser.Physics.Arcade.Sprite} */
  #doorCover;
  /** @type {Phaser.Physics.Arcade.Sprite} */
  #extraLimitReach;
  /** @type {number} */
  #positionX;
  /** @type {number} */
  #positionY;

  /**
   *
   * @param {Phaser.Scene} scene
   * @param {number} x
   * @param {number} y
   * @param {Phaser.Physics.Arcade.Sprite} character
   * @param {import('../../../types/door-data.model.js').DoorData} data
   */
  constructor(scene, x, y, character, data = null) {
    super(scene, x, y, SCENE_OBJECT_TILESET_ASSET_KEYS.INDOOR_FURNITURE, 9);

    this.#scene = scene;
    this.#scene.add.existing(this);
    this.#scene.physics.add.existing(this);
    this.#character = character;

    this.#positionX = x;
    this.#positionY = y;

    this.#createDoor();
    this.#createExtraLimitReach();

    this.#scene.events.on('update', this.#checkDoorOverlap, this);

    if (data) {
      this.#setCollision(data);
    }

    this.setOrigin(0);
    this.setImmovable(true);
    this.setSize(10, 32);
    this.setOffset(0, 0);
  }

  #createDoor() {
    this.#doorCover = this.#scene.physics.add
      .sprite(
        this.#positionX,
        this.#positionY,
        SCENE_OBJECT_TILESET_ASSET_KEYS.INDOOR_FURNITURE,
        3
      )
      .setOrigin(0);
    this.#doorCover.setImmovable(true);
    this.#createDoorCoverCollider();
  }

  #createExtraLimitReach() {
    this.#extraLimitReach = this.#scene.physics.add
      .sprite(
        this.#positionX,
        this.#positionY,
        SCENE_OBJECT_TILESET_ASSET_KEYS.INDOOR_FURNITURE,
        9
      )
      .setOrigin(0);
    this.#extraLimitReach.setImmovable(true);
    this.#scene.physics.add.collider(this.#character, this.#extraLimitReach);
    this.#extraLimitReach.setSize(32, 15);
    this.#extraLimitReach.setOffset(0, 0);
  }

  #createDoorCoverCollider() {
    this.#scene.physics.add.overlap(this.#character, this.#doorCover);
  }

  #checkDoorOverlap() {
    if (this.#scene.physics.world.overlap(this.#character, this.#doorCover)) {
      this.#doorCover.setVisible(false);
    } else {
      this.#doorCover.setVisible(true);
    }
  }

  /**
   *
   * @param {import('../../../types/door-data.model.js').DoorData} data
   */
  #setCollision(data) {
    this.#scene.physics.add.collider(this.#character, this, () => {
      this.#scene.scene.start(data.scene, {
        x: data.x,
        y: data.y,
        facing: data.playerPosition,
      });
    });
  }
}
