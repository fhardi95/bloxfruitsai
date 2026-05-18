export type FruitType = "Beast" | "Elemental" | "Natural";
export type FruitTier = "S" | "A" | "B" | "C" | "D";
export type FruitRarity = "Mythical" | "Legendary" | "Rare" | "Uncommon" | "Common";

export interface WikiFruit {
  slug: string;
  name: string;
  icon: string;
  type: FruitType;
  tier: FruitTier;
  rarity: FruitRarity;
  rarityColor: string;
  robuxPrice: number | null;
  beli: number | null;
  description: string;
  strengths: string[];
  weaknesses: string[];
  bestFor: string[];
  pvp: FruitTier;
  pve: FruitTier;
  grinding: FruitTier;
  tradeValue: FruitTier;
  moves: {
    key: string;
    name: string;
    type: string;
    damage: string;
    notes: string;
  }[];
  builds: {
    name: string;
    fightingStyle: string;
    sword: string;
    stats: string;
    note: string;
  }[];
  howToGet: string;
  metaNotes: string;
  updatedDate: string;
}

export const WIKI_FRUITS: WikiFruit[] = [
  {
    slug: "kitsune",
    name: "Kitsune",
    icon: "🦊",
    type: "Beast",
    tier: "S",
    rarity: "Mythical",
    rarityColor: "#ffd700",
    robuxPrice: 2499,
    beli: null,
    description: "Kitsune is the highest trade value Mythical Beast fruit in Blox Fruits 2026, priced at 2,499 Robux. It transforms the user into a spirit fox with devastating foxfire projectiles and an S-tier rating across PVP and PVE. Currently the best fruit to hold for trade value.",
    strengths: [
      "Highest trade value in the game — strong to hold",
      "Spirit Form doubles damage for 30 seconds — fight-reversing ultimate",
      "Fox Hunt tracks targets making it hard to dodge",
      "Strong in both PVP and PVE — true all-rounder",
      "Excellent range on all projectile moves",
    ],
    weaknesses: [
      "Spirit Wisp has noticeable startup lag — experienced players will dodge",
      "High price makes it inaccessible for most players",
      "Spirit Form cooldown is long — one chance per fight",
      "Skill-dependant: poor players will underperform with it",
    ],
    bestFor: ["PVP", "Boss Raids", "Trading"],
    pvp: "S",
    pve: "S",
    grinding: "A",
    tradeValue: "S",
    moves: [
      { key: "Z", name: "Fox Fang", type: "Projectile AoE", damage: "Very High", notes: "Launches spirit foxfire in a spread pattern. Excellent range and damage output." },
      { key: "X", name: "Fox Dash", type: "Mobility", damage: "Medium", notes: "Fast dash with iframes. Use to close distance or escape combos." },
      { key: "C", name: "Spirit Wisp", type: "AoE Ground", damage: "High", notes: "Places spirit wisps that detonate on contact. Great for area denial and zoning." },
      { key: "V", name: "Fox Hunt", type: "Chase / Lock", damage: "Very High", notes: "Locks onto target and launches a pursuing spirit fox. Hard to dodge." },
      { key: "F", name: "Spirit Form", type: "Ultimate", damage: "2× all damage", notes: "30-second form with doubled damage and enhanced all moves. Devastating in any fight." },
    ],
    builds: [
      { name: "Max Burst", fightingStyle: "Death Step", sword: "Yama", stats: "2300 Fruit / 2300 Defense / rest HP", note: "Highest burst damage build in the game. Spirit Form with Death Step combos can one-shot players under 3000 HP." },
      { name: "Balanced", fightingStyle: "Electric Claw", sword: "Gravity Blade", stats: "2000 Fruit / 2300 Defense / 1300 HP", note: "Better for sustained fights. Electric Claw stuns chain well with Fox Hunt." },
    ],
    howToGet: "Purchase from the Blox Fruit Dealer for 2,499 Robux (permanent), or find as a rare random spawn in Sea 3. Trading is the most realistic path for most players.",
    metaNotes: "Kitsune and Dragon are currently tied for best overall fruit in Blox Fruits 2026. Kitsune has the highest trade value of any fruit and a slight edge in boss damage thanks to Spirit Form. Trading Kitsune for anything below Dragon or Leopard is not worth it at current trade values. Its meta impact is still being discovered by top players.",
    updatedDate: "May 2026",
  },
  {
    slug: "dragon",
    name: "Dragon",
    icon: "🐉",
    type: "Beast",
    tier: "S",
    rarity: "Mythical",
    rarityColor: "#ffd700",
    robuxPrice: 2499,
    beli: null,
    description: "Dragon is a Mythical Beast fruit in Blox Fruits 2026 priced at 2,499 Robux and rated S-tier across PVP, PVE, and grinding. It has an extremely high and stable trade value, making it one of the best fruits to own or trade. Its massive AoE clearing and transforming dragon form dominate all endgame content.",
    strengths: [
      "Best grinding fruit in the game — superior AoE clearing speed",
      "Truly S-tier in both PVP and PVE without exception",
      "Dragon Talon is one of the best combo-ender moves in the game",
      "Dragon Form provides excellent mobility and damage",
      "Extremely high and stable trade value",
    ],
    weaknesses: [
      "High price — 2499 Robux or very high trade cost",
      "Some moves are large and slow, easy to predict",
      "Slightly worse single-target boss DPS than Kitsune",
    ],
    bestFor: ["Grinding", "PVP", "PVE", "Boss Raids"],
    pvp: "S",
    pve: "S",
    grinding: "S",
    tradeValue: "A",
    moves: [
      { key: "Z", name: "Dragon Breath", type: "Projectile", damage: "High", notes: "Fires a beam of dragon breath. Fast startup with good range." },
      { key: "X", name: "Dragon Claw", type: "Melee AoE", damage: "Very High", notes: "Slashes in a wide arc. Excellent for clearing groups of enemies." },
      { key: "C", name: "Dragon Talon", type: "Ground Slam", damage: "Extreme", notes: "Launches upward then slams down. One of the highest damage moves in the game." },
      { key: "V", name: "Dragon Dive", type: "Chase", damage: "Very High", notes: "Dives onto the target from above. Great for closing distance." },
      { key: "F", name: "Dragon Form", type: "Transformation", damage: "Passively boosts all moves", notes: "Transforms into a full dragon. All moves are enhanced and mobility is greatly increased." },
    ],
    builds: [
      { name: "AoE Grind", fightingStyle: "Dragon Talon", sword: "Yama", stats: "2500 Fruit / 2000 Defense / 800 HP", note: "Optimized for maximum XP per hour. Dragon Claw clears entire rooms." },
      { name: "PVP", fightingStyle: "Death Step", sword: "Gravity Blade", stats: "2200 Fruit / 2300 Defense / 1300 HP", note: "Death Step chains into Dragon Talon for massive burst damage." },
    ],
    howToGet: "Purchase from the Blox Fruit Dealer for 2,499 Robux (permanent) or find as a rare random spawn. Trading is the most realistic path for most players.",
    metaNotes: "Dragon is the safest all-round choice in the current Blox Fruits 2026 meta. Its trade value is extremely high and stable — trading Dragon for anything below Kitsune is not recommended. It wins on grinding efficiency versus Kitsune and is more forgiving to play. If you can only have one top-tier fruit, Dragon has the best trade value to performance ratio.",
    updatedDate: "May 2026",
  },
  {
    slug: "leopard",
    name: "Leopard",
    icon: "🐆",
    type: "Beast",
    tier: "S",
    rarity: "Legendary",
    rarityColor: "#c084fc",
    robuxPrice: 1999,
    beli: null,
    description: "Leopard is a Legendary Beast fruit in Blox Fruits 2026 priced at 1,999 Robux with an A-tier trade value. It is the undisputed best PVP fruit for skilled players, with a speed-based kit featuring rapid slashes, insane mobility, and a point-blank burst move. Weakest in PVE but dominates 1v1 trading fights.",
    strengths: [
      "Best PVP fruit in the game for skilled players",
      "Exceptional mobility — fastest movement of any Beast fruit",
      "Combo potential is the highest in the current meta",
      "Relatively cheaper than Dragon or Kitsune",
    ],
    weaknesses: [
      "Weakest PVE performance of S-tier fruits",
      "High skill floor — beginners will underperform badly",
      "Small hitboxes require precise aim",
      "Poor for grinding — not AoE focused",
    ],
    bestFor: ["PVP", "Ranked Play"],
    pvp: "S",
    pve: "B",
    grinding: "B",
    tradeValue: "A",
    moves: [
      { key: "Z", name: "Leopard Barrage", type: "Rapid Melee", damage: "Very High", notes: "Unleashes a rapid flurry of slashes. Fastest move in the kit." },
      { key: "X", name: "Leopard Pounce", type: "Chase / Mobility", damage: "High", notes: "Dashes instantly to target. Essentially zero startup lag." },
      { key: "C", name: "Predator's Mark", type: "AoE Burst", damage: "Extreme", notes: "Point-blank explosion of energy. Devastating if landed at close range." },
      { key: "V", name: "Apex Rush", type: "Multi-hit", damage: "Very High", notes: "Series of rapid teleport slashes. Hard to interrupt once started." },
      { key: "F", name: "Leopard Awakening", type: "Form", damage: "All moves enhanced", notes: "Enters awakened form with enhanced speed and combo multipliers." },
    ],
    builds: [
      { name: "Speed Burst PVP", fightingStyle: "Electric Claw", sword: "True Triple Katana", stats: "2500 Fruit / 2000 Defense / 800 HP", note: "Maximum speed and burst combo. For advanced players only." },
      { name: "Sustain PVP", fightingStyle: "Death Step", sword: "Yama", stats: "2000 Fruit / 2500 Defense / 1300 HP", note: "More survivability. Still extremely strong in PVP." },
    ],
    howToGet: "Purchase from the Blox Fruit Dealer for 1,999 Robux (permanent) or trade. Cheaper than Dragon/Kitsune but still high-value.",
    metaNotes: "Leopard is strictly for players who want to dominate PVP above everything else. Its trade value sits at A-tier — trading Leopard for anything below Dragon is not worth it. If you also need to grind or do bosses, Dragon or Kitsune offer better value. Leopard shines brightest in tournaments and ranked 1v1 content.",
    updatedDate: "May 2026",
  },
  {
    slug: "venom",
    name: "Venom",
    icon: "☠️",
    type: "Elemental",
    tier: "S",
    rarity: "Legendary",
    rarityColor: "#c084fc",
    robuxPrice: 1799,
    beli: null,
    description: "Venom is a Legendary Elemental fruit in Blox Fruits 2026 priced at 1,799 Robux and recently buffed to S-tier. Its poison pools deal heavy sustained damage and its trade value has risen significantly after the May 2026 patch. A credible threat in both PVP and PVE with rising trade value.",
    strengths: [
      "Strong passive poison damage — opponents lose HP just being nearby",
      "Venom Demon form is visually intimidating and mechanically strong",
      "15% PVP damage increase post-May 2026 patch",
      "Excellent AoE with poison pools for boss fights",
      "Good trade value after recent buff",
    ],
    weaknesses: [
      "Poison damage is gradual — less effective in short fights",
      "Elemental attacks can be countered by certain moves",
      "Not as mobile as Beast fruits",
    ],
    bestFor: ["PVE", "Boss Raids", "PVP"],
    pvp: "S",
    pve: "A",
    grinding: "A",
    tradeValue: "A",
    moves: [
      { key: "Z", name: "Venom Shot", type: "Projectile", damage: "Medium + Poison", notes: "Fires a poison projectile that leaves a lingering DOT." },
      { key: "X", name: "Venom Pool", type: "Ground AoE", damage: "High (sustained)", notes: "Creates a poison pool lasting 8 seconds post-patch. Excellent for area denial." },
      { key: "C", name: "Toxic Bite", type: "Melee", damage: "High + Poison", notes: "Lunges forward and bites. Applies heavy poison stack on hit." },
      { key: "V", name: "Venom Wave", type: "AoE Burst", damage: "Very High", notes: "Releases a wave of venom in all directions. Great for clearing groups." },
      { key: "F", name: "Venom Demon", type: "Transformation", damage: "All moves enhanced", notes: "Transforms into the Venom Demon. Ground slam hitbox improved in latest patch." },
    ],
    builds: [
      { name: "Poison Sustain", fightingStyle: "Superhuman", sword: "Pole V2", stats: "2200 Fruit / 2000 Defense / 1600 HP", note: "Stack poison for sustained damage. Works well in drawn-out boss fights." },
      { name: "PVP Aggro", fightingStyle: "Death Step", sword: "Yama", stats: "2400 Fruit / 2200 Defense / 1100 HP", note: "More aggressive playstyle using Venom Wave to open combos." },
    ],
    howToGet: "Purchase from the Blox Fruit Dealer for 1,799 Robux (permanent) or trade. Value has increased post-May 2026 buff.",
    metaNotes: "Venom is one of the biggest winners of the May 2026 patch. Its trade value is rising — trading Venom for anything below Shadow or Leopard is not recommended right now. Players who own Venom should be using it aggressively in PVP. Trade value is expected to increase further as the community recognises the buff.",
    updatedDate: "May 2026",
  },
  {
    slug: "dough",
    name: "Dough",
    icon: "🥐",
    type: "Elemental",
    tier: "A",
    rarity: "Rare",
    rarityColor: "#60a5fa",
    robuxPrice: 1199,
    beli: null,
    description: "Dough is a Rare Elemental fruit in Blox Fruits 2026 priced at 1,199 Robux and rated A-tier for both PVP and grinding. Its trade value is B-tier — one of the best value propositions at its Robux price point. After the May 2026 hitbox buff it is one of the most combo-friendly fruits in the game.",
    strengths: [
      "Hitbox increased by 12% — combos are more consistent now",
      "Excellent combo extension — dough sticks opponents in place",
      "Great awakening bonuses make it significantly stronger",
      "Good for both PVP and grinding",
      "Lower price point — accessible entry to A-tier",
    ],
    weaknesses: [
      "X move startup lag reduced but still noticeable",
      "Weaker than S-tier fruits in raw damage",
      "Less mobile than Beast fruits",
    ],
    bestFor: ["PVP", "Grinding"],
    pvp: "A",
    pve: "A",
    grinding: "A",
    tradeValue: "B",
    moves: [
      { key: "Z", name: "Dough Spike", type: "Projectile", damage: "High", notes: "Fires a sticky dough spike. Applies slow to target on hit." },
      { key: "X", name: "Dough Roller", type: "Melee AoE", damage: "Very High", notes: "Rolls a giant dough ball through enemies. Wide hitbox improved in latest patch." },
      { key: "C", name: "Sticky Trap", type: "Ground", damage: "Medium + Slow", notes: "Places a dough trap that immobilizes enemies for combo follow-ups." },
      { key: "V", name: "Dough Prison", type: "Lock", damage: "High", notes: "Encases the target in dough briefly. Excellent combo setup." },
      { key: "F", name: "Awakened Form", type: "Enhancement", damage: "All moves enhanced", notes: "Awakening significantly improves all moves. Strongly recommended." },
    ],
    builds: [
      { name: "Combo PVP", fightingStyle: "Electric Claw", sword: "Yama", stats: "2300 Fruit / 2200 Defense / 1200 HP", note: "Electric Claw stun chains perfectly with Dough Prison. Best combo loop available." },
      { name: "Grind", fightingStyle: "Superhuman", sword: "Pole V2", stats: "2000 Fruit / 1800 Defense / 1800 HP", note: "Balanced for grinding. Dough Roller clears rooms well with larger hitbox." },
    ],
    howToGet: "Purchase from the Blox Fruit Dealer for 1,199 Robux (permanent). One of the most accessible A-tier fruits.",
    metaNotes: "Dough has the best trade value to price ratio in A-tier right now. At 1,199 Robux it significantly outperforms its price point post-buff. Trading Dough for anything below Venom or Shadow is not worth it at current 2026 trade values. If you are looking for a strong PVP fruit without spending 2,499 Robux on Dragon or Kitsune, Dough is the answer.",
    updatedDate: "May 2026",
  },
  {
    slug: "shadow",
    name: "Shadow",
    icon: "🌑",
    type: "Elemental",
    tier: "S",
    rarity: "Legendary",
    rarityColor: "#c084fc",
    robuxPrice: 1799,
    beli: null,
    description: "Shadow is a Legendary Elemental fruit in Blox Fruits 2026 priced at 1,799 Robux with an A-tier trade value. Built around darkness manipulation and Umbra summons, it delivers strong AoE burst damage and excellent mobility. Still S-tier in performance but trade value is softening slightly in 2026.",
    strengths: [
      "Umbra summons provide passive pressure in fights",
      "Strong AoE burst damage",
      "Night Walk gives excellent mobility",
      "Visually distinctive — strong intimidation factor",
    ],
    weaknesses: [
      "Trade value softening post-May 2026",
      "Summons can be killed — reduces effectiveness",
      "Less consistent in PVP than Venom post-buff",
    ],
    bestFor: ["PVP", "PVE"],
    pvp: "A",
    pve: "A",
    grinding: "B",
    tradeValue: "A",
    moves: [
      { key: "Z", name: "Shadow Rush", type: "Projectile", damage: "High", notes: "Launches a dark energy projectile with good range." },
      { key: "X", name: "Night Walk", type: "Mobility", damage: "Medium", notes: "Teleports through shadows. Iframes on activation." },
      { key: "C", name: "Umbra Summon", type: "Summon", damage: "Sustained", notes: "Summons Umbra soldiers to fight alongside you." },
      { key: "V", name: "Shadow Barrage", type: "AoE Burst", damage: "Very High", notes: "Releases a barrage of shadow projectiles in all directions." },
      { key: "F", name: "Ruler of Shadows", type: "Ultimate", damage: "All moves enhanced", notes: "Empowers all shadow moves and summons for a duration." },
    ],
    builds: [
      { name: "Summon Control", fightingStyle: "Superhuman", sword: "Gravity Blade", stats: "2000 Fruit / 2200 Defense / 1600 HP", note: "Maximize summon uptime. Let Umbra pressure opponents while you combo." },
      { name: "Burst PVP", fightingStyle: "Death Step", sword: "Yama", stats: "2400 Fruit / 2200 Defense / 1100 HP", note: "Ignore summons, focus on Shadow Barrage burst combos." },
    ],
    howToGet: "Purchase from the Blox Fruit Dealer for 1,799 Robux (permanent) or trade. Value slightly softening — may be a good time to trade if you were planning to.",
    metaNotes: "Shadow is still excellent but its trade value is softening post-May 2026. Trading Shadow for Venom or Leopard is a fair trade at current 2026 values. If you are holding Shadow and considering trading up, the window may be now before trade values dip further.",
    updatedDate: "May 2026",
  },
  {
    slug: "buddha",
    name: "Buddha",
    icon: "🔔",
    type: "Beast",
    tier: "A",
    rarity: "Rare",
    rarityColor: "#60a5fa",
    robuxPrice: 1199,
    beli: null,
    description: "Buddha is a Rare Beast fruit in Blox Fruits 2026 priced at 1,199 Robux or 1,500,000 Beli — the gold standard grinding fruit. Its transformation extends melee hitboxes to hit entire rooms of enemies, making it the best fruit for farming XP. Trade value is stable and consistent, making it an excellent starter trading fruit.",
    strengths: [
      "Best pure grinding fruit in the game — extended hitboxes hit entire rooms",
      "Consistently high demand — evergreen trade value",
      "Cheap relative to performance — excellent value",
      "Pairs well with any fighting style for AoE clearing",
    ],
    weaknesses: [
      "Weak in PVP — very poor mobility and direct damage",
      "Buddha form is slow and easy to hit",
      "Purely a grinding/support tool — not versatile",
    ],
    bestFor: ["Grinding", "Farming XP", "Trading (starter)"],
    pvp: "C",
    pve: "S",
    grinding: "S",
    tradeValue: "B",
    moves: [
      { key: "Z", name: "Buddha Beam", type: "Projectile", damage: "Medium", notes: "Standard beam attack. Not particularly powerful but decent range." },
      { key: "X", name: "Buddha Strike", type: "Melee", damage: "Medium", notes: "Large melee strike. Extended hitbox in Buddha form." },
      { key: "C", name: "Cannon", type: "AoE", damage: "High", notes: "Fires multiple cannonballs in a spread. Good for groups." },
      { key: "V", name: "Shockwave", type: "Ground AoE", damage: "High", notes: "Ground shockwave hitting everything nearby." },
      { key: "F", name: "Buddha Transform", type: "Transformation", damage: "Massively extends all hitboxes", notes: "The core of the fruit. Transformation extends melee range enormously — hit entire rooms with one attack." },
    ],
    builds: [
      { name: "Max Grind", fightingStyle: "Superhuman", sword: "Pole V2", stats: "2500 Fruit / 1500 Defense / 2000 HP", note: "Activate Buddha Form and spam melee attacks through rooms. Peak XP per hour." },
    ],
    howToGet: "Purchase from the Blox Fruit Dealer for 1,199 Robux (permanent) or 1,500,000 Beli. One of the most accessible strong fruits. Often found as a spawn.",
    metaNotes: "Buddha is the single best fruit for grinding XP quickly in Blox Fruits 2026. Its trade value is stable — a reliable fruit to hold or use as a stepping stone. Every beginner should use Buddha until they can afford an S-tier fruit. Trading Buddha for anything below Blizzard or Dough is not worth it at current 2026 trade values.",
    updatedDate: "May 2026",
  },
  {
    slug: "blizzard",
    name: "Blizzard",
    icon: "❄️",
    type: "Elemental",
    tier: "A",
    rarity: "Rare",
    rarityColor: "#60a5fa",
    robuxPrice: 999,
    beli: null,
    description: "Blizzard is a Rare Elemental fruit in Blox Fruits 2026 priced at 999 Robux with a rising B-tier trade value. Its PVP rework introduced freeze mechanics that make it one of the best combo-setup fruits in its price range. Currently one of the best mid-tier fruits to acquire before trade values peak.",
    strengths: [
      "Rising trade value — good time to acquire",
      "Freeze mechanics give strong combo setup",
      "Good AoE coverage for both PVP and PVE",
      "Accessible price point — 999 Robux",
    ],
    weaknesses: [
      "Freeze duration shorter than Ice — 1.5 seconds",
      "Not as raw in damage as top-tier fruits",
      "Can struggle against high-mobility opponents",
    ],
    bestFor: ["PVP", "PVE"],
    pvp: "A",
    pve: "B",
    grinding: "B",
    tradeValue: "B",
    moves: [
      { key: "Z", name: "Blizzard Shot", type: "Projectile", damage: "Medium + Freeze", notes: "Fires a blizzard projectile that briefly freezes on hit." },
      { key: "X", name: "Ice Storm", type: "AoE", damage: "High", notes: "Creates a storm of ice shards around the user." },
      { key: "C", name: "Frost Pillar", type: "Ground", damage: "High + Freeze", notes: "Erupts ice pillars from the ground. Hits multiple enemies." },
      { key: "V", name: "Blizzard Form", type: "Enhancement", damage: "Boosts all moves", notes: "Enters blizzard state with enhanced move power and freeze duration." },
      { key: "F", name: "Absolute Zero", type: "Ultimate AoE", damage: "Extreme", notes: "Releases a massive ice explosion. Freezes all nearby enemies." },
    ],
    builds: [
      { name: "Freeze Combo", fightingStyle: "Electric Claw", sword: "True Triple Katana", stats: "2200 Fruit / 2200 Defense / 1300 HP", note: "Use freeze setups to land full Electric Claw combos. Excellent synergy." },
    ],
    howToGet: "Purchase from the Blox Fruit Dealer for 999 Robux (permanent). Currently rising in value — good entry point.",
    metaNotes: "Blizzard was barely tradeable six months ago but its 2026 PVP rework has elevated it significantly. Trade value is still rising — acquiring Blizzard now before values peak is a solid play. Trading Blizzard for anything below Buddha is not recommended at current 2026 trade values.",
    updatedDate: "May 2026",
  },
  {
    slug: "phoenix",
    name: "Phoenix",
    icon: "🔥",
    type: "Beast",
    tier: "A",
    rarity: "Legendary",
    rarityColor: "#f97316",
    robuxPrice: 1799,
    beli: null,
    description: "Phoenix is a Legendary Beast fruit in Blox Fruits 2026 priced at 1,799 Robux. Its unique healing transformation makes it the premier support fruit for team play and boss raids. Phoenix's Trade V2 rework improved its damage significantly, giving it genuine PVP viability alongside its support role.",
    strengths: [
      "Continuous healing in Phoenix Form — best sustain in the game",
      "Phoenix Talon deals high damage and great range",
      "Excellent boss raid utility — heal teammates while dealing damage",
      "Phoenix Flame V2 is a strong AoE after the rework",
      "Trade value stable — evergreen demand due to unique healing utility",
    ],
    weaknesses: [
      "Healing-focused — raw damage lower than pure combat fruits",
      "Transformation has noticeable activation time",
      "Less effective in 1v1 PVP against high-burst fruits",
    ],
    bestFor: ["Boss Raids", "Team Play", "PVE"],
    pvp: "B",
    pve: "A",
    grinding: "A",
    tradeValue: "A",
    moves: [
      { key: "Z", name: "Phoenix Talon", type: "Projectile", damage: "High", notes: "Launches a fiery talon projectile with great range and tracking. Primary damage move." },
      { key: "X", name: "Phoenix Flame", type: "AoE", damage: "High", notes: "Erupts a circle of phoenix flames. Strong AoE damage in V2 rework — hits multiple enemies." },
      { key: "C", name: "Blazing Dive", type: "Mobility + Damage", damage: "Medium", notes: "Dives forward in phoenix form, dealing damage on contact. Great gap closer." },
      { key: "V", name: "Rebirth", type: "Heal", damage: "Heals all nearby allies", notes: "Heals the user and teammates in range. The defining utility move of Phoenix. Essential for boss raids." },
      { key: "F", name: "Phoenix Form", type: "Transformation", damage: "Continuous healing + enhanced moves", notes: "Transforms into a phoenix with wings and continuous healing aura. All moves are enhanced while active." },
    ],
    builds: [
      { name: "Raid Healer", fightingStyle: "Superhuman", sword: "Pole V2", stats: "2000 Fruit / 1500 Defense / 2500 HP", note: "Max HP and Defense to survive as raid healer. Sustain the entire team through boss fights." },
      { name: "Hybrid DPS", fightingStyle: "Death Step", sword: "Yama", stats: "2400 Fruit / 2000 Defense / 1600 HP", note: "Post V2 rework — deal competitive damage while maintaining healing utility." },
    ],
    howToGet: "Purchase from the Blox Fruit Dealer for 1,799 Robux (permanent). No Beli price — Robux only. Can be obtained via trading.",
    metaNotes: "Phoenix received a significant V2 rework in early 2026 that boosted its damage and raised its trade value. If you're a boss raider or enjoy team content, Phoenix is arguably the most useful Legendary fruit. Trading Phoenix for anything below Shadow is not recommended at current 2026 values.",
    updatedDate: "May 2026",
  },
  {
    slug: "rumble",
    name: "Rumble",
    icon: "⚡",
    type: "Elemental",
    tier: "A",
    rarity: "Legendary",
    rarityColor: "#f97316",
    robuxPrice: 2100,
    beli: null,
    description: "Rumble is a Legendary Elemental fruit in Blox Fruits 2026 priced at 2,100 Robux. The Thunder God fruit delivers devastating lightning-based AoE attacks and is widely regarded as one of the most fun fruits to play in 2026. Its awakened form gives it top-tier mobility via flight, making it dangerous in both ground and aerial combat.",
    strengths: [
      "High AoE damage — excellent for clearing groups",
      "Awakened Rumble grants flight — superior aerial mobility",
      "Thunder Clap stuns enemies — strong setup for combos",
      "Consistent A-tier trade value — highly demanded",
      "Fast move animations — hard to trade blows against",
    ],
    weaknesses: [
      "Elemental type — no passive damage resistance like Beast fruits",
      "Thunder God form drains energy quickly",
      "Some moves have tight hitboxes despite AoE appearance",
    ],
    bestFor: ["PVP", "Boss Raids", "Grinding"],
    pvp: "A",
    pve: "A",
    grinding: "A",
    tradeValue: "A",
    moves: [
      { key: "Z", name: "Sky Beam", type: "Projectile", damage: "Very High", notes: "Calls down a lightning strike from above. Excellent range and damage — core PVP move." },
      { key: "X", name: "Thunder Clap", type: "Melee AoE", damage: "High + Stun", notes: "Claps hands together creating a shockwave. Stuns nearby enemies and sets up combos." },
      { key: "C", name: "Lightning Tempest", type: "AoE", damage: "Extreme", notes: "Creates a wide field of continuous lightning strikes. Devastating in enclosed spaces." },
      { key: "V", name: "Electrical Floor", type: "Ground Control", damage: "High", notes: "Covers the ground with electrified floor. Forces enemies to move and takes sustained damage." },
      { key: "F", name: "Thunder God Form", type: "Transformation", damage: "Enhanced all moves + Flight", notes: "Full transformation into Thunder God. Grants flight, enhanced all move damage, and increased speed. The defining awakened ability." },
    ],
    builds: [
      { name: "Sky Sniper", fightingStyle: "Electric Claw", sword: "True Triple Katana", stats: "2500 Fruit / 2000 Defense / 1500 HP", note: "Combo Sky Beam from Thunder God form at range, then close with Electric Claw. High burst at any range." },
      { name: "AoE Clearing", fightingStyle: "Superhuman", sword: "Yama", stats: "2200 Fruit / 1800 Defense / 2000 HP", note: "Lightning Tempest with Superhuman for maximum group clearing. Best for boss raids and farming." },
    ],
    howToGet: "Purchase from the Blox Fruit Dealer for 2,100 Robux (permanent). No Beli price. Frequently traded — check our trade calculator for current fair values.",
    metaNotes: "Rumble is one of the most consistently demanded fruits in 2026 trading. Its A-tier trade value is stable — neither rising nor falling fast. For active PVP players, Rumble in Thunder God form is a dominant presence. It sits comfortably below Venom and Shadow in trade value, making it an excellent mid-tier trade target.",
    updatedDate: "May 2026",
  },
  {
    slug: "ice",
    name: "Ice",
    icon: "🧊",
    type: "Elemental",
    tier: "B",
    rarity: "Uncommon",
    rarityColor: "#a78bfa",
    robuxPrice: 350,
    beli: 1250000,
    description: "Ice is an Uncommon Elemental fruit in Blox Fruits 2026, priced at just 350 Robux or 1,250,000 Beli. Despite its low price and common accessibility, Ice is widely used for sea traversal and casual PVP thanks to its signature 2-second full freeze mechanic. Best beginner fruit for Blox Fruits wiki players learning the game.",
    strengths: [
      "Cheapest viable PVP fruit — great value for beginners",
      "2-second full freeze on Glacial Surge — best freeze duration in the game",
      "Ice Surf enables fast sea travel — no boat required",
      "Consistent low-cost option for newer players",
      "Frequently traded — easy to obtain via beli",
    ],
    weaknesses: [
      "Low raw damage compared to Legendary and Mythical fruits",
      "Elemental weakness to fire-type fruits",
      "Ice age meta has passed — outclassed in high-level PVP",
    ],
    bestFor: ["Beginners", "PVP (early game)", "Sea Travel"],
    pvp: "C",
    pve: "B",
    grinding: "C",
    tradeValue: "D",
    moves: [
      { key: "Z", name: "Ice Spike", type: "Projectile", damage: "Medium", notes: "Fires an ice spike projectile. Standard ranged option for early combat." },
      { key: "X", name: "Glacial Surge", type: "AoE Freeze", damage: "High + 2s Freeze", notes: "Erupts ice from the ground, freezing all hit enemies for 2 seconds. Best freeze duration in the game — excellent for combos." },
      { key: "C", name: "Ice Bird", type: "Tracking Projectile", damage: "Medium", notes: "Launches a tracking ice bird that follows enemies. Good for confirming hits on mobile targets." },
      { key: "V", name: "Ice Ruins", type: "AoE", damage: "Very High", notes: "Calls down a shower of ice boulders. Highest single-use damage move in Ice's kit." },
      { key: "F", name: "Ice Age", type: "Environment AoE", damage: "High + Area Freeze", notes: "Freezes a massive area around the user. Area denial ultimate — freezes everything in range." },
    ],
    builds: [
      { name: "Freeze Setup Beginner", fightingStyle: "Combat", sword: "Dual Headed Blade", stats: "1500 Fruit / 1000 Defense / 1500 HP", note: "Classic beginner build. Use Glacial Surge to freeze then combo with sword. Great for learning the game." },
    ],
    howToGet: "Purchase from the Blox Fruit Dealer for 350 Robux (permanent) or 1,250,000 Beli. One of the cheapest fruits in the game. Widely available.",
    metaNotes: "Ice has low trade value in 2026 — don't expect much from trading it. However for new players learning Blox Fruits, Ice is an ideal starting fruit. The freeze mechanic teaches combo fundamentals and costs almost nothing. Use the Blox Fruits trade calculator to check if trading Ice for something better makes sense for your account.",
    updatedDate: "May 2026",
  },
  {
    slug: "magma",
    name: "Magma",
    icon: "🌋",
    type: "Elemental",
    tier: "B",
    rarity: "Uncommon",
    rarityColor: "#a78bfa",
    robuxPrice: 850,
    beli: null,
    description: "Magma is an Uncommon Elemental fruit in Blox Fruits 2026 priced at 850 Robux. It was historically the best fruit in the game and still commands strong nostalgia-driven demand. Magma's floor AoE and burn damage make it excellent for PVE and a reasonable mid-tier fruit to trade. Its trade value sits at B-tier — solid but not spectacular in 2026.",
    strengths: [
      "Magma Floor — passive burn damage area denial that never misses",
      "High single-target damage on awakened moves",
      "Strong nostalgia demand — consistently tradeable",
      "Great for grinding due to burn DoT damage",
      "Magma Eruption creates massive AoE — excellent boss damage",
    ],
    weaknesses: [
      "Slower move animations — readable in high-level PVP",
      "Elemental type — no beast transformation",
      "Outclassed by newer fruits in raw PVP viability",
    ],
    bestFor: ["PVE", "Grinding", "Boss Raids"],
    pvp: "C",
    pve: "A",
    grinding: "B",
    tradeValue: "B",
    moves: [
      { key: "Z", name: "Magma Fist", type: "Melee", damage: "High", notes: "Slams the ground with a massive magma-covered fist. Good melee range and impact." },
      { key: "X", name: "Magma Floor", type: "Ground AoE", damage: "Burn DoT", notes: "Creates a spreading pool of lava that burns enemies continuously. Best area denial move in the game — enemies can't stand in it." },
      { key: "C", name: "Volcanic Assault", type: "Projectile", damage: "Very High", notes: "Launches multiple magma projectiles in a spread. Excellent range and coverage." },
      { key: "V", name: "Magma Eruption", type: "AoE Explosion", damage: "Extreme", notes: "Triggers a massive lava eruption around the user. Highest AoE damage move in Magma's kit — devastating for bosses." },
      { key: "F", name: "Magma Pummel", type: "Combo Ultimate", damage: "Very High", notes: "A series of rapid magma-powered punches that finishes with an eruption. High total damage with multiple hit points." },
    ],
    builds: [
      { name: "Boss Burner", fightingStyle: "Superhuman", sword: "Pole V2", stats: "2200 Fruit / 1600 Defense / 2000 HP", note: "Place Magma Floor, use Eruption, and repeat. Consistent boss DPS with zero misses from floor burn." },
    ],
    howToGet: "Purchase from the Blox Fruit Dealer for 850 Robux (permanent). No Beli price. Occasionally found as a spawn. Tradeable at B-tier value.",
    metaNotes: "Magma's value is driven more by nostalgia than current meta strength in 2026. It's a solid holder fruit — won't spike but won't crash either. If you're grinding boss content, Magma Floor DoT means you're always dealing damage even while dodging. Use the Blox Fruits value calculator to compare Magma against newer fruits before trading.",
    updatedDate: "May 2026",
  },
];

export function getWikiFruit(slug: string): WikiFruit | undefined {
  return WIKI_FRUITS.find(f => f.slug === slug);
}

export function getAllWikiSlugs(): string[] {
  return WIKI_FRUITS.map(f => f.slug);
}

export const TIER_ORDER: FruitTier[] = ["S", "A", "B", "C", "D"];
export const RARITY_ORDER: FruitRarity[] = ["Mythical", "Legendary", "Rare", "Uncommon", "Common"];
