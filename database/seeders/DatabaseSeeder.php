<?php

namespace Database\Seeders;

use App\Models\Branch;
use App\Models\BranchProductAvailability;
use App\Models\Category;
use App\Models\ModifierGroup;
use App\Models\Order;
use App\Models\Product;
use App\Models\Reservation;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create Roles
        $superAdminRole = Role::firstOrCreate(['name' => 'super-admin']);
        $branchManagerRole = Role::firstOrCreate(['name' => 'branch-manager']);
        $kitchenStaffRole = Role::firstOrCreate(['name' => 'kitchen-staff']);
        $customerRole = Role::firstOrCreate(['name' => 'customer']);

        // 2. Create Branches
        $openingHoursDefault = [
            'monday' => ['open' => '10:00', 'close' => '23:00', 'is_closed' => false],
            'tuesday' => ['open' => '10:00', 'close' => '23:00', 'is_closed' => false],
            'wednesday' => ['open' => '10:00', 'close' => '23:00', 'is_closed' => false],
            'thursday' => ['open' => '10:00', 'close' => '23:00', 'is_closed' => false],
            'friday' => ['open' => '10:00', 'close' => '01:00', 'is_closed' => false],
            'saturday' => ['open' => '11:00', 'close' => '02:00', 'is_closed' => false],
            'sunday' => ['open' => '11:00', 'close' => '23:00', 'is_closed' => false],
        ];

        $branchesData = [
            [
                'name' => 'Aladen Spicy Kebab - Będzin Centrum',
                'slug' => 'bedzin-centrum',
                'address' => 'ul. Małachowskiego 18',
                'city' => 'Będzin',
                'postal_code' => '42-500',
                'lat' => 50.3275000,
                'lng' => 19.1294000,
                'phone' => '+48 32 765 43 21',
                'email' => 'bedzin@aladenkebab.pl',
                'is_active' => true,
                'opening_hours' => $openingHoursDefault,
                'delivery_radius_km' => 12.00,
                'min_order_amount' => 35.00,
                'delivery_fee' => 6.00,
                'free_delivery_threshold' => 75.00,
                'estimated_prep_time_minutes' => 18,
                'estimated_delivery_time_minutes' => 40,
                'dine_in_capacity' => 45,
            ],
            [
                'name' => 'Aladen Spicy Kebab - Sosnowiec Pogoń',
                'slug' => 'sosnowiec-pogon',
                'address' => 'ul. Żytnia 12',
                'city' => 'Sosnowiec',
                'postal_code' => '41-200',
                'lat' => 50.2982000,
                'lng' => 19.1385000,
                'phone' => '+48 32 890 12 34',
                'email' => 'sosnowiec@aladenkebab.pl',
                'is_active' => true,
                'opening_hours' => $openingHoursDefault,
                'delivery_radius_km' => 10.00,
                'min_order_amount' => 35.00,
                'delivery_fee' => 7.00,
                'free_delivery_threshold' => 80.00,
                'estimated_prep_time_minutes' => 20,
                'estimated_delivery_time_minutes' => 45,
                'dine_in_capacity' => 35,
            ],
            [
                'name' => 'Aladen Spicy Kebab - Dąbrowa Górnicza Pogoria',
                'slug' => 'dabrowa-gornicza',
                'address' => 'ul. Sobieskiego 6',
                'city' => 'Dąbrowa Górnicza',
                'postal_code' => '41-300',
                'lat' => 50.3204000,
                'lng' => 19.1947000,
                'phone' => '+48 32 543 21 09',
                'email' => 'dabrowa@aladenkebab.pl',
                'is_active' => true,
                'opening_hours' => $openingHoursDefault,
                'delivery_radius_km' => 11.00,
                'min_order_amount' => 40.00,
                'delivery_fee' => 7.50,
                'free_delivery_threshold' => 85.00,
                'estimated_prep_time_minutes' => 22,
                'estimated_delivery_time_minutes' => 45,
                'dine_in_capacity' => 50,
            ],
            [
                'name' => 'Aladen Spicy Kebab - Katowice Rynek',
                'slug' => 'katowice-rynek',
                'address' => 'ul. Mariacka 24',
                'city' => 'Katowice',
                'postal_code' => '40-014',
                'lat' => 50.2575000,
                'lng' => 19.0253000,
                'phone' => '+48 32 678 90 12',
                'email' => 'katowice@aladenkebab.pl',
                'is_active' => true,
                'opening_hours' => $openingHoursDefault,
                'delivery_radius_km' => 14.00,
                'min_order_amount' => 45.00,
                'delivery_fee' => 8.00,
                'free_delivery_threshold' => 90.00,
                'estimated_prep_time_minutes' => 25,
                'estimated_delivery_time_minutes' => 50,
                'dine_in_capacity' => 60,
            ],
            [
                'name' => 'Aladen Spicy Kebab - Czeladź Piaski',
                'slug' => 'czeladz-piaski',
                'address' => 'ul. Bytomska 44',
                'city' => 'Czeladź',
                'postal_code' => '41-250',
                'lat' => 50.3168000,
                'lng' => 19.0734000,
                'phone' => '+48 32 321 09 87',
                'email' => 'czeladz@aladenkebab.pl',
                'is_active' => true,
                'opening_hours' => $openingHoursDefault,
                'delivery_radius_km' => 9.00,
                'min_order_amount' => 35.00,
                'delivery_fee' => 6.00,
                'free_delivery_threshold' => 75.00,
                'estimated_prep_time_minutes' => 18,
                'estimated_delivery_time_minutes' => 38,
                'dine_in_capacity' => 30,
            ],
        ];

        $branches = [];
        foreach ($branchesData as $bData) {
            $branches[] = Branch::create($bData);
        }

        $bedzinBranch = $branches[0];
        $sosnowiecBranch = $branches[1];

        // 3. Create Key Staff & Users
        $admin = User::create([
            'name' => 'Aladen Master Admin',
            'email' => 'admin@aladenkebab.pl',
            'phone' => '+48 600 100 200',
            'password' => Hash::make('password'),
            'preferred_language' => 'pl',
        ]);
        $admin->assignRole($superAdminRole);

        $bedzinManager = User::create([
            'name' => 'Tariq Al-Mansoor (Manager Będzin)',
            'email' => 'bedzin.manager@aladenkebab.pl',
            'phone' => '+48 601 200 300',
            'branch_id' => $bedzinBranch->id,
            'password' => Hash::make('password'),
            'preferred_language' => 'pl',
        ]);
        $bedzinManager->assignRole($branchManagerRole);

        $bedzinKitchen = User::create([
            'name' => 'Kuchnia Będzin (KDS Staff)',
            'email' => 'bedzin.kitchen@aladenkebab.pl',
            'phone' => '+48 602 300 400',
            'branch_id' => $bedzinBranch->id,
            'password' => Hash::make('password'),
            'preferred_language' => 'pl',
        ]);
        $bedzinKitchen->assignRole($kitchenStaffRole);

        $sosnowiecManager = User::create([
            'name' => 'Michał Kowalczyk (Manager Sosnowiec)',
            'email' => 'sosnowiec.manager@aladenkebab.pl',
            'phone' => '+48 603 400 500',
            'branch_id' => $sosnowiecBranch->id,
            'password' => Hash::make('password'),
            'preferred_language' => 'pl',
        ]);
        $sosnowiecManager->assignRole($branchManagerRole);

        $demoCustomer = User::create([
            'name' => 'Jan Kowalski',
            'email' => 'jan.kowalski@example.com',
            'phone' => '+48 501 234 567',
            'password' => Hash::make('password'),
            'preferred_language' => 'pl',
        ]);
        $demoCustomer->assignRole($customerRole);

        // 4. Modifier Groups & Options
        // Group: Sizes (Rozmiar)
        $sizeGroup = ModifierGroup::create([
            'name' => ['pl' => 'Wybierz Rozmiar', 'en' => 'Choose Size'],
            'selection_type' => 'single',
            'is_required' => true,
            'min_selection' => 1,
            'max_selection' => 1,
            'sort_order' => 1,
        ]);
        $sizeOptions = [
            ['name' => ['pl' => 'Normalny (Standard)', 'en' => 'Normal (Standard)'], 'price_modifier' => 0.00, 'is_default' => true, 'sort_order' => 1],
            ['name' => ['pl' => 'Duży (Large)', 'en' => 'Large'], 'price_modifier' => 6.00, 'is_default' => false, 'sort_order' => 2],
            ['name' => ['pl' => 'Super (45 cm)', 'en' => 'Super (45 cm)'], 'price_modifier' => 13.00, 'is_default' => false, 'sort_order' => 3],
            ['name' => ['pl' => 'Mega (50 cm)', 'en' => 'Mega (50 cm)'], 'price_modifier' => 19.00, 'is_default' => false, 'sort_order' => 4],
            ['name' => ['pl' => 'Special Mega Gigant (55 cm)', 'en' => 'Special Mega Giant (55 cm)'], 'price_modifier' => 26.00, 'is_default' => false, 'sort_order' => 5],
        ];
        foreach ($sizeOptions as $opt) {
            $sizeGroup->options()->create($opt);
        }

        // Group: Meat (Rodzaj Mięsa)
        $meatGroup = ModifierGroup::create([
            'name' => ['pl' => 'Wybór Mięsa', 'en' => 'Meat Selection'],
            'selection_type' => 'single',
            'is_required' => true,
            'min_selection' => 1,
            'max_selection' => 1,
            'sort_order' => 2,
        ]);
        $meatOptions = [
            ['name' => ['pl' => 'Kurczak (Soczysty)', 'en' => 'Juicy Chicken'], 'price_modifier' => 0.00, 'is_default' => true, 'sort_order' => 1],
            ['name' => ['pl' => 'Wołowina / Baranina (Oryginalna)', 'en' => 'Beef / Mutton Mix'], 'price_modifier' => 3.00, 'is_default' => false, 'sort_order' => 2],
            ['name' => ['pl' => 'Mięso Mieszane (Pół na pół)', 'en' => 'Mixed Meat (Half & Half)'], 'price_modifier' => 2.00, 'is_default' => false, 'sort_order' => 3],
            ['name' => ['pl' => 'Falafel (Wegetariański ciecierzyca)', 'en' => 'Falafel (Vegetarian Chickpea)'], 'price_modifier' => 0.00, 'is_default' => false, 'sort_order' => 4],
        ];
        foreach ($meatOptions as $opt) {
            $meatGroup->options()->create($opt);
        }

        // Group: Sauces (Wybór Sosów)
        $sauceGroup = ModifierGroup::create([
            'name' => ['pl' => 'Wybór Sosu (do 2 sosów)', 'en' => 'Sauce Selection (up to 2)'],
            'selection_type' => 'multiple',
            'is_required' => true,
            'min_selection' => 1,
            'max_selection' => 2,
            'sort_order' => 3,
        ]);
        $sauceOptions = [
            ['name' => ['pl' => 'Łagodny czosnkowy (Garlic Mild)', 'en' => 'Mild Garlic'], 'price_modifier' => 0.00, 'is_default' => true, 'sort_order' => 1],
            ['name' => ['pl' => 'Mieszany (Sos firmowy Aladen)', 'en' => 'Aladen Signature Mixed Sauce'], 'price_modifier' => 0.00, 'is_default' => false, 'sort_order' => 2],
            ['name' => ['pl' => 'Ostry (Pikantny)', 'en' => 'Spicy / Hot'], 'price_modifier' => 0.00, 'is_default' => false, 'sort_order' => 3],
            ['name' => ['pl' => 'Mega Ostry (Habanero & Reaper 🔥🔥)', 'en' => 'Mega Hot (Habanero & Reaper 🔥🔥)'], 'price_modifier' => 2.00, 'is_default' => false, 'sort_order' => 4],
            ['name' => ['pl' => 'Sos BBQ', 'en' => 'Smoky BBQ'], 'price_modifier' => 0.00, 'is_default' => false, 'sort_order' => 5],
            ['name' => ['pl' => 'Turecki jogurtowo-ziołowy', 'en' => 'Turkish Herb Yogurt'], 'price_modifier' => 0.00, 'is_default' => false, 'sort_order' => 6],
            ['name' => ['pl' => 'Ketchup łagodny', 'en' => 'Tomato Ketchup'], 'price_modifier' => 0.00, 'is_default' => false, 'sort_order' => 7],
        ];
        foreach ($sauceOptions as $opt) {
            $sauceGroup->options()->create($opt);
        }

        // Group: Addons (Dodatki do Kebaba)
        $addonsGroup = ModifierGroup::create([
            'name' => ['pl' => 'Dodatki ekstra', 'en' => 'Extra Addons'],
            'selection_type' => 'multiple',
            'is_required' => false,
            'min_selection' => 0,
            'max_selection' => 6,
            'sort_order' => 4,
        ]);
        $addonOptions = [
            ['name' => ['pl' => 'Podwójny ser żółty zapiekany', 'en' => 'Extra melted cheese'], 'price_modifier' => 4.50, 'is_default' => false, 'sort_order' => 1],
            ['name' => ['pl' => 'Pikantne papryczki Jalapeño', 'en' => 'Spicy Jalapeños'], 'price_modifier' => 3.50, 'is_default' => false, 'sort_order' => 2],
            ['name' => ['pl' => 'Ser Feta grecki', 'en' => 'Greek Feta Cheese'], 'price_modifier' => 4.00, 'is_default' => false, 'sort_order' => 3],
            ['name' => ['pl' => 'Extra mięso (+70g)', 'en' => 'Extra Meat (+70g)'], 'price_modifier' => 7.00, 'is_default' => false, 'sort_order' => 4],
            ['name' => ['pl' => 'Chrupiące frytki w środku', 'en' => 'Crispy fries inside'], 'price_modifier' => 4.00, 'is_default' => false, 'sort_order' => 5],
            ['name' => ['pl' => 'Prażona chrupiąca cebulka', 'en' => 'Crispy roasted onion'], 'price_modifier' => 2.50, 'is_default' => false, 'sort_order' => 6],
            ['name' => ['pl' => 'Czarne oliwki', 'en' => 'Black Olives'], 'price_modifier' => 3.00, 'is_default' => false, 'sort_order' => 7],
        ];
        foreach ($addonOptions as $opt) {
            $addonsGroup->options()->create($opt);
        }

        // Group: Box/Plate Sides (Dodatki do talerza / kubełka)
        $sidesGroup = ModifierGroup::create([
            'name' => ['pl' => 'Wybór dodatku skrobiowego', 'en' => 'Choice of side'],
            'selection_type' => 'single',
            'is_required' => true,
            'min_selection' => 1,
            'max_selection' => 1,
            'sort_order' => 5,
        ]);
        $sideOptions = [
            ['name' => ['pl' => 'Złociste frytki', 'en' => 'Golden French Fries'], 'price_modifier' => 0.00, 'is_default' => true, 'sort_order' => 1],
            ['name' => ['pl' => 'Ryż po turecku z warzywami', 'en' => 'Turkish spiced rice'], 'price_modifier' => 1.50, 'is_default' => false, 'sort_order' => 2],
            ['name' => ['pl' => 'Opiekane ćwiartki ziemniaków', 'en' => 'Roasted potato wedges'], 'price_modifier' => 2.00, 'is_default' => false, 'sort_order' => 3],
            ['name' => ['pl' => 'Sama świeża surówka (Low carb)', 'en' => 'Salad only (Low carb)'], 'price_modifier' => 0.00, 'is_default' => false, 'sort_order' => 4],
        ];
        foreach ($sideOptions as $opt) {
            $sidesGroup->options()->create($opt);
        }

        // 5. Categories
        $categoriesData = [
            [
                'name' => ['pl' => 'Kebab w cieście (Rollo)', 'en' => 'Rollo Kebabs (Durum)'],
                'description' => ['pl' => 'Świeżo wypiekane ciasto, chrupiące warzywa, wyśmienite mięso i aromatyczne sosy.', 'en' => 'Freshly baked dough, crisp salad, premium meat and artisan sauces.'],
                'slug' => 'rollo-kebab',
                'icon' => 'Flame',
                'sort_order' => 1,
            ],
            [
                'name' => ['pl' => 'Kebab w bułce (Pita)', 'en' => 'Kebab in Pita'],
                'description' => ['pl' => 'Chrupiąca bułka pita z sezamem na ciepło, wypchana po brzegi soczystym mięsem.', 'en' => 'Crispy toasted sesame pita bread generously packed with flavorful meat.'],
                'slug' => 'pita-kebab',
                'icon' => 'UtensilsCrossed',
                'sort_order' => 2,
            ],
            [
                'name' => ['pl' => 'Kapsalon (Zapieczony z serem)', 'en' => 'Kapsalon (Oven Baked)'],
                'description' => ['pl' => 'Holenderski klasyk: frytki, mięso, sosy i kołderka z zapieczonego sera gouda.', 'en' => 'Dutch favorite: fries, meat, sauces melted with thick Gouda cheese.'],
                'slug' => 'kapsalon',
                'icon' => 'Flame',
                'sort_order' => 3,
            ],
            [
                'name' => ['pl' => 'Kebab w kubełku (Box)', 'en' => 'Kebab Box (Kubełek)'],
                'description' => ['pl' => 'Wygodny kubełek z frytkami lub ryżem, mięsem i sosem.', 'en' => 'Convenient on-the-go box with meat, fries, fresh salad and sauces.'],
                'slug' => 'kebab-box',
                'icon' => 'Package',
                'sort_order' => 4,
            ],
            [
                'name' => ['pl' => 'Dania Talerze i Grill', 'en' => 'Grill & Plate Dishes'],
                'description' => ['pl' => 'Obfite dania obiadowe podawane na talerzu ze świeżą surówką i frytkami lub ryżem.', 'en' => 'Full feast plates served with salad, sauce and choice of fries or rice.'],
                'slug' => 'dania-talerze',
                'icon' => 'ChefHat',
                'sort_order' => 5,
            ],
            [
                'name' => ['pl' => 'Dania Wegetariańskie', 'en' => 'Vegetarian & Falafel'],
                'description' => ['pl' => 'Domowy falafel z ciecierzycy, ser halloumi i świeże warzywa z sosem tahini.', 'en' => 'Homemade chickpea falafel, grilled halloumi and fresh veggies.'],
                'slug' => 'wegetarianskie',
                'icon' => 'Leaf',
                'sort_order' => 6,
            ],
            [
                'name' => ['pl' => 'Zestawy i Kurczak', 'en' => 'Chicken Sets & Strips'],
                'description' => ['pl' => 'Chrupiące stripsy, skrzydełka i zestawy dziecięce.', 'en' => 'Crispy tenders, wings, and kids friendly meals.'],
                'slug' => 'zestawy-kurczak',
                'icon' => 'Drumstick',
                'sort_order' => 7,
            ],
            [
                'name' => ['pl' => 'Sałatki', 'en' => 'Fresh Salads'],
                'description' => ['pl' => 'Świeże, orzeźwiające kompozycje warzywne z sosem winegret lub czosnkowym.', 'en' => 'Crisp garden salads with feta, olives, and premium dressings.'],
                'slug' => 'salatki',
                'icon' => 'Salad',
                'sort_order' => 8,
            ],
            [
                'name' => ['pl' => 'Dodatki i Przekąski', 'en' => 'Sides & Extras'],
                'description' => ['pl' => 'Chrupiące frytki belgijskie, krążki cebulowe, pieczywo czosnkowe i sosy.', 'en' => 'Belgian fries, onion rings, extra sauces and dips.'],
                'slug' => 'dodatki',
                'icon' => 'Cookie',
                'sort_order' => 9,
            ],
            [
                'name' => ['pl' => 'Napoje', 'en' => 'Beverages'],
                'description' => ['pl' => 'Oryginalny turecki Ayran, zimne napoje gazowane i soki.', 'en' => 'Authentic Turkish Ayran, cold sodas, and juices.'],
                'slug' => 'napoje',
                'icon' => 'GlassWater',
                'sort_order' => 10,
            ],
        ];

        $categories = [];
        foreach ($categoriesData as $cData) {
            $categories[$cData['slug']] = Category::create($cData);
        }

        // 6. Products Creation
        $productsData = [
            // Rollo
            [
                'category' => 'rollo-kebab',
                'name' => ['pl' => 'Rollo Kebab Klasyczny', 'en' => 'Classic Rollo Kebab'],
                'description' => ['pl' => 'Chrupiący lawasz zawinięty z wybranym mięsem, kapustą pekińską, pomidorem, ogórkiem i sosem.', 'en' => 'Crispy thin wrap filled with choice of meat, shredded salad, tomato, cucumber and sauce.'],
                'slug' => 'rollo-kebab-klasyczny',
                'base_price' => 24.00,
                'image_url' => 'https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=800&q=80',
                'badge' => 'Bestseller',
                'spiciness_level' => 1,
                'is_vegetarian' => false,
                'groups' => [$sizeGroup, $meatGroup, $sauceGroup, $addonsGroup],
            ],
            [
                'category' => 'rollo-kebab',
                'name' => ['pl' => 'Aladen Spicy Mega Rollo 🔥', 'en' => 'Aladen Spicy Mega Rollo 🔥'],
                'description' => ['pl' => 'Dla miłośników prawdziwego ognia: marynowane mięso, sos Mega Ostry Reaper, papryczki jalapeño i podwójny ser.', 'en' => 'Fire lovers dream: marinated meat, reaper chili sauce, pickled jalapeños and melted cheese.'],
                'slug' => 'aladen-spicy-mega-rollo',
                'base_price' => 31.00,
                'image_url' => 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=800&q=80',
                'badge' => 'Ostre 🔥',
                'spiciness_level' => 3,
                'is_vegetarian' => false,
                'groups' => [$sizeGroup, $meatGroup, $sauceGroup, $addonsGroup],
            ],
            [
                'category' => 'rollo-kebab',
                'name' => ['pl' => 'Rollo Ser-Kebab (Cheesy Delight)', 'en' => 'Cheesy Rollo Delight'],
                'description' => ['pl' => 'Lawasz z podwójną warstwą ciągnącego sera gouda i fety z sosem czosnkowym.', 'en' => 'Rollo loaded with molten double cheese blend and rich garlic sauce.'],
                'slug' => 'rollo-ser-kebab',
                'base_price' => 28.00,
                'image_url' => 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80',
                'badge' => 'Serowe',
                'spiciness_level' => 0,
                'is_vegetarian' => false,
                'groups' => [$sizeGroup, $meatGroup, $sauceGroup, $addonsGroup],
            ],

            // Pita
            [
                'category' => 'pita-kebab',
                'name' => ['pl' => 'Kebab w Chrupiącej Bułce Pita', 'en' => 'Pita Bread Kebab'],
                'description' => ['pl' => 'Tradycyjna turecka bułka wypiekana na miejscu, z sezamem, wypełniona soczystym mięsem i świeżymi warzywami.', 'en' => 'Toasted sesame pita pocket packed with marinated meat and crunchy Mediterranean vegetables.'],
                'slug' => 'kebab-w-bulce-pita',
                'base_price' => 25.00,
                'image_url' => 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80',
                'badge' => 'Klasyk',
                'spiciness_level' => 1,
                'is_vegetarian' => false,
                'groups' => [$sizeGroup, $meatGroup, $sauceGroup, $addonsGroup],
            ],
            [
                'category' => 'pita-kebab',
                'name' => ['pl' => 'Pita Gyros z Czerwoną Cebulą', 'en' => 'Greek Gyros Pita'],
                'description' => ['pl' => 'Bułka pita z frytkami w środku, czerwoną cebulką, pomidorem i sosem tzatziki.', 'en' => 'Pita loaded with crispy fries inside, red onion, tomato slices and authentic garlic tzatziki.'],
                'slug' => 'pita-gyros',
                'base_price' => 27.00,
                'image_url' => 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
                'badge' => null,
                'spiciness_level' => 0,
                'is_vegetarian' => false,
                'groups' => [$sizeGroup, $meatGroup, $sauceGroup, $addonsGroup],
            ],

            // Kapsalon
            [
                'category' => 'kapsalon',
                'name' => ['pl' => 'Kapsalon Klasyczny Zapiekany', 'en' => 'Classic Baked Kapsalon'],
                'description' => ['pl' => 'Warstwa chrupiących frytek, obfita porcja mięsa, zapieczona serem gouda w piecu, zwieńczona surówką i sosami.', 'en' => 'Layer of golden fries, tender meat, melted Gouda cheese from the oven, topped with fresh salad and sauces.'],
                'slug' => 'kapsalon-klasyczny',
                'base_price' => 32.00,
                'image_url' => 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
                'badge' => 'Hit!',
                'spiciness_level' => 1,
                'is_vegetarian' => false,
                'groups' => [$sizeGroup, $meatGroup, $sauceGroup, $addonsGroup],
            ],
            [
                'category' => 'kapsalon',
                'name' => ['pl' => 'Kapsalon Inferno Jalapeño 🔥', 'en' => 'Kapsalon Inferno Jalapeño 🔥'],
                'description' => ['pl' => 'Piekielny kapsalon z podwójnym jalapeño, sosem Reaper i dodatkiem sera cheddar.', 'en' => 'Super spicy kapsalon with double jalapeño, Reaper chili blend and cheddar.'],
                'slug' => 'kapsalon-inferno',
                'base_price' => 36.00,
                'image_url' => 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
                'badge' => 'Mega Hot',
                'spiciness_level' => 3,
                'is_vegetarian' => false,
                'groups' => [$sizeGroup, $meatGroup, $sauceGroup, $addonsGroup],
            ],

            // Kubełek
            [
                'category' => 'kebab-box',
                'name' => ['pl' => 'Kebab Box (Kubełek z frytkami)', 'en' => 'Kebab Box with Fries'],
                'description' => ['pl' => 'Wygodne pudełko: frytki, mięso i sosy. Idealne na wynos i w podróży.', 'en' => 'Convenient box packed with fries, your choice of meat and sauces.'],
                'slug' => 'kebab-box-frytki',
                'base_price' => 23.00,
                'image_url' => 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80',
                'badge' => null,
                'spiciness_level' => 1,
                'is_vegetarian' => false,
                'groups' => [$sizeGroup, $meatGroup, $sauceGroup, $addonsGroup],
            ],

            // Talerze
            [
                'category' => 'dania-talerze',
                'name' => ['pl' => 'Talerz Sułtana (Wielka Porcja)', 'en' => 'Sultan Feast Plate'],
                'description' => ['pl' => 'Duża porcja mięsa z grilla, frytki lub ryż, zestaw 4 surówek, 2 sosy i chlebek pita.', 'en' => 'Massive portion of roasted meat, fries or rice, 4 salad types, 2 sauces and warm pita.'],
                'slug' => 'talerz-sultana',
                'base_price' => 38.00,
                'image_url' => 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
                'badge' => 'Szef Poleca',
                'spiciness_level' => 1,
                'is_vegetarian' => false,
                'groups' => [$meatGroup, $sauceGroup, $sidesGroup, $addonsGroup],
            ],
            [
                'category' => 'dania-talerze',
                'name' => ['pl' => 'Półmisek Kebabowy Aladen na Wagę (1 kg)', 'en' => 'Aladen Kebab Platter per kg'],
                'description' => ['pl' => 'Uczta dla 3-4 osób: 1 kg wyselekcjonowanego mięsa, zestaw surówek, 4 sosy, 2 porcje frytek i 4 bułeczki pita.', 'en' => 'Feast for 3-4 people: 1kg meat selection, salad tray, 4 dips, double fries and 4 warm pitas.'],
                'slug' => 'polmisek-kebabowy-1kg',
                'base_price' => 89.00,
                'image_url' => 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
                'badge' => 'Dla Grupy',
                'spiciness_level' => 1,
                'is_vegetarian' => false,
                'groups' => [$meatGroup, $sauceGroup, $addonsGroup],
            ],

            // Wegetariańskie
            [
                'category' => 'wegetarianskie',
                'name' => ['pl' => 'Rollo Falafel Wegetariański', 'en' => 'Vegetarian Falafel Wrap'],
                'description' => ['pl' => 'Złociste, chrupiące kotlety z ciecierzycy ze świeżą miętą, pietruszką, hummusem i sosem tahini.', 'en' => 'Crisp spiced chickpea falafel patties, fresh mint, hummus and smooth tahini dressing.'],
                'slug' => 'rollo-falafel-wegetarianski',
                'base_price' => 23.00,
                'image_url' => 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=800&q=80',
                'badge' => 'Vege 🌱',
                'spiciness_level' => 0,
                'is_vegetarian' => true,
                'groups' => [$sizeGroup, $sauceGroup, $addonsGroup],
            ],
            [
                'category' => 'wegetarianskie',
                'name' => ['pl' => 'Pita Halloumi z Grilla', 'en' => 'Grilled Halloumi Pita'],
                'description' => ['pl' => 'Grillowany cypryjski ser Halloumi, pomidor, ogórek, rukola i sos ziołowy w chrupiącej bułce.', 'en' => 'Seared Cypriot Halloumi cheese, sliced tomatoes, cucumber, rocket and herb dressing in pita.'],
                'slug' => 'pita-halloumi-grill',
                'base_price' => 26.00,
                'image_url' => 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
                'badge' => 'Vege 🌱',
                'spiciness_level' => 0,
                'is_vegetarian' => true,
                'groups' => [$sizeGroup, $sauceGroup, $addonsGroup],
            ],

            // Zestawy kurczak
            [
                'category' => 'zestawy-kurczak',
                'name' => ['pl' => 'Chrupiące Stripsy z Kurczaka (5 szt.) + Frytki', 'en' => 'Crispy Chicken Tenders (5 pcs) + Fries'],
                'description' => ['pl' => '100% polędwiczki z kurczaka w złotej panierce, podane z frytkami i sosem.', 'en' => '100% tender chicken breast strips in golden crumb, served with crispy fries and dip.'],
                'slug' => 'chrupiace-stripsy-z-kurczaka',
                'base_price' => 27.00,
                'image_url' => 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
                'badge' => null,
                'spiciness_level' => 0,
                'is_vegetarian' => false,
                'groups' => [$sauceGroup],
            ],

            // Sałatki
            [
                'category' => 'salatki',
                'name' => ['pl' => 'Sałatka Grecka z Fetą i Oliwnym Dressingiem', 'en' => 'Greek Salad with Feta'],
                'description' => ['pl' => 'Sałata lodowa, pomidory, ogórki, czerwona cebula, oliwki Kalamata, ser feta i sos ziołowo-oliwny.', 'en' => 'Crisp lettuce, ripe tomatoes, cucumbers, red onion, olives, feta cheese and oregano olive oil.'],
                'slug' => 'salatka-grecka-feta',
                'base_price' => 21.00,
                'image_url' => 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
                'badge' => 'Świeże',
                'spiciness_level' => 0,
                'is_vegetarian' => true,
                'groups' => [],
            ],

            // Dodatki
            [
                'category' => 'dodatki',
                'name' => ['pl' => 'Frytki Belgijskie (Duża porcja)', 'en' => 'Belgian Fries (Large)'],
                'description' => ['pl' => 'Grubo cięte, podwójnie smażone frytki, chrupiące z zewnątrz i miękkie w środku.', 'en' => 'Thick-cut, double fried crispy golden Belgian style fries.'],
                'slug' => 'frytki-belgijskie-duza',
                'base_price' => 12.00,
                'image_url' => 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80',
                'badge' => null,
                'spiciness_level' => 0,
                'is_vegetarian' => true,
                'groups' => [$sauceGroup],
            ],
            [
                'category' => 'dodatki',
                'name' => ['pl' => 'Krążki Cebulowe (8 szt.)', 'en' => 'Onion Rings (8 pcs)'],
                'description' => ['pl' => 'Chrupiące krążki cebulowe w panierce piwnej.', 'en' => 'Crispy golden battered onion rings.'],
                'slug' => 'krazki-cebulowe',
                'base_price' => 11.00,
                'image_url' => 'https://images.unsplash.com/photo-1639024471287-035186f555e3?auto=format&fit=crop&w=800&q=80',
                'badge' => null,
                'spiciness_level' => 0,
                'is_vegetarian' => true,
                'groups' => [$sauceGroup],
            ],

            // Napoje
            [
                'category' => 'napoje',
                'name' => ['pl' => 'Ayran Turecki (250 ml)', 'en' => 'Turkish Ayran (250 ml)'],
                'description' => ['pl' => 'Oryginalny turecki napój jogurtowy z solą i ziołami, idealny do ostrego kebaba.', 'en' => 'Authentic refreshing salty yogurt drink, best companion for spicy food.'],
                'slug' => 'ayran-turecki',
                'base_price' => 6.00,
                'image_url' => 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80',
                'badge' => 'Oryginalny',
                'spiciness_level' => 0,
                'is_vegetarian' => true,
                'groups' => [],
            ],
            [
                'category' => 'napoje',
                'name' => ['pl' => 'Coca-Cola Zero / Original (0.5L)', 'en' => 'Coca-Cola (0.5L)'],
                'description' => ['pl' => 'Schłodzona butelka 500ml.', 'en' => 'Chilled 500ml bottle.'],
                'slug' => 'coca-cola-500ml',
                'base_price' => 8.00,
                'image_url' => 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80',
                'badge' => null,
                'spiciness_level' => 0,
                'is_vegetarian' => true,
                'groups' => [],
            ],
        ];

        $createdProducts = [];
        foreach ($productsData as $pData) {
            $cat = $categories[$pData['category']];
            $groups = $pData['groups'] ?? [];

            $product = Product::create([
                'category_id' => $cat->id,
                'name' => $pData['name'],
                'description' => $pData['description'],
                'slug' => $pData['slug'],
                'base_price' => $pData['base_price'],
                'image_url' => $pData['image_url'],
                'badge' => $pData['badge'],
                'spiciness_level' => $pData['spiciness_level'],
                'is_vegetarian' => $pData['is_vegetarian'],
                'is_available' => true,
                'sort_order' => count($createdProducts) + 1,
            ]);

            foreach ($groups as $idx => $grp) {
                $product->modifierGroups()->attach($grp->id, ['sort_order' => $idx + 1]);
            }

            // Also seed branch availability
            foreach ($branches as $branch) {
                BranchProductAvailability::create([
                    'branch_id' => $branch->id,
                    'product_id' => $product->id,
                    'is_in_stock' => true,
                ]);
            }

            $createdProducts[] = $product;
        }

        // 7. Seed Sample Orders for Live Feed, KDS, and Analytics
        $sampleOrdersData = [
            [
                'order_number' => 'ASK-'.date('Ymd').'-0101',
                'branch_id' => $bedzinBranch->id,
                'user_id' => $demoCustomer->id,
                'customer_name' => 'Jan Kowalski',
                'customer_phone' => '+48 501 234 567',
                'customer_email' => 'jan.kowalski@example.com',
                'order_type' => 'delivery',
                'delivery_address' => [
                    'street' => 'ul. Czeladzka',
                    'building_number' => '15',
                    'apartment' => '4B',
                    'city' => 'Będzin',
                    'postal_code' => '42-500',
                    'door_code' => '1540#',
                    'notes' => 'Proszę dzwonić domofonem, 2 piętro.',
                ],
                'subtotal' => 55.00,
                'delivery_fee' => 6.00,
                'discount_amount' => 0.00,
                'total_amount' => 61.00,
                'payment_method' => 'blik',
                'payment_status' => 'paid',
                'order_status' => 'in_kitchen',
                'customer_notes' => 'Dużo sosu czosnkowego proszę!',
                'kitchen_notes' => 'Rollo mocno przypieczone',
                'created_at' => Carbon::now()->subMinutes(12),
                'items' => [
                    [
                        'product_id' => $createdProducts[0]->id, // Rollo
                        'product_name' => ['pl' => 'Rollo Kebab Klasyczny (Duży)', 'en' => 'Classic Rollo Kebab (Large)'],
                        'unit_price' => 30.00,
                        'quantity' => 1,
                        'total_price' => 30.00,
                        'selected_modifiers' => [
                            ['group_name' => 'Rozmiar', 'option_name' => 'Duży (+6.00 zł)', 'price_modifier' => 6.00],
                            ['group_name' => 'Mięso', 'option_name' => 'Wołowina / Baranina (+3.00 zł)', 'price_modifier' => 3.00],
                            ['group_name' => 'Sosy', 'option_name' => 'Łagodny czosnkowy', 'price_modifier' => 0.00],
                            ['group_name' => 'Dodatki', 'option_name' => 'Jalapeño (+3.50 zł)', 'price_modifier' => 3.50],
                        ],
                    ],
                    [
                        'product_id' => $createdProducts[3]->id, // Pita
                        'product_name' => ['pl' => 'Kebab w Chrupiącej Bułce Pita', 'en' => 'Pita Bread Kebab'],
                        'unit_price' => 25.00,
                        'quantity' => 1,
                        'total_price' => 25.00,
                        'selected_modifiers' => [
                            ['group_name' => 'Rozmiar', 'option_name' => 'Normalny', 'price_modifier' => 0.00],
                            ['group_name' => 'Mięso', 'option_name' => 'Kurczak', 'price_modifier' => 0.00],
                            ['group_name' => 'Sosy', 'option_name' => 'Mieszany', 'price_modifier' => 0.00],
                        ],
                    ],
                ],
            ],
            [
                'order_number' => 'ASK-'.date('Ymd').'-0102',
                'branch_id' => $bedzinBranch->id,
                'user_id' => null,
                'customer_name' => 'Anna Nowak',
                'customer_phone' => '+48 692 888 111',
                'customer_email' => 'anna.nowak@gmail.com',
                'order_type' => 'collection',
                'subtotal' => 38.00,
                'delivery_fee' => 0.00,
                'discount_amount' => 0.00,
                'total_amount' => 38.00,
                'payment_method' => 'card_online',
                'payment_status' => 'paid',
                'order_status' => 'ready',
                'customer_notes' => 'Odbiór za 15 minut',
                'created_at' => Carbon::now()->subMinutes(25),
                'items' => [
                    [
                        'product_id' => $createdProducts[7]->id, // Talerz Sultana
                        'product_name' => ['pl' => 'Talerz Sułtana (Wielka Porcja)', 'en' => 'Sultan Feast Plate'],
                        'unit_price' => 38.00,
                        'quantity' => 1,
                        'total_price' => 38.00,
                        'selected_modifiers' => [
                            ['group_name' => 'Mięso', 'option_name' => 'Mięso Mieszane (+2.00 zł)', 'price_modifier' => 2.00],
                            ['group_name' => 'Dodatek', 'option_name' => 'Złociste frytki', 'price_modifier' => 0.00],
                            ['group_name' => 'Sosy', 'option_name' => 'Ostry + Czosnkowy', 'price_modifier' => 0.00],
                        ],
                    ],
                ],
            ],
            [
                'order_number' => 'ASK-'.date('Ymd').'-0103',
                'branch_id' => $bedzinBranch->id,
                'user_id' => null,
                'customer_name' => 'Piotr Zieliński',
                'customer_phone' => '+48 730 444 222',
                'customer_email' => null,
                'order_type' => 'dine_in',
                'table_number' => 'Stół 4',
                'subtotal' => 70.00,
                'delivery_fee' => 0.00,
                'discount_amount' => 0.00,
                'total_amount' => 70.00,
                'payment_method' => 'pay_at_counter',
                'payment_status' => 'paid',
                'order_status' => 'pending',
                'created_at' => Carbon::now()->subMinutes(3),
                'items' => [
                    [
                        'product_id' => $createdProducts[5]->id, // Kapsalon
                        'product_name' => ['pl' => 'Kapsalon Klasyczny Zapiekany', 'en' => 'Classic Baked Kapsalon'],
                        'unit_price' => 32.00,
                        'quantity' => 2,
                        'total_price' => 64.00,
                        'selected_modifiers' => [
                            ['group_name' => 'Mięso', 'option_name' => 'Kurczak', 'price_modifier' => 0.00],
                            ['group_name' => 'Sosy', 'option_name' => 'Łagodny czosnkowy', 'price_modifier' => 0.00],
                        ],
                    ],
                    [
                        'product_id' => $createdProducts[14]->id, // Ayran
                        'product_name' => ['pl' => 'Ayran Turecki (250 ml)', 'en' => 'Turkish Ayran'],
                        'unit_price' => 6.00,
                        'quantity' => 1,
                        'total_price' => 6.00,
                        'selected_modifiers' => [],
                    ],
                ],
            ],
            [
                'order_number' => 'ASK-'.date('Ymd').'-0104',
                'branch_id' => $sosnowiecBranch->id,
                'user_id' => null,
                'customer_name' => 'Katarzyna Wiśniewska',
                'customer_phone' => '+48 512 333 444',
                'customer_email' => 'kasia.w@example.com',
                'order_type' => 'delivery',
                'delivery_address' => [
                    'street' => 'ul. Będzińska',
                    'building_number' => '39',
                    'apartment' => '12',
                    'city' => 'Sosnowiec',
                    'postal_code' => '41-200',
                    'door_code' => '4491',
                ],
                'subtotal' => 89.00,
                'delivery_fee' => 0.00, // free above 80zł
                'discount_amount' => 0.00,
                'total_amount' => 89.00,
                'payment_method' => 'blik',
                'payment_status' => 'paid',
                'order_status' => 'out_for_delivery',
                'created_at' => Carbon::now()->subMinutes(35),
                'items' => [
                    [
                        'product_id' => $createdProducts[8]->id, // Półmisek 1kg
                        'product_name' => ['pl' => 'Półmisek Kebabowy Aladen na Wagę (1 kg)', 'en' => 'Aladen Kebab Platter per kg'],
                        'unit_price' => 89.00,
                        'quantity' => 1,
                        'total_price' => 89.00,
                        'selected_modifiers' => [
                            ['group_name' => 'Mięso', 'option_name' => 'Mieszane', 'price_modifier' => 0.00],
                            ['group_name' => 'Sosy', 'option_name' => 'Czosnkowy + Ostry + BBQ', 'price_modifier' => 0.00],
                        ],
                    ],
                ],
            ],
        ];

        foreach ($sampleOrdersData as $oData) {
            $items = $oData['items'];
            unset($oData['items']);

            $order = Order::create($oData);

            foreach ($items as $itemData) {
                $order->items()->create($itemData);
            }
        }

        // 8. Seed Sample Table Reservations
        $sampleReservations = [
            [
                'reservation_code' => 'RES-ALAD88',
                'branch_id' => $bedzinBranch->id,
                'user_id' => $demoCustomer->id,
                'customer_name' => 'Jan Kowalski',
                'customer_phone' => '+48 501 234 567',
                'customer_email' => 'jan.kowalski@example.com',
                'guests_count' => 4,
                'reservation_date' => Carbon::today()->addDay()->toDateString(),
                'reservation_time' => '18:30',
                'seating_preference' => 'quiet_corner',
                'status' => 'confirmed',
                'notes' => 'Spotkanie ze znajomymi, prosimy o stolik przy oknie.',
                'table_assigned' => 'Stół 6 (VIP)',
            ],
            [
                'reservation_code' => 'RES-GUEST99',
                'branch_id' => $bedzinBranch->id,
                'user_id' => null,
                'customer_name' => 'Marta Dąbrowska',
                'customer_phone' => '+48 600 777 888',
                'customer_email' => 'marta.dabrowska@example.com',
                'guests_count' => 6,
                'reservation_date' => Carbon::today()->addDays(2)->toDateString(),
                'reservation_time' => '19:00',
                'seating_preference' => 'terrace',
                'status' => 'pending',
                'notes' => 'Urodziny, czy jest możliwość przyniesienia własnego tortu?',
                'table_assigned' => null,
            ],
            [
                'reservation_code' => 'RES-KATOW12',
                'branch_id' => $sosnowiecBranch->id,
                'user_id' => null,
                'customer_name' => 'Tomasz Lewandowski',
                'customer_phone' => '+48 604 111 222',
                'customer_email' => 'tomek.lewy@example.com',
                'guests_count' => 2,
                'reservation_date' => Carbon::today()->toDateString(),
                'reservation_time' => '20:00',
                'seating_preference' => 'indoor',
                'status' => 'confirmed',
                'notes' => 'Kolacja we dwoje.',
                'table_assigned' => 'Stół 2',
            ],
        ];

        foreach ($sampleReservations as $rData) {
            Reservation::create($rData);
        }
    }
}
