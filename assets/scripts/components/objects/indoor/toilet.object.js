import { SCENE_OBJECT_TILESET_ASSET_KEYS } from '../../../assets/asset-keys.js';
import { Character } from '../../character/character.js';

export default class Toilet extends Phaser.Physics.Arcade.Sprite {
  /** @type {Phaser.Scene} */
  #scene;
  /** @type {Phaser.Physics.Arcade.Sprite} */
  #character;
  /** @type {number} */
  #positionX;
  /** @type {number} */
  #positionY;
  /** @type {Phaser.Physics.Arcade.Sprite} */
  overlapper;

  /**
   *
   * @param {Phaser.Scene} scene
   * @param {number} x
   * @param {number} y
   * @param {Phaser.Physics.Arcade.Sprite} character
   * @param {boolean} collide
   */
  constructor(scene, x, y, character, collide = false) {
    super(scene, x, y, SCENE_OBJECT_TILESET_ASSET_KEYS.INDOOR_FURNITURE, 20);

    this.#scene = scene;
    this.#scene.add.existing(this);
    this.#scene.physics.add.existing(this);
    this.#character = character;

    this.#positionX = x;
    this.#positionY = y;

    this.#setOverlap();

    if (collide) {
      this.#setCollider();
    }

    this.setOrigin(0);
    this.setSize(28, 25);
    this.setOffset(3, 3);
    this.setImmovable(true);
  }

  #setCollider() {
    this.#scene.physics.add.collider(this.#character, this);
  }

  #setOverlap() {
    this.overlapper = this.#scene.physics.add
      .sprite(
        this.#positionX,
        this.#positionY,
        SCENE_OBJECT_TILESET_ASSET_KEYS.INDOOR_FURNITURE,
        9
      )
      .setOrigin(0);

    this.overlapper.setSize(40, 40);
    this.overlapper.setOffset(-4, -4);

    this.#scene.physics.add.overlap(this.overlapper, this);
  }
}
