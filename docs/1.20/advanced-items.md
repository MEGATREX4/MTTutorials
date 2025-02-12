Вітаю вас, це канал MEGATREX4 Dev! Мене звати Євген, і в цьому уроці ми розглянемо просунуті предмети в Minecraft Fabric 1.20.1. У одному з попередніх відео ми навчилися створювати базові/примітивні предмети, які не мають функціоналу. Тепер навчимося створювати предмети, що взаємодіють зі світом, блоками та записують дані в NBT.

---

## 1. Записуючий кристал (NBT)

Спочатку створимо предмет, який зберігатиме кількість використань у своїх NBT-даних. Назвемо його "Записуючий кристал".

У пакунку `items` створюємо новий клас `RecordingCrystalItem`:

```java
public class RecordingCrystalItem extends Item {  
   public RecordingCrystalItem(Settings settings) {  
       super(settings);  
   }

   @Override  
   public TypedActionResult<ItemStack> use(World world, PlayerEntity player, Hand hand) {  
       ItemStack stack = player.getStackInHand(hand);  
       NbtCompound nbt = stack.getOrCreateNbt();  
       int uses = nbt.getInt("uses") + 1;  
       nbt.putInt("uses", uses);

       player.sendMessage(Text.translatable("item.tutorial.recording_crystal.used", uses), true);  
       return TypedActionResult.success(stack);  
   }  
}
```
Тепер реєструємо цей предмет в `ItemRegistry`:
```java
public static final Item RECORDING_CRYSTAL = registerItems("recording_crystal",
    new RecordingCrystalItem(new FabricItemSettings().maxCount(1)));
```
Тепер при використанні предмета зберігається кількість натискань.

це дуже простий код, але він може знадобитись для чогось серйознішого.

---

## 2. Ліхтар дослідника (Блок світла)

Останній предмет буде випромінювати світло при використанні. Назвемо його "Ліхтар дослідника".

Створюємо клас `ExplorerLanternItem`:
```java
public class ExplorerLanternItem extends Item {  
   public ExplorerLanternItem(Settings settings) {  
       super(settings);  
   }

   @Override  
   public TypedActionResult<ItemStack> use(World world, PlayerEntity player, Hand hand) {  
       if (!world.isClient) {  
           world.setBlockState(player.getBlockPos(), Blocks.LIGHT.getDefaultState()
           .with(LightBlock.LEVEL_15, 15));  
           player.sendMessage(Text.translatable("item.tutorial.explorer_lantern.used"), true);  
       }  
       return TypedActionResult.success(player.getStackInHand(hand));  
   }  
}
```
Додаємо до `ItemRegistry`:
```java
public static final Item EXPLORER_LANTERN = registerItems("explorer_lantern", 
    new ExplorerLanternItem(new FabricItemSettings().maxCount(1)));
```
Цей предмет створюватиме тимчасове джерело світла при використанні.

---

Не забудьте додати значення до ItemGroupRegistry, що ми робили раніше, щоб предмети були присутні у творчому меню.
```java
entries.add(ItemRegistry.EXPLORER_LANTERN);
entries.add(ItemRegistry.RECORDING_CRYSTAL);
```
Та обов’язково додати нові локалізаційні значення.

---

На цьому все! Ми створили три просунуті предмети, які працюють з NBT, взаємодіють зі світом і додають світлові ефекти. У наступному уроці ми розглянемо ще складніші механіки. Дякую за перегляд, ставте лайки та підписуйтесь на канал MEGATREX4 Dev!

