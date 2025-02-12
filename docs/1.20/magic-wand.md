Вітаю вас, це канал MEGATREX4 Dev! Мене звати Євген, і в цьому уроці ми розглянемо просунуті предмети в Minecraft Fabric 1.20.1. У одному з попередніх відео ми навчилися створювати просунуті предмети, які мають якісь функції та можуть виконувати різні типи взаємодії. Тепер ми спробуємо розширити код максимально наскільки зможемо і створити магічну паличку, що буде створювати часточки через формули та мати унікальну властивість, в руках цей предмет буде 3D, а в інвентарі буде виглядати як 2D спрайт.

Зробімо предмет сам предмет.

Створюємо клас `MagicWandItem`:

```java
public class MagicWandItem extends Item {  
   private static final int MIN_USE_TIME = 40;  
   private static final int MAX_USE_TIME = 100;

   public MagicWandItem(Settings settings) {  
       super(settings);  
   }

   @Override  
   public int getMaxUseTime(ItemStack stack) {  
       return MAX_USE_TIME;  
   }

   @Override  
   public TypedActionResult<ItemStack> use(World world, PlayerEntity player, Hand hand) {  
       player.setCurrentHand(hand);  
       return TypedActionResult.consume(player.getStackInHand(hand));  
   }

   @Override  
   public void onStoppedUsing(ItemStack stack, World world, LivingEntity user, int remainingUseTicks) {  
       if (!world.isClient && user instanceof PlayerEntity player) {  
           ServerWorld serverWorld = (ServerWorld) world;

           int useTime = getMaxUseTime(stack) - remainingUseTicks;  
           if (useTime < MIN_USE_TIME) {  
               return;  
           }

           float charge = (useTime - MIN_USE_TIME) / (float) (MAX_USE_TIME - MIN_USE_TIME);  
           int fireballPower = 2 + Math.round(charge  3);

           spawnFireball(serverWorld, player, fireballPower);  
       }  
   }

   @Override  
   public void usageTick(World world, LivingEntity user, ItemStack stack, int remainingUseTicks) {  
       if (!world.isClient && user instanceof PlayerEntity player) {  
           spawnParticles((ServerWorld) world, player);  
           spawnPentagram((ServerWorld) world, player);  
       }  
   }

   private void spawnPentagram(ServerWorld world, PlayerEntity player) {  
       double radius = 2.0;  
       double centerX = player.getX();  
       double centerZ = player.getZ();  
       double y = player.getY() + 0.1;

       Vec3d[] points = new Vec3d[5];  
       for (int i = 0; i < 5; i++) {  
           double angle = Math.toRadians(72  i - 90);  
           double x = centerX + Math.cos(angle)  radius;  
           double z = centerZ + Math.sin(angle)  radius;  
           points[i] = new Vec3d(x, y, z);  
       }

       int[] starIndices = {0, 2, 4, 1, 3, 0};  
       for (int i = 0; i < starIndices.length - 1; i++) {  
           drawParticleLine(world, points[starIndices[i]], points[starIndices[i + 1]]);  
       }

       drawCircle(world, centerX, y, centerZ, radius + 0.3, 24);  
   }

   private void drawParticleLine(ServerWorld world, Vec3d start, Vec3d end) {  
       int steps = 10;  
       for (int i = 0; i <= steps; i++) {  
           double t = i / (double) steps;  
           double x = start.x + (end.x - start.x)  t;  
           double y = start.y + (end.y - start.y)  t;  
           double z = start.z + (end.z - start.z)  t;  
           world.spawnParticles(ParticleTypes.FLAME, x, y, z, 1, 0, 0, 0, 0);  
       }  
   }

   private void drawCircle(ServerWorld world, double centerX, double y, double centerZ, double radius, int points) {  
       for (int i = 0; i < points; i++) {  
           double angle = Math.toRadians(i  (360.0 / points));  
           double x = centerX + Math.cos(angle)  radius;  
           double z = centerZ + Math.sin(angle)  radius;  
           world.spawnParticles(ParticleTypes.SMOKE, x, y, z, 1, 0, 0, 0, 0);  
       }  
   }

   private void spawnParticles(ServerWorld world, PlayerEntity player) {  
       for (int i = 0; i < 10; i++) {  
           double angle = Math.PI  2  (i / 10.0);  
           double x = player.getX() + Math.cos(angle)  0.5;  
           double z = player.getZ() + Math.sin(angle)  0.5;  
           double y = player.getY() + 1.2;  
           world.spawnParticles(ParticleTypes.ENCHANT, x, y, z, 1, 0, 0.1, 0, 0);  
       }  
   }

   private void spawnFireball(ServerWorld world, PlayerEntity player, int power) {  
       Vec3d lookVec = player.getRotationVec(1.0F);  
       FireballEntity fireball = new FireballEntity(world, player, lookVec.x, lookVec.y, lookVec.z, power);  
       fireball.setPosition(player.getX(), player.getY() + 1.5, player.getZ());  
       world.spawnEntity(fireball);  
   }  
}
```

Додаємо його в `ItemRegistry`:

```java
public static final Item MAGIC_WAND = registerItems("magic_wand", new MagicWandItem(new FabricItemSettings().maxCount(1)));
```

Тепер при натисканні ПКМ з'являтимуться частинки, а після закінчення використання буде з’являтись вогняна куля. Але на цьому ми не зупинимось, ми зробимо так щоб предмет в GUI мав 2d модель, а в руках гравця мав вже 3d модель.

А тепер треба бути уважними, бо зараз буде ще складніша частина, ми будемо використовувати Maxin

Mixin – це спосіб, яким моди змінюють поведінку базового коду Minecraft. Зазвичай у нас немає прямого доступу до коду Minecraft, і ми не можемо просто взяти й переписати його. Але Mixin дозволяє нам «вклинитися» в існуючі класи Minecraft і додати туди свої зміни.

простіше кажучи ми кажемо що перед(або після) тим щоб зробити щось має виконатись наш код, тож почнімо:

спочатку нам треба розширити наш клас `ItemRegistry`, в цього ми маємо додати нові функції та змінні

```java
...
public static final List<Item> CUSTOM_MODEL_ITEMS = new ArrayList<>();

static {
   CUSTOM_MODEL_ITEMS.add(MAGIC_WAND);
}

public static String getIdentifier(Item item) {
   return Registries.ITEM.getId(item).getPath();
...
}
```
Це ми робимо для спрощення застосування функції, що будуть далі, бо, наприклад якщо в нас багато таких предметів, ми не будемо хотіти писати купу однакового коду.

Ми створили список, змінну та метод, через який ми будемо швидко отримувати ідентифікатори моделей предметів, в змінну ми додали нашу паличку.

Тепер нам потрібно створити 3 нові класи в каталозі `maxin` `ItemRendererAccessor`, `ItemRendererMixin`, `ModelLoaderMixin`.
```java
@Mixin(ItemRenderer.class)

public interface ItemRendererAccessor {
   @Accessor("models")
   ItemModels tutorial$getModels();
}
```

цей Maxin нам допомагає отримати доступ до закритого `private` або `protected` класу, У цьому випадку ми хочемо отримати доступ до моделей і змінювати як нам цього хочеться.

```java
@Mixin(ItemRenderer.class)

public abstract class ItemRendererMixin {
   @ModifyVariable(method = "renderItem", at = @At(value = "HEAD"), argsOnly = true)
   public BakedModel useCustomModel(BakedModel value, ItemStack stack, ModelTransformationMode renderMode, boolean leftHanded, MatrixStack matrices, VertexConsumerProvider vertexConsumers, int light, int overlay) {
       if (ItemRegistry.CUSTOM_MODEL_ITEMS.contains(stack.getItem()) && renderMode != ModelTransformationMode.GUI) {
           String modelPath = ItemRegistry.getIdentifier(stack.getItem()) + "_3d";
           return ((ItemRendererAccessor) this).tutorial$getModels().getModelManager().getModel(new ModelIdentifier(Tutorial.MOD_ID, modelPath, "inventory"));
       }
       return value;
   }
}
```

тут ми отримуємо доступ до методу або ж функції `renderItem` в класі `ItemRenderer`, щоб змінити модель і застосувати, зверніть увагу що ми використовуємо всі предмети в `CUSTOM_MODEL_ITEMS`

щось схоже ми робимо і в `ModelLoaderMixin`

```java
@Mixin(ModelLoader.class)

public abstract class ModelLoaderMixin {
   @Shadow
   protected abstract void addModel(ModelIdentifier modelId);
   @Inject(method = "<init>", at = @At(value = "INVOKE", target = "Lnet/minecraft/client/render/model/ModelLoader;addModel(Lnet/minecraft/client/util/ModelIdentifier;)V", ordinal = 3, shift = At.Shift.AFTER))
   public void addCustomModels(BlockColors blockColors, Profiler profiler, Map<Identifier, JsonUnbakedModel> jsonUnbakedModels, Map<Identifier, List<ModelLoader.SourceTrackedData>> blockStates, CallbackInfo ci) {
       ItemRegistry.CUSTOM_MODEL_ITEMS.forEach(item -> {
           String modelPath = ItemRegistry.getIdentifier(item) + "_3d";
           this.addModel(new ModelIdentifier(Tutorial.MOD_ID, modelPath, "inventory"));
       });
   }
}
```

Не забудьте додати свої нові Maxin’и до `tutorial.mixins.json`

```json
   {
	"required": true,
	"package": "com.megatrex4.mixin",
	"compatibilityLevel": "JAVA_17",
	"mixins": [
		"ExampleMixin",
		"ItemRendererAccessor",// [!code focus] [!code ++]
		"ItemRendererMixin",// [!code focus] [!code ++]
		"ModelLoaderMixin"// [!code focus] [!code ++]
	],
	"injectors": {
		"defaultRequire": 1
	}
}
```

Тепер нам треба додати моделі, текстури, локалізаційні рядки до каталогів.

У нас буде декілька моделей, як я казав в попередніх уроках майнкрафт це статична гра і додавати щось на льоту складно, тому ми маємо додати дві моделі, створюємо новий файл `magic_wand.json`, це наш спрайт, тому тут вже типова модель для нас 

```json
{
 "parent": "minecraft:item/generated",
 "textures": {
   "layer0": "tutorial:item/magic_wand"
 }
}
```

ми використовуємо генерацію моделі предмету, зі спрайту `magic_wand`, а от для 3d моделі ми маємо створити модель в BlockBench, або іншій програмі що вам підходить, але головне щоб вона підтримувала формат моделей для майнкрафту. В мене вона вже готова і мені досить її перенести в каналог `models/item`, назва у нас буде така ж, але з закінченням 3d, для нашої палички це `magic_wand_3d.json`, в середині файлу не забудьте змінити шлях до текстур, для моєї моделі це буде `tutorial:item/magic_wand_3d`

Посилання на моделі та текстури будуть в описі. Переміщаємо наші текстури в папку `textures/item` як і зазначено в моделях, а також додаємо новий локалізаційний рядок 

```json
{
    ...
    "item.tutorial.fabric": "Fabric",
    "item.tutorial.magic_wand": "Magic Wand" // [!code focus] [!code ++]
    
    "block.tutorial.sapphire_block": "Sapphire Block",
    "block.tutorial.sapphire_ore": "Sapphire Ore",
    ...
}
```
Можемо заходити в гру та перевіряти, як ви бачите модель в меню в нас 2D, а якщо ми візьмемо у руку, то вона стане 3D доки ми тримаємо ПКМ з предметом у руках в нас йде “заряджання” на 5 секунду воно скидається упродовж всього касту ми бачимо пентаграму та часточки зачарування, після того, як ми тримаємо як мінімум 2 секунди та відпустимо ПКМ паличка випускає вогняний заряд.

Дякую за ваш перегляд, не забувайте, що в нас є Discord сервер на якому ви можете поставити питання та поділитись своєю роботою.