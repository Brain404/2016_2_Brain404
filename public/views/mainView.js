(function () {
    // import
    const Button = window.Button;
    const View = window.View;
    const AbouTeam = window.AbouTeam;

    class MainView extends View {
        constructor(options = {}) {
            super(options);
            this.user = options.user;
            this.team = new AbouTeam();
            this._el = document.querySelector('.main_container_view');
            this.createElements();
            this.addElements();
            this.addListeners();
            // this.hide();
        }

        createElements() {
            this.menu = new Menu({
                el: document.createElement('div'),
                classAttrs: ['ui', 'pink', 'inverted', 'vertical', 'labeled', 'massive', 'icon', 'menu'],
                list: [
                    { iconClass: 'sign in icon', lable: 'Логин', clas: 'login' },
                    { iconClass: 'ordered list icon', lable: 'Лидерборд', clas: 'scoreboard' },
                    { iconClass: 'add user icon', lable: 'Регистрация', clas: 'register' }],
            });
        }

        addElements() {
            this._el.appendChild(this.menu.el);
        }

        addListeners() {
            document.querySelector('.menu__login').addEventListener('click', (event) => {
                this.router.go('/login');
            });
            document.querySelector('.menu__scoreboard').addEventListener('click', (event) => {
                this.router.go('/scoreboard');
            });
            document.querySelector('.menu__register').addEventListener('click', (event) => {
                this.router.go('/register');
            });
        }

        menuIcon() {
            const _template = window.fest['views/mainView.tmpl'](this);
            return _template;
        }

        resume() {
            if (this.user.isAuth) {
                this.router.go('/menu');
            } else {
                this._el.style.display = 'block';
                this.team._el.style.display = 'block';
            }
        }

        pause() {
            super.pause();
            this.team._el.style.display = 'none';
        }
    }

    window.MainView = MainView;
}());
