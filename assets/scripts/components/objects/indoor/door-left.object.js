import { SCENE_OBJECT_TILESET_ASSET_KEYS } from '../../../assets/asset-keys.js';
import { Character } from '../../character/character.js';

export default class DoorLeft extends Phaser.Physics.Arcade.Sprite {
  /** @type {Phaser.Scene} */
  #scene;
  /** @type {Phaser.Physics.Arcade.Sprite} */
  #character;
  /** @type {Phaser.Physics.Arcade.Sprite} */
  #doorCover;
  /** @type {boolean} */
  #isOpen;

  /**
   *
   * @param {Phaser.Scene} scene
   * @param {number} x
   * @param {number} y
   * @param {Phaser.Physics.Arcade.Sprite} character
   */
  constructor(scene, x, y, character) {
    super(scene, x, y, SCENE_OBJECT_TILESET_ASSET_KEYS.INDOOR_FURNITURE, 9);

    this.#scene = scene;
    this.#scene.add.existing(this);
    this.#scene.physics.add.existing(this);
    this.#character = character;

    //add extra collider form maximum reach
    const extra = this.#scene.physics.add
      .sprite(x, y, SCENE_OBJECT_TILESET_ASSET_KEYS.INDOOR_FURNITURE, 9)
      .setOrigin(0);
    extra.setImmovable(true);
    this.#scene.physics.add.collider(this.#character, extra);
    extra.setSize(32, 15);
    extra.setOffset(0, 0);

    //Add door collidable door
    this.#doorCover = this.#scene.physics.add
      .sprite(x, y, SCENE_OBJECT_TILESET_ASSET_KEYS.INDOOR_FURNITURE, 3)
      .setOrigin(0);
    this.#doorCover.setImmovable(true);
    this.#createDoorCoverCollider();
    this.#scene.events.on('update', this.#checkDoorOverlap, this);

    this.setOrigin(0);
    this.#isOpen = false;
    this.setImmovable(true);
    this.setSize(10, 32);
    this.setOffset(0, 0);
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
}
