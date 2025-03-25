import { SCENE_OBJECT_TILESET_ASSET_KEYS } from '../../../assets/asset-keys.js';
import { Character } from '../../character/character.js';

export default class Bed extends Phaser.Physics.Arcade.Sprite {
  /** @type {Phaser.Scene} */
  #scene;
  /** @type {Phaser.Physics.Arcade.Sprite} */
  #character;
  /** @type {number} */
  #positionX;
  /** @type {number} */
  #positionY;
  /** @type {Phaser.GameObjects.Sprite} */
  #quads1;
  /** @type {Phaser.GameObjects.Sprite} */
  #quads2;
  /** @type {Phaser.GameObjects.Sprite} */
  #quads3;
  /** @type {Phaser.GameObjects.Sprite} */
  #quads4;

  /**
   *
   * @param {Phaser.Scene} scene
   * @param {number} x
   * @param {number} y
   * @param {Phaser.Physics.Arcade.Sprite} character
   * @param {boolean} collide
   */
  constructor(scene, x, y, character, collide = false) {
    super(scene, x, y, SCENE_OBJECT_TILESET_ASSET_KEYS.INDOOR_FURNITURE, 9);

    this.#scene = scene;
    this.#scene.add.existing(this);
    this.#scene.physics.add.existing(this);
    this.#character = character;

    this.#positionX = x;
    this.#positionY = y;

    this.#createFrom2Objects();

    if (collide) {
      this.#setCollider();
    }

    this.setOrigin(0);
    this.setSize(64, 55);
    this.setOffset(0, 10);
    this.setImmovable(true);
  }

  #createFrom2Objects() {
    this.#quads1 = this.#scene.add
      .sprite(
        this.#positionX,
        this.#positionY,
        SCENE_OBJECT_TILESET_ASSET_KEYS.INDOOR_FURNITURE,
        13
      )
      .setOrigin(0)
      .setDepth(this.#character.depth + 1);
    this.#quads2 = this.#scene.add
      .sprite(
        this.#positionX,
        this.#positionY + 32,
        SCENE_OBJECT_TILESET_ASSET_KEYS.INDOOR_FURNITURE,
        18
      )
      .setOrigin(0);
    this.#quads3 = this.#scene.add
      .sprite(
        this.#positionX + 32,
        this.#positionY,
        SCENE_OBJECT_TILESET_ASSET_KEYS.INDOOR_FURNITURE,
        14
      )
      .setOrigin(0)
      .setDepth(this.#character.depth + 1);
    this.#quads4 = this.#scene.add
      .sprite(
        this.#positionX + 32,
        this.#positionY + 32,
        SCENE_OBJECT_TILESET_ASSET_KEYS.INDOOR_FURNITURE,
        19
      )
      .setOrigin(0);
  }

  #setCollider() {
    this.#scene.physics.add.collider(this.#character, this);
  }
}
