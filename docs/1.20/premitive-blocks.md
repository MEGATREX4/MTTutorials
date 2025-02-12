Мене звати Євген, і в цих уроках ми будемо вчитися робити моди для Майнкрафту. У попередньому уроці ми навчились додавати предмети, якщо ще не бачили цього відео прошу до плейлиста. В цьому відео ми навчимось додавати різні типи блоків.

За аналогією з предметом нам треба створити новий пакунок, цей буде називатись blocks, ньому ми будемо поміщати усі класи, що відповідають за блоки.

в нашому новоствореному пакунку ми створюємо клас BlockRegistry  

спочатку пишемо “обгортку” як для предмета 

```java
private static Block registerBlock(String name, Block block){
   registerBlockItem(name, block);
   return Registry.register(Registries.BLOCK, new Identifier(Tutorial.MOD_ID, name), block);
}
```
для кожного блока окрім реєстрацій блока треба ще і реєстрація предмета, тому нам треба написати наступний метод, що буде виконувати це для нас

```java
private static void registerBlockItem(String name, Block block){
   Item item = new BlockItem(block, new Item.Settings());
   Registry.register(Registries.ITEM, new Identifier(Tutorial.MOD_ID, name), item);
}
```

обов’язково ми пишемо ще й таку функцію, цю функцію ми будемо викликати в ініціалізації 

```java
public static void ModBlockRegistry() {
   Tutorial.LOGGER.info("Registering Mod Blocks for " + Tutorial.MOD_ID);
}
```

не забудьте, що нам потрібно додати його в головний файл.

```java
BlockRegistry.BlockRegistry();
```

тепер додамо наш перший блок, для прикладу я покажу як додавати різні типи блоків.
```java
public static final Block SAPPHIRE_BLOCK = registerBlock("sapphire_block", 
        new Block(FabricBlockSettings.copyOf(Blocks.DIAMOND_BLOCK).sounds(BlockSoundGroup.STONE)));

public static final Block SAPPHIRE_ORE = registerBlock("sapphire_ore",
       new Block(FabricBlockSettings.copyOf(Blocks.DIAMOND_ORE).sounds(BlockSoundGroup.STONE)));

public static final Block MAPLE_LOG = registerBlock("maple_log",
       new PillarBlock(FabricBlockSettings.copyOf(Blocks.OAK_LOG).sounds(BlockSoundGroup.WOOD)));
```
зверніть увагу що для Клинового дерева ми використовуємо не `Block`, а `PillarBlock`, тому що типу блоків як колоди мають орієнтацію обертання по осі, щоб не виникали помилки ми маємо встановити йому інший клас.

тепер щоб ці блоки у нас отримали моделі та текстури нам потрібно створити JSON файли для станів блоків та текстур, почнемо з станів, для цього в теці `resources/assets/tutorial` створюємо нову теку яка називається `blockstates`, оскільки блоки в майнкрафті статичні нам треба, щоб у нас вже була допоміжна папка в якій будуть описуватись стани блоків, гарним прикладом для нас є колода, або піч, що змінює текстуру коли працює.

почнемо з простих, руда та блок мають дуже просту форму, це просто куб що з усіх сторін має однакову текстуру, тому файл станів буде виглядати так.

`sapphire_block.json`

```json
{
 "variants": {
   " ": { "model": "tutorial:block/sapphire_block" }
 }
}
```
створюємо другий файл для блоку сапфіру

sapphire_ore.json

```json
{
 "variants": {
   " ": { "model": "tutorial:block/sapphire_ore" }
 }
}
```
`maple_log.json` вже складніший, тому нам треба буде докласти трохи зусиль
```json
{
 "variants": {
   "axis=x": { "model": "tutorial:block/maple_log", "x": 90, "y": 90 },
   "axis=y": { "model": "tutorial:block/maple_log" },
   "axis=z": { "model": "tutorial:block/maple_log", "x": 90 }
 }
}
```
в цій частині ми описуємо, що наш блок обертається як то робить колода, тобто ми можемо обернути наш блок на 90 градусів і він буде в нас горизонтальний, або горизонтальний та повернутий до нас “обличчям”.

тепер створимо теку для моделей блоків, в папці models створюємо нову теку block 

як я сказав раніше руда та блок мають просту структуру, тому тут нічого складного 

`sapphire_block.json`
```json
{
 "parent": "block/cube_all",
 "textures": {
   "all": "tutorial:block/sapphire_block"
 }
}
```
`sapphire_ore.json` має такий же самий вигляд, тільки замінений шлях до текстури
```json
{
 "parent": "block/cube_all",
 "textures": {
   "all": "tutorial:block/sapphire_ore"
 }
}
```
для нашої колоди нам треба буде вказати дві текстури, бокову та верхню, тому файл виглядатиме так 

`maple_log.json`
```json
{
 "parent": "block/cube_column",
 "textures": {
   "end": "tutorial:block/maple_log_top",
   "side": "tutorial:block/maple_log"
 }
}
```
Тобто тут ми кажемо, що наш блок це куб-колона, тобто нам треба застосувати дві текстури.

оскільки наші блоки мають також і предметний вигляд, нам треба додати також і моделі для предметів блоків.

тобто в теці `item` ми створюємо ще 3 файли, вони будуть схожі один на один, але з різними шляхами 

`sapphire_block.json`
```json
{
 "parent": "tutorial:block/sapphire_block"
}
```
`sapphire_ore.json`
```json
{
 "parent": "tutorial:block/sapphire_ore"
}
```
`maple_log.json`

```json
{
 "parent": "tutorial:block/maple_log"
}
```


текстури ми поміщаємо в потрібну папку яку ми вказували в шляху

``resources/assets/tutorial/textures/block/``

і додаємо локалізаційні рядки до файлів `us_en.json` та `uk_ua.json`

`en_us.json`
```json
"block.tutorial.sapphire_block": "Sapphire Block",
"block.tutorial.sapphire_ore": "Sapphire Ore",
"block.tutorial.maple_log": "Maple Log",
```
`uk_ua.json`
```json
"block.tutorial.sapphire_block": "Сапфіровий блок",
"block.tutorial.sapphire_ore": "Сапфірова руда",
"block.tutorial.maple_log": "Кленова колода",
```
після того як ми все зробили ми можемо зайти в гру і перевірити чи все працює, сьогодні ви навчились додавати в майнкрафт нові блоки, в наступному відео я розкажу як додати просунутий предмет. Дякую за перегляд побачимось в наступний раз.