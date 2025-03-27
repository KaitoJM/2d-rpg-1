import { SCENE_OBJECT_TILESET_ASSET_KEYS } from '../../../assets/asset-keys.js';
import { Character } from '../../character/character.js';

export default class BedSingle extends Phaser.Physics.Arcade.Sprite {
  /** @type {Phaser.Scene} */
  #scene;
  /** @type {Phaser.Physics.Arcade.Sprite} */
  #character;
  /** @type {number} */
  #positionX;
  /** @type {number} */
  #positionY;
  /** @type {Phaser.GameObjects.Sprite} */
  #half1;
  /** @type {Phaser.GameObjects.Sprite} */
  #half2;
  /** @type {Phaser.Physics.Arcade.Sprite} */
  interactionArea;

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
    this.#setOverlap();

    if (collide) {
      this.#setCollider();
    }

    this.setOrigin(0);
    this.setSize(32, 55);
    this.setOffset(0, 10);
    this.setImmovable(true);
  }

  #createFrom2Objects() {
    this.#half1 = this.#scene.add
      .sprite(
        this.#positionX,
        this.#positionY,
        SCENE_OBJECT_TILESET_ASSET_KEYS.INDOOR_FURNITURE,
        11
      )
      .setOrigin(0)
      .setDepth(this.#character.depth + 1);
    this.#half2 = this.#scene.add
      .sprite(
        this.#positionX,
        this.#positionY + 32,
        SCENE_OBJECT_TILESET_ASSET_KEYS.INDOOR_FURNITURE,
        16
      )
      .setOrigin(0);
  }

  #setCollider() {
    this.#scene.physics.add.collider(this.#character, this);
  }

  #setOverlap() {
    this.interactionArea = this.#scene.physics.add
      .sprite(
        this.#positionX,
        this.#positionY,
        SCENE_OBJECT_TILESET_ASSET_KEYS.INDOOR_FURNITURE,
        9
      )
      .setOrigin(0);

    this.interactionArea.setSize(42, 65);
    this.interactionArea.setOffset(-5, 5);
    this.interactionArea.setImmovable(true);
    this.#scene.physics.add.overlap(this.interactionArea, this);
  }
}
