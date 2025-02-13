Вітаю вас, це канал MEGATREX4 Dev! Мене звати Євген, і в цьому уроці ми розглянемо просунуті предмети в Minecraft Fabric 1.20.1. У одному з попередніх відео ми навчилися створювати базові/примітивні предмети, які не мають функціоналу. Тепер навчимося створювати предмети, що взаємодіють зі світом, блоками та записують дані в NBT.

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

## 3. Лікувальний камінь

Зараз ми розглянемо ще один спосіб взаємодії — метод `tick`. Це означає, що кожен тік (20 разів на секунду) предмет буде виконувати код. Ми можемо поєднувати використання NBT-даних і методу `tick`. Наприклад, можна додати систему мани для предмета або реалізувати іншу логіку. Головне, що слід пам’ятати — цей метод підходить для предметів, які постійно взаємодіють із грою.

```java
public class HealingStoneItem extends Item {
    public HealingStoneItem(Settings settings) {
        super(settings);
    }

    @Override
    public void inventoryTick(ItemStack stack, World world, Entity entity, int slot, boolean selected) {
        if (entity instanceof PlayerEntity player) {
            if (selected && player.getHealth() < player.getMaxHealth()) {
                if (!stack.hasNbt()) {
                    stack.setNbt(new NbtCompound());
                }

                NbtCompound nbt = stack.getNbt();
                long lastTick = nbt.getLong("lastHealTick");
                long currentTick = world.getTime();

                if (currentTick - lastTick >= 10) {
                    nbt.putLong("lastHealTick", currentTick);

                    if (!world.isClient) {
                        player.heal(0.5f);
                    }

                    if (world.isClient) {
                        int step = 10;
                        for (int i = 0; i < step; i++) {
                            double angle = Math.PI * 2 * (i / (double) step);
                            double x = player.getX() + 1.2 * Math.cos(angle);
                            double y = player.getEyeY() + 0.5;
                            double z = player.getZ() + 1.2 * Math.sin(angle);

                            world.addParticle(ParticleTypes.HEART, x, y, z, 0.1, 0.1, 0);
                        }
                    }
                }
            }
        }
        super.inventoryTick(stack, world, entity, slot, selected);
    }
}

```
і звісно додаємо предмет до `ItemRegistry`:

```java
public static final Item HEALING_STONE = registerItems("healing_stone",
            new HealingStoneItem(new FabricItemSettings().maxCount(1)));
```

Не забудьте додати значення до ItemGroupRegistry, що ми робили раніше, щоб предмети були присутні у творчому меню.
```java
entries.add(ItemRegistry.EXPLORER_LANTERN);
entries.add(ItemRegistry.RECORDING_CRYSTAL);
entries.add(ItemRegistry.HEALING_STONE);
```
Та обов’язково додати нові локалізаційні значення.

---

На цьому все! Ми створили три просунуті предмети, які працюють з NBT, взаємодіють зі світом і додають світлові ефекти. У наступному уроці ми розглянемо ще складніші механіки. Дякую за перегляд, ставте лайки та підписуйтесь на канал MEGATREX4 Dev!

