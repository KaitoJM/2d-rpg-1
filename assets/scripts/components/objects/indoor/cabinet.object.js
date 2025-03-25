import { SCENE_OBJECT_TILESET_ASSET_KEYS } from '../../../assets/asset-keys.js';
import { Character } from '../../character/character.js';

export default class Cabinet extends Phaser.Physics.Arcade.Sprite {
  /** @type {Phaser.Scene} */
  #scene;
  /** @type {Phaser.Physics.Arcade.Sprite} */
  #character;
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
   * @param {boolean} collide
   */
  constructor(scene, x, y, character, collide = false) {
    super(scene, x, y, SCENE_OBJECT_TILESET_ASSET_KEYS.INDOOR_FURNITURE, 22);

    this.#scene = scene;
    this.#scene.add.existing(this);
    this.#scene.physics.add.existing(this);
    this.#character = character;

    this.#positionX = x;
    this.#positionY = y;

    if (collide) {
      this.#setCollider();
    }

    this.setOrigin(0);
    this.setImmovable(true);
  }

  #setCollider() {
    this.#scene.physics.add.collider(this.#character, this);
  }
}
