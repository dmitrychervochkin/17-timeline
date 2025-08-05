# 🕒 17/100 Timeline Component

Интерактивный компонент таймлайна с поддержкой автоматического подсвечивания текущего элемента при прокрутке. Адаптивная верстка, плавный CSS-скролл и выделение активной точки с помощью Intersection Observer. Реализовано в рамках челленджа **"100 проектов"**.

## 🚀 Возможности

-   Плавный скролл через CSS (`scroll-behavior: smooth`)
-   Выделение активного элемента при попадании в зону видимости
-   Переключение позиционирования `.even`
-   Адаптивная верстка под PC и MOBILE
-   Поддержка начального и конечного элемента (`.start`, `.end`)
-   Разметка и стилизация через SCSS

## 🧱 Стек технологий

-   React + TypeScript
-   SCSS (CSS Modules / глобальные классы)
-   Intersection Observer API

## 🧩 Использование

```bash
import { Timeline } from './components/Timeline';

const data = [
  { heading: "Eat", content: "Everything you find in the fridge" },
  { heading: "Sleep", content: "Until you forget what day it is" },
  { heading: "Code", content: "Like there’s no tomorrow" },
  ...
];

<Timeline items={data} />
```

## 📐 Адаптивность

На ширине >500px элементы чередуются слева/справа с выносом маркеров и линий. Используется медиазапрос @media (min-width: 500px).

## Десктоп
![Превью](./public/preview-pc.mov)

## Смартфон
![Превью](./public/preview-mobile.mov)
