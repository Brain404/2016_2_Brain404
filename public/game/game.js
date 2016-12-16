(function () {
    'use strict';

    const Player = window.Player;
    const KeyMaster = window.KeyMaster;
    const Field = window.Field;

    class Game {
        constructor({ ctx, ctxField, width, height, img }) {
            this.ctx = ctx;
            this.ctxField = ctxField;
            this.width = width;
            this.height = height;
            this.img = img;
            this.key = new KeyMaster();
            this.key.init();
            this.field = new Field({ width: this.width, hight: this.hight, img: this.img, ctx: this.ctxField });
            this.ball = new Player({ img: this.img, x: 100, y: 100, r: 40, color: '#0e751f' });
        }

        start() {
            this.field.draw();
            this.ball.field = this.field.field;
            this.ball.draw(this.ctx);
            this.animate();
        }

        animate() {
            let date = Date.now();
            let doAnimate = () => {
                let localDate = Date.now();
                this.clear(this.ctx);

                this.ball.update(localDate - date);
                this.ball.draw(this.ctx);
                this.ball.checkRectIntersection({
                    width: this.width,
                    height: this.height,
                });

                this.doKeys();
                // console.log(this.ball);

                date = localDate;

                requestAnimationFrame(doAnimate);
            };

            doAnimate();
        }

        doKeys() {
            this.ball.saveState();
            if (this.key.is('w')) {
                this.ball.newStatey = this.ball.y - 1;
            } else if (this.key.is('s')) {
                this.ball.newStatey = this.ball.y + 1;
            } else if (this.key.is('a')) {
                this.ball.newStatex = this.ball.x - 1;
            } else if (this.key.is('d')) {
                this.ball.newStatex = this.ball.x + 1;
            }
            // } else {
            //     if (this.ball.vx > 0) {
            //         this.ball.vx -= 0.05;
            //     }
            //     if (this.ball.vx < 0) {
            //         this.ball.vx += 0.05;
            //     }
            //     if (this.ball.vy > 0) {
            //         this.ball.vy -= 0.05;
            //     }
            //     if (this.ball.vy < 0) {
            //         this.ball.vy += 0.05;
            //     }
            // }
        }

        clear(ctx) {
            ctx.clearRect(0, 0, this.width, this.height);
        }
    }


    // export
    window.Game = Game;

})();
