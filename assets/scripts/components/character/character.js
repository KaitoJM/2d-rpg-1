import { CHARACTER_ASSET_KEYS } from '../../assets/asset-keys.js';
import { DIRECTION } from '../../common/direction.js';
import { exhaustiveGuard } from '../../utils/guard.js';

/** @type {number} */
const step_no = 1;

const playerAnimations = Object.freeze({
  RUN_FRONT: 'RUN_FRONT',
  RUN_TOP: 'RUN_TOP',
  RUN_RIGHT: 'RUN_RIGHT',
  RUN_LEFT: 'RUN_LEFT',
});

export class Character {
  /** @type {Phaser.Scene} */
  #scene;
  /** @type {Phaser.GameObjects.Sprite} */
  /** @type {Phaser.Physics.Arcade.Sprite} */
  characterGameObject;
  /** @type {import("../../common/direction.js").Direction} direction */
  currentDirection;

  /**
   *
   * @param {Phaser.Scene} scene
   */
  constructor(scene) {
    this.#scene = scene;
  }

  createCharacter() {
    this.#initAnimations();
    this.characterGameObject = this.#scene.physics.add
      .sprite(
        this.#scene.cameras.main.width / 2,
        this.#scene.cameras.main.height / 2,
        CHARACTER_ASSET_KEYS.MC_SHEET
      )
      .setOrigin(0.5);

    // this.characterGameObject.setCollideWorldBounds(true);
    this.#scene.cameras.main.startFollow(this.characterGameObject);
    this.characterGameObject.setDepth(10);
  }

  /** @param {import("../../common/direction.js").Direction} direction */
  handleMovement(direction) {
    const speed = 100;
    const body = this.characterGameObject;

    body.setVelocity(0);

    switch (direction) {
      case DIRECTION.LEFT:
        this.#walkLeft();
        body.setVelocityX(-speed);
        break;
      case DIRECTION.RIGHT:
        this.#walkRight();
        body.setVelocityX(speed);
        break;
      case DIRECTION.UP:
        this.#walkUp();
        body.setVelocityY(-speed);
        break;
      case DIRECTION.DOWN:
        this.#walkDown();
        body.setVelocityY(speed);
        break;
      case DIRECTION.NONE:
        this.characterGameObject.anims.stop();
        this.#characterLastDirectionDisplay();
        break;
      default:
        exhaustiveGuard(direction);
    }

    body.body.velocity.normalize().scale(speed);
  }

  #initAnimations() {
    this.#scene.anims.create({
      key: playerAnimations.RUN_FRONT,
      frames: [
        { key: CHARACTER_ASSET_KEYS.MC_SHEET, frame: 4 },
        { key: CHARACTER_ASSET_KEYS.MC_SHEET, frame: 8 },
        { key: CHARACTER_ASSET_KEYS.MC_SHEET, frame: 12 },
        { key: CHARACTER_ASSET_KEYS.MC_SHEET, frame: 16 },
        { key: CHARACTER_ASSET_KEYS.MC_SHEET, frame: 20 },
        { key: CHARACTER_ASSET_KEYS.MC_SHEET, frame: 24 },
        { key: CHARACTER_ASSET_KEYS.MC_SHEET, frame: 28 },
        { key: CHARACTER_ASSET_KEYS.MC_SHEET, frame: 32 },
      ],
      frameRate: 10,
      repeat: -1,
    });

    this.#scene.anims.create({
      key: playerAnimations.RUN_TOP,
      frames: [
        { key: CHARACTER_ASSET_KEYS.MC_SHEET, frame: 5 },
        { key: CHARACTER_ASSET_KEYS.MC_SHEET, frame: 9 },
        { key: CHARACTER_ASSET_KEYS.MC_SHEET, frame: 13 },
        { key: CHARACTER_ASSET_KEYS.MC_SHEET, frame: 17 },
        { key: CHARACTER_ASSET_KEYS.MC_SHEET, frame: 21 },
        { key: CHARACTER_ASSET_KEYS.MC_SHEET, frame: 25 },
        { key: CHARACTER_ASSET_KEYS.MC_SHEET, frame: 29 },
        { key: CHARACTER_ASSET_KEYS.MC_SHEET, frame: 33 },
      ],
      frameRate: 10,
      repeat: -1,
    });

    this.#scene.anims.create({
      key: playerAnimations.RUN_RIGHT,
      frames: [
        { key: CHARACTER_ASSET_KEYS.MC_SHEET, frame: 6 },
        { key: CHARACTER_ASSET_KEYS.MC_SHEET, frame: 10 },
        { key: CHARACTER_ASSET_KEYS.MC_SHEET, frame: 14 },
        { key: CHARACTER_ASSET_KEYS.MC_SHEET, frame: 18 },
        { key: CHARACTER_ASSET_KEYS.MC_SHEET, frame: 22 },
        { key: CHARACTER_ASSET_KEYS.MC_SHEET, frame: 26 },
        { key: CHARACTER_ASSET_KEYS.MC_SHEET, frame: 30 },
        { key: CHARACTER_ASSET_KEYS.MC_SHEET, frame: 34 },
      ],
      frameRate: 10,
      repeat: -1,
    });

    this.#scene.anims.create({
      key: playerAnimations.RUN_LEFT,
      frames: [
        { key: CHARACTER_ASSET_KEYS.MC_SHEET, frame: 7 },
        { key: CHARACTER_ASSET_KEYS.MC_SHEET, frame: 11 },
        { key: CHARACTER_ASSET_KEYS.MC_SHEET, frame: 15 },
        { key: CHARACTER_ASSET_KEYS.MC_SHEET, frame: 19 },
        { key: CHARACTER_ASSET_KEYS.MC_SHEET, frame: 23 },
        { key: CHARACTER_ASSET_KEYS.MC_SHEET, frame: 27 },
        { key: CHARACTER_ASSET_KEYS.MC_SHEET, frame: 31 },
        { key: CHARACTER_ASSET_KEYS.MC_SHEET, frame: 35 },
      ],
      frameRate: 10,
      repeat: -1,
    });
  }

  #walkLeft() {
    this.#moveCharacter();

    this.characterGameObject.anims.play(playerAnimations.RUN_LEFT, true);
    this.currentDirection = DIRECTION.LEFT;
  }

  #walkRight() {
    this.#moveCharacter();

    this.characterGameObject.anims.play(playerAnimations.RUN_RIGHT, true);
    this.currentDirection = DIRECTION.RIGHT;
  }

  #walkUp() {
    this.#moveCharacter();
    this.characterGameObject.anims.play(playerAnimations.RUN_TOP, true);
    this.currentDirection = DIRECTION.UP;
  }

  #walkDown() {
    this.#moveCharacter();
    this.characterGameObject.anims.play(playerAnimations.RUN_FRONT, true);
    this.currentDirection = DIRECTION.DOWN;
  }

  #moveCharacter() {
    const camera = this.#scene.cameras.main;
    camera.startFollow(this.characterGameObject);
  }

  #characterLastDirectionDisplay() {
    switch (this.currentDirection) {
      case DIRECTION.DOWN:
        this.characterGameObject.setFrame(0);
        break;

      case DIRECTION.UP:
        this.characterGameObject.setFrame(1);
        break;

      case DIRECTION.RIGHT:
        this.characterGameObject.setFrame(2);
        break;

      case DIRECTION.LEFT:
        this.characterGameObject.setFrame(3);
        break;

      default:
        break;
    }
  }
}
