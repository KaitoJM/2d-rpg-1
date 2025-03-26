import Phaser from './lib/phaser.js';
import { WorldScene } from './scenes/world-scene.js';
import { PreloadScene } from './scenes/preload-scene.js';
import { SCENE_KEYS } from './scenes/scene-keys.js';
import { JMHouseScene } from './scenes/amampacang/houses/jm-house-scene.js';
import { JMHouseRoom2Scene } from './scenes/amampacang/houses/jm-house-room2-scene.js';
import { JMHouseRoom1Scene } from './scenes/amampacang/houses/jm-house-room1-scene.js';
import { JMHouseRoomCRScene } from './scenes/amampacang/houses/jm-house-roomcr-scene.js';
import { ChatBubbleScene } from './scenes/utils/chat-bubble-scene.js';

const game = new Phaser.Game({
  type: Phaser.CANVAS,
  pixelArt: true,
  roundPixels: true,
  scale: {
    parent: 'game-container',
    width: 256,
    height: 224,
    mode: Phaser.Scale.FIT,
    // autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade', // ✅ Ensure physics is enabled!
    arcade: {
      gravity: { y: 0, x: 0 },
      debug: false,
    },
  },
  scene: [PreloadScene],
  backgroundColor: '#FFFFFF',
});

game.scene.add(SCENE_KEYS.CHAT_BUBBLE_SCENE, ChatBubbleScene);
game.scene.add(SCENE_KEYS.WORLD_SCENE, WorldScene);
game.scene.add(SCENE_KEYS.JM_HOUSE_SCENE, JMHouseScene);
game.scene.add(SCENE_KEYS.JM_HOUSE_ROOM1_SCENE, JMHouseRoom1Scene);
game.scene.add(SCENE_KEYS.JM_HOUSE_ROOM2_SCENE, JMHouseRoom2Scene);
game.scene.add(SCENE_KEYS.JM_HOUSE_ROOMCR_SCENE, JMHouseRoomCRScene);
