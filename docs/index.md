---
layout: home

hero:
  name: "MT Уроки Minecraft Fabric"
  text: "Програмування модів для Minecraft Fabric"
  tagline: "Навчіться створювати моди для Minecraft на платформі Fabric"
  actions:
    - theme: brand
      text: "Уроки Minecraft моддингу"
      link: intro
    - theme: alt
      text: "Перейти на YouTube канал"
      link: https://www.youtube.com/@MEGATREX4Dev
    - theme: alt
      text: "Мій сайт"
      link: https://megatrex4.netlify.app/

features:
  - title: "Основи Minecraft Modding"
    details: "Навчіться створювати власні моди для Minecraft за допомогою Fabric."
  - title: "Розширена документація"
    details: "Отримайте доступ до прикладів коду, API та інструкцій."
  - title: "Підтримка нових версій Minecraft"
    details: "Дізнайтеся, як налаштувати моди для різних версій Minecraft."
---

<style>
.VPHomeHero {
  position: relative; /* необхідно для правильної роботи псевдоелемента */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-bottom: 50px;

  border-radius: 0px 0px 30px 29px!important;
-webkit-border-radius: 0px 0px 30px 29px!important;
-moz-border-radius: 0px 0px 30px 29px!important;
  
}

.VPHomeHero:before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background-image: url("./home.png"); /* Фонове зображення */
  opacity: 0.3; /* Прозорість фону */
  
}

.VPHomeHero:after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;

  
}

</style>
