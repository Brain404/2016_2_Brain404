// наименование для нашего хранилища кэша
const CACHE_NAME = 'app_serviceworker_v_2';
// ссылки на кэшируемые файлы
const cacheUrls = [
    '/',
    '/css/milligram.min.css',
    '/css/main.css',

    '/semantic/dist/semantic.min.css',
    '/semantic/dist/semantic.min.js',

    '/modules/pathToRegex.js',
    '/modules/view.js',
    '/modules/route.js',
    '/modules/router.js',

    '/models/collectionUser.js',
    '/models/user.js',

    '/img/spritesheet.png',

    '/components/form/form.js',
    '/components/form/form.tmpl.js',
    '/components/button/button.js',
    '/components/menu/menu.tmpl.js',
    '/components/menu/menu.js',
    '/components/message/message.js',
    '/components/scoreboard/scoreboard.tmpl.js',
    '/components/scoreboard/scoreboard.js',
    '/components/aboutTeam/aboutTeam.js',
    '/components/aboutTeam/aboutTeam.tmpl.js',

    '/game/keymaster.js',
    '/game/player.js',
    '/game/game.js',
    '/game/field.js',

    '/views/mainView.js',
    '/views/gameView.js',
    '/views/scoreboardView.js',
    '/views/registerView.js',
    '/views/menuView.js',
    '/views/loginView.js',
    '/views/formView.js',
    '/views/aboutUserView.js',

    '/main.js',
    '/jquery.min.js',
];

this.addEventListener('install', (event) => {
    // задержим обработку события
    // если произойдёт ошибка, serviceWorker не установится
    event.waitUntil(
        // находим в глобальном хранилище Cache-объект с нашим именем
        // если такого не существует, то он будет создан
        caches.open(CACHE_NAME)
        .then((cache) => {
            // загружаем в наш cache необходимые файлы
            return cache.addAll(cacheUrls);
        })
    );
});

this.addEventListener('fetch', (event) => {
    // console.log(event);
    event.respondWith(
        // ищем запрашиваемый ресурс в хранилище кэша
        caches.match(event.request).then((cachedResponse) => {

            // выдаём кэш, если он есть
            if (cachedResponse) {
                return cachedResponse;
            }

            // иначе запрашиваем из сети как обычно
            return fetch(event.request);
        })
    );
});
