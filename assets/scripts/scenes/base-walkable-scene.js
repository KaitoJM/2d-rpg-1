import { DIRECTION } from '../common/direction.js';
import { Character } from '../components/character/character.js';

export class BaseWalkableScene extends Phaser.Scene {
  /** @type {Character} */
  character;
  /** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
  #cursorKeys;
  /** @type {number} */
  #mapWidth;
  /** @type {number} */
  #mapHeight;

  constructor(scene_key, mapWidth, mapHeight) {
    super({
      key: scene_key,
    });
    this.#mapWidth = mapWidth;
    this.#mapHeight = mapHeight;
  }

  create() {
    this.character = new Character(this);
    this.character.createCharacter();
    this.#cursorKeys = this.input.keyboard.createCursorKeys();
  }

  update() {
    /** @type {import("../common/direction.js").Direction} */
    let selectedDirection = DIRECTION.NONE;
    if (this.#cursorKeys.left.isDown) {
      selectedDirection = DIRECTION.LEFT;
    } else if (this.#cursorKeys.right.isDown) {
      selectedDirection = DIRECTION.RIGHT;
    } else if (this.#cursorKeys.up.isDown) {
      selectedDirection = DIRECTION.UP;
    } else if (this.#cursorKeys.down.isDown) {
      selectedDirection = DIRECTION.DOWN;
    }

    this.character.handleMovement(selectedDirection);
  }

  /**
   *
   * @param {string} MAP_KEY
   * @param {string} TILE_SET
   * @param {string} TILE_SET_KEY
   * @param {number[]} COLLISION
   * @param {number[]=} EXCLUDE_COLLISION
   */
  buildMap(
    MAP_KEY,
    TILE_SET,
    TILE_SET_KEY,
    COLLISION,
    EXCLUDE_COLLISION = null
  ) {
    const map = this.make.tilemap({ key: MAP_KEY });
    const tileset = map.addTilesetImage(TILE_SET, TILE_SET_KEY);

    const groundLayer = map.createLayer('GroundLayer', tileset, 0, 0);

    groundLayer.setCollision(COLLISION);

    if (Array.isArray(EXCLUDE_COLLISION) && EXCLUDE_COLLISION.length > 0) {
      groundLayer.setCollisionByExclusion(EXCLUDE_COLLISION);
    }

    this.physics.add.collider(this.character.characterGameObject, groundLayer);

    const camera = this.cameras.main;
    camera.setBounds(0, 0, this.#mapWidth, this.#mapHeight);
  }
}
