### Как начать
* Скачать и установить [Nodejs](https://nodejs.org/en/download/stable/).
* `npm install` из папки репозитория.
* Открой в вашем любимо редакторе.
* Откройте терминал и напишите `npm test`.

### Как выполнять задания
Задачи находятся в папке **task**. Каждый модуль содержит задачи по определенными темам. Каждая задача как правило это обычная функция которую нужно дописать:
```javascript
  /**
   * Returns the result of concatenation of two strings.
   *
   * @param {string} value1
   * @param {string} value2
   * @return {string}
   *
   * @example
   *   'aa', 'bb' => 'aabb'
   *   'aa',''    => 'aa'
   *   '',  'bb'  => 'bb'
   */
  function concatenateStrings(value1, value2) {
     throw new Error('Not implemented');
  }
```
* Что бы начать решать функцию нужно удалить строчку
```javascript
     throw new Error('Not implemented');
```
* Решаете задачу по условию, что написано выше и запускаете `npm test` и проверяете правильно ли решена задача.
* Если тест не пройдет - исправляете функцию и снова запускаете тест. 
```javascript
  function concatenateStrings(value1, value2) {
     return value1 + value2
  }
```
* Повторяете действия пока тест не будет пройден верно. 



