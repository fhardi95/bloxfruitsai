export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  dateISO: string;
  category: string;
  categoryColor: string;
  readTime: string;
  icon: string;
  author: string;
  featured?: boolean;
  content: BlogSection[];
}

export interface BlogSection {
  type: "paragraph" | "heading" | "subheading" | "tip" | "warning" | "info" | "table" | "list" | "tierrow" | "buildcard" | "divider";
  text?: string;
  rows?: string[][];
  headers?: string[];
  items?: string[];
  tier?: string;
  tierColor?: string;
  fruits?: string[];
  label?: string;
  build?: { fruit: string; style: string; sword: string; stats: string; note: string };
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "april-2025-patch-analysis",
    title: "April 2025 Patch Analysis — Dough Buffed, Ice Nerfed, Kitsune Confirmed S-Tier",
    excerpt: "The latest Blox Fruits update reshuffled the meta. Dough returns to A-tier with a significant hitbox buff, Ice loses some PVP dominance, and Kitsune is confirmed as the new strongest mythical fruit.",
    date: "April 22, 2025",
    dateISO: "2025-04-22",
    category: "Patch Notes",
    categoryColor: "#00f5ff",
    readTime: "5 min",
    icon: "🔄",
    author: "BloxFruitsAI Team",
    featured: true,
    content: [
      { type: "paragraph", text: "The April 22nd patch dropped overnight and it is one of the biggest balance updates in months. Three fruits saw significant changes, one new mechanic was introduced, and the overall meta has shifted enough that you should reassess your current build." },
      { type: "heading", text: "What Changed in the April 2025 Patch" },
      { type: "subheading", text: "🥐 Dough — Buffed Back to A-Tier" },
      { type: "paragraph", text: "Dough's Z move hitbox has been increased by approximately 12% and the startup lag on its X move has been reduced by 0.3 seconds. This brings Dough back into serious A-tier PVP viability. Players who shelved Dough after the last patch should dust it off — the change is noticeable immediately." },
      { type: "tip", text: "If you have an awakened Dough already, now is a great time to use it. The hitbox change makes combo extensions significantly more consistent." },
      { type: "subheading", text: "🧊 Ice — Nerfed, Still Viable" },
      { type: "paragraph", text: "Ice's freeze duration in PVP was reduced from 2.5 seconds to 1.8 seconds. This is a meaningful nerf — that 0.7 second window was the difference between a full combo and your opponent recovering. Ice drops from the top of A-tier but remains a solid B-tier pick for players who like the elemental playstyle." },
      { type: "warning", text: "If you were using Ice specifically for the freeze extension in PVP combos, you will need to adjust your combo timing or consider switching to Blizzard, which was not nerfed." },
      { type: "subheading", text: "☠️ Venom — Significant Buff" },
      { type: "paragraph", text: "Venom is now genuinely scary. Poison pool damage increased by 15% in PVP and pool duration extended from 6 to 8 seconds. The Venom Demon form also received a hitbox improvement on its ground slam. Venom was already S-tier for PVE — it is now a credible S-tier PVP threat as well." },
      { type: "subheading", text: "🦊 Kitsune — New Mythical, Confirmed S-Tier" },
      { type: "paragraph", text: "Kitsune was added in patch 2.1.4 and is now the highest-value fruit in the game. Our AI has analyzed thousands of matches since the release and the verdict is clear: S-tier across both PVP and PVE. The spirit fox kit combines massive AoE with strong mobility and a devastating ultimate form." },
      { type: "heading", text: "Updated Tier List — April 2025" },
      { type: "tierrow", tier: "S", tierColor: "#ffd700", label: "God Tier", fruits: ["🦊 Kitsune", "🐉 Dragon", "🐆 Leopard", "☠️ Venom", "🌑 Shadow"] },
      { type: "tierrow", tier: "A", tierColor: "#00f5ff", label: "Top Tier", fruits: ["🥐 Dough", "❄️ Blizzard", "🔥 Phoenix", "⚡ Thunder", "🔔 Buddha", "🌋 Magma"] },
      { type: "tierrow", tier: "B", tierColor: "#2ed573", label: "Solid", fruits: ["🧊 Ice", "🕷️ Spider", "💨 Gas", "💢 Pain"] },
      { type: "heading", text: "Other Changes in This Patch" },
      { type: "list", items: [
        "Sea Beast spawning rate increased by 20% in Sea 3 — better for Beli farming routes",
        "Castle on the Sea Elite Pirate spawn timer reduced by 15 seconds",
        "Ken Haki V2 dodge window extended slightly — PVP feels more responsive",
        "Several bug fixes to Leopard's dash collision detection",
        "New cosmetic items added to the in-game store",
      ]},
      { type: "heading", text: "What This Means for Your Build" },
      { type: "paragraph", text: "If you were running Ice for PVP, consider switching to Blizzard or keeping Ice but adjusting your combo timing. If you have Venom, this is a great patch for you — start using it in PVP more aggressively. Dough players: welcome back, your fruit is good again." },
      { type: "tip", text: "Check our updated Value List and Trade Calculator — Venom's value has gone up post-patch. If you're holding Venom, now may be a good time to trade if you were planning to anyway, as values typically peak shortly after a buff announcement." },
    ],
  },
  {
    slug: "kitsune-complete-guide",
    title: "Kitsune Fruit Complete Guide 2025 — Moves, Builds & Is It Worth It?",
    excerpt: "Kitsune is the newest mythical Beast fruit in Blox Fruits. We break down every move, damage output, and how it compares to Dragon and Leopard in both PVP and PVE.",
    date: "April 18, 2025",
    dateISO: "2025-04-18",
    category: "Fruit Guide",
    categoryColor: "#ffd700",
    readTime: "8 min",
    icon: "🦊",
    author: "BloxFruitsAI Team",
    featured: true,
    content: [
      { type: "paragraph", text: "Kitsune arrived in patch 2.1.4 as a mythical Beast fruit and immediately shook up the meta. Within 48 hours of release it became the highest-demand item in the game and its trade value surpassed Dragon. But is the hype justified? Here is our full breakdown." },
      { type: "heading", text: "Kitsune Overview" },
      { type: "paragraph", text: "Kitsune is a Beast-type devil fruit that transforms you into a spirit fox. The kit revolves around three core mechanics: spirit foxfire projectiles, a fox dash that covers enormous distance, and the Spirit Form ultimate which temporarily doubles all damage output. It is genuinely powerful in both PVP and PVE." },
      { type: "info", text: "Kitsune can currently be obtained from the Blox Fruit Dealer for 2,499 Robux (permanent) or found as a random spawn in Sea 3. Its drop chance as a random spawn is extremely low — buying or trading is the realistic path for most players." },
      { type: "heading", text: "All Kitsune Moves" },
      { type: "table",
        headers: ["Move", "Key", "Type", "Damage", "Notes"],
        rows: [
          ["Fox Fang", "Z", "Projectile AoE", "Very High", "Launches spirit foxfire in a spread pattern. Excellent range and damage."],
          ["Fox Dash", "X", "Mobility", "Medium", "Fast dash with iframes. Use to close distance or escape combos."],
          ["Spirit Wisp", "C", "AoE Ground", "High", "Places spirit wisps that detonate on contact. Great for area denial."],
          ["Fox Hunt", "V", "Chase / Lock", "Very High", "Locks onto target and launches a pursuing spirit fox. Hard to dodge."],
          ["Spirit Form", "F", "Ultimate", "2× all damage", "30-second form with doubled damage and enhanced all moves. Devastating."],
        ],
      },
      { type: "heading", text: "Kitsune PVP Performance" },
      { type: "paragraph", text: "In PVP, Kitsune sits comfortably in S-tier. Fox Hunt's tracking makes it particularly dangerous against mobile opponents who rely on constant movement to avoid damage. Spirit Form is a fight-winner — activating it at low HP can completely reverse a losing fight." },
      { type: "paragraph", text: "The main weakness is startup lag on Spirit Wisp. Experienced players will dodge the wisps if you place them too obviously. Use them to zone rather than as direct damage tools." },
      { type: "tip", text: "The best Kitsune PVP combo: Fox Fang (Z) → Fox Dash (X) to close gap → Fox Hunt (V) to lock → Spirit Wisp (C) on landing spot → M1 into Death Step/Electric Claw. At Spirit Form activation this combo can one-shot players with under 3000 HP." },
      { type: "heading", text: "Best Kitsune Builds" },
      { type: "buildcard", build: { fruit: "Kitsune (Awakened)", style: "Death Step", sword: "Yama", stats: "2300 Fruit / 2300 Defense / rest HP", note: "Max damage output. Spirit Form with Death Step combos is the highest burst damage build in the game right now." }},
      { type: "buildcard", build: { fruit: "Kitsune (Awakened)", style: "Electric Claw", sword: "Gravity Blade", stats: "2000 Fruit / 2300 Defense / 1300 HP", note: "More balanced. Electric Claw stuns chain well with Fox Hunt. Better for sustained fights." }},
      { type: "heading", text: "Kitsune vs Dragon vs Leopard — Which is Best?" },
      { type: "table",
        headers: ["Fruit", "PVP", "PVE", "Grinding", "Trade Value", "Skill Floor"],
        rows: [
          ["🦊 Kitsune", "S", "S", "A", "S (Highest)", "Medium"],
          ["🐉 Dragon", "S", "S", "S", "A", "Medium"],
          ["🐆 Leopard", "S", "B", "B", "A", "High"],
        ],
      },
      { type: "paragraph", text: "Kitsune and Dragon are currently tied for the best overall fruits in Blox Fruits. Dragon wins on grinding efficiency due to its superior AoE clearing. Kitsune wins on trade value and has a slight edge in PVE boss damage thanks to Spirit Form. Leopard is strictly the best PVP fruit for highly skilled players but performs worse in PVE." },
      { type: "heading", text: "Is Kitsune Worth It?" },
      { type: "paragraph", text: "Yes — if you can get it. At 2,499 Robux (permanent) it is the most expensive fruit in the game and the price reflects its power. For trading, Kitsune is currently the best fruit to hold as it has both S-tier performance and the highest demand in the community. Its value is likely to stabilize rather than drop, making it a safe long-term hold." },
      { type: "warning", text: "Kitsune is so new that its meta impact is still being discovered by top players. Some interactions and combos are not yet fully optimized. Check back on our tier list after the next major PVP tournament for updated community rankings." },
    ],
  },
  {
    slug: "best-grinding-setup-2025",
    title: "The Best Grinding Setup in 2025 — Castle on the Sea Complete Guide",
    excerpt: "Castle on the Sea is now the undisputed #1 XP spot for endgame players. With Dragon or Kitsune you can hit 2.5M+ XP per hour. Here's the complete route breakdown.",
    date: "April 5, 2025",
    dateISO: "2025-04-05",
    category: "Grinding",
    categoryColor: "#2ed573",
    readTime: "7 min",
    icon: "🏰",
    author: "BloxFruitsAI Team",
    content: [
      { type: "paragraph", text: "If you are at Level 2300+ and still grinding at Haunted Castle or Elite Pirates, you are leaving massive XP on the table. Castle on the Sea, introduced in update 2.0, is now the fastest XP location in the entire game by a significant margin." },
      { type: "heading", text: "Why Castle on the Sea is #1" },
      { type: "list", items: [
        "Highest enemy density of any Sea 3 location — you never wait for respawns",
        "Pirate Raid quest chain is the best XP-per-completion quest in the game",
        "Multiple distinct enemy types on the same map means faster mastery across all moves",
        "The Cursed Captain miniboss gives a bonus XP burst on every loop",
        "Server hopping resets all enemies immediately — no dead time",
      ]},
      { type: "heading", text: "Required Setup Before You Go" },
      { type: "info", text: "You should be at least Level 2300 before grinding Castle on the Sea. Enemies here scale hard and you will die frequently without proper stats and Haki if you arrive under-leveled." },
      { type: "table",
        headers: ["Requirement", "Why You Need It", "Priority"],
        rows: [
          ["Level 2300+", "Enemies deal too much damage below this threshold", "Required"],
          ["Buso Haki V2", "15% damage boost + hits elemental forms", "Required"],
          ["Ken Haki V2", "8-hit auto-dodge keeps you alive in dense packs", "Required"],
          ["Dragon or Buddha fruit", "Dragon clears floors in one rotation, Buddha hitbox hits everything", "Strongly Recommended"],
          ["Awakened fruit moves", "Unawakened moves do 40% less damage — awaken before grinding here", "Recommended"],
          ["2× Mastery Gamepass", "Doubles mastery gain speed — worth it if you have it", "Optional"],
        ],
      },
      { type: "heading", text: "The Exact Grinding Route" },
      { type: "paragraph", text: "The optimal Castle on the Sea route takes approximately 90 seconds per loop with Dragon fruit at full mastery. Here is the exact path:" },
      { type: "list", items: [
        "Accept the Pirate Raid quest from the NPC at the castle entrance (respawn point: set here first)",
        "Clear the ground floor using Dragon's Z move (Fox Fang for Kitsune) — one rotation hits all enemies",
        "Move left up the stairs to the west courtyard — clear the Cursed Swordsmen pack",
        "Proceed to the upper rampart — clear the Elite Corsairs spawn",
        "Enter the tower — defeat the Cursed Captain miniboss for bonus XP burst",
        "Return to quest NPC, turn in, immediately accept next quest, repeat",
      ]},
      { type: "tip", text: "The key to 2.5M+ XP per hour is zero idle time between quest completions. The moment your quest pops complete, run to the NPC while still fighting if possible. Every second of idle time cuts into your hourly rate." },
      { type: "heading", text: "XP Rates by Fruit" },
      { type: "table",
        headers: ["Fruit", "XP/Hour", "Mastery/Hour", "Notes"],
        rows: [
          ["🐉 Dragon", "~2.5M", "~800", "Best clearing speed — Z move hits entire ground floor"],
          ["🦊 Kitsune", "~2.4M", "~780", "Very close to Dragon, slightly slower floor clear"],
          ["🔔 Buddha", "~2.1M", "~650", "Massive hitbox compensates for lower damage per move"],
          ["❄️ Blizzard", "~1.8M", "~600", "Freeze AoE is effective but slower room clear than Beast types"],
          ["🌋 Magma", "~1.6M", "~580", "Magma floor is great but needs manual positioning each room"],
        ],
      },
      { type: "heading", text: "Server Hopping Strategy" },
      { type: "paragraph", text: "Grinding on a populated server will dramatically reduce your XP rate because enemies that other players kill do not give you XP. The optimal strategy is to grind on a fresh server for 30–45 minutes, then server hop when you notice spawn rates slowing down." },
      { type: "warning", text: "Do not server hop too frequently — each hop costs you approximately 45–60 seconds of loading time. Hop every 30 minutes, not every 5." },
    ],
  },
  {
    slug: "blox-fruits-trading-tips",
    title: "10 Trading Tips Every Blox Fruits Player Should Know",
    excerpt: "Trading is one of the most complex parts of Blox Fruits. These 10 tips will make you a better trader and help you never get scammed again.",
    date: "March 20, 2025",
    dateISO: "2025-03-20",
    category: "Trading",
    categoryColor: "#ffa502",
    readTime: "9 min",
    icon: "💡",
    author: "BloxFruitsAI Team",
    content: [
      { type: "paragraph", text: "Trading in Blox Fruits is not just about raw value — it is about understanding demand, timing the market, reading other players, and knowing when to hold versus when to trade. Here are 10 tips from our most experienced traders." },
      { type: "heading", text: "1. Demand Beats Raw Value — Always" },
      { type: "paragraph", text: "A fruit with a value of 5M but demand of 4/10 is much harder to trade than a fruit with a value of 3M and demand of 9/10. Why? Because demand tells you how quickly you can move a fruit. High demand = easy to trade at or above value. Low demand = you will trade below value to find a buyer. Always check demand on our Value List before making a trade decision." },
      { type: "heading", text: "2. Use the Trade Calculator Before Every Trade" },
      { type: "paragraph", text: "This sounds obvious but most players do not do it. Our Trade Calculator compares both sides of a trade, shows the value difference as a percentage, and gives you a Fair/Overpay/Underpay verdict in seconds. There is no excuse for accepting a trade without checking it first — the calculator is free and takes 30 seconds." },
      { type: "tip", text: "Even if you think you know the values, verify them. Values change after every patch and your memory of last week's prices may already be outdated." },
      { type: "heading", text: "3. Permanent Fruits Are Worth Significantly More" },
      { type: "paragraph", text: "A permanent Dragon is worth roughly 40–50% more in trade value than a temporary Dragon. If someone offers you a permanent fruit for a temporary fruit, even if the values look equal, you are getting a worse deal in terms of trade liquidity. Permanent fruits are easier to trade, higher demand, and hold value better through patches." },
      { type: "heading", text: "4. Buy Low After a Nerf, Sell High After a Buff" },
      { type: "paragraph", text: "Patch notes are your trading signal. When a fruit gets nerfed, its demand drops and impatient players sell cheap. That is your buying opportunity. When a fruit gets buffed, its value spikes — that is your selling window. The key is acting within 24–48 hours of the patch, before the market stabilizes." },
      { type: "heading", text: "5. Never Trade an S-Tier for Multiple A-Tiers" },
      { type: "paragraph", text: "The math looks tempting — two A-tier fruits should equal one S-tier, right? Wrong. S-tier fruits have higher demand, are easier to move in future trades, and hold their value better. Splitting an S-tier into multiple lower tiers makes each individual fruit harder to trade and gives you more pieces to manage. Hold your S-tiers whenever possible." },
      { type: "heading", text: "6. Know the Difference Between Value and Price" },
      { type: "paragraph", text: "Value is what a fruit is theoretically worth based on demand and market data. Price is what someone will actually pay right now. In a buyer's market, price is below value. In a seller's market, price exceeds value. Reading the current market correctly helps you know when you are trading at a real advantage." },
      { type: "heading", text: "7. Use Middlemen for High-Value Trades" },
      { type: "paragraph", text: "For any trade involving S-tier fruits or high Robux value items, use a trusted middleman. Scamming on high-value trades is unfortunately common. A middleman holds both items until both parties confirm, then distributes. Use publicly verified middlemen only — ask in the official Blox Fruits Discord for recommendations." },
      { type: "heading", text: "8. Check Trend Indicators Before Holding" },
      { type: "paragraph", text: "Our Value List shows trend indicators for every fruit — Rising (↑), Stable (→), and Falling (↓). If a fruit you hold is trending down, consider trading it sooner rather than later. If it is trending up, holding may be the right call. Trend data is updated daily based on community trade activity." },
      { type: "heading", text: "9. Trade on Patch Day for Maximum Value" },
      { type: "paragraph", text: "Values are most volatile on patch day and the 48 hours following. Buffed fruits spike to their highest price point in this window. If you own a fruit that just got buffed, patch day is the optimal selling time. If you want to buy a nerfed fruit at its cheapest, wait 3–5 days after the patch for the panic selling to subside." },
      { type: "heading", text: "10. Never Trade Out of Pressure" },
      { type: "paragraph", text: "Scammers create artificial urgency — 'I'm logging off in 2 minutes' or 'accept now or the deal is gone.' Real traders with good offers do not pressure you. Take your time, verify the values, use the calculator, and if someone pressures you to accept fast, walk away. No trade is so good it cannot wait 2 minutes." },
      { type: "warning", text: "If a trade looks too good to be true — someone offering an S-tier fruit for your B-tier item, for example — it almost certainly is a scam. Verify every trade, no matter how generous it looks." },
    ],
  },
  {
    slug: "race-v4-tier-list",
    title: "Race V4 Tier List 2025 — Which Race Is Best After All Awakenings?",
    excerpt: "With all six races now having V4 awakenings available, we rank every race based on PVP impact, PVE utility, and which fruit builds they pair best with.",
    date: "March 28, 2025",
    dateISO: "2025-03-28",
    category: "Race Guide",
    categoryColor: "#7c3aed",
    readTime: "6 min",
    icon: "🏁",
    author: "BloxFruitsAI Team",
    content: [
      { type: "paragraph", text: "All six playable races in Blox Fruits now have V4 awakenings available. With the meta fully established, we can finally rank every race at its peak power level and tell you definitively which race is the best in 2025." },
      { type: "heading", text: "V4 Race Tier List" },
      { type: "tierrow", tier: "S", tierColor: "#ffd700", label: "Best Races", fruits: ["🤖 Cyborg", "🐰 Rabbit"] },
      { type: "tierrow", tier: "A", tierColor: "#00f5ff", label: "Excellent", fruits: ["👻 Ghoul", "🦈 Shark"] },
      { type: "tierrow", tier: "B", tierColor: "#2ed573", label: "Good", fruits: ["😇 Angel", "👤 Human"] },
      { type: "heading", text: "Cyborg V4 — Why It's #1" },
      { type: "paragraph", text: "Machine Mode is simply the best defensive racial ability in the game. The 30-second near-invulnerability window combined with an energy cannon makes Cyborg V4 the best race for PVP survival. It pairs exceptionally well with Venom and Dragon — high damage fruits that benefit from the extended survivability window." },
      { type: "heading", text: "Rabbit V4 — Speed Redefined" },
      { type: "paragraph", text: "Flash Mode makes Rabbit V4 the fastest race in the game — it is not even close. The teleport-level speed combined with afterimage dashes makes you nearly impossible to hit with slow or projectile-based moves. It pairs perfectly with Leopard, creating the fastest and hardest-to-catch player in any server." },
      { type: "heading", text: "How to Unlock V4" },
      { type: "list", items: [
        "Reach Level 2000+ (hard requirement, cannot bypass)",
        "Travel to Musketeer Island in Sea 3",
        "Find the NPC corresponding to your race and accept the V4 trial",
        "Complete the race-specific obstacle course within 3 minutes",
        "Collect the V4 awakening core from the chest at the end",
        "Equip the core to permanently unlock V4",
      ]},
      { type: "tip", text: "Practice the trial route several times in a private server before attempting for real. Each race trial is different — Rabbit is a speed course, Shark requires underwater combat, Cyborg involves avoiding laser beams. Knowing the layout is essential." },
    ],
  },
  {
    slug: "trade-calculator-launch",
    title: "Introducing the BloxFruits Trade Calculator — Never Get Scammed Again",
    excerpt: "Our new AI-powered trade calculator is live. Add up to 4 items on each side and get an instant verdict on any trade.",
    date: "April 10, 2025",
    dateISO: "2025-04-10",
    category: "Feature",
    categoryColor: "#ff6b9d",
    readTime: "3 min",
    icon: "💱",
    author: "BloxFruitsAI Team",
    content: [
      { type: "paragraph", text: "Today we are launching the BloxFruits Trade Calculator — a tool we have been building for months and one that we believe will fundamentally change how players approach trading in Blox Fruits." },
      { type: "heading", text: "What the Calculator Does" },
      { type: "paragraph", text: "The Trade Calculator lets you add up to 4 items on each side of a trade. It then compares total value, average demand score, and total Robux price for each side, and delivers an instant verdict: Fair Trade, You're Overpaying, or You're Underpaying." },
      { type: "list", items: [
        "Search and add any fruit or gamepass from our full item database",
        "See real-time values, demand scores, and Robux prices for each item",
        "Get an instant Fair/Overpay/Underpay verdict with percentage difference",
        "View the value ratio and average demand score for the full trade",
        "Built-in trading tips based on the current meta",
      ]},
      { type: "info", text: "The Trade Calculator is completely free to use and requires no account. Just go to bloxfruitsai.com/calculator and start adding items." },
      { type: "heading", text: "Why We Built It" },
      { type: "paragraph", text: "Getting scammed on a trade is one of the most frustrating experiences in Blox Fruits — especially when you spend real money on Robux to buy a fruit only to trade it away for far less than it was worth. The Trade Calculator eliminates that risk entirely. No more mental math, no more googling values mid-trade, no more pressure decisions." },
      { type: "tip", text: "Bookmark bloxfruitsai.com/calculator on your phone so you can open it instantly whenever a trade offer comes in during a game session." },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(p => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return BLOG_POSTS.map(p => p.slug);
}
