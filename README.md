# Quasar App (testwork-for-1t-babylon)

# Тестовое задание. 

## Стек используемых инструментов:

* Vue js (Composition API), Quasar Framework – пользовательский интерфейс, удобство взаимодействия с приложением.
* Babylon JS – графический движок для реализации трехмерной графики.
* https://doc.babylonjs.com/features/featuresDeepDive/mesh/gizmo – модуль графического движка для трансформации трехмерных объектов.
*https://doc.babylonjs.com/features/featuresDeepDive/events/actions - модуль для обработки событий объектов на сцене.

## Работа приложения: 

- При заходе на страницу приложения появляется интерфейс, где отображается canvas со стандартной сценой вавилона (сфера и поверхность). В самом верху страницы отображаются 4 кнопки-флажка(с использованием одного или несколько видов компонентов квазара q-btn/q-btn-group/q-radio) "Курсор", "Смещение", "Вращение", "Масштабирование". 
- При нажатии на одну из кнопок "Курсор", "Смещение", "Вращение", "Масштабирование" она отмечается (кнопка нажата/утоплена/отмечена галочкой), а с остальных кнопок снимается отметка. В один момент времени может быть отмечена только одна из 4 кнопок. Не допускается снятия отметки со всех кнопок. Всегда отмечена одна из кнопок.
- Добавить выбор объектов на сцене кликом левой кнопки мышки. Изменять базовый материал на материал выделения (можно использовать изменение цвета материала) и возвращать к базовому в случае снятия выделения объекта на сцене.
- При нажатой кнопки "Курсор" деактивируются возможности трансформации объектов на сцене, а элементы gizmo не отображаются на игровой сцене. Но выделенный объект остается выделенным (материалы не меняется).
- При нажатой кнопки "Смещение" активируется возможность перемещения выделенного объекта с помощью gizmo.
- При нажатой кнопки "Вращение" активируется возможность вращения выделенного объекта с помощью gizmo.
- При нажатой кнопки "Масштабирование" активируется возможность масштабирования(изменение размеров) выделенного объекта с помощью gizmo.
- Управление объектом через гизмо должно трансформировать объект и оставлять сохранять его в тех же позициях/повороте/масштабе (чтобы изменения внесенные через gizmo не сбрасывались).

Примечание: 

Разработку нужно вести каждому самостоятельно, в GIT. 
Оставлять грамотные технические коммиты 
Ссылки на репозитории, пожалуйста, скиньте Вашему преподавателю – Ивану Никанорову (желательно как только приступите к выполнению задания) 
Задание необходимо выполнить к 8 мая 2023 г. 


A Quasar Project

## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js).
