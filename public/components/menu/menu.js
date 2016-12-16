(function () {
    class Menu {
        constructor(options) {
            this.list = options.list || [];
            this.attrs = options.attrs || [];
            this.classAttrs = options.classAttrs || [];
            this.el = options.el;
            this.id = options.id || '';
            this.render();
        }

        setAttrs(attrs) {
            attrs.forEach((iter) => {
                Object.keys(iter).forEach((name) => {
                    this.el.setAttribute(name, iter[name]);
                });
            });
        }

        setList(list) {
            this.list = list;
            let _template = window.fest['components/menu/menu.tmpl'](this);

            this.el.innerHTML = _template;
        }

        setClassAttrs(classAttrs) {
            classAttrs.forEach((name) => {
                this.el.classList.add(name);
            });
        }

        render() {
            this.setAttrs(this.attrs);
            this.setClassAttrs(this.classAttrs);
            this.setList(this.list);
            return this;
        }

        toString() {
            return this.el.outerHTML;
        }
  }

    window.Menu = Menu;
}());
