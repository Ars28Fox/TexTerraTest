Шаблон верстки
========


Внимание!!!
svg для background / content должен вставляться через [embedurl](http://stylus-lang.com/docs/functions.url.html#utf8-encoding-for-svgs)
например
```
.foo
	background-image embedurl('../images/icon-eye-off.svg', 'utf8') // обязательно указывайте кодировку utf8
	&:after
		content: embedurl('../images/some-image.svg', 'utf8')
```

### Зависимости
```bash
npm i -g webpack || yarn add global webpack
npm i			 || yarn
```

### Сборка
Девелоп сборка c `browser-sync`:
```bash
npm run build:dev  || yarn build:dev
```
Продакшн сборка:
```bash
npm run build:prod || yarn build:prod
```

### Релиз
Релиз на сервер:
```bash
yarn sftp
```

Сборка + релиз:
```bash
npm run release || yarn release
```
