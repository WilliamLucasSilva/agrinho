        const canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");

        class NPC {
            constructor(info, location, spriteImg) {
                this.info = info;
                this.location = location;
                this.sprite = {
                    img: new Image(),
                    width: 264,
                    height: 264,
                    x: 0,
                    y: 0,
                    rows: 4,
                    columns: 4,
                    frame: {
                        width: 64,
                        height: 64,
                        cur: 0,
                        count: 4,
                    },
                };
                this.sprite.img.src = spriteImg;
                this.state = {
                    direction: {
                        front: 0,
                        left: 1,
                        right: 2,
                        back: 3,
                    },
                    isMoving: false,
                };
            }

            draw() {
                ctx.beginPath();
                ctx.drawImage(
                    this.sprite.img,
                    this.sprite.x, this.sprite.y,
                    this.sprite.frame.width, this.sprite.frame.height,
                    this.location.x, this.location.y,
                    this.sprite.frame.width, this.sprite.frame.height
                );
            }

            move(d) {
                if (d !== "") {
                    this.state.isMoving = true;
                }
                if (this.state.isMoving) {
                    if (d === "right") {
                        this.location.x += 8;
                        this.sprite.y = this.state.direction.right * this.sprite.frame.height;
                    }
                    if (d === "left") {
                        this.location.x -= 8;
                        this.sprite.y = this.state.direction.left * this.sprite.frame.height;
                    }
                    if (this.location.x % this.sprite.frame.width === 0 && this.location.y % this.sprite.frame.height === 0) {
                        this.state.isMoving = false;
                    }
                }
            }
        }

        const player = {
            location: {
                x: 0,
                y: 0,
            },
            state: {
                direction: {
                    front: {
                        state: false,
                        row: 0,
                    },
                    left: {
                        state: false,
                        row: 1,
                    },
                    right: {
                        state: false,
                        row: 2,
                    },
                    back: {
                        state: false,
                        row: 3,
                    },
                },
                isMoving: false,
            },
            sprite: {
                img: new Image(),
                width: 264,
                height: 264,
                x: 0,
                y: 0,
                rows: 4,
                columns: 4,
                frame: {
                    width: 64,
                    height: 64,
                    cur: 0,
                    count: 4,
                },
            },
        };

        const marcos = new NPC({ nome: "marcos", type: "talker" }, { x: 256, y: 256 }, "./assets/enemy.png");

        function setup() {
            document.addEventListener("keydown", (k) => {
                switch (k.key) {
                    case "d":
                    case "ArrowRight":
                        player.state.isMoving = true;
                        player.state.direction.right.state = true;
                        break;
                    case "a":
                    case "ArrowLeft":
                        player.state.isMoving = true;
                        player.state.direction.left.state = true;
                        break;
                    case "s":
                    case "ArrowDown":
                        player.state.isMoving = true;
                        player.state.direction.front.state = true;
                        break;
                    case "w":
                    case "ArrowUp":
                        player.state.isMoving = true;
                        player.state.direction.back.state = true;
                        break;
                }
            });

            player.sprite.img.src = "./assets/sprites.png";
            player.sprite.img.onload = function() {
                draw();
            };
        }

        let moveList = [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        ]
        let index = 0

        function marcosMove() {
            if (index >= moveList.length) {
                index = 0;
            }
            let m = moveList[index]
            if (m == 1) {
                marcos.move("right")
            }
            if (m == 2) {
                marcos.move("left")
            }
            index++
        }

        setup();

        function updateFrame() {
            player.sprite.frame.cur = ++player.sprite.frame.cur % player.sprite.frame.count;
            player.sprite.x = player.sprite.frame.cur * player.sprite.frame.width;
        }

        function changeDirection(d) {
            player.sprite.y = d.row * player.sprite.frame.height;
        }

        function moving() {
            if (player.state.direction.right.state && player.state.direction.left.state) { player.state.direction.left.state = false; }
            if (player.state.direction.back.state && player.state.direction.front.state) { player.state.direction.front.state = false; }
            if (player.state.direction.back.state && (player.state.direction.right.state || player.state.direction.left.state)) {
                player.state.direction.right.state = false;
                player.state.direction.left.state = false;
            }
            if (player.state.direction.front.state && (player.state.direction.right.state || player.state.direction.left.state)) {
                player.state.direction.right.state = false;
                player.state.direction.left.state = false;
            }
            if (player.state.direction.right.state) {
                player.location.x += 8;
                changeDirection(player.state.direction.right);
            }
            if (player.state.direction.left.state) {
                player.location.x -= 8;
                changeDirection(player.state.direction.left);
            }
            if (player.state.direction.front.state) {
                player.location.y += 8;
                changeDirection(player.state.direction.front);
            }
            if (player.state.direction.back.state) {
                player.location.y -= 8;
                changeDirection(player.state.direction.back);
            }
            if (player.location.x % 64 === 0 && player.location.y % 64 === 0) {
                player.state.direction.right.state = false;
                player.state.direction.left.state = false;
                player.state.direction.front.state = false;
                player.state.direction.back.state = false;
                player.state.isMoving = false;
            }
        }

        function draw() {
            if (player.state.isMoving) {
                updateFrame();
                moving();
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.beginPath();
            ctx.drawImage(
                player.sprite.img,
                player.sprite.x, player.sprite.y,
                player.sprite.frame.width, player.sprite.frame.height,
                player.location.x, player.location.y,
                player.sprite.frame.width, player.sprite.frame.height
            );

            marcos.draw();

            marcosMove()

            requestAnimationFrame(draw);
        }
            