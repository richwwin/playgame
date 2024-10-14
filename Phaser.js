const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
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
    // Load images for crane and objects
    this.load.image('crane', 'assets/crane.png');
    this.load.image('arm', 'assets/arm.png');
    this.load.image('claw', 'assets/claw.png');
    this.load.image('object', 'assets/object.png');
}

function create() {
    // Crane base
    crane = this.physics.add.image(400, 100, 'crane').setImmovable(true);
    
    // Crane arm
    arm = this.physics.add.image(400, 200, 'arm').setImmovable(true);
    
    // Claw
    claw = this.physics.add.image(400, 300, 'claw').setImmovable(false).setInteractive();

    // Allow keyboard input for crane movement
    cursors = this.input.keyboard.createCursorKeys();
    grabKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
    // Objects to grab
    objects = this.physics.add.group({
        key: 'object',
        repeat: 5,
        setXY: { x: 100, y: 450, stepX: 100 }
    });

    // Add collision detection between claw and objects
    this.physics.add.overlap(claw, objects, grabObject, null, this);
}

function update() {
    // Crane movement controls
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

    // Grab and release logic
    if (Phaser.Input.Keyboard.JustDown(grabKey)) {
        // If claw is empty, grab object
        if (!claw.getData('isGrabbing')) {
            claw.setData('isGrabbing', true);
        } else {
            // Release the object
            claw.setData('isGrabbing', false);
        }
    }
}

function grabObject(claw, object) {
    if (claw.getData('isGrabbing')) {
        object.setVelocity(0, 0);  // Stop object movement
        object.setX(claw.x);  // Attach object to claw
        object.setY(claw.y + 20);
    } else {
        object.setVelocity(Phaser.Math.Between(-100, 100), 200);  // Drop the object
    }
}
