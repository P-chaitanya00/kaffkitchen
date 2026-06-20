// ==========================================================================
// KAFF Luxury Kitchen — Shared Catalog Data
// ==========================================================================

const defaultProducts = [
  {
    "id": "prod-chimney-001",
    "name": "ZEBRA 41 (IS) Island Chimney",
    "category": "Chimneys",
    "price": 68990,
    "originalPrice": 84990,
    "rating": 4.9,
    "image": "images/extracted/img_p3_1.png",
    "badge": "Zebra Texture",
    "description": "Uniquely designed island chimney featuring a zebra texture finish. Equipped with a Plasma filter that eliminates pollen, bacteria, smoke, and odors.",
    "features": [
      "Zebra texture finish",
      "Plasma filter technology",
      "Suction up to 950 m³/h"
    ],
    "specs": {
      "Type": "Island Chimney",
      "Airflow": "950 m³/h",
      "Size": "41 cm",
      "Finish": "Zebra Texture / Matte Black",
      "Control": "Touch + Remote"
    }
  },
  {
    "id": "prod-chimney-002",
    "name": "SKYVENT 110 Ceiling Chimney",
    "category": "Chimneys",
    "price": 89990,
    "originalPrice": 109990,
    "rating": 4.8,
    "image": "images/extracted/img_p3_6.jpeg",
    "badge": "Ceiling Mounted",
    "description": "Elegant white glass ceiling-mounted chimney. High-performance perimeter suction ensures clean and odor-free kitchen air with timer function.",
    "features": [
      "Perimeter suction system",
      "Energy-efficient LED lights",
      "Suction up to 1250 m³/h"
    ],
    "specs": {
      "Type": "Ceiling Mounted",
      "Airflow": "1250 m³/h",
      "Size": "110 cm",
      "Finish": "Premium White Glass",
      "Control": "Remote + Mechanical"
    }
  },
  {
    "id": "prod-chimney-003",
    "name": "TOWNSVILLE 90 (IS) Downdraft",
    "category": "Chimneys",
    "price": 114990,
    "originalPrice": 139990,
    "rating": 4.9,
    "image": "images/extracted/img_p3_8.jpeg",
    "badge": "Downdraft Tech",
    "description": "Advanced downdraft island chimney that rises elegantly from your countertop. Finished in black tempered glass and durable stainless steel.",
    "features": [
      "Advanced downdraft tech",
      "4-Speed touch controls",
      "Suction up to 1200 m³/h"
    ],
    "specs": {
      "Type": "Island Downdraft",
      "Airflow": "1200 m³/h",
      "Size": "90 cm",
      "Finish": "Black Tempered Glass & SS",
      "Control": "LED Sensor Touch"
    }
  },
  {
    "id": "prod-chimney-004",
    "name": "RUSSO 42 (IS) Island Chimney",
    "category": "Chimneys",
    "price": 54990,
    "originalPrice": 69990,
    "rating": 4.7,
    "image": "images/extracted/img_p4_2.jpeg",
    "badge": "Island Type",
    "description": "Modern cylindrical island chimney in a clean matte black finish. Features push button controls, metallic conveyor, and aluminum filter.",
    "features": [
      "Unique cylindrical design",
      "Aluminum mesh filter",
      "Suction up to 1000 m³/h"
    ],
    "specs": {
      "Type": "Island Cylindrical",
      "Airflow": "1000 m³/h",
      "Size": "42 cm",
      "Finish": "Matte Black Finish",
      "Control": "Soft Push Controls"
    }
  },
  {
    "id": "prod-chimney-005",
    "name": "CANARY 90 DC (IS) Island",
    "category": "Chimneys",
    "price": 79990,
    "originalPrice": 99990,
    "rating": 4.9,
    "image": "images/extracted/img_p4_6.jpeg",
    "badge": "BLDC Motor",
    "description": "High-performance island chimney with BLDC motor and smart auto-clean program. High suction power with gesture control interface.",
    "features": [
      "Brushless DC (BLDC) Motor",
      "Smart auto-clean function",
      "Suction up to 1480 m³/h"
    ],
    "specs": {
      "Type": "Island BLDC",
      "Airflow": "1480 m³/h",
      "Size": "90 cm",
      "Finish": "Black Glass & Matte Hood",
      "Control": "Gesture Control"
    }
  },
  {
    "id": "prod-chimney-006",
    "name": "MISSONI 90 Wall Chimney",
    "category": "Chimneys",
    "price": 36990,
    "originalPrice": 46990,
    "rating": 4.6,
    "image": "images/extracted/img_p5_2.jpeg",
    "badge": "Parametric Suction",
    "description": "Seamless wall-mounted designer chimney in grey finish. Built-in BLDC motor, parametric suction tech, and touch controls.",
    "features": [
      "Parametric suction system",
      "Intuitive front panel",
      "Suction up to 1280 m³/h"
    ],
    "specs": {
      "Type": "Wall Mounted",
      "Airflow": "1280 m³/h",
      "Size": "90 cm",
      "Finish": "Seamless Grey Finish",
      "Control": "Gesture + Touch"
    }
  },
  {
    "id": "prod-chimney-007",
    "name": "MOLIN 90 DC Wall Chimney",
    "category": "Chimneys",
    "price": 49990,
    "originalPrice": 62990,
    "rating": 4.8,
    "image": "images/extracted/img_p5_6.jpeg",
    "badge": "Granite Texture",
    "description": "Exquisite wall-mounted chimney with matte-finished granite texture. Filter-less design with auto-clean technology and BLDC motor.",
    "features": [
      "Matt-finished granite texture",
      "Filter-less design",
      "Suction up to 1480 m³/h"
    ],
    "specs": {
      "Type": "Wall Mounted",
      "Airflow": "1480 m³/h",
      "Size": "90 cm",
      "Finish": "Matte Granite Finish",
      "Control": "Gesture + Touch"
    }
  },
  {
    "id": "prod-chimney-008",
    "name": "NEWBURY 90 DC Wall Chimney",
    "category": "Chimneys",
    "price": 42990,
    "originalPrice": 52990,
    "rating": 4.7,
    "image": "images/extracted/img_p6_6.jpeg",
    "badge": "Top & Bottom Suction",
    "description": "Innovative wall chimney with top and bottom suction vents. Delivers 30% additional smoke extraction capacity with BLDC motor.",
    "features": [
      "Top and bottom suction vents",
      "Tempered grey glass hood",
      "Suction up to 1480 m³/h"
    ],
    "specs": {
      "Type": "Wall Mounted",
      "Airflow": "1480 m³/h",
      "Size": "90 cm",
      "Finish": "Grey Tempered Glass",
      "Control": "Gesture Control"
    }
  },
  {
    "id": "prod-hob-001",
    "name": "Marmor 1104 Nordic Hob",
    "category": "Hobs",
    "price": 34990,
    "originalPrice": 42990,
    "rating": 4.8,
    "image": "images/extracted/img_p15_10.jpeg",
    "badge": "Nordic Series",
    "description": "Extra wide 110cm built-in hob with premium frosted rock glass finish. 4 high-efficiency brass burners with Flame Failure Device (FFD).",
    "features": [
      "Frosted rock glass finish",
      "Full brass burners with FFD",
      "Dual color metal knobs"
    ],
    "specs": {
      "Size": "110 cm",
      "Burners": "4 Burners (2 Triple Ring, 2 Dual Ring)",
      "Finish": "Frosted Rock Glass",
      "Ignition": "Auto Electric"
    }
  },
  {
    "id": "prod-hob-002",
    "name": "MSM 865X Massimo Hob",
    "category": "Hobs",
    "price": 28990,
    "originalPrice": 36990,
    "rating": 4.9,
    "image": "images/extracted/img_p16_2.jpeg",
    "badge": "5 Burners",
    "description": "Massimo Series built-in hob with 5 burners. Crafted from specially designed frosted tempered glass with decorative SS trim.",
    "features": [
      "5 brass burners with FFD",
      "Designer frosted glass",
      "Cast iron pan support"
    ],
    "specs": {
      "Size": "90 cm",
      "Burners": "5 Burners (1 Triple, 2 Mini, 2 Dual)",
      "Finish": "Frosted Tempered Glass",
      "Ignition": "Auto Electric"
    }
  },
  {
    "id": "prod-hob-003",
    "name": "BLHF 865X Bellini-F Hob",
    "category": "Hobs",
    "price": 24990,
    "originalPrice": 31990,
    "rating": 4.7,
    "image": "images/extracted/img_p17_2.jpeg",
    "badge": "FFD Safety",
    "description": "Bellini-F Series built-in hob with 5 burners. Premium 8mm matte glass finish, full FFD safety, and ergonomic designer metal knobs.",
    "features": [
      "Premium 8mm matt glass",
      "Brass flame spreaders",
      "Cast iron pan support"
    ],
    "specs": {
      "Size": "90 cm",
      "Burners": "5 Burners (1 Triple, 2 Mini, 2 Dual)",
      "Finish": "Black Tempered Glass",
      "Ignition": "Auto Electric"
    }
  },
  {
    "id": "prod-hob-004",
    "name": "ASF 94 TM Ashford Hob",
    "category": "Hobs",
    "price": 26990,
    "originalPrice": 34990,
    "rating": 4.8,
    "image": "images/extracted/img_p19_1.jpeg",
    "badge": "Digital Timer",
    "description": "Ashford Series built-in hob with a built-in digital timer. Sleek black tempered glass with bevelled front edge and brass burners.",
    "features": [
      "Built-in digital timer",
      "Bevelled front glass edge",
      "Concealed brass burners"
    ],
    "specs": {
      "Size": "90 cm",
      "Burners": "4 Burners (1 Triple, 1 Mini, 2 Dual)",
      "Finish": "Black Tempered Glass",
      "Ignition": "Auto Electric"
    }
  },
  {
    "id": "prod-hob-005",
    "name": "Preston PRS804DF Hob",
    "category": "Hobs",
    "price": 23990,
    "originalPrice": 29990,
    "rating": 4.6,
    "image": "images/extracted/img_p20_16.jpeg",
    "badge": "Concealed Burners",
    "description": "Preston Series 4-burner hob. High-efficiency concealed brass burners, digital timer, and thick premium frosted black glass.",
    "features": [
      "Concealed brass burners",
      "Thick 8mm frosted glass",
      "Digital timer shut-off"
    ],
    "specs": {
      "Size": "80 cm",
      "Burners": "4 Burners (2 Triple, 2 Dual)",
      "Finish": "Frosted Black Glass",
      "Ignition": "Auto Electric"
    }
  },
  {
    "id": "prod-induction-001",
    "name": "IND 32 Built-in Induction Hob",
    "category": "Hobs",
    "price": 18990,
    "originalPrice": 24990,
    "rating": 4.8,
    "image": "images/extracted/img_p25_2.jpeg",
    "badge": "Flexi Zone",
    "description": "Built-in induction hob with flex zone technology, schott glass surface, power boost, BBQ function, child lock, and touch control.",
    "features": [
      "Flexi zone induction",
      "Premium Schott Glass",
      "BBQ mode / 9 power levels"
    ],
    "specs": {
      "Size": "30 cm",
      "Zones": "2 Zones (Flexi)",
      "Finish": "Schott Glass Finish",
      "Control": "Smart Touch Control"
    }
  },
  {
    "id": "prod-warmer-001",
    "name": "KWDA14 Built-in Dishwarmer",
    "category": "Ovens",
    "price": 32990,
    "originalPrice": 39990,
    "rating": 4.7,
    "image": "images/extracted/img_p25_8.jpeg",
    "badge": "Dish Warmer",
    "description": "Built-in dish warming drawer. 60cm width and 14cm height, black glass fascia, sensor touch control, and temperature range of 30°C to 80°C.",
    "features": [
      "Sensor touch control with timer",
      "Warm temp range 30°C-80°C",
      "Telescopic full-depth pull-out"
    ],
    "specs": {
      "Size": "60 cm",
      "Height": "14 cm",
      "Finish": "Black Glass & SS",
      "Control": "Sensor Touch"
    }
  },
  {
    "id": "prod-oven-001",
    "name": "OV81AMSTF Built-in Oven",
    "category": "Ovens",
    "price": 79990,
    "originalPrice": 99990,
    "rating": 5,
    "image": "images/extracted/img_p27_5.jpeg",
    "badge": "120+ Recipes",
    "description": "Ultra-premium 81-litre built-in electric oven. Steam cooking with water tank, air fry mode, true convection, Wi-Fi, and TFT touch screen.",
    "features": [
      "120+ pre-loaded recipes",
      "Built-in steam & air fry",
      "Smart TFT Touch & Wi-Fi"
    ],
    "specs": {
      "Capacity": "81 Litres",
      "Size": "60 cm",
      "Finish": "Black Glass Fascia",
      "Control": "TFT Touch Screen"
    }
  },
  {
    "id": "prod-oven-002",
    "name": "OV72G6F Built-in Oven",
    "category": "Ovens",
    "price": 49990,
    "originalPrice": 59990,
    "rating": 4.7,
    "image": "images/extracted/img_p29_2.jpeg",
    "badge": "Grey Family",
    "description": "Spacious 72-litre built-in oven in premium grey glass finish. Features 3D hot air tech, soft close door, and mechanical push knobs.",
    "features": [
      "3D hot air technology",
      "Soft close mechanism",
      "Energy class A+ rated"
    ],
    "specs": {
      "Capacity": "72 Litres",
      "Size": "60 cm",
      "Finish": "Premium Grey Glass",
      "Control": "Push Knobs + Touch"
    }
  },
  {
    "id": "prod-oven-003",
    "name": "CLOV6 RD Clifton Retro Oven",
    "category": "Ovens",
    "price": 58990,
    "originalPrice": 72990,
    "rating": 4.8,
    "image": "images/extracted/img_p30_8.jpeg",
    "badge": "Retro Red",
    "description": "Clifton Series retro built-in oven in premium red finish. Antique bronze knobs and handle, retro analog dial, and true convection.",
    "features": [
      "Premium red retro finish",
      "Antique bronze hardware",
      "Retro analog timer dial"
    ],
    "specs": {
      "Capacity": "60 Litres",
      "Size": "60 cm",
      "Finish": "Retro Red & Bronze",
      "Control": "Analog Dial & Knobs"
    }
  },
  {
    "id": "prod-oven-004",
    "name": "MZ OV6 TN Mazzini Oven",
    "category": "Ovens",
    "price": 62990,
    "originalPrice": 76990,
    "rating": 4.8,
    "image": "images/extracted/img_p31_2.jpeg",
    "badge": "Titanium Finish",
    "description": "Mazzini Series built-in oven featuring a premium titanium finish with black stainless steel handle. Convection system and rapid heat up.",
    "features": [
      "Premium titanium finish",
      "Touch control panel",
      "Rapid heat up boost mode"
    ],
    "specs": {
      "Capacity": "67 Litres",
      "Size": "60 cm",
      "Finish": "Titanium & Black SS",
      "Control": "Touch Control"
    }
  },
  {
    "id": "prod-microwave-001",
    "name": "MW 34 G6F Built-in Microwave",
    "category": "Microwaves",
    "price": 38990,
    "originalPrice": 48990,
    "rating": 4.7,
    "image": "images/extracted/img_p29_8.jpeg",
    "badge": "34L Convection",
    "description": "Built-in convection microwave in premium grey glass finish. 34-litre capacity, touch controls, and combination microwave/grill.",
    "features": [
      "Premium grey glass finish",
      "34L large convection cavity",
      "Touch + pop up knob control"
    ],
    "specs": {
      "Capacity": "34 Litres",
      "Microwave Input": "1450 W",
      "Microwave Output": "900 W",
      "Grill": "1100 W / Convection 2300 W"
    }
  },
  {
    "id": "prod-microwave-002",
    "name": "KMW8A-BLK Built-in Microwave",
    "category": "Microwaves",
    "price": 24990,
    "originalPrice": 31990,
    "rating": 4.6,
    "image": "images/extracted/img_p35_7.jpeg",
    "badge": "Full Black Glass",
    "description": "Built-in convection microwave in full black tempered glass. Features push door opening button, interior lighting, and multi programming.",
    "features": [
      "Full black tempered glass",
      "Multi programming modes",
      "Power input 1450 W"
    ],
    "specs": {
      "Capacity": "25 Litres",
      "Microwave Input": "1450 W",
      "Microwave Output": "900 W",
      "Control": "Push Buttons"
    }
  },
  {
    "id": "prod-range-001",
    "name": "KGM 90 Cooking Range",
    "category": "Cooking Ranges",
    "price": 94990,
    "originalPrice": 119990,
    "rating": 4.8,
    "image": "images/extracted/img_p37_2.jpeg",
    "badge": "90cm Mirror Finish",
    "description": "90cm cooking range with built-in 100L electric oven. Features a mirror finish, 5 gas burners (including 1 jumbo triple ring burner).",
    "features": [
      "5 gas burners (1 jumbo)",
      "Huge 100L electric oven",
      "SS body with mirror finish"
    ],
    "specs": {
      "Size": "90 cm",
      "Oven Capacity": "100 Litres",
      "Finish": "Stainless Steel & Mirror",
      "Ignition": "Auto Electric"
    }
  },
  {
    "id": "prod-dw-001",
    "name": "DW VETRA 60 Freestanding",
    "category": "Dishwashers",
    "price": 39990,
    "originalPrice": 49990,
    "rating": 4.7,
    "image": "images/extracted/img_p38_2.jpeg",
    "badge": "12 Place Settings",
    "description": "Freestanding dishwasher in premium stainless steel finish. 12 place settings, 6 washing programs, A+ energy efficiency rating.",
    "features": [
      "12 place settings",
      "6 washing programs",
      "A+ energy efficiency"
    ],
    "specs": {
      "Type": "Freestanding",
      "Finish": "SS finish door panel",
      "Programs": "6 Washing Programs",
      "Size": "60 cm"
    }
  },
  {
    "id": "prod-dw-002",
    "name": "KDW BIN 60 INTRA Semi-Integrated",
    "category": "Dishwashers",
    "price": 49990,
    "originalPrice": 62990,
    "rating": 4.9,
    "image": "images/extracted/img_p39_2.jpeg",
    "badge": "14 Place A++",
    "description": "Semi-integrated built-in dishwasher. 14 place settings, 9 washing programs including rapid and 3-in-1 wash, A++ energy rating.",
    "features": [
      "14 place settings",
      "9 washing programs",
      "A++ energy efficiency"
    ],
    "specs": {
      "Type": "Semi-Integrated",
      "Finish": "Integrated Console",
      "Programs": "9 Washing Programs",
      "Size": "60 cm"
    }
  },
  {
    "id": "prod-coffee-001",
    "name": "CFFBI 6 Built-in Coffee Machine",
    "category": "Coffee Machines",
    "price": 129990,
    "originalPrice": 159990,
    "rating": 5,
    "image": "images/extracted/img_p40_3.jpeg",
    "badge": "20 Bars Pressure",
    "description": "Fully automatic built-in coffee machine. Touch controls, multi coffee options (espresso, latte, cappuccino), and 20 bar pump pressure.",
    "features": [
      "Fully automatic coffee options",
      "20 bar pump pressure",
      "Full touch control panel"
    ],
    "specs": {
      "Type": "Built-in",
      "Water Tank": "1.8 Litres",
      "Beans Capacity": "200g",
      "Pressure": "20 Bars"
    }
  },
  {
    "id": "prod-wine-001",
    "name": "WC 418 DZ Wine Cooler",
    "category": "Wine Coolers",
    "price": 139990,
    "originalPrice": 169990,
    "rating": 4.9,
    "image": "images/extracted/img_p41_1.jpeg",
    "badge": "171 Bottles",
    "description": "Large capacity wine cooler holding up to 171 bottles. Dual zone temperature control (5-22°C), wooden shelves, and UV-protected door.",
    "features": [
      "171 bottles / 418L capacity",
      "Dual zone (5-22°C)",
      "UV-protected glass door"
    ],
    "specs": {
      "Capacity": "418 Litres (171 bottles)",
      "Shelves": "Wooden Shelves",
      "Finish": "Full Mirror Glass",
      "Dimensions": "595 × 680 × 1770 mm"
    }
  },
  {
    "id": "prod-ref-001",
    "name": "KRF 250 FFBI Refrigerator",
    "category": "Refrigerators",
    "price": 84990,
    "originalPrice": 104990,
    "rating": 4.8,
    "image": "images/extracted/img_p43_3.jpeg",
    "badge": "Built-in Combi",
    "description": "Built-in double door combi refrigerator. Frost-free, 236L fridge capacity, 68L freezer, A+ energy rating, and electronic touch control.",
    "features": [
      "Built-in integrated combi",
      "Total capacity 304 Litres",
      "Frost-free cooling system"
    ],
    "specs": {
      "Type": "Built-in Combi",
      "Fridge Capacity": "236 L / Freezer 68 L",
      "Energy Rating": "A+",
      "Control": "Electronic Touch"
    }
  },
  {
    "id": "prod-cooktop-001",
    "name": "CTS84B AI Slim-Line Cooktop",
    "category": "Cooktops",
    "price": 14990,
    "originalPrice": 19990,
    "rating": 4.7,
    "image": "images/extracted/img_p44_3.jpeg",
    "badge": "Slim-Line",
    "description": "Slim-Line tabletop cooktop with top knobs. 4 high-efficiency brass burners, auto ignition, and durable black tempered glass.",
    "features": [
      "Slim-Line top knobs",
      "4 high-efficiency burners",
      "Auto pulse ignition"
    ],
    "specs": {
      "Size": "84 cm",
      "Burners": "4 Burners (1 Jumbo, 2 Big, 1 Small)",
      "Finish": "Black Tempered Glass",
      "Ignition": "Auto Ignition"
    }
  },
  {
    "id": "prod-cooktop-002",
    "name": "CTH754BAI H-Line Cooktop",
    "category": "Cooktops",
    "price": 16990,
    "originalPrice": 21990,
    "rating": 4.8,
    "image": "images/extracted/img_p44_28.jpeg",
    "badge": "H-Line",
    "description": "H-Line tabletop cooktop with 4 burners coated in black. 8mm thick toughened glass surface and cast iron pan support.",
    "features": [
      "8mm thick toughened glass",
      "Black coated brass burners",
      "Auto pulse ignition"
    ],
    "specs": {
      "Size": "75 cm",
      "Burners": "4 Burners (1 Jumbo, 2 Big, 1 Small)",
      "Finish": "8mm Toughened Glass",
      "Ignition": "Auto Ignition"
    }
  },
  {
    "id": "prod-fryer-001",
    "name": "KFR12 Air Fryer Oven",
    "category": "Small Appliances",
    "price": 12990,
    "originalPrice": 16990,
    "rating": 4.9,
    "image": "images/extracted/img_p50_3.jpeg",
    "badge": "12L Capacity",
    "description": "Electric air fryer and rotisserie oven with dehydrate mode. 12L capacity, 10 pre-set functions, touch screen LED display, and 1800W power.",
    "features": [
      "12L multi-mode air fry oven",
      "10 quick pre-set options",
      "360° heat circulation tech"
    ],
    "specs": {
      "Capacity": "12 Litres",
      "Power": "1800 W",
      "Temperature": "80°-200°C",
      "Control": "Touch Screen LED"
    }
  },
  {
    "id": "prod-cooker-001",
    "name": "SARC 18-R/T Rice Cooker",
    "category": "Small Appliances",
    "price": 3990,
    "originalPrice": 4990,
    "rating": 4.6,
    "image": "images/extracted/img_p49_3.jpeg",
    "badge": "1.8L Cooker",
    "description": "Convenience Plus automatic rice cooker. Stainless steel lid, auto warm mode, double wall cool touch body, and food grade SS bowl.",
    "features": [
      "Automatic cooking & warm",
      "Double wall cool touch body",
      "Food grade SS bowl included"
    ],
    "specs": {
      "Capacity": "1.8 Litres",
      "Power": "700 W",
      "Warranty": "3 Years",
      "Colors": "PO Red / Turquoise"
    }
  },
  {
    "id": "prod-kettle-001",
    "name": "KT 17 Red Electric Kettle",
    "category": "Small Appliances",
    "price": 2490,
    "originalPrice": 3290,
    "rating": 4.7,
    "image": "images/extracted/img_p54_4.jpeg",
    "badge": "1.7L Kettle",
    "description": "Elegant stainless steel electric kettle in vibrant red color. Detachable lid, boil dry protection, and analogue temperature display.",
    "features": [
      "Analogue temperature dial",
      "Boil dry protection shutoff",
      "Removable calcium filter"
    ],
    "specs": {
      "Capacity": "1.7 Litres",
      "Power": "1850-2200 W",
      "Body": "Stainless Steel body",
      "Colors": "Red / Black"
    }
  },
  {
    "id": "prod-sink-001",
    "name": "KSA 83 SB (R10) Ashford",
    "category": "Sinks",
    "price": 19990,
    "originalPrice": 24990,
    "rating": 4.8,
    "image": "images/sinks/ksa_83_sb.jpeg",
    "badge": "Handmade Apron",
    "description": "Premium handmade single bowl stainless steel apron sink from the Ashford series. Crafted with high-grade 304 stainless steel and features R10 radius corners.",
    "features": [
      "Handmade single bowl SS apron sink",
      "With sound reduction pad on bottom & all sides",
      "With anti condensation coating",
      "Siphon and pipe included"
    ],
    "specs": {
      "Series": "Ashford",
      "Type": "Apron Sink",
      "Material": "304 Grade Stainless Steel",
      "Over All Size": "838 x 559 mm (33\" x 22\")",
      "Bowl Size": "788 x 451 x 254 mm (31\" x 18\" x 10\")",
      "Depth": "254 mm (10\")",
      "Radius": "R10"
    }
  },
  {
    "id": "prod-sink-002",
    "name": "KSA 83 DB (R10) Ashford",
    "category": "Sinks",
    "price": 26990,
    "originalPrice": 32990,
    "rating": 4.9,
    "image": "images/sinks/ksa_83_db.jpeg",
    "badge": "Double Bowl Apron",
    "description": "Handmade double bowl stainless steel apron sink from the Ashford series. Premium quality 304 grade steel with double bowl utility.",
    "features": [
      "Handmade double bowl SS apron sink",
      "With sound reduction pad on bottom & all sides",
      "With anti condensation coating",
      "Siphon and pipe included"
    ],
    "specs": {
      "Series": "Ashford",
      "Type": "Double Bowl Apron",
      "Material": "304 Grade Stainless Steel",
      "Over All Size": "838 x 559 mm (33\" x 22\")",
      "Bowl Size": "380 x 452 x 254 mm (15\" x 18\" x 10\")",
      "Depth": "254 mm (10\")",
      "Radius": "R10"
    }
  },
  {
    "id": "prod-sink-003",
    "name": "KS 22 SB (R10) Bar Sink",
    "category": "Sinks",
    "price": 8990,
    "originalPrice": 11990,
    "rating": 4.7,
    "image": "images/sinks/ks_22_sb.jpeg",
    "badge": "Compact Bar Sink",
    "description": "Compact handmade single bowl stainless steel bar sink. Perfect for home bars, prep areas, or small kitchens.",
    "features": [
      "Handmade single bowl stainless steel sink",
      "With sound reduction pad on bottom & all sides",
      "With anti condensation coating",
      "Siphon and pipe included"
    ],
    "specs": {
      "Series": "Bar Sink",
      "Type": "Single Bowl Bar Sink",
      "Material": "304 Grade Stainless Steel",
      "Over All Size": "220 x 440 mm (9\" x 17\")",
      "Bowl Size": "180 x 400 x 200 mm (7\" x 16\" x 8\")",
      "Depth": "200 mm (8\")",
      "Radius": "R10"
    }
  },
  {
    "id": "prod-sink-004",
    "name": "KS 870 DB (R10) Marco",
    "category": "Sinks",
    "price": 21990,
    "originalPrice": 26990,
    "rating": 4.8,
    "image": "images/sinks/ks_870_db.jpeg",
    "badge": "Double Bowl",
    "description": "Premium Marco series double bowl stainless steel sink. Crafted from durable 304 grade steel for heavy kitchen use.",
    "features": [
      "Handmade double bowl stainless steel sink",
      "With sound reduction pad on bottom & all sides",
      "With anti condensation coating",
      "Siphon and pipe included"
    ],
    "specs": {
      "Series": "Marco",
      "Type": "Double Bowl",
      "Material": "304 Grade Stainless Steel",
      "Over All Size": "870 x 450 mm (34\" x 18\")",
      "Bowl Size": "397 x 400 x 228 mm (16\" x 16\" x 9\")",
      "Depth": "228 mm (9\")",
      "Radius": "R10"
    }
  },
  {
    "id": "prod-sink-005",
    "name": "KS 610 SB (R10) Marco",
    "category": "Sinks",
    "price": 12990,
    "originalPrice": 15990,
    "rating": 4.7,
    "image": "images/sinks/ks_610_sb.jpeg",
    "badge": "Single Bowl",
    "description": "Marco series single bowl stainless steel sink. Standard size with deep bowl design and sound insulation.",
    "features": [
      "Handmade single bowl stainless steel sink",
      "With sound reduction pad on bottom & all sides",
      "With anti condensation coating",
      "Siphon and pipe included"
    ],
    "specs": {
      "Series": "Marco",
      "Type": "Single Bowl",
      "Material": "304 Grade Stainless Steel",
      "Over All Size": "610 x 457 mm (24\" x 18\")",
      "Bowl Size": "560 x 407 x 228 mm (22\" x 16\" x 9\")",
      "Depth": "228 mm (9\")",
      "Radius": "R10"
    }
  },
  {
    "id": "prod-sink-006",
    "name": "KS 850 SBD (R10) Marco",
    "category": "Sinks",
    "price": 17990,
    "originalPrice": 21990,
    "rating": 4.8,
    "image": "images/sinks/ks_850_sbd.jpeg",
    "badge": "Single Bowl + Drainboard",
    "description": "Marco series single bowl stainless steel sink with integrated drainboard. Provides extra counter space and convenient drying area.",
    "features": [
      "Handmade single bowl with drain board",
      "With sound reduction pad on bottom & all sides",
      "With anti condensation coating",
      "Siphon and pipe included"
    ],
    "specs": {
      "Series": "Marco",
      "Type": "Single Bowl with Drainboard",
      "Material": "304 Grade Stainless Steel",
      "Over All Size": "850 x 440 mm (34\" x 17\")",
      "Bowl Size": "420 x 390 x 228 mm (17\" x 16\" x 9\")",
      "Depth": "228 mm (9\")",
      "Radius": "R10"
    }
  },
  {
    "id": "prod-sink-007",
    "name": "KS 114 DB (R10) Marco",
    "category": "Sinks",
    "price": 24990,
    "originalPrice": 30990,
    "rating": 4.9,
    "image": "images/sinks/ks_114_db.jpeg",
    "badge": "Wide Double Bowl",
    "description": "Extra wide Marco series double bowl stainless steel sink. Features spacious dual basins and superior sound damping.",
    "features": [
      "Handmade double bowl stainless steel sink",
      "With sound reduction pad on bottom & all sides",
      "With anti condensation coating",
      "Siphon and pipe included"
    ],
    "specs": {
      "Series": "Marco",
      "Type": "Double Bowl",
      "Material": "304 Grade Stainless Steel",
      "Over All Size": "1140 x 500 mm (44\" x 20\")",
      "Bowl Size": "532 x 450 x 225 mm (20\" x 18\" x 9\")",
      "Depth": "225 mm (9\")",
      "Radius": "R10"
    }
  },
  {
    "id": "prod-sink-008",
    "name": "KS 115 DBD (R10) Marco",
    "category": "Sinks",
    "price": 29990,
    "originalPrice": 36990,
    "rating": 4.8,
    "image": "images/sinks/ks_115_dbd.jpeg",
    "badge": "Double Bowl + Drainboard",
    "description": "Premium Marco series double bowl stainless steel sink with an integrated drainboard. The ultimate sink setup for busy kitchens.",
    "features": [
      "Handmade double bowl with drainboard",
      "With sound reduction pad on bottom & all sides",
      "With anti condensation coating",
      "Siphon and pipe included"
    ],
    "specs": {
      "Series": "Marco",
      "Type": "Double Bowl with Drainboard",
      "Material": "304 Grade Stainless Steel",
      "Over All Size": "1150 x 500 mm (45\" x 20\")",
      "Bowl Size": "360 x 450 x 228 mm (14\" x 18\" x 9\")",
      "Depth": "228 mm (9\")",
      "Radius": "R10"
    }
  },
  {
    "id": "prod-sink-009",
    "name": "KS 940 DB-R10 Marco",
    "category": "Sinks",
    "price": 22990,
    "originalPrice": 27990,
    "rating": 4.7,
    "image": "images/sinks/ks_940_db.jpeg",
    "badge": "Double Bowl",
    "description": "Marco series double bowl stainless steel sink with deep basins. Premium 304 grade steel provides a long-lasting and hygienic surface.",
    "features": [
      "Handmade Double bowl stainless steel sink",
      "With sound reduction pad on bottom & all sides",
      "With anti condensation coating",
      "Siphon and pipe included"
    ],
    "specs": {
      "Series": "Marco",
      "Type": "Double Bowl",
      "Material": "304 Grade Stainless Steel",
      "Over All Size": "940 x 460 mm (37\" x 18\")",
      "Bowl Size": "432.5 x 410 x 230 mm (17\" x 16\" x 9\")",
      "Depth": "230 mm (9\")",
      "Radius": "R10"
    }
  },
  {
    "id": "prod-sink-010",
    "name": "KSBL 610 SB (R10) Carra",
    "category": "Sinks",
    "price": 15990,
    "originalPrice": 19990,
    "rating": 4.8,
    "image": "images/sinks/ksbl_610_sb.jpeg",
    "badge": "PVD Black Single Bowl",
    "description": "Carra series handmade single bowl stainless steel black sink. Features PVD coating technology for a scratch-resistant and elegant black metallic finish.",
    "features": [
      "Handmade single bowl SS black sink",
      "PVD Black Steel coating",
      "With sound reduction pad on bottom & all sides",
      "With anti condensation coating",
      "Siphon and pipe included"
    ],
    "specs": {
      "Series": "Carra",
      "Type": "PVD Black Single Bowl",
      "Material": "304 Grade Stainless Steel",
      "Finish": "PVD Black Steel",
      "Over All Size": "610 x 457 mm (24\" x 18\")",
      "Bowl Size": "560 x 407 x 228 mm (22\" x 16\" x 9\")",
      "Depth": "228 mm (9\")",
      "Radius": "R10"
    }
  },
  {
    "id": "prod-sink-011",
    "name": "KSBL 850 SBD (R10) Carra",
    "category": "Sinks",
    "price": 21990,
    "originalPrice": 26990,
    "rating": 4.9,
    "image": "images/sinks/ksbl_850_sbd.jpeg",
    "badge": "PVD Black Single + Drainboard",
    "description": "Carra series PVD black single bowl sink with integrated drainboard. Combines high-end aesthetics with premium scratch resistance.",
    "features": [
      "Handmade single bowl with drain board black sink",
      "PVD Black Steel coating",
      "With sound reduction pad on bottom & all sides",
      "With anti condensation coating",
      "Siphon and pipe included"
    ],
    "specs": {
      "Series": "Carra",
      "Type": "PVD Black Single Bowl with Drainboard",
      "Material": "304 Grade Stainless Steel",
      "Finish": "PVD Black Steel",
      "Over All Size": "850 x 440 mm (34\" x 17\")",
      "Bowl Size": "420 x 390 x 228 mm (17\" x 16\" x 9\")",
      "Depth": "228 mm (9\")",
      "Radius": "R10"
    }
  },
  {
    "id": "prod-sink-012",
    "name": "KS 140 DBD (R10) Marco",
    "category": "Sinks",
    "price": 34990,
    "originalPrice": 42990,
    "rating": 5.0,
    "image": "images/sinks/ks_140_dbd.jpeg",
    "badge": "Ultra Wide Double + Drain",
    "description": "Ultra-spacious Marco series double bowl sink with drainboard. Reaches a massive 1400mm width, perfect for grand modular kitchens.",
    "features": [
      "Handmade Double bowl with drainboard",
      "With sound reduction pad on bottom & all sides",
      "With anti condensation coating",
      "Siphon and pipe included"
    ],
    "specs": {
      "Series": "Marco",
      "Type": "Double Bowl with Drainboard",
      "Material": "304 Grade Stainless Steel",
      "Over All Size": "1400 x 500 mm (55\" x 20\")",
      "Bowl Size": "520 x 450 x 230 mm (20\" x 18\" x 9\")",
      "Depth": "230 mm (9\")",
      "Radius": "R10"
    }
  },
  {
    "id": "prod-sink-013",
    "name": "KSD 115 DB Olivia",
    "category": "Sinks",
    "price": 10990,
    "originalPrice": 13990,
    "rating": 4.6,
    "image": "images/sinks/ksd_115_db.jpeg",
    "badge": "Double Drawn Double Bowl",
    "description": "Olivia series double drawn double bowl stainless steel sink. Provides high durability and seamless curves through precise drawing processes.",
    "features": [
      "Double bowl stainless steel sink",
      "With sound reduction pad on bottom & all sides",
      "With anti condensation coating",
      "Siphon and pipe included"
    ],
    "specs": {
      "Series": "Olivia",
      "Type": "Double Drawn Double Bowl",
      "Material": "304 Grade Stainless Steel",
      "Over All Size": "1150 x 500 mm (45\" x 20\")",
      "Bowl Size": "517 x 416 x 220 mm (20\" x 16\" x 9\")",
      "Depth": "220 mm (9\")"
    }
  },
  {
    "id": "prod-sink-014",
    "name": "KSBL 850 SB (R10) Carra",
    "category": "Sinks",
    "price": 19990,
    "originalPrice": 24990,
    "rating": 4.8,
    "image": "images/sinks/ksbl_850_sb.jpeg",
    "badge": "PVD Black Double Bowl",
    "description": "Carra series PVD black double bowl stainless steel sink. Deep dual basins coated with protective PVD black finish.",
    "features": [
      "Handmade double bowl SS black sink",
      "PVD Black Steel coating",
      "With sound reduction pad on bottom & all sides",
      "With anti condensation coating",
      "Siphon and pipe included"
    ],
    "specs": {
      "Series": "Carra",
      "Type": "PVD Black Double Bowl",
      "Material": "304 Grade Stainless Steel",
      "Finish": "PVD Black Steel",
      "Over All Size": "850 x 450 mm (34\" x 18\")",
      "Bowl Size": "800 x 400 x 220 mm (31\" x 16\" x 9\")",
      "Depth": "220 mm (9\")",
      "Radius": "R10"
    }
  },
  {
    "id": "prod-sink-015",
    "name": "KSG 22 SB Casso",
    "category": "Sinks",
    "price": 14990,
    "originalPrice": 18990,
    "rating": 4.8,
    "image": "images/sinks/ksg_22_sb_blk.jpeg",
    "badge": "Granite Single Bowl",
    "description": "Casso series single bowl granite sink in metallic black finish. Incredibly scratch resistant, heat proof, and stain repellent.",
    "features": [
      "Single bowl granite sink",
      "Heat resistance: stays intact on contact with hot objects",
      "Resistance to chemicals: does not discolour with strong cleaners",
      "Easy to clean: coffee or red wine leaves no stain",
      "Scratch resistance: resistant to scratches, marks & wear"
    ],
    "specs": {
      "Series": "Casso",
      "Type": "Granite Single Bowl",
      "Material": "Granite Composite",
      "Color": "Metallic Black",
      "Over All Size": "565 x 508 mm (22\" x 20\")",
      "Bowl Size": "510 x 400 x 203 mm (20\" x 16\" x 8\")",
      "Depth": "203 mm (8\")"
    }
  },
  {
    "id": "prod-sink-016",
    "name": "KSG 21 SB Casso",
    "category": "Sinks",
    "price": 13990,
    "originalPrice": 17990,
    "rating": 4.7,
    "image": "images/sinks/ksg_21_sb_blk.jpeg",
    "badge": "Granite Single Bowl",
    "description": "Casso series single bowl granite sink in a compact size. Offers extreme durability and resistance to thermal shock and marks.",
    "features": [
      "Single bowl granite sink",
      "Heat resistance: stays intact on contact with hot objects",
      "Resistance to chemicals: does not discolour with strong cleaners",
      "Easy to clean: coffee or red wine leaves no stain",
      "Scratch resistance: resistant to scratches, marks & wear"
    ],
    "specs": {
      "Series": "Casso",
      "Type": "Granite Single Bowl",
      "Material": "Granite Composite",
      "Color": "Metallic Black",
      "Over All Size": "533 x 457 mm (21\" x 18\")",
      "Bowl Size": "479 x 403 x 203 mm (19\" x 16\" x 8\")",
      "Depth": "203 mm (8\")"
    }
  },
  {
    "id": "prod-sink-017",
    "name": "KSG 40 SDB Casso",
    "category": "Sinks",
    "price": 21990,
    "originalPrice": 27990,
    "rating": 4.8,
    "image": "images/sinks/ksg_40_sdb_blk.jpeg",
    "badge": "Granite Single + Drainboard",
    "description": "Casso series single bowl granite sink with integrated drainboard. Available in black, beige, or grey finishes.",
    "features": [
      "Single bowl with drainboard granite sink",
      "Heat resistance: stays intact on contact with hot objects",
      "Resistance to chemicals: does not discolour with strong cleaners",
      "Easy to clean: coffee or red wine leaves no stain",
      "Scratch resistance: resistant to scratches, marks & wear"
    ],
    "specs": {
      "Series": "Casso",
      "Type": "Granite Single Bowl with Drainboard",
      "Material": "Granite Composite",
      "Color Options": "Black (BLK) / Beige (BG) / Grey (GR)",
      "Over All Size": "1000 x 500 mm (39\" x 20\")",
      "Bowl Size": "480 x 430 x 241 mm (19\" x 17\" x 9\")",
      "Depth": "241 mm (9\")"
    }
  },
  {
    "id": "prod-sink-018",
    "name": "KSG 45 DBN Casso",
    "category": "Sinks",
    "price": 28990,
    "originalPrice": 35990,
    "rating": 4.9,
    "image": "images/sinks/ksg_45_dbn_blk.jpeg",
    "badge": "Granite Double Bowl",
    "description": "Casso series double bowl granite sink. Dual spacious composite stone basins provide ultimate resistance to high temperatures and scratches.",
    "features": [
      "Double bowl granite sink",
      "Heat resistance: stays intact on contact with hot objects",
      "Resistance to chemicals: does not discolour with strong cleaners",
      "Easy to clean: coffee or red wine leaves no stain",
      "Scratch resistance: resistant to scratches, marks & wear"
    ],
    "specs": {
      "Series": "Casso",
      "Type": "Granite Double Bowl",
      "Material": "Granite Composite",
      "Color Options": "Black (BLK) / Beige (BG) / Grey (GR)",
      "Over All Size": "1140 x 505 mm (45\" x 20\")",
      "Bowl Size": "509 x 433 x 230 mm (20\" x 17\" x 8\")",
      "Depth": "230 mm (8\")"
    }
  },
  {
    "id": "prod-sink-019",
    "name": "KSG 24 SB Casso",
    "category": "Sinks",
    "price": 15990,
    "originalPrice": 19990,
    "rating": 4.8,
    "image": "images/sinks/ksg_24_sb_blk.jpeg",
    "badge": "Granite Single Bowl",
    "description": "Casso series single bowl granite sink with deep basin. Composite granite stone prevents water marks, stains, and scratches.",
    "features": [
      "Single bowl granite sink",
      "Heat resistance: stays intact on contact with hot objects",
      "Resistance to chemicals: does not discolour with strong cleaners",
      "Easy to clean: coffee or red wine leaves no stain",
      "Scratch resistance: resistant to scratches, marks & wear"
    ],
    "specs": {
      "Series": "Casso",
      "Type": "Granite Single Bowl",
      "Material": "Granite Composite",
      "Color Options": "Black (BLK) / Beige (BG)",
      "Over All Size": "610 x 457 mm (24\" x 18\")",
      "Bowl Size": "557 x 405 x 204 mm (22\" x 16\" x 8\")",
      "Depth": "204 mm (8\")"
    }
  }
];

const defaultCollections = [
  {
    "id": "coll-default-chimneys",
    "name": "Chimneys",
    "displayName": "Designer Chimneys",
    "count": 46,
    "icon": "<svg viewBox=\"0 0 24 24\"><path d=\"M9.59 4.59A2 2 0 1 1 11 8H2m10.59-3.41A2 2 0 1 1 14 8H2m15.59-3.41A2 2 0 1 1 19 8H2\"></path></svg>",
    "image": "images/chimney.png"
  },
  {
    "id": "coll-default-hobs",
    "name": "Hobs",
    "displayName": "Built-in Hobs",
    "count": 68,
    "icon": "<svg viewBox=\"0 0 24 24\"><ellipse cx=\"11\" cy=\"13\" rx=\"7\" ry=\"5\"></ellipse><path d=\"M18 13h4\"></path><path d=\"M11 10a4.5 3 0 0 1 2 1.5\"></path></svg>",
    "image": "images/hob.png"
  },
  {
    "id": "coll-default-ovens",
    "name": "Ovens",
    "displayName": "Built-in Ovens",
    "count": 15,
    "icon": "<svg viewBox=\"0 0 24 24\"><path d=\"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z\"></path></svg>",
    "image": "images/oven.png"
  },
  {
    "id": "coll-default-microwaves",
    "name": "Microwaves",
    "displayName": "Built-in Microwaves",
    "count": 7,
    "icon": "<svg viewBox=\"0 0 24 24\"><rect x=\"2\" y=\"4\" width=\"20\" height=\"16\" rx=\"2\"></rect><line x1=\"6\" y1=\"8\" x2=\"14\" y2=\"8\"></line><line x1=\"6\" y1=\"12\" x2=\"14\" y2=\"12\"></line><line x1=\"6\" y1=\"16\" x2=\"14\" y2=\"16\"></line><circle cx=\"18\" cy=\"10\" r=\"1\"></circle><circle cx=\"18\" cy=\"14\" r=\"1\"></circle></svg>",
    "image": "images/extracted/img_p35_7.jpeg"
  },
  {
    "id": "coll-default-ranges",
    "name": "Cooking Ranges",
    "displayName": "Cooking Ranges",
    "count": 3,
    "icon": "<svg viewBox=\"0 0 24 24\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/><circle cx=\"8\" cy=\"8\" r=\"1.5\"/><circle cx=\"16\" cy=\"8\" r=\"1.5\"/><circle cx=\"8\" cy=\"16\" r=\"1.5\"/><circle cx=\"16\" cy=\"16\" r=\"1.5\"/></svg>",
    "image": "images/extracted/img_p37_2.jpeg"
  },
  {
    "id": "coll-default-dishwashers",
    "name": "Dishwashers",
    "displayName": "Dishwashers",
    "count": 6,
    "icon": "<svg viewBox=\"0 0 24 24\"><path d=\"M4 9h16M7 6h2M12 6h.01M8 14h8M12 17h2\"/><rect x=\"4\" y=\"3\" width=\"16\" height=\"18\" rx=\"2\"/></svg>",
    "image": "images/dishwasher.png"
  },
  {
    "id": "coll-default-wine",
    "name": "Wine Coolers",
    "displayName": "Wine Coolers",
    "count": 4,
    "icon": "<svg viewBox=\"0 0 24 24\"><path d=\"M12 2v20M5 5h14M5 9h14M5 13h14M5 17h14\"/></svg>",
    "image": "images/extracted/img_p41_1.jpeg"
  },
  {
    "id": "coll-default-refrigerators",
    "name": "Refrigerators",
    "displayName": "Built-in Refrigerators",
    "count": 1,
    "icon": "<svg viewBox=\"0 0 24 24\"><path d=\"M7.5 4L16.5 4L12 12l8-4.5\"></path><path d=\"M4 7.5L12 12L4 16.5\"></path><path d=\"M16.5 20L12 12l4.5-8\"></path><path d=\"M7.5 4L12 12L7.5 20\"></path></svg>",
    "image": "images/refrigerator.png"
  },
  {
    "id": "coll-default-coffee",
    "name": "Coffee Machines",
    "displayName": "Coffee Machines",
    "count": 5,
    "icon": "<svg viewBox=\"0 0 24 24\"><path d=\"M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z\"/><path d=\"M6 1v3M10 1v3M14 1v3\"/></svg>",
    "image": "images/extracted/img_p40_3.jpeg"
  },
  {
    "id": "coll-default-cooktops",
    "name": "Cooktops",
    "displayName": "Glass Cooktops",
    "count": 28,
    "icon": "<svg viewBox=\"0 0 24 24\"><rect x=\"2\" y=\"5\" width=\"20\" height=\"14\" rx=\"2\"/><circle cx=\"7\" cy=\"12\" r=\"2\"/><circle cx=\"17\" cy=\"12\" r=\"2\"/></svg>",
    "image": "images/hob.png"
  },
  {
    "id": "coll-default-small",
    "name": "Small Appliances",
    "displayName": "Small Appliances",
    "count": 18,
    "icon": "<svg viewBox=\"0 0 24 24\"><path d=\"M12 3v18M3 12h18\"/></svg>",
    "image": "images/extracted/img_p50_3.jpeg"
  },
  {
    "id": "coll-default-sinks",
    "name": "Sinks",
    "displayName": "Kitchen Sinks",
    "count": 19,
    "icon": "<svg viewBox=\"0 0 24 24\"><rect x=\"2\" y=\"6\" width=\"20\" height=\"12\" rx=\"2\"/><ellipse cx=\"12\" cy=\"12\" rx=\"6\" ry=\"3\"/></svg>",
    "image": "images/sinks/ks_870_db.jpeg"
  }
];

const defaultCombos = [
  {
    "id": "combo-101",
    "name": "ASHPRO 60DC + HBR 604 A",
    "mrp": 67470,
    "price": 44354,
    "freeGift": "Air Fryer",
    "freeGiftMrp": 13990,
    "page": 4,
    "image": "images/combos/page_4_left.png",
    "items": [
      {
        "type": "Chimney",
        "model": "ASHPRO 60DC",
        "specs": [
          "Filter-less + Dry Heat Auto Clean",
          "BLDC Motor, Airflow up to 1600 m\u00b3/h",
          "Gesture Motion with 9 Speed Levels",
          "Matt Black Finish, Size: 60cm"
        ]
      },
      {
        "type": "Built-in Hob",
        "model": "HBR 604 A",
        "specs": [
          "4 Brass Burners (1 Triple Ring + 3 Dual Ring)",
          "8mm Black Tempered Glass",
          "Auto Electric Ignition",
          "Enamelled Matt Finish Grills, Size: 60cm"
        ]
      }
    ]
  },
  {
    "id": "combo-102",
    "name": "AERO 60BL/RG + CRH604",
    "mrp": 63470,
    "price": 37861,
    "freeGift": "Air Fryer",
    "freeGiftMrp": 13990,
    "page": 4,
    "image": "images/combos/page_4_right.png",
    "items": [
      {
        "type": "Chimney",
        "model": "AERO 60BL/RG",
        "specs": [
          "Filter-less + Dry Heat Auto Clean",
          "Dual Ventilation System",
          "Touch Control with 3-Speed Gesture",
          "Airflow up to 1350 m\u00b3/h, Size: 60cm"
        ]
      },
      {
        "type": "Built-in Hob",
        "model": "CRH604",
        "specs": [
          "Black Coated Tornado Style Burners",
          "1 Triple Ring + 3 Dual Ring Burners",
          "8mm Black Tempered Glass",
          "Auto Ignition, Matt Enameled Pan Support"
        ]
      }
    ]
  },
  {
    "id": "combo-103",
    "name": "MAINZ SUPER DHC 60 + HBR 603B",
    "mrp": 69970,
    "price": 38887,
    "freeGift": "Air Fryer",
    "freeGiftMrp": 13990,
    "page": 5,
    "image": "images/combos/page_5_left.png",
    "items": [
      {
        "type": "Chimney",
        "model": "MAINZ SUPER DHC 60",
        "specs": [
          "Filter-less + Dry Heat Auto Clean",
          "3-Speed Touch Control with Gesture Panel",
          "Tilted Bottom Design for Better Performance",
          "Airflow up to 1450 m\u00b3/h, Size: 60cm"
        ]
      },
      {
        "type": "Built-in Hob",
        "model": "HBR 603B",
        "specs": [
          "3 Brass Burners (1 Triple Ring + 2 Dual Ring)",
          "8mm Black Tempered Glass",
          "Auto Electric Ignition",
          "Enamelled Matt Finish, Size: 60cm"
        ]
      }
    ]
  },
  {
    "id": "combo-104",
    "name": "Molin 60 + NYG64B",
    "mrp": 95570,
    "price": 72167,
    "freeGift": "Rice Cooker",
    "freeGiftMrp": 4590,
    "page": 5,
    "image": "images/combos/page_5_right.png",
    "items": [
      {
        "type": "Chimney",
        "model": "Molin 60",
        "specs": [
          "Matt-Finished Granite Texture",
          "Filter-less + Smart Auto Clean (BLDC Motor)",
          "Curved Front Black Glass Panel with Digital Display",
          "Airflow up to 1480 m\u00b3/h, Size: 60cm"
        ]
      },
      {
        "type": "Built-in Hob",
        "model": "NYG64B",
        "specs": [
          "4 Full Brass High Efficiency Burners",
          "1 Big Triple + 1 Mini Triple + 2 Dual Ring",
          "Premium Frosted Black Glass with Round Edges",
          "Auto Electric Ignition"
        ]
      }
    ]
  },
  {
    "id": "combo-105",
    "name": "CASTO 60-DC + BLH 604",
    "mrp": 86270,
    "price": 66659,
    "freeGift": "Rice Cooker",
    "freeGiftMrp": 4590,
    "page": 6,
    "image": "images/combos/page_6_left.png",
    "items": [
      {
        "type": "Chimney",
        "model": "CASTO 60-DC",
        "specs": [
          "BLDC Motor, Smart Auto Clean",
          "Gesture Motion with 8 Speed + Booster",
          "Black Tempered Glass with Matt Black Finish",
          "Airflow up to 1480 m\u00b3/h, Size: 60cm"
        ]
      },
      {
        "type": "Built-in Hob",
        "model": "BLH 604",
        "specs": [
          "4 Full Brass Burners (1 Big Triple + FFD)",
          "8mm Black Tempered Glass",
          "Heavy Duty Cast Iron Pan Support",
          "Flame Failure Device, Size: 60cm"
        ]
      }
    ]
  },
  {
    "id": "combo-106",
    "name": "Molin 75 + ASF784",
    "mrp": 96970,
    "price": 67203,
    "freeGift": "Air Fryer",
    "freeGiftMrp": 13990,
    "page": 6,
    "image": "images/combos/page_6_right.png",
    "items": [
      {
        "type": "Chimney",
        "model": "Molin 75",
        "specs": [
          "Matt-Finished Granite Texture",
          "Filter-less + Smart Auto Clean (BLDC Motor)",
          "Curved Front Black Glass Panel with Digital Display",
          "Airflow up to 1480 m\u00b3/h, Size: 75cm"
        ]
      },
      {
        "type": "Built-in Hob",
        "model": "ASF784",
        "specs": [
          "4 Full Brass Burners (2 Triple Ring + 2 Dual Ring)",
          "Bevelled Black Tempered Glass",
          "Enamelled Matt Finish Grills",
          "Auto Electric Ignition, Size: 78cm"
        ]
      }
    ]
  },
  {
    "id": "combo-107",
    "name": "LYNN 75 DC + CRH804",
    "mrp": 71070,
    "price": 46339,
    "freeGift": "Rice Cooker",
    "freeGiftMrp": 4590,
    "page": 7,
    "image": "images/combos/page_7_left.png",
    "items": [
      {
        "type": "Chimney",
        "model": "LYNN 75 DC",
        "specs": [
          "Filter-less + Dry Heat Auto Clean (BLDC Motor)",
          "Gesture Motion 8 Speed + Booster",
          "Automatic Open Glass Panel",
          "Airflow up to 1600 m\u00b3/h, Size: 75cm"
        ]
      },
      {
        "type": "Built-in Hob",
        "model": "CRH804",
        "specs": [
          "Black Coated Tornado Style Burners",
          "2 Triple Ring + 2 Dual Ring Burners",
          "8mm Black Tempered Glass",
          "Auto Ignition, Matt Enameled Pan Support, Size: 80cm"
        ]
      }
    ]
  },
  {
    "id": "combo-108",
    "name": "VASCO 75DC + INF 804",
    "mrp": 88970,
    "price": 61319,
    "freeGift": "Air Fryer",
    "freeGiftMrp": 13990,
    "page": 7,
    "image": "images/combos/page_7_right.png",
    "items": [
      {
        "type": "Chimney",
        "model": "VASCO 75DC",
        "specs": [
          "Filter-less + Smart Auto Clean (BLDC Motor)",
          "Gesture Motion 8 Speed + Booster",
          "Black Tempered Curve Glass, Matte Black Finish",
          "Airflow up to 1480 m\u00b3/h, Size: 75cm"
        ]
      },
      {
        "type": "Built-in Hob",
        "model": "INF 804",
        "specs": [
          "4 Full Brass Burners with Full FFD",
          "2 Triple Ring + 2 Dual Ring Burners",
          "Heavy Duty Cast Iron Pan Support",
          "8mm Black Tempered Glass, Size: 80cm"
        ]
      }
    ]
  },
  {
    "id": "combo-109",
    "name": "CASTO 75-DC + ASF784",
    "mrp": 95970,
    "price": 67237,
    "freeGift": "Air Fryer",
    "freeGiftMrp": 13990,
    "page": 8,
    "image": "images/combos/page_8_left.png",
    "items": [
      {
        "type": "Chimney",
        "model": "CASTO 75-DC",
        "specs": [
          "BLDC Motor, Smart Auto Clean",
          "Gesture Motion with 8 Speed + Booster",
          "Black Tempered Glass with Matt Black Finish",
          "Airflow up to 1480 m\u00b3/h, Size: 75cm"
        ]
      },
      {
        "type": "Built-in Hob",
        "model": "ASF784",
        "specs": [
          "4 Full Brass Burners (2 Triple Ring + 2 Dual Ring)",
          "Bevelled Black Tempered Glass",
          "Enamelled Matt Finish Grills",
          "Auto Electric Ignition, Size: 78cm"
        ]
      }
    ]
  },
  {
    "id": "combo-110",
    "name": "ALBURY 75DC + BLHF 804",
    "mrp": 114970,
    "price": 85742,
    "freeGift": "Coffee Machine",
    "freeGiftMrp": 12990,
    "page": 8,
    "image": "images/combos/page_8_right.png",
    "items": [
      {
        "type": "Chimney",
        "model": "ALBURY 75DC",
        "specs": [
          "Filter-less + Smart Auto Clean (BLDC Motor)",
          "Gesture Motion 8 Speed + Booster",
          "Automatic Glass Opening Panel",
          "Airflow up to 1280 m\u00b3/h, Size: 75cm"
        ]
      },
      {
        "type": "Built-in Hob",
        "model": "BLHF 804",
        "specs": [
          "4 Full Brass Burners with FFD",
          "Heavy Duty Cast Iron Pan Support",
          "8mm Black Tempered Glass, SS Moulded Strip",
          "Flame Failure Device, Size: 80cm"
        ]
      }
    ]
  },
  {
    "id": "combo-111",
    "name": "ALBURY(SUPER)75 + MSM 804",
    "mrp": 125970,
    "price": 93693,
    "freeGift": "Air Fryer",
    "freeGiftMrp": 13990,
    "page": 9,
    "image": "images/combos/page_9_left.png",
    "items": [
      {
        "type": "Chimney",
        "model": "ALBURY(SUPER)75",
        "specs": [
          "BLDC Motor, Smart Auto Clean",
          "Gesture Motion 8 Speed + Booster",
          "Black Tempered Glass, Premium Matt Black Finish",
          "Airflow up to 1480 m\u00b3/h, Size: 75cm"
        ]
      },
      {
        "type": "Built-in Hob",
        "model": "MSM 804",
        "specs": [
          "4 Full Brass Burners with FFD",
          "8mm Premium Frosted Black Glass, SS Moulded Strip",
          "Heavy Duty Cast Iron Pan Support",
          "Brass Flame Spreader, Size: 80cm"
        ]
      }
    ]
  },
  {
    "id": "combo-112",
    "name": "Molin 90 + HBR 904A",
    "mrp": 85970,
    "price": 57269,
    "freeGift": "Air Fryer",
    "freeGiftMrp": 13990,
    "page": 9,
    "image": "images/combos/page_9_right.png",
    "items": [
      {
        "type": "Chimney",
        "model": "Molin 90",
        "specs": [
          "Matt-Finished Granite Texture",
          "Filter-less + Smart Auto Clean (BLDC Motor)",
          "Curved Front Black Glass Panel with Digital Display",
          "Airflow up to 1480 m\u00b3/h, Size: 90cm"
        ]
      },
      {
        "type": "Built-in Hob",
        "model": "HBR 904A",
        "specs": [
          "4 Brass Burners (2 Triple Ring + 2 Dual Ring)",
          "8mm Tempered Glass",
          "Matt Enameled Pan Support",
          "Auto Electric Ignition, Size: 90cm"
        ]
      }
    ]
  },
  {
    "id": "combo-113",
    "name": "Molin 90 + MSM 804",
    "mrp": 117970,
    "price": 84388,
    "freeGift": "Air Fryer",
    "freeGiftMrp": 13990,
    "page": 10,
    "image": "images/combos/page_10_left.png",
    "items": [
      {
        "type": "Chimney",
        "model": "Molin 90",
        "specs": [
          "Matt-Finished Granite Texture",
          "Filter-less + Smart Auto Clean (BLDC Motor)",
          "Curved Front Black Glass Panel with Digital Display",
          "Airflow up to 1480 m\u00b3/h, Size: 90cm"
        ]
      },
      {
        "type": "Built-in Hob",
        "model": "MSM 804",
        "specs": [
          "4 Full Brass Burners with FFD",
          "8mm Premium Frosted Black Glass, SS Moulded Strip",
          "Heavy Duty Cast Iron Pan Support",
          "Brass Flame Spreader, Size: 80cm"
        ]
      }
    ]
  },
  {
    "id": "combo-114",
    "name": "LYNN 90 DC + ASF94V",
    "mrp": 111970,
    "price": 70640,
    "freeGift": "Air Fryer",
    "freeGiftMrp": 13990,
    "page": 10,
    "image": "images/combos/page_10_right.png",
    "items": [
      {
        "type": "Chimney",
        "model": "LYNN 90 DC",
        "specs": [
          "Filter-less + Dry Heat Auto Clean (BLDC Motor)",
          "Gesture Motion 8 Speed + Booster",
          "Automatic Open Glass Panel",
          "Airflow up to 1600 m\u00b3/h, Size: 90cm"
        ]
      },
      {
        "type": "Built-in Hob",
        "model": "ASF94V",
        "specs": [
          "4 Full Brass Burners with Full FFD",
          "8mm Black Tempered Glass, Bevelled Edge",
          "Heavy Duty Cast Iron Pan Support",
          "Flame Failure Device, Size: 90cm"
        ]
      }
    ]
  },
  {
    "id": "combo-115",
    "name": "LYNN 90 DC + ASF94TM",
    "mrp": 104570,
    "price": 74285,
    "freeGift": "Rice Cooker",
    "freeGiftMrp": 4590,
    "page": 11,
    "image": "images/combos/page_11_left.png",
    "items": [
      {
        "type": "Chimney",
        "model": "LYNN 90 DC",
        "specs": [
          "Filter-less + Dry Heat Auto Clean (BLDC Motor)",
          "Gesture Motion 8 Speed + Booster",
          "Automatic Open Glass Panel",
          "Airflow up to 1600 m\u00b3/h, Size: 90cm"
        ]
      },
      {
        "type": "Built-in Hob",
        "model": "ASF94TM",
        "specs": [
          "Digital Timer (Auto Flame Off)",
          "4 Burners (1 Triple 3.5kW + 1 Mini Triple + 2 Dual)",
          "8mm Tempered Glass, Cast Iron Pan Support",
          "Bevelled Edge Panel, Size: 90cm"
        ]
      }
    ]
  },
  {
    "id": "combo-116",
    "name": "BRANDO 90DC + PRS 804",
    "mrp": 104970,
    "price": 71971,
    "freeGift": "Coffee Machine",
    "freeGiftMrp": 12990,
    "page": 11,
    "image": "images/combos/page_11_right.png",
    "items": [
      {
        "type": "Chimney",
        "model": "BRANDO 90DC",
        "specs": [
          "Filter-less + Smart Auto Clean (BLDC Motor)",
          "Gesture Motion 8 Speed + Booster",
          "Matte Black Finish with Curved Edges",
          "Airflow up to 1480 m\u00b3/h, Size: 90cm"
        ]
      },
      {
        "type": "Built-in Hob",
        "model": "PRS 804",
        "specs": [
          "Digital Timer (Auto Flame Off)",
          "8mm Premium Frosted Black Glass",
          "Flame Failure Device",
          "Decorative Black Moulded Strip, Size: 80cm"
        ]
      }
    ]
  },
  {
    "id": "combo-117",
    "name": "BRANDO 90DC + ASF94M",
    "mrp": 107970,
    "price": 71872,
    "freeGift": "Coffee Machine",
    "freeGiftMrp": 12990,
    "page": 12,
    "image": "images/combos/page_12_left.png",
    "items": [
      {
        "type": "Chimney",
        "model": "BRANDO 90DC",
        "specs": [
          "Filter-less + Smart Auto Clean (BLDC Motor)",
          "Gesture Motion 8 Speed + Booster",
          "Matte Black Finish with Curved Edges",
          "Airflow up to 1480 m\u00b3/h, Size: 90cm"
        ]
      },
      {
        "type": "Built-in Hob",
        "model": "ASF94M",
        "specs": [
          "4 Full Brass Burners with Full FFD",
          "8mm Black Tempered Glass, Bevelled Edge",
          "Heavy Duty Cast Iron Pan Support",
          "Flame Failure Device, Size: 90cm"
        ]
      }
    ]
  },
  {
    "id": "combo-118",
    "name": "FALCON DX 90 + BLHF 804",
    "mrp": 126970,
    "price": 92012,
    "freeGift": "Coffee Machine",
    "freeGiftMrp": 12990,
    "page": 12,
    "image": "images/combos/page_12_right.png",
    "items": [
      {
        "type": "Chimney",
        "model": "FALCON DX 90",
        "specs": [
          "BLDC Motor, Smart Auto Clean",
          "Gesture Motion 8 Speed + Booster",
          "SS Finish Vent, Automatic Glass Opening Panel",
          "Airflow up to 1480 m\u00b3/h, Size: 90cm"
        ]
      },
      {
        "type": "Built-in Hob",
        "model": "BLHF 804",
        "specs": [
          "4 Full Brass Burners with FFD",
          "Heavy Duty Cast Iron Pan Support",
          "8mm Black Tempered Glass, SS Moulded Strip",
          "Flame Failure Device, Size: 80cm"
        ]
      }
    ]
  },
  {
    "id": "combo-119",
    "name": "NEWBURY 90 DC + NYG784G",
    "mrp": 127970,
    "price": 95678,
    "freeGift": "Airfryer",
    "freeGiftMrp": 21990,
    "page": 13,
    "image": "images/combos/page_13_left.png",
    "items": [
      {
        "type": "Chimney",
        "model": "NEWBURY 90 DC",
        "specs": [
          "Filter-less + Smart Auto Clean (BLDC Motor)",
          "Top & Bottom Suction (+30% Extraction)",
          "Touch Panel with 9-Speed Gesture Control",
          "Airflow up to 1480 m\u00b3/h, Size: 90cm"
        ]
      },
      {
        "type": "Built-in Hob",
        "model": "NYG784G",
        "specs": [
          "4 Full Brass High Efficiency Burners",
          "1 Big Triple + 1 Mini Triple + 2 Dual Ring",
          "Premium Frosted Gray Glass with Round Edges",
          "Full Flame Failure Device, Size: 78cm"
        ]
      }
    ]
  },
  {
    "id": "combo-120",
    "name": "CANARY 90DC + MSM804",
    "mrp": 135970,
    "price": 102897,
    "freeGift": "Airfryer",
    "freeGiftMrp": 21990,
    "page": 13,
    "image": "images/combos/page_13_right.png",
    "items": [
      {
        "type": "Chimney",
        "model": "CANARY 90DC",
        "specs": [
          "Filter-less + Smart Auto Clean (BLDC Motor)",
          "Gesture Motion 8 Speed + Booster",
          "Wide Extraction Surface with Stoppage Timer",
          "Airflow up to 1480 m\u00b3/h, Size: 90cm"
        ]
      },
      {
        "type": "Built-in Hob",
        "model": "MSM 804",
        "specs": [
          "4 Full Brass Burners with FFD",
          "8mm Premium Frosted Black Glass, SS Moulded Strip",
          "Heavy Duty Cast Iron Pan Support",
          "Brass Flame Spreader, Size: 80cm"
        ]
      }
    ]
  },
  {
    "id": "combo-121",
    "name": "CANARY 90DC + MSM865",
    "mrp": 146970,
    "price": 111895,
    "freeGift": "Airfryer",
    "freeGiftMrp": 21990,
    "page": 14,
    "image": "images/combos/page_14_left.png",
    "items": [
      {
        "type": "Chimney",
        "model": "CANARY 90DC",
        "specs": [
          "Filter-less + Smart Auto Clean (BLDC Motor)",
          "Gesture Motion 8 Speed + Booster",
          "Wide Extraction Surface with Stoppage Timer",
          "Airflow up to 1480 m\u00b3/h, Size: 90cm"
        ]
      },
      {
        "type": "Built-in Hob",
        "model": "MSM865",
        "specs": [
          "5 Full Brass Burners with FFD",
          "1 Big Triple + 2 Mini Triple + 2 Dual Ring",
          "8mm Premium Frosted Black Glass, SS Moulded Strip",
          "Heavy Duty Cast Iron Pan Support"
        ]
      }
    ]
  },
  {
    "id": "combo-122",
    "name": "ALBURY(SUPER)90 + MSM 94DF",
    "mrp": 130970,
    "price": 99058,
    "freeGift": "Air Fryer",
    "freeGiftMrp": 13990,
    "page": 14,
    "image": "images/combos/page_14_right.png",
    "items": [
      {
        "type": "Chimney",
        "model": "ALBURY(SUPER)90",
        "specs": [
          "BLDC Motor, Smart Auto Clean",
          "Gesture Motion 8 Speed + Booster",
          "Black Tempered Glass, Premium Matt Black Finish",
          "Airflow up to 1480 m\u00b3/h, Size: 90cm"
        ]
      },
      {
        "type": "Built-in Hob",
        "model": "MSM 94DF",
        "specs": [
          "4 Full Brass Burners with FFD",
          "8mm Premium Frosted Black Glass, SS Moulded Strip",
          "Heavy Duty Cast Iron Pan Support",
          "Brass Flame Spreader, Size: 90cm"
        ]
      }
    ]
  },
  {
    "id": "combo-123",
    "name": "CASTO 60-DC + KAB 60",
    "mrp": 137970,
    "price": 101940,
    "freeGift": "Airfryer",
    "freeGiftMrp": 21990,
    "page": 15,
    "image": "images/combos/page_15_left.png",
    "items": [
      {
        "type": "Chimney",
        "model": "CASTO 60-DC",
        "specs": [
          "BLDC Motor, Smart Auto Clean",
          "Gesture Motion with 8 Speed + Booster",
          "Black Tempered Glass with Matt Black Finish",
          "Airflow up to 1480 m\u00b3/h, Size: 60cm"
        ]
      },
      {
        "type": "Cooking Range",
        "model": "KAB 60",
        "specs": [
          "60cm Cooking Range with Electric Oven (60L)",
          "4 Gas Burners with 1 Big Triple Ring",
          "Convection Fan, Thermostat 250\u00b0C",
          "Double Glass Oven Door, Auto Electric Ignition"
        ]
      }
    ]
  },
  {
    "id": "combo-124",
    "name": "FALMARC DHC 90-A + KGM 90",
    "mrp": 229070,
    "price": 191219,
    "freeGift": "Rice Cooker",
    "freeGiftMrp": 4590,
    "page": 15,
    "image": "images/combos/page_15_right.png",
    "items": [
      {
        "type": "Chimney",
        "model": "FALMARC DHC 90-A",
        "specs": [
          "Filter-less + Dry Heat Auto Clean",
          "Automatic Glass Opening, Dual Vent Suction",
          "Gesture/Touch Controls with Digital Display",
          "Airflow up to 1480 Nm\u00b3/h, Size: 90cm"
        ]
      },
      {
        "type": "Cooking Range",
        "model": "KGM 90",
        "specs": [
          "90cm Cooking Range with Electric Oven (100L)",
          "5 Gas with 1 Big Triple Ring Sabaf Burners",
          "Heavy Duty Cast Iron Pan Support",
          "Dish Warmer, Convection Fan, Thermostat 250\u00b0C"
        ]
      }
    ]
  },
  {
    "id": "combo-125",
    "name": "OV81ATMN + KB5A",
    "mrp": 187570,
    "price": 156008,
    "freeGift": "Rice Cooker",
    "freeGiftMrp": 4590,
    "page": 16,
    "image": "images/combos/page_16_left.png",
    "items": [
      {
        "type": "Built-in Oven",
        "model": "OV81ATMN",
        "specs": [
          "60cm Electric Oven, Extra Large Cavity 81L",
          "True Convection + Air Fry Mode",
          "Smart TFT Touch, Wi-Fi & App Control",
          "Triple Layer Glass Door, Child Lock"
        ]
      },
      {
        "type": "Built-in Microwave",
        "model": "KB5A",
        "specs": [
          "Premium Matt Black Finish, Capacity 34L",
          "Microwave/Grill/Combi/Convection",
          "Auto Cooking Menu & Auto Defrost",
          "Mirror Glass Finish, Thermostat 250\u00b0C"
        ]
      }
    ]
  },
  {
    "id": "combo-126",
    "name": "OV81TCBL + KMW HN 6-BLK",
    "mrp": 136970,
    "price": 105271,
    "freeGift": "Airfryer",
    "freeGiftMrp": 17990,
    "page": 16,
    "image": "images/combos/page_16_right.png",
    "items": [
      {
        "type": "Built-in Oven",
        "model": "OV81TCBL",
        "specs": [
          "60cm Electric Oven, Extra Large Cavity 81L",
          "Black Reflective Glass Fascia",
          "Full Touch Controls, Memory Function",
          "3 Layer Glass Door, Thermostat 250\u00b0C"
        ]
      },
      {
        "type": "Built-in Microwave",
        "model": "KMW HN 6-BLK",
        "specs": [
          "Full Black Tempered Glass, Touch Controls",
          "Capacity 28L, Microwave/Grill/Combi/Convection",
          "Push Door Opening Button",
          "Thermostat 250\u00b0C, Digital Clock"
        ]
      }
    ]
  },
  {
    "id": "combo-127",
    "name": "OV 81 GIKFAFR + KMWHN6",
    "mrp": 135970,
    "price": 106971,
    "freeGift": "Coffee Machine",
    "freeGiftMrp": 12990,
    "page": 17,
    "image": "images/combos/page_17_left.png",
    "items": [
      {
        "type": "Built-in Oven",
        "model": "OV 81 GIKFAFR",
        "specs": [
          "60cm Electric Oven, Extra Large Cavity 81L",
          "Air Fryer Function for Healthy Cooking",
          "Black Reflective Glass, Rotary Electronic Controls",
          "3 Layer Glass Door, Internal Cooling Fan"
        ]
      },
      {
        "type": "Built-in Microwave",
        "model": "KMWHN6",
        "specs": [
          "Full Black Tempered Glass, Touch Controls",
          "Capacity 28L, Microwave/Grill/Combi/Convection",
          "Push Door Opening Button",
          "Thermostat 250\u00b0C, Digital Clock"
        ]
      }
    ]
  },
  {
    "id": "combo-128",
    "name": "OV81TCBLAFR + KMWHN6",
    "mrp": 140970,
    "price": 109804,
    "freeGift": "Coffee Machine",
    "freeGiftMrp": 12990,
    "page": 17,
    "image": "images/combos/page_17_right.png",
    "items": [
      {
        "type": "Built-in Oven",
        "model": "OV81TCBLAFR",
        "specs": [
          "60cm Electric Oven, Extra Large Cavity 81L",
          "Air Fryer Function for Healthy Cooking",
          "Full Touch Controls, Memory Function, Child Lock",
          "3 Layer Glass Door, Thermostat 250\u00b0C"
        ]
      },
      {
        "type": "Built-in Microwave",
        "model": "KMWHN6",
        "specs": [
          "Full Black Tempered Glass, Touch Controls",
          "Capacity 28L, Microwave/Grill/Combi/Convection",
          "Push Door Opening Button",
          "Thermostat 250\u00b0C, Digital Clock"
        ]
      }
    ]
  },
  {
    "id": "combo-129",
    "name": "OV81STF13 + KB4A",
    "mrp": 163970,
    "price": 126330,
    "freeGift": "Airfryer",
    "freeGiftMrp": 17990,
    "page": 18,
    "image": "images/combos/page_18_left.png",
    "items": [
      {
        "type": "Built-in Oven",
        "model": "OV81STF13",
        "specs": [
          "60cm Electric Oven, True Convection, 81L",
          "Catalytic Cleaning, Touch + LED Lit Knob Control",
          "Half Mirror Glass Door & Control Panel",
          "Triple Layer Glass Door, Child Lock"
        ]
      },
      {
        "type": "Built-in Microwave",
        "model": "KB4A",
        "specs": [
          "Anti-Finger Stainless Finish, Capacity 28L",
          "Microwave/Grill/Combination/Convection",
          "Auto Cooking Menu & Auto Defrost",
          "Light Mirror Glass, Thermostat 250\u00b0C"
        ]
      }
    ]
  },
  {
    "id": "combo-130",
    "name": "CSOV6 BSN + MW34G6F -B",
    "mrp": 218970,
    "price": 166246,
    "freeGift": "Air Fryer",
    "freeGiftMrp": 21990,
    "page": 18,
    "image": "images/combos/page_18_right.png",
    "items": [
      {
        "type": "Built-in Oven",
        "model": "CSOV6 BSN",
        "specs": [
          "60cm Electric Oven, True Convection, 73L",
          "Black Glass Fascia, Black Steel Finish",
          "Sensor Touch Control, Memory Function",
          "Triple Layer Glass Door, Child Lock"
        ]
      },
      {
        "type": "Built-in Microwave",
        "model": "MW34G6F -B",
        "specs": [
          "Premium Gray/Black Glass Finish",
          "Touch + Pop-up Knob Control, Capacity 34L",
          "Microwave/Grill/Combination/Convection",
          "Child Lock, Convection 2300W"
        ]
      }
    ]
  },
  {
    "id": "combo-131",
    "name": "OV72G6F + MW34G6F",
    "mrp": 219470,
    "price": 169774,
    "freeGift": "Air Fryer",
    "freeGiftMrp": 21990,
    "page": 19,
    "image": "images/combos/page_19_left.png",
    "items": [
      {
        "type": "Built-in Oven",
        "model": "OV72G6F",
        "specs": [
          "3D Hot Air Technology, 72L Cavity",
          "Premium Gray Glass, Stainless Steel Handle",
          "Soft Close + 3 Layer Glass Door",
          "Mechanical Push Knobs + Touch Control, Energy A+"
        ]
      },
      {
        "type": "Built-in Microwave",
        "model": "MW34G6F",
        "specs": [
          "Premium Gray/Black Glass Finish",
          "Touch + Pop-up Knob Control, Capacity 34L",
          "Microwave/Grill/Combination/Convection",
          "Child Lock, Convection 2300W"
        ]
      }
    ]
  },
  {
    "id": "combo-132",
    "name": "OV81AMSTF + MW34G6F -B",
    "mrp": 284970,
    "price": 224850,
    "freeGift": "Air Fryer",
    "freeGiftMrp": 21990,
    "page": 19,
    "image": "images/combos/page_19_right.png",
    "items": [
      {
        "type": "Built-in Oven",
        "model": "OV81AMSTF",
        "specs": [
          "60cm Electric Oven, True Convection, 81L",
          "Catalytic Cleaning, Touch + LED Lit Knob Control",
          "Half Mirror Glass Door & Control Panel",
          "Triple Layer Glass Door, Child Lock"
        ]
      },
      {
        "type": "Built-in Microwave",
        "model": "MW34G6F -B",
        "specs": [
          "Premium Gray/Black Glass Finish",
          "Touch + Pop-up Knob Control, Capacity 34L",
          "Microwave/Grill/Combination/Convection",
          "Child Lock, Convection 2300W"
        ]
      }
    ]
  },
  {
    "id": "combo-133",
    "name": "LYNN 90 DC + BLHF804 + OV81TCBLAFR + KMWHN6",
    "mrp": 237950,
    "price": 174116,
    "freeGift": "Coffee Machine",
    "freeGiftMrp": 12990,
    "page": 20,
    "image": "images/combos/page_20.png",
    "items": [
      {
        "type": "Chimney",
        "model": "LYNN 90 DC",
        "specs": [
          "Filter-less + Dry Heat Auto Clean (BLDC Motor)",
          "Gesture Motion 8 Speed + Booster",
          "Automatic Open Glass Panel",
          "Airflow up to 1600 m\u00b3/h, Size: 90cm"
        ]
      },
      {
        "type": "Built-in Hob",
        "model": "BLHF 804",
        "specs": [
          "4 Full Brass Burners with FFD",
          "Heavy Duty Cast Iron Pan Support",
          "8mm Black Tempered Glass, SS Moulded Strip",
          "Flame Failure Device, Size: 80cm"
        ]
      },
      {
        "type": "Built-in Oven",
        "model": "OV81TCBLAFR",
        "specs": [
          "60cm Electric Oven, 81L, Air Fryer Function",
          "Full Touch Controls, Memory Function",
          "3 Layer Glass Door, Thermostat 250\u00b0C"
        ]
      },
      {
        "type": "Built-in Microwave",
        "model": "KMWHN6",
        "specs": [
          "28L, Microwave/Grill/Combi/Convection",
          "Full Black Tempered Glass, Touch Controls",
          "Thermostat 250\u00b0C"
        ]
      }
    ]
  },
  {
    "id": "combo-134",
    "name": "BRANDO 90DC + MSM 804X + OV81GIKAFR + KMWHN6",
    "mrp": 242950,
    "price": 183350,
    "freeGift": "Coffee Machine",
    "freeGiftMrp": 12990,
    "page": 21,
    "image": "images/combos/page_21.png",
    "items": [
      {
        "type": "Chimney",
        "model": "BRANDO 90DC",
        "specs": [
          "Filter-less + Smart Auto Clean (BLDC Motor)",
          "Gesture Motion 8 Speed + Booster",
          "Matte Black Finish with Curved Edges",
          "Airflow up to 1480 m\u00b3/h, Size: 90cm"
        ]
      },
      {
        "type": "Built-in Hob",
        "model": "MSM 804X",
        "specs": [
          "Full Brass Burners with FFD",
          "Premium Frosted Black Glass",
          "Heavy Duty Cast Iron Pan Support",
          "Auto Electric Ignition"
        ]
      },
      {
        "type": "Built-in Oven",
        "model": "OV81GIKAFR",
        "specs": [
          "60cm Electric Oven, 81L, Air Fryer Function",
          "Black Reflective Glass, Rotary Controls",
          "3 Layer Glass Door, Internal Cooling Fan"
        ]
      },
      {
        "type": "Built-in Microwave",
        "model": "KMWHN6",
        "specs": [
          "28L, Microwave/Grill/Combi/Convection",
          "Full Black Tempered Glass, Touch Controls",
          "Thermostat 250\u00b0C"
        ]
      }
    ]
  },
  {
    "id": "combo-135",
    "name": "NEWBURY 90 DC + NYG784G + OV72G6F + MW34G6F",
    "mrp": 321450,
    "price": 248464,
    "freeGift": "Airfryer",
    "freeGiftMrp": 17990,
    "page": 22,
    "image": "images/combos/page_22.png",
    "items": [
      {
        "type": "Chimney",
        "model": "NEWBURY 90 DC",
        "specs": [
          "Filter-less + Smart Auto Clean (BLDC Motor)",
          "Top & Bottom Suction (+30% Extraction)",
          "Touch Panel with 9-Speed Gesture Control",
          "Airflow up to 1480 m\u00b3/h, Size: 90cm"
        ]
      },
      {
        "type": "Built-in Hob",
        "model": "NYG784G",
        "specs": [
          "4 Full Brass High Efficiency Burners",
          "Premium Frosted Gray Glass with Round Edges",
          "Full Flame Failure Device",
          "Size: 78cm"
        ]
      },
      {
        "type": "Built-in Oven",
        "model": "OV72G6F",
        "specs": [
          "3D Hot Air Technology, 72L Cavity",
          "Premium Gray Glass, Soft Close Door",
          "Mechanical Push Knobs + Touch Control"
        ]
      },
      {
        "type": "Built-in Microwave",
        "model": "MW34G6F",
        "specs": [
          "Premium Gray Glass, 34L Capacity",
          "Touch + Pop-up Knob, Convection 2300W",
          "Child Lock"
        ]
      }
    ]
  },
  {
    "id": "combo-136",
    "name": "BRANDO 90DC + MSM 804X + OV81GIKAFR + KMWHN6 + DWFIBI",
    "mrp": 308240,
    "price": 230091,
    "freeGift": "Coffee Machine",
    "freeGiftMrp": 12990,
    "page": 23,
    "image": "images/combos/page_23.png",
    "items": [
      {
        "type": "Chimney",
        "model": "BRANDO 90DC",
        "specs": [
          "Filter-less + Smart Auto Clean (BLDC Motor)",
          "Gesture Motion 8 Speed + Booster",
          "Matte Black Finish with Curved Edges",
          "Airflow up to 1480 m\u00b3/h, Size: 90cm"
        ]
      },
      {
        "type": "Built-in Hob",
        "model": "MSM 804X",
        "specs": [
          "Full Brass Burners with FFD",
          "Premium Frosted Black Glass",
          "Heavy Duty Cast Iron Pan Support",
          "Auto Electric Ignition"
        ]
      },
      {
        "type": "Built-in Oven",
        "model": "OV81GIKAFR",
        "specs": [
          "60cm Electric Oven, 81L, Air Fryer Function",
          "Black Reflective Glass, Rotary Controls",
          "3 Layer Glass Door"
        ]
      },
      {
        "type": "Built-in Microwave",
        "model": "KMWHN6",
        "specs": [
          "28L, Microwave/Grill/Combi/Convection",
          "Full Black Tempered Glass, Touch Controls",
          "Thermostat 250\u00b0C"
        ]
      },
      {
        "type": "Dishwasher",
        "model": "DWFIBI",
        "specs": [
          "Built-in Dishwasher",
          "Multiple Wash Programs",
          "Eco-friendly Mode"
        ]
      }
    ]
  },
  {
    "id": "combo-137",
    "name": "CANARY 90DC + PRS 804 + OV81ZNSCN + KB5A + DW INTRA + KRF250FFBI",
    "mrp": 612930,
    "price": 483447,
    "freeGift": "Wine Cooler",
    "freeGiftMrp": 49990,
    "page": 24,
    "image": "images/combos/page_24.png",
    "items": [
      {
        "type": "Chimney",
        "model": "CANARY 90DC",
        "specs": [
          "Filter-less + Smart Auto Clean (BLDC Motor)",
          "Gesture Motion 8 Speed + Booster",
          "Airflow up to 1480 m\u00b3/h, Size: 90cm"
        ]
      },
      {
        "type": "Built-in Hob",
        "model": "PRS 804",
        "specs": [
          "Digital Timer, Frosted Black Glass",
          "Flame Failure Device",
          "Size: 80cm"
        ]
      },
      {
        "type": "Built-in Oven",
        "model": "OV81ZNSCN",
        "specs": [
          "60cm Electric Oven, 81L Cavity",
          "Premium Finish, True Convection"
        ]
      },
      {
        "type": "Built-in Microwave",
        "model": "KB5A",
        "specs": [
          "34L, Microwave/Grill/Combi/Convection",
          "Premium Matt Black, Wi-Fi Enabled"
        ]
      },
      {
        "type": "Dishwasher",
        "model": "DW INTRA",
        "specs": [
          "Multiple Wash Programs",
          "Eco-friendly Mode"
        ]
      },
      {
        "type": "Refrigerator",
        "model": "KRF250FFBI",
        "specs": [
          "Built-in Refrigerator",
          "Premium Design"
        ]
      }
    ]
  },
  {
    "id": "combo-138",
    "name": "CANARY 90 DC (IS) + MSM 804X + OV81ZNSCN + KB5A + DW INTRA + KRF250FFBI",
    "mrp": 661930,
    "price": 524564,
    "freeGift": "Wine Cooler",
    "freeGiftMrp": 49990,
    "page": 25,
    "image": "images/combos/page_25.png",
    "items": [
      {
        "type": "Chimney",
        "model": "CANARY 90 DC (IS)",
        "specs": [
          "Filter-less + Smart Auto Clean (BLDC Motor)",
          "Gesture Motion 8 Speed + Booster",
          "Airflow up to 1480 m\u00b3/h, Size: 90cm"
        ]
      },
      {
        "type": "Built-in Hob",
        "model": "MSM 804X",
        "specs": [
          "Full Brass Burners with FFD",
          "Premium Frosted Black Glass",
          "Heavy Duty Cast Iron Pan Support"
        ]
      },
      {
        "type": "Built-in Oven",
        "model": "OV81ZNSCN",
        "specs": [
          "60cm Electric Oven, 81L Cavity",
          "Premium Finish, True Convection"
        ]
      },
      {
        "type": "Built-in Microwave",
        "model": "KB5A",
        "specs": [
          "34L, Microwave/Grill/Combi/Convection",
          "Premium Matt Black, Wi-Fi Enabled"
        ]
      },
      {
        "type": "Dishwasher",
        "model": "DW INTRA",
        "specs": [
          "Multiple Wash Programs",
          "Eco-friendly Mode"
        ]
      },
      {
        "type": "Refrigerator",
        "model": "KRF250FFBI",
        "specs": [
          "Built-in Refrigerator",
          "Premium Design"
        ]
      }
    ]
  },
  {
    "id": "combo-139",
    "name": "TOWNVILLE 90 (IS) + BLHF 865 + OV81AMSTF + MW34G6F -B + DW INTRA + KRF250FFBI",
    "mrp": 810930,
    "price": 645148,
    "freeGift": "Wine Cooler",
    "freeGiftMrp": 49990,
    "page": 26,
    "image": "images/combos/page_26.png",
    "items": [
      {
        "type": "Chimney",
        "model": "TOWNVILLE 90 (IS)",
        "specs": [
          "Filter-less + Smart Auto Clean",
          "Powerful Airflow, Gesture Control",
          "Size: 90cm"
        ]
      },
      {
        "type": "Built-in Hob",
        "model": "BLHF 865",
        "specs": [
          "Full Brass Burners with FFD",
          "Heavy Duty Cast Iron Pan Support",
          "8mm Tempered Glass, Auto Ignition"
        ]
      },
      {
        "type": "Built-in Oven",
        "model": "OV81AMSTF",
        "specs": [
          "60cm Electric Oven, True Convection, 81L",
          "Catalytic Cleaning, LED Lit Knob Control",
          "Triple Layer Glass Door"
        ]
      },
      {
        "type": "Built-in Microwave",
        "model": "MW34G6F -B",
        "specs": [
          "Premium Gray/Black Glass, 34L",
          "Touch + Pop-up Knob, Convection 2300W",
          "Child Lock"
        ]
      },
      {
        "type": "Dishwasher",
        "model": "DW INTRA",
        "specs": [
          "Multiple Wash Programs",
          "Eco-friendly Mode"
        ]
      },
      {
        "type": "Refrigerator",
        "model": "KRF250FFBI",
        "specs": [
          "Built-in Refrigerator",
          "Premium Design"
        ]
      }
    ]
  },
  {
    "id": "combo-140",
    "name": "FLORA TWIN IS + MARMOR 1104 + CFFBI 6 + OV81AMSTF + MW34G6F -B + DW INTRA + KRF250FFBI",
    "mrp": 1085920,
    "price": 864308,
    "freeGift": "Wine Cooler",
    "freeGiftMrp": 49990,
    "page": 27,
    "image": "images/combos/page_27.png",
    "items": [
      {
        "type": "Chimney",
        "model": "FLORA TWIN IS",
        "specs": [
          "Filter-less + Smart Auto Clean",
          "Powerful Airflow, Gesture Control",
          "Premium Island Design"
        ]
      },
      {
        "type": "Built-in Hob",
        "model": "MARMOR 1104",
        "specs": [
          "Full Brass Burners",
          "Premium Tempered Glass",
          "Auto Electric Ignition"
        ]
      },
      {
        "type": "Coffee Machine",
        "model": "CFFBI 6",
        "specs": [
          "Built-in Coffee Machine",
          "Premium Design"
        ]
      },
      {
        "type": "Built-in Oven",
        "model": "OV81AMSTF",
        "specs": [
          "60cm Electric Oven, True Convection, 81L",
          "Catalytic Cleaning, LED Lit Knob Control",
          "Triple Layer Glass Door"
        ]
      },
      {
        "type": "Built-in Microwave",
        "model": "MW34G6F -B",
        "specs": [
          "Premium Gray/Black Glass, 34L",
          "Touch + Pop-up Knob, Convection 2300W",
          "Child Lock"
        ]
      },
      {
        "type": "Dishwasher",
        "model": "DW INTRA",
        "specs": [
          "Multiple Wash Programs",
          "Eco-friendly Mode"
        ]
      },
      {
        "type": "Refrigerator",
        "model": "KRF250FFBI",
        "specs": [
          "Built-in Refrigerator",
          "Premium Design"
        ]
      }
    ]
  },
  {
    "id": "combo-141",
    "name": "ZEBRA 41 (IS) + MSM 604 + CFFBI 6 + OV81AMSTF + MW34G6F -B + DW INTRA + KRF250FFBI",
    "mrp": 1112920,
    "price": 885779,
    "freeGift": "Wine Cooler",
    "freeGiftMrp": 49990,
    "page": 28,
    "image": "images/combos/page_28.png",
    "items": [
      {
        "type": "Chimney",
        "model": "ZEBRA 41 (IS)",
        "specs": [
          "Filter-less + Smart Auto Clean",
          "Powerful Airflow, Gesture Control",
          "Premium Island Design"
        ]
      },
      {
        "type": "Built-in Hob",
        "model": "MSM 604",
        "specs": [
          "Full Brass Burners",
          "Premium Tempered Glass",
          "Auto Electric Ignition",
          "Cast Iron Pan Support"
        ]
      },
      {
        "type": "Coffee Machine",
        "model": "CFFBI 6",
        "specs": [
          "Built-in Coffee Machine",
          "Premium Design"
        ]
      },
      {
        "type": "Built-in Oven",
        "model": "OV81AMSTF",
        "specs": [
          "60cm Electric Oven, True Convection, 81L",
          "Catalytic Cleaning, LED Lit Knob Control",
          "Triple Layer Glass Door"
        ]
      },
      {
        "type": "Built-in Microwave",
        "model": "MW34G6F -B",
        "specs": [
          "Premium Gray/Black Glass, 34L",
          "Touch + Pop-up Knob, Convection 2300W",
          "Child Lock"
        ]
      },
      {
        "type": "Dishwasher",
        "model": "DW INTRA",
        "specs": [
          "Multiple Wash Programs",
          "Eco-friendly Mode"
        ]
      },
      {
        "type": "Refrigerator",
        "model": "KRF250FFBI",
        "specs": [
          "Built-in Refrigerator",
          "Premium Design"
        ]
      }
    ]
  }
];
