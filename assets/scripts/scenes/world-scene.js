import {
  CHARACTER_ASSET_KEYS,
  SCENE_BG_ASSET_KEYS,
  SCENE_MAP_ASSET_KEYS,
  SCENE_TILESET_ASSET_KEYS,
} from '../assets/asset-keys.js';
import Phaser from '../lib/phaser.js';
import { DIRECTION } from '../common/direction.js';
import { SCENE_KEYS } from './scene-keys.js';
import { Character } from '../components/character/character.js';

export class WorldScene extends Phaser.Scene {
  /** @type {Character} */
  #character;
  /** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
  #cursorKeys;
  /** @type {number} */
  mapWidth;
  /** @type {number} */
  mapHeight;

  constructor() {
    super({
      key: SCENE_KEYS.WORLD_SCENE,
    });
    this.mapWidth = 320;
    this.mapHeight = 352;
  }

  create() {
    this.#buildMap();
    this.#character = new Character(this);
    this.#character.createCharacter();
    this.#cursorKeys = this.input.keyboard.createCursorKeys();
  }

  update() {
    const wasSpaceKeyPressed = Phaser.Input.Keyboard.JustDown(
      this.#cursorKeys.space
    );

    if (wasSpaceKeyPressed) {
      //   this.#battleMenu.handlePlayerInput("OK");
      return;
    }

    if (Phaser.Input.Keyboard.JustDown(this.#cursorKeys.shift)) {
      //   this.#battleMenu.handlePlayerInput("CANCEL");
      return;
    }

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

    this.#character.handleMovement(selectedDirection);
  }

  #buildMap() {
    const map = this.make.tilemap({ key: SCENE_MAP_ASSET_KEYS.JM_HOUSE_MAP });
    const tileset = map.addTilesetImage(
      'cement-house-indoor',
      SCENE_TILESET_ASSET_KEYS.CEMENT_HOUSE_TILESET
    );

    const groundLayer = map.createLayer('GroundLayer', tileset, 0, 0);

    groundLayer.setCollision([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 14, 17, 18, 22, 25, 26, 30, 33, 34, 35, 36,
      37, 38,
    ]);

    const camera = this.cameras.main;
    camera.setBounds(0, 0, this.mapWidth, this.mapHeight);
  }
}
