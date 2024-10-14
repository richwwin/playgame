const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let crane, arm, claw, objects, cursors;
let grabKey;

function preload() {
    this.load.image('crane', 'assets/crane.png');
    this.load.image('arm', 'assets/arm.png');
    this.load.image('claw', 'assets/claw.png');
    this.load.image('object', 'assets/object.png');
}

function create() {
    crane = this.physics.add.image(400, 100, 'crane').setImmovable(true);
    arm = this.physics.add.image(400, 200, 'arm').setImmovable(true);
    claw = this.physics.add.image(400, 300, 'claw').setImmovable(false).setInteractive();

    cursors = this.input.keyboard.createCursorKeys();
    grabKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
    objects = this.physics.add.group({
        key: 'object',
        repeat: 5,
        setXY: { x: 100, y: 450, stepX: 100 }
    });

    this.physics.add.overlap(claw, objects, grabObject, null, this);
}

function update() {
    if (cursors.left.isDown) {
        crane.x -= 2;
        arm.x -= 2;
        claw.x -= 2;
    } else if (cursors.right.isDown) {
        crane.x += 2;
        arm.x += 2;
        claw.x += 2;
    }

    if (cursors.up.isDown) {
        arm.y -= 2;
        claw.y -= 2;
    } else if (cursors.down.isDown) {
        arm.y += 2;
        claw.y += 2;
    }

    if (Phaser.Input.Keyboard.JustDown(grabKey)) {
        claw.setData('isGrabbing', !claw.getData('isGrabbing'));
    }
}

function grabObject(claw, object) {
    if (claw.getData('isGrabbing')) {
        object.setVelocity(0, 0);
        object.setX(claw.x);
        object.setY(claw.y + 20);
    } else {
        object.setVelocity(Phaser.Math.Between(-100, 100), 200);
    }
}
