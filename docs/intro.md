# Вітаємо на уроці з моддингу Minecraft!

Цей розділ призначений для тих, хто хоче поглибити свої знання про створення модів для **Minecraft** за допомогою **Fabric**. Незалежно від того, чи ви новачок у світі моддингу, чи вже маєте досвід, ці уроки допоможуть вам опанувати основи та створити власні моди.

Ми розпочнемо з налаштування середовища для розробки, щоб ви могли без проблем почати писати код, а потім перейдемо до більш складних концепцій, таких як створення нових предметів, об'єктів, механік гри та багато іншого. 

Цей курс орієнтований на Minecraft версії **1.20** і **1.21**, тому ви зможете дізнатися про нові можливості і змінені механіки в кожній версії. Тепер ви можете створювати унікальні моди та ділитися ними з іншими!

Готові розпочати? Тоді давайте почнемо з основ — налаштуємо вашу IDE для подальшої розробки!

<!-- Кнопки для переходу -->
<div class="action-buttons">
  <a class="buttons" @click="go120">Відкрити 1.20</a>

  <a class="buttons" @click="go121">Відкрити 1.21</a>
</div>

<script setup>
function go120() {
  window.location.href = "/MTTutorials/1.20/index.html";
}

function go121() {
  window.location.href = "/MTTutorials//1.21/index.html";
}

</script>

<style>
    .buttons{
    display: block;
    border: 1px solid var(--vp-c-divider);
    color: var(--vp-c-brand-1)!important;
    border-radius: 8px;
    padding: 11px 16px 13px;
    min-width: 300px;
    max-width: 300px;
    height: 100%;
    transition: border-color 0.25s;
    text-decoration: none!important;
    }

    .buttons:hover{
        border-color: var(--vp-c-brand-1);
        color: var(--vp-c-brand-1)!important;
        cursor: pointer;
    }

    .action-buttons {
    display: flex;
    gap: 16px;
    align-content: center;
    justify-content: center;
    align-items: center;
}
</style>