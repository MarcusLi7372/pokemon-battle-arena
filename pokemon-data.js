// ============================================================
// POKEMON BATTLE ARENA - Complete Pokemon Data
// All 1025 Pokemon from Generations 1-9
// Format: [id, name, type1, type2_or_null, tier]
// Tiers: 1=baby, 2=basic, 3=mid-evo, 4=final-evo, 5=strong/pseudo, 6=legendary
// ============================================================

const RAW_POKEMON = [
  // === GENERATION 1 ===
  [1,"Bulbasaur","Grass","Poison",2],[2,"Ivysaur","Grass","Poison",3],[3,"Venusaur","Grass","Poison",4],
  [4,"Charmander","Fire",null,2],[5,"Charmeleon","Fire",null,3],[6,"Charizard","Fire","Flying",4],
  [7,"Squirtle","Water",null,2],[8,"Wartortle","Water",null,3],[9,"Blastoise","Water",null,4],
  [10,"Caterpie","Bug",null,2],[11,"Metapod","Bug",null,2],[12,"Butterfree","Bug","Flying",4],
  [13,"Weedle","Bug","Poison",2],[14,"Kakuna","Bug","Poison",2],[15,"Beedrill","Bug","Poison",4],
  [16,"Pidgey","Normal","Flying",2],[17,"Pidgeotto","Normal","Flying",3],[18,"Pidgeot","Normal","Flying",4],
  [19,"Rattata","Normal",null,2],[20,"Raticate","Normal",null,3],
  [21,"Spearow","Normal","Flying",2],[22,"Fearow","Normal","Flying",3],
  [23,"Ekans","Poison",null,2],[24,"Arbok","Poison",null,3],
  [25,"Pikachu","Electric",null,3],[26,"Raichu","Electric",null,4],
  [27,"Sandshrew","Ground",null,2],[28,"Sandslash","Ground",null,3],
  [29,"Nidoran-F","Poison",null,2],[30,"Nidorina","Poison",null,3],[31,"Nidoqueen","Poison","Ground",4],
  [32,"Nidoran-M","Poison",null,2],[33,"Nidorino","Poison",null,3],[34,"Nidoking","Poison","Ground",4],
  [35,"Clefairy","Fairy",null,2],[36,"Clefable","Fairy",null,4],
  [37,"Vulpix","Fire",null,2],[38,"Ninetales","Fire",null,4],
  [39,"Jigglypuff","Normal","Fairy",2],[40,"Wigglytuff","Normal","Fairy",4],
  [41,"Zubat","Poison","Flying",2],[42,"Golbat","Poison","Flying",3],
  [43,"Oddish","Grass","Poison",2],[44,"Gloom","Grass","Poison",3],[45,"Vileplume","Grass","Poison",4],
  [46,"Paras","Bug","Grass",2],[47,"Parasect","Bug","Grass",3],
  [48,"Venonat","Bug","Poison",2],[49,"Venomoth","Bug","Poison",3],
  [50,"Diglett","Ground",null,2],[51,"Dugtrio","Ground",null,3],
  [52,"Meowth","Normal",null,2],[53,"Persian","Normal",null,3],
  [54,"Psyduck","Water",null,2],[55,"Golduck","Water",null,3],
  [56,"Mankey","Fighting",null,2],[57,"Primeape","Fighting",null,3],
  [58,"Growlithe","Fire",null,2],[59,"Arcanine","Fire",null,5],
  [60,"Poliwag","Water",null,2],[61,"Poliwhirl","Water",null,3],[62,"Poliwrath","Water","Fighting",4],
  [63,"Abra","Psychic",null,2],[64,"Kadabra","Psychic",null,3],[65,"Alakazam","Psychic",null,5],
  [66,"Machop","Fighting",null,2],[67,"Machoke","Fighting",null,3],[68,"Machamp","Fighting",null,4],
  [69,"Bellsprout","Grass","Poison",2],[70,"Weepinbell","Grass","Poison",3],[71,"Victreebel","Grass","Poison",4],
  [72,"Tentacool","Water","Poison",2],[73,"Tentacruel","Water","Poison",3],
  [74,"Geodude","Rock","Ground",2],[75,"Graveler","Rock","Ground",3],[76,"Golem","Rock","Ground",4],
  [77,"Ponyta","Fire",null,2],[78,"Rapidash","Fire",null,3],
  [79,"Slowpoke","Water","Psychic",2],[80,"Slowbro","Water","Psychic",4],
  [81,"Magnemite","Electric","Steel",2],[82,"Magneton","Electric","Steel",3],
  [83,"Farfetch'd","Normal","Flying",3],[84,"Doduo","Normal","Flying",2],[85,"Dodrio","Normal","Flying",3],
  [86,"Seel","Water",null,2],[87,"Dewgong","Water","Ice",3],
  [88,"Grimer","Poison",null,2],[89,"Muk","Poison",null,3],
  [90,"Shellder","Water",null,2],[91,"Cloyster","Water","Ice",4],
  [92,"Gastly","Ghost","Poison",2],[93,"Haunter","Ghost","Poison",3],[94,"Gengar","Ghost","Poison",5],
  [95,"Onix","Rock","Ground",2],[96,"Drowzee","Psychic",null,2],[97,"Hypno","Psychic",null,3],
  [98,"Krabby","Water",null,2],[99,"Kingler","Water",null,3],
  [100,"Voltorb","Electric",null,2],[101,"Electrode","Electric",null,3],
  [102,"Exeggcute","Grass","Psychic",2],[103,"Exeggutor","Grass","Psychic",4],
  [104,"Cubone","Ground",null,2],[105,"Marowak","Ground",null,3],
  [106,"Hitmonlee","Fighting",null,3],[107,"Hitmonchan","Fighting",null,3],
  [108,"Lickitung","Normal",null,2],[109,"Koffing","Poison",null,2],[110,"Weezing","Poison",null,3],
  [111,"Rhyhorn","Ground","Rock",2],[112,"Rhydon","Ground","Rock",3],
  [113,"Chansey","Normal",null,2],[114,"Tangela","Grass",null,2],[115,"Kangaskhan","Normal",null,4],
  [116,"Horsea","Water",null,2],[117,"Seadra","Water",null,3],
  [118,"Goldeen","Water",null,2],[119,"Seaking","Water",null,3],
  [120,"Staryu","Water",null,2],[121,"Starmie","Water","Psychic",4],
  [122,"Mr. Mime","Psychic","Fairy",3],[123,"Scyther","Bug","Flying",4],
  [124,"Jynx","Ice","Psychic",3],[125,"Electabuzz","Electric",null,3],[126,"Magmar","Fire",null,3],
  [127,"Pinsir","Bug",null,3],[128,"Tauros","Normal",null,3],
  [129,"Magikarp","Water",null,1],[130,"Gyarados","Water","Flying",5],
  [131,"Lapras","Water","Ice",4],[132,"Ditto","Normal",null,2],[133,"Eevee","Normal",null,2],
  [134,"Vaporeon","Water",null,4],[135,"Jolteon","Electric",null,4],[136,"Flareon","Fire",null,4],
  [137,"Porygon","Normal",null,2],[138,"Omanyte","Rock","Water",2],[139,"Omastar","Rock","Water",3],
  [140,"Kabuto","Rock","Water",2],[141,"Kabutops","Rock","Water",3],
  [142,"Aerodactyl","Rock","Flying",4],[143,"Snorlax","Normal",null,4],
  [144,"Articuno","Ice","Flying",6],[145,"Zapdos","Electric","Flying",6],[146,"Moltres","Fire","Flying",6],
  [147,"Dratini","Dragon",null,2],[148,"Dragonair","Dragon",null,3],[149,"Dragonite","Dragon","Flying",5],
  [150,"Mewtwo","Psychic",null,6],[151,"Mew","Psychic",null,6],

  // === GENERATION 2 ===
  [152,"Chikorita","Grass",null,2],[153,"Bayleef","Grass",null,3],[154,"Meganium","Grass",null,4],
  [155,"Cyndaquil","Fire",null,2],[156,"Quilava","Fire",null,3],[157,"Typhlosion","Fire",null,4],
  [158,"Totodile","Water",null,2],[159,"Croconaw","Water",null,3],[160,"Feraligatr","Water",null,4],
  [161,"Sentret","Normal",null,2],[162,"Furret","Normal",null,3],
  [163,"Hoothoot","Normal","Flying",2],[164,"Noctowl","Normal","Flying",3],
  [165,"Ledyba","Bug","Flying",2],[166,"Ledian","Bug","Flying",3],
  [167,"Spinarak","Bug","Poison",2],[168,"Ariados","Bug","Poison",3],
  [169,"Crobat","Poison","Flying",4],[170,"Chinchou","Water","Electric",2],[171,"Lanturn","Water","Electric",3],
  [172,"Pichu","Electric",null,1],[173,"Cleffa","Fairy",null,1],[174,"Igglybuff","Normal","Fairy",1],
  [175,"Togepi","Fairy",null,1],[176,"Togetic","Fairy","Flying",3],
  [177,"Natu","Psychic","Flying",2],[178,"Xatu","Psychic","Flying",3],
  [179,"Mareep","Electric",null,2],[180,"Flaaffy","Electric",null,3],[181,"Ampharos","Electric",null,4],
  [182,"Bellossom","Grass",null,4],[183,"Marill","Water","Fairy",2],[184,"Azumarill","Water","Fairy",3],
  [185,"Sudowoodo","Rock",null,2],[186,"Politoed","Water",null,4],
  [187,"Hoppip","Grass","Flying",2],[188,"Skiploom","Grass","Flying",3],[189,"Jumpluff","Grass","Flying",4],
  [190,"Aipom","Normal",null,2],[191,"Sunkern","Grass",null,1],[192,"Sunflora","Grass",null,2],
  [193,"Yanma","Bug","Flying",2],[194,"Wooper","Water","Ground",2],[195,"Quagsire","Water","Ground",3],
  [196,"Espeon","Psychic",null,4],[197,"Umbreon","Dark",null,4],
  [198,"Murkrow","Dark","Flying",2],[199,"Slowking","Water","Psychic",4],[200,"Misdreavus","Ghost",null,2],
  [201,"Unown","Psychic",null,2],[202,"Wobbuffet","Psychic",null,2],[203,"Girafarig","Normal","Psychic",2],
  [204,"Pineco","Bug",null,2],[205,"Forretress","Bug","Steel",3],[206,"Dunsparce","Normal",null,2],
  [207,"Gligar","Ground","Flying",2],[208,"Steelix","Steel","Ground",4],
  [209,"Snubbull","Fairy",null,2],[210,"Granbull","Fairy",null,3],
  [211,"Qwilfish","Water","Poison",2],[212,"Scizor","Bug","Steel",5],
  [213,"Shuckle","Bug","Rock",2],[214,"Heracross","Bug","Fighting",4],
  [215,"Sneasel","Dark","Ice",2],[216,"Teddiursa","Normal",null,2],[217,"Ursaring","Normal",null,3],
  [218,"Slugma","Fire",null,2],[219,"Magcargo","Fire","Rock",3],
  [220,"Swinub","Ice","Ground",2],[221,"Piloswine","Ice","Ground",3],
  [222,"Corsola","Water","Rock",2],[223,"Remoraid","Water",null,2],[224,"Octillery","Water",null,3],
  [225,"Delibird","Ice","Flying",2],[226,"Mantine","Water","Flying",3],[227,"Skarmory","Steel","Flying",4],
  [228,"Houndour","Dark","Fire",2],[229,"Houndoom","Dark","Fire",4],
  [230,"Kingdra","Water","Dragon",4],[231,"Phanpy","Ground",null,2],[232,"Donphan","Ground",null,3],
  [233,"Porygon2","Normal",null,3],[234,"Stantler","Normal",null,2],[235,"Smeargle","Normal",null,2],
  [236,"Tyrogue","Fighting",null,1],[237,"Hitmontop","Fighting",null,3],
  [238,"Smoochum","Ice","Psychic",1],[239,"Elekid","Electric",null,1],[240,"Magby","Fire",null,1],
  [241,"Miltank","Normal",null,3],[242,"Blissey","Normal",null,4],
  [243,"Raikou","Electric",null,6],[244,"Entei","Fire",null,6],[245,"Suicune","Water",null,6],
  [246,"Larvitar","Rock","Ground",2],[247,"Pupitar","Rock","Ground",3],[248,"Tyranitar","Rock","Dark",5],
  [249,"Lugia","Psychic","Flying",6],[250,"Ho-oh","Fire","Flying",6],[251,"Celebi","Psychic","Grass",6],

  // === GENERATION 3 ===
  [252,"Treecko","Grass",null,2],[253,"Grovyle","Grass",null,3],[254,"Sceptile","Grass",null,4],
  [255,"Torchic","Fire",null,2],[256,"Combusken","Fire","Fighting",3],[257,"Blaziken","Fire","Fighting",5],
  [258,"Mudkip","Water",null,2],[259,"Marshtomp","Water","Ground",3],[260,"Swampert","Water","Ground",4],
  [261,"Poochyena","Dark",null,2],[262,"Mightyena","Dark",null,3],
  [263,"Zigzagoon","Normal",null,2],[264,"Linoone","Normal",null,3],
  [265,"Wurmple","Bug",null,2],[266,"Silcoon","Bug",null,2],[267,"Beautifly","Bug","Flying",3],
  [268,"Cascoon","Bug",null,2],[269,"Dustox","Bug","Poison",3],
  [270,"Lotad","Water","Grass",2],[271,"Lombre","Water","Grass",3],[272,"Ludicolo","Water","Grass",4],
  [273,"Seedot","Grass",null,2],[274,"Nuzleaf","Grass","Dark",3],[275,"Shiftry","Grass","Dark",4],
  [276,"Taillow","Normal","Flying",2],[277,"Swellow","Normal","Flying",3],
  [278,"Wingull","Water","Flying",2],[279,"Pelipper","Water","Flying",3],
  [280,"Ralts","Psychic","Fairy",2],[281,"Kirlia","Psychic","Fairy",3],[282,"Gardevoir","Psychic","Fairy",5],
  [283,"Surskit","Bug","Water",2],[284,"Masquerain","Bug","Flying",3],
  [285,"Shroomish","Grass",null,2],[286,"Breloom","Grass","Fighting",4],
  [287,"Slakoth","Normal",null,2],[288,"Vigoroth","Normal",null,3],[289,"Slaking","Normal",null,5],
  [290,"Nincada","Bug","Ground",2],[291,"Ninjask","Bug","Flying",3],[292,"Shedinja","Bug","Ghost",3],
  [293,"Whismur","Normal",null,2],[294,"Loudred","Normal",null,3],[295,"Exploud","Normal",null,4],
  [296,"Makuhita","Fighting",null,2],[297,"Hariyama","Fighting",null,3],
  [298,"Azurill","Normal","Fairy",1],[299,"Nosepass","Rock",null,2],
  [300,"Skitty","Normal",null,2],[301,"Delcatty","Normal",null,3],
  [302,"Sableye","Dark","Ghost",3],[303,"Mawile","Steel","Fairy",3],
  [304,"Aron","Steel","Rock",2],[305,"Lairon","Steel","Rock",3],[306,"Aggron","Steel","Rock",4],
  [307,"Meditite","Fighting","Psychic",2],[308,"Medicham","Fighting","Psychic",3],
  [309,"Electrike","Electric",null,2],[310,"Manectric","Electric",null,3],
  [311,"Plusle","Electric",null,2],[312,"Minun","Electric",null,2],
  [313,"Volbeat","Bug",null,2],[314,"Illumise","Bug",null,2],[315,"Roselia","Grass","Poison",2],
  [316,"Gulpin","Poison",null,2],[317,"Swalot","Poison",null,3],
  [318,"Carvanha","Water","Dark",2],[319,"Sharpedo","Water","Dark",3],
  [320,"Wailmer","Water",null,2],[321,"Wailord","Water",null,3],
  [322,"Numel","Fire","Ground",2],[323,"Camerupt","Fire","Ground",3],[324,"Torkoal","Fire",null,2],
  [325,"Spoink","Psychic",null,2],[326,"Grumpig","Psychic",null,3],[327,"Spinda","Normal",null,2],
  [328,"Trapinch","Ground",null,2],[329,"Vibrava","Ground","Dragon",3],[330,"Flygon","Ground","Dragon",4],
  [331,"Cacnea","Grass",null,2],[332,"Cacturne","Grass","Dark",3],
  [333,"Swablu","Normal","Flying",2],[334,"Altaria","Dragon","Flying",4],
  [335,"Zangoose","Normal",null,3],[336,"Seviper","Poison",null,3],
  [337,"Lunatone","Rock","Psychic",3],[338,"Solrock","Rock","Psychic",3],
  [339,"Barboach","Water","Ground",2],[340,"Whiscash","Water","Ground",3],
  [341,"Corphish","Water",null,2],[342,"Crawdaunt","Water","Dark",3],
  [343,"Baltoy","Ground","Psychic",2],[344,"Claydol","Ground","Psychic",3],
  [345,"Lileep","Rock","Grass",2],[346,"Cradily","Rock","Grass",3],
  [347,"Anorith","Rock","Bug",2],[348,"Armaldo","Rock","Bug",3],
  [349,"Feebas","Water",null,1],[350,"Milotic","Water",null,4],
  [351,"Castform","Normal",null,2],[352,"Kecleon","Normal",null,2],
  [353,"Shuppet","Ghost",null,2],[354,"Banette","Ghost",null,3],
  [355,"Duskull","Ghost",null,2],[356,"Dusclops","Ghost",null,3],
  [357,"Tropius","Grass","Flying",3],[358,"Chimecho","Psychic",null,3],[359,"Absol","Dark",null,4],
  [360,"Wynaut","Psychic",null,1],[361,"Snorunt","Ice",null,2],[362,"Glalie","Ice",null,3],
  [363,"Spheal","Ice","Water",2],[364,"Sealeo","Ice","Water",3],[365,"Walrein","Ice","Water",4],
  [366,"Clamperl","Water",null,2],[367,"Huntail","Water",null,3],[368,"Gorebyss","Water",null,3],
  [369,"Relicanth","Water","Rock",3],[370,"Luvdisc","Water",null,2],
  [371,"Bagon","Dragon",null,2],[372,"Shelgon","Dragon",null,3],[373,"Salamence","Dragon","Flying",5],
  [374,"Beldum","Steel","Psychic",2],[375,"Metang","Steel","Psychic",3],[376,"Metagross","Steel","Psychic",5],
  [377,"Regirock","Rock",null,6],[378,"Regice","Ice",null,6],[379,"Registeel","Steel",null,6],
  [380,"Latias","Dragon","Psychic",6],[381,"Latios","Dragon","Psychic",6],
  [382,"Kyogre","Water",null,6],[383,"Groudon","Ground",null,6],[384,"Rayquaza","Dragon","Flying",6],
  [385,"Jirachi","Steel","Psychic",6],[386,"Deoxys","Psychic",null,6],

  // === GENERATION 4 ===
  [387,"Turtwig","Grass",null,2],[388,"Grotle","Grass",null,3],[389,"Torterra","Grass","Ground",4],
  [390,"Chimchar","Fire",null,2],[391,"Monferno","Fire","Fighting",3],[392,"Infernape","Fire","Fighting",5],
  [393,"Piplup","Water",null,2],[394,"Prinplup","Water",null,3],[395,"Empoleon","Water","Steel",4],
  [396,"Starly","Normal","Flying",2],[397,"Staravia","Normal","Flying",3],[398,"Staraptor","Normal","Flying",4],
  [399,"Bidoof","Normal",null,2],[400,"Bibarel","Normal","Water",3],
  [401,"Kricketot","Bug",null,2],[402,"Kricketune","Bug",null,3],
  [403,"Shinx","Electric",null,2],[404,"Luxio","Electric",null,3],[405,"Luxray","Electric",null,4],
  [406,"Budew","Grass","Poison",1],[407,"Roserade","Grass","Poison",4],
  [408,"Cranidos","Rock",null,2],[409,"Rampardos","Rock",null,4],
  [410,"Shieldon","Rock","Steel",2],[411,"Bastiodon","Rock","Steel",4],
  [412,"Burmy","Bug",null,2],[413,"Wormadam","Bug","Grass",3],[414,"Mothim","Bug","Flying",3],
  [415,"Combee","Bug","Flying",2],[416,"Vespiquen","Bug","Flying",3],[417,"Pachirisu","Electric",null,2],
  [418,"Buizel","Water",null,2],[419,"Floatzel","Water",null,3],
  [420,"Cherubi","Grass",null,2],[421,"Cherrim","Grass",null,3],
  [422,"Shellos","Water",null,2],[423,"Gastrodon","Water","Ground",3],
  [424,"Ambipom","Normal",null,3],[425,"Drifloon","Ghost","Flying",2],[426,"Drifblim","Ghost","Flying",3],
  [427,"Buneary","Normal",null,2],[428,"Lopunny","Normal",null,3],
  [429,"Mismagius","Ghost",null,4],[430,"Honchkrow","Dark","Flying",4],
  [431,"Glameow","Normal",null,2],[432,"Purugly","Normal",null,3],
  [433,"Chingling","Psychic",null,1],[434,"Stunky","Poison","Dark",2],[435,"Skuntank","Poison","Dark",3],
  [436,"Bronzor","Steel","Psychic",2],[437,"Bronzong","Steel","Psychic",3],
  [438,"Bonsly","Rock",null,1],[439,"Mime Jr.","Psychic","Fairy",1],[440,"Happiny","Normal",null,1],
  [441,"Chatot","Normal","Flying",2],[442,"Spiritomb","Ghost","Dark",4],
  [443,"Gible","Dragon","Ground",2],[444,"Gabite","Dragon","Ground",3],[445,"Garchomp","Dragon","Ground",5],
  [446,"Munchlax","Normal",null,1],[447,"Riolu","Fighting",null,1],[448,"Lucario","Fighting","Steel",5],
  [449,"Hippopotas","Ground",null,2],[450,"Hippowdon","Ground",null,4],
  [451,"Skorupi","Poison","Bug",2],[452,"Drapion","Poison","Dark",3],
  [453,"Croagunk","Poison","Fighting",2],[454,"Toxicroak","Poison","Fighting",3],
  [455,"Carnivine","Grass",null,2],[456,"Finneon","Water",null,2],[457,"Lumineon","Water",null,3],
  [458,"Mantyke","Water","Flying",1],[459,"Snover","Grass","Ice",2],[460,"Abomasnow","Grass","Ice",4],
  [461,"Weavile","Dark","Ice",4],[462,"Magnezone","Electric","Steel",4],[463,"Lickilicky","Normal",null,4],
  [464,"Rhyperior","Ground","Rock",4],[465,"Tangrowth","Grass",null,4],[466,"Electivire","Electric",null,4],
  [467,"Magmortar","Fire",null,4],[468,"Togekiss","Fairy","Flying",5],[469,"Yanmega","Bug","Flying",4],
  [470,"Leafeon","Grass",null,4],[471,"Glaceon","Ice",null,4],[472,"Gliscor","Ground","Flying",4],
  [473,"Mamoswine","Ice","Ground",4],[474,"Porygon-Z","Normal",null,4],[475,"Gallade","Psychic","Fighting",4],
  [476,"Probopass","Rock","Steel",4],[477,"Dusknoir","Ghost",null,4],[478,"Froslass","Ice","Ghost",4],
  [479,"Rotom","Electric","Ghost",4],[480,"Uxie","Psychic",null,6],[481,"Mesprit","Psychic",null,6],
  [482,"Azelf","Psychic",null,6],[483,"Dialga","Steel","Dragon",6],[484,"Palkia","Water","Dragon",6],
  [485,"Heatran","Fire","Steel",6],[486,"Regigigas","Normal",null,6],[487,"Giratina","Ghost","Dragon",6],
  [488,"Cresselia","Psychic",null,6],[489,"Phione","Water",null,6],[490,"Manaphy","Water",null,6],
  [491,"Darkrai","Dark",null,6],[492,"Shaymin","Grass",null,6],[493,"Arceus","Normal",null,6],

  // === GENERATION 5 ===
  [494,"Victini","Psychic","Fire",6],
  [495,"Snivy","Grass",null,2],[496,"Servine","Grass",null,3],[497,"Serperior","Grass",null,4],
  [498,"Tepig","Fire",null,2],[499,"Pignite","Fire","Fighting",3],[500,"Emboar","Fire","Fighting",4],
  [501,"Oshawott","Water",null,2],[502,"Dewott","Water",null,3],[503,"Samurott","Water",null,4],
  [504,"Patrat","Normal",null,2],[505,"Watchog","Normal",null,3],
  [506,"Lillipup","Normal",null,2],[507,"Herdier","Normal",null,3],[508,"Stoutland","Normal",null,4],
  [509,"Purrloin","Dark",null,2],[510,"Liepard","Dark",null,3],
  [511,"Pansage","Grass",null,2],[512,"Simisage","Grass",null,3],
  [513,"Pansear","Fire",null,2],[514,"Simisear","Fire",null,3],
  [515,"Panpour","Water",null,2],[516,"Simipour","Water",null,3],
  [517,"Munna","Psychic",null,2],[518,"Musharna","Psychic",null,3],
  [519,"Pidove","Normal","Flying",2],[520,"Tranquill","Normal","Flying",3],[521,"Unfezant","Normal","Flying",4],
  [522,"Blitzle","Electric",null,2],[523,"Zebstrika","Electric",null,3],
  [524,"Roggenrola","Rock",null,2],[525,"Boldore","Rock",null,3],[526,"Gigalith","Rock",null,4],
  [527,"Woobat","Psychic","Flying",2],[528,"Swoobat","Psychic","Flying",3],
  [529,"Drilbur","Ground",null,2],[530,"Excadrill","Ground","Steel",4],
  [531,"Audino","Normal",null,3],[532,"Timburr","Fighting",null,2],[533,"Gurdurr","Fighting",null,3],
  [534,"Conkeldurr","Fighting",null,4],[535,"Tympole","Water",null,2],[536,"Palpitoad","Water","Ground",3],
  [537,"Seismitoad","Water","Ground",4],[538,"Throh","Fighting",null,3],[539,"Sawk","Fighting",null,3],
  [540,"Sewaddle","Bug","Grass",2],[541,"Swadloon","Bug","Grass",3],[542,"Leavanny","Bug","Grass",4],
  [543,"Venipede","Bug","Poison",2],[544,"Whirlipede","Bug","Poison",3],[545,"Scolipede","Bug","Poison",4],
  [546,"Cottonee","Grass","Fairy",2],[547,"Whimsicott","Grass","Fairy",3],
  [548,"Petilil","Grass",null,2],[549,"Lilligant","Grass",null,4],
  [550,"Basculin","Water",null,3],[551,"Sandile","Ground","Dark",2],[552,"Krokorok","Ground","Dark",3],
  [553,"Krookodile","Ground","Dark",4],[554,"Darumaka","Fire",null,2],[555,"Darmanitan","Fire",null,4],
  [556,"Maractus","Grass",null,3],[557,"Dwebble","Bug","Rock",2],[558,"Crustle","Bug","Rock",3],
  [559,"Scraggy","Dark","Fighting",2],[560,"Scrafty","Dark","Fighting",3],
  [561,"Sigilyph","Psychic","Flying",3],[562,"Yamask","Ghost",null,2],[563,"Cofagrigus","Ghost",null,3],
  [564,"Tirtouga","Water","Rock",2],[565,"Carracosta","Water","Rock",3],
  [566,"Archen","Rock","Flying",2],[567,"Archeops","Rock","Flying",3],
  [568,"Trubbish","Poison",null,2],[569,"Garbodor","Poison",null,3],
  [570,"Zorua","Dark",null,2],[571,"Zoroark","Dark",null,4],
  [572,"Minccino","Normal",null,2],[573,"Cinccino","Normal",null,3],
  [574,"Gothita","Psychic",null,2],[575,"Gothorita","Psychic",null,3],[576,"Gothitelle","Psychic",null,4],
  [577,"Solosis","Psychic",null,2],[578,"Duosion","Psychic",null,3],[579,"Reuniclus","Psychic",null,4],
  [580,"Ducklett","Water","Flying",2],[581,"Swanna","Water","Flying",3],
  [582,"Vanillite","Ice",null,2],[583,"Vanillish","Ice",null,3],[584,"Vanilluxe","Ice",null,4],
  [585,"Deerling","Normal","Grass",2],[586,"Sawsbuck","Normal","Grass",3],
  [587,"Emolga","Electric","Flying",2],[588,"Karrablast","Bug",null,2],[589,"Escavalier","Bug","Steel",4],
  [590,"Foongus","Grass","Poison",2],[591,"Amoonguss","Grass","Poison",3],
  [592,"Frillish","Water","Ghost",2],[593,"Jellicent","Water","Ghost",3],[594,"Alomomola","Water",null,3],
  [595,"Joltik","Bug","Electric",2],[596,"Galvantula","Bug","Electric",3],
  [597,"Ferroseed","Grass","Steel",2],[598,"Ferrothorn","Grass","Steel",4],
  [599,"Klink","Steel",null,2],[600,"Klang","Steel",null,3],[601,"Klinklang","Steel",null,4],
  [602,"Tynamo","Electric",null,2],[603,"Eelektrik","Electric",null,3],[604,"Eelektross","Electric",null,4],
  [605,"Elgyem","Psychic",null,2],[606,"Beheeyem","Psychic",null,3],
  [607,"Litwick","Ghost","Fire",2],[608,"Lampent","Ghost","Fire",3],[609,"Chandelure","Ghost","Fire",5],
  [610,"Axew","Dragon",null,2],[611,"Fraxure","Dragon",null,3],[612,"Haxorus","Dragon",null,4],
  [613,"Cubchoo","Ice",null,2],[614,"Beartic","Ice",null,3],[615,"Cryogonal","Ice",null,3],
  [616,"Shelmet","Bug",null,2],[617,"Accelgor","Bug",null,3],
  [618,"Stunfisk","Ground","Electric",3],[619,"Mienfoo","Fighting",null,2],[620,"Mienshao","Fighting",null,3],
  [621,"Druddigon","Dragon",null,3],[622,"Golett","Ground","Ghost",2],[623,"Golurk","Ground","Ghost",3],
  [624,"Pawniard","Dark","Steel",2],[625,"Bisharp","Dark","Steel",4],
  [626,"Bouffalant","Normal",null,3],[627,"Rufflet","Normal","Flying",2],[628,"Braviary","Normal","Flying",4],
  [629,"Vullaby","Dark","Flying",2],[630,"Mandibuzz","Dark","Flying",3],
  [631,"Heatmor","Fire",null,3],[632,"Durant","Bug","Steel",3],
  [633,"Deino","Dark","Dragon",2],[634,"Zweilous","Dark","Dragon",3],[635,"Hydreigon","Dark","Dragon",5],
  [636,"Larvesta","Bug","Fire",2],[637,"Volcarona","Bug","Fire",5],
  [638,"Cobalion","Steel","Fighting",6],[639,"Terrakion","Rock","Fighting",6],[640,"Virizion","Grass","Fighting",6],
  [641,"Tornadus","Flying",null,6],[642,"Thundurus","Electric","Flying",6],
  [643,"Reshiram","Dragon","Fire",6],[644,"Zekrom","Dragon","Electric",6],
  [645,"Landorus","Ground","Flying",6],[646,"Kyurem","Dragon","Ice",6],
  [647,"Keldeo","Water","Fighting",6],[648,"Meloetta","Normal","Psychic",6],[649,"Genesect","Bug","Steel",6],

  // === GENERATION 6 ===
  [650,"Chespin","Grass",null,2],[651,"Quilladin","Grass",null,3],[652,"Chesnaught","Grass","Fighting",4],
  [653,"Fennekin","Fire",null,2],[654,"Braixen","Fire",null,3],[655,"Delphox","Fire","Psychic",4],
  [656,"Froakie","Water",null,2],[657,"Frogadier","Water",null,3],[658,"Greninja","Water","Dark",5],
  [659,"Bunnelby","Normal",null,2],[660,"Diggersby","Normal","Ground",3],
  [661,"Fletchling","Normal","Flying",2],[662,"Fletchinder","Fire","Flying",3],[663,"Talonflame","Fire","Flying",4],
  [664,"Scatterbug","Bug",null,2],[665,"Spewpa","Bug",null,2],[666,"Vivillon","Bug","Flying",3],
  [667,"Litleo","Fire","Normal",2],[668,"Pyroar","Fire","Normal",3],
  [669,"Flabebe","Fairy",null,2],[670,"Floette","Fairy",null,3],[671,"Florges","Fairy",null,4],
  [672,"Skiddo","Grass",null,2],[673,"Gogoat","Grass",null,3],[674,"Pancham","Fighting",null,2],[675,"Pangoro","Fighting","Dark",3],
  [676,"Furfrou","Normal",null,3],[677,"Espurr","Psychic",null,2],[678,"Meowstic","Psychic",null,3],
  [679,"Honedge","Steel","Ghost",2],[680,"Doublade","Steel","Ghost",3],[681,"Aegislash","Steel","Ghost",5],
  [682,"Spritzee","Fairy",null,2],[683,"Aromatisse","Fairy",null,3],
  [684,"Swirlix","Fairy",null,2],[685,"Slurpuff","Fairy",null,3],
  [686,"Inkay","Dark","Psychic",2],[687,"Malamar","Dark","Psychic",3],
  [688,"Binacle","Rock","Water",2],[689,"Barbaracle","Rock","Water",3],
  [690,"Skrelp","Poison","Water",2],[691,"Dragalge","Poison","Dragon",3],
  [692,"Clauncher","Water",null,2],[693,"Clawitzer","Water",null,3],
  [694,"Helioptile","Electric","Normal",2],[695,"Heliolisk","Electric","Normal",3],
  [696,"Tyrunt","Rock","Dragon",2],[697,"Tyrantrum","Rock","Dragon",4],
  [698,"Amaura","Rock","Ice",2],[699,"Aurorus","Rock","Ice",4],
  [700,"Sylveon","Fairy",null,4],[701,"Hawlucha","Fighting","Flying",4],[702,"Dedenne","Electric","Fairy",3],
  [703,"Carbink","Rock","Fairy",2],[704,"Goomy","Dragon",null,2],[705,"Sliggoo","Dragon",null,3],[706,"Goodra","Dragon",null,5],
  [707,"Klefki","Steel","Fairy",3],[708,"Phantump","Ghost","Grass",2],[709,"Trevenant","Ghost","Grass",3],
  [710,"Pumpkaboo","Ghost","Grass",2],[711,"Gourgeist","Ghost","Grass",3],
  [712,"Bergmite","Ice",null,2],[713,"Avalugg","Ice",null,3],
  [714,"Noibat","Flying","Dragon",2],[715,"Noivern","Flying","Dragon",4],
  [716,"Xerneas","Fairy",null,6],[717,"Yveltal","Dark","Flying",6],[718,"Zygarde","Dragon","Ground",6],
  [719,"Diancie","Rock","Fairy",6],[720,"Hoopa","Psychic","Ghost",6],[721,"Volcanion","Fire","Water",6],

  // === GENERATION 7 ===
  [722,"Rowlet","Grass","Flying",2],[723,"Dartrix","Grass","Flying",3],[724,"Decidueye","Grass","Ghost",4],
  [725,"Litten","Fire",null,2],[726,"Torracat","Fire",null,3],[727,"Incineroar","Fire","Dark",4],
  [728,"Popplio","Water",null,2],[729,"Brionne","Water",null,3],[730,"Primarina","Water","Fairy",5],
  [731,"Pikipek","Normal","Flying",2],[732,"Trumbeak","Normal","Flying",3],[733,"Toucannon","Normal","Flying",4],
  [734,"Yungoos","Normal",null,2],[735,"Gumshoos","Normal",null,3],
  [736,"Grubbin","Bug",null,2],[737,"Charjabug","Bug","Electric",3],[738,"Vikavolt","Bug","Electric",4],
  [739,"Crabrawler","Fighting",null,2],[740,"Crabominable","Fighting","Ice",3],
  [741,"Oricorio","Fire","Flying",3],[742,"Cutiefly","Bug","Fairy",2],[743,"Ribombee","Bug","Fairy",3],
  [744,"Rockruff","Rock",null,2],[745,"Lycanroc","Rock",null,4],
  [746,"Wishiwashi","Water",null,3],[747,"Mareanie","Poison","Water",2],[748,"Toxapex","Poison","Water",4],
  [749,"Mudbray","Ground",null,2],[750,"Mudsdale","Ground",null,3],
  [751,"Dewpider","Water","Bug",2],[752,"Araquanid","Water","Bug",3],
  [753,"Fomantis","Grass",null,2],[754,"Lurantis","Grass",null,3],
  [755,"Morelull","Grass","Fairy",2],[756,"Shiinotic","Grass","Fairy",3],
  [757,"Salandit","Poison","Fire",2],[758,"Salazzle","Poison","Fire",4],
  [759,"Stufful","Normal","Fighting",2],[760,"Bewear","Normal","Fighting",3],
  [761,"Bounsweet","Grass",null,2],[762,"Steenee","Grass",null,3],[763,"Tsareena","Grass",null,4],
  [764,"Comfey","Fairy",null,3],[765,"Oranguru","Normal","Psychic",3],[766,"Passimian","Fighting",null,3],
  [767,"Wimpod","Bug","Water",2],[768,"Golisopod","Bug","Water",4],
  [769,"Sandygast","Ghost","Ground",2],[770,"Palossand","Ghost","Ground",3],
  [771,"Pyukumuku","Water",null,2],[772,"Type: Null","Normal",null,3],[773,"Silvally","Normal",null,5],
  [774,"Minior","Rock","Flying",3],[775,"Komala","Normal",null,3],
  [776,"Turtonator","Fire","Dragon",3],[777,"Togedemaru","Electric","Steel",3],
  [778,"Mimikyu","Ghost","Fairy",4],[779,"Bruxish","Water","Psychic",3],[780,"Drampa","Normal","Dragon",3],
  [781,"Dhelmise","Ghost","Grass",3],[782,"Jangmo-o","Dragon",null,2],[783,"Hakamo-o","Dragon","Fighting",3],
  [784,"Kommo-o","Dragon","Fighting",5],
  [785,"Tapu Koko","Electric","Fairy",6],[786,"Tapu Lele","Psychic","Fairy",6],
  [787,"Tapu Bulu","Grass","Fairy",6],[788,"Tapu Fini","Water","Fairy",6],
  [789,"Cosmog","Psychic",null,1],[790,"Cosmoem","Psychic",null,2],
  [791,"Solgaleo","Psychic","Steel",6],[792,"Lunala","Psychic","Ghost",6],
  [793,"Nihilego","Rock","Poison",6],[794,"Buzzwole","Bug","Fighting",6],
  [795,"Pheromosa","Bug","Fighting",6],[796,"Xurkitree","Electric",null,6],
  [797,"Celesteela","Steel","Flying",6],[798,"Kartana","Grass","Steel",6],[799,"Guzzlord","Dark","Dragon",6],
  [800,"Necrozma","Psychic",null,6],[801,"Magearna","Steel","Fairy",6],[802,"Marshadow","Fighting","Ghost",6],
  [803,"Poipole","Poison",null,2],[804,"Naganadel","Poison","Dragon",5],
  [805,"Stakataka","Rock","Steel",6],[806,"Blacephalon","Fire","Ghost",6],[807,"Zeraora","Electric",null,6],
  [808,"Meltan","Steel",null,2],[809,"Melmetal","Steel",null,6],

  // === GENERATION 8 ===
  [810,"Grookey","Grass",null,2],[811,"Thwackey","Grass",null,3],[812,"Rillaboom","Grass",null,4],
  [813,"Scorbunny","Fire",null,2],[814,"Raboot","Fire",null,3],[815,"Cinderace","Fire",null,4],
  [816,"Sobble","Water",null,2],[817,"Drizzile","Water",null,3],[818,"Inteleon","Water",null,4],
  [819,"Skwovet","Normal",null,2],[820,"Greedent","Normal",null,3],
  [821,"Rookidee","Flying",null,2],[822,"Corvisquire","Flying",null,3],[823,"Corviknight","Flying","Steel",4],
  [824,"Blipbug","Bug",null,2],[825,"Dottler","Bug","Psychic",3],[826,"Orbeetle","Bug","Psychic",4],
  [827,"Nickit","Dark",null,2],[828,"Thievul","Dark",null,3],
  [829,"Gossifleur","Grass",null,2],[830,"Eldegoss","Grass",null,3],
  [831,"Wooloo","Normal",null,2],[832,"Dubwool","Normal",null,3],
  [833,"Chewtle","Water",null,2],[834,"Drednaw","Water","Rock",3],
  [835,"Yamper","Electric",null,2],[836,"Boltund","Electric",null,3],
  [837,"Rolycoly","Rock",null,2],[838,"Carkol","Rock","Fire",3],[839,"Coalossal","Rock","Fire",4],
  [840,"Applin","Grass","Dragon",2],[841,"Flapple","Grass","Dragon",4],[842,"Appletun","Grass","Dragon",4],
  [843,"Silicobra","Ground",null,2],[844,"Sandaconda","Ground",null,3],
  [845,"Cramorant","Flying","Water",3],[846,"Arrokuda","Water",null,2],[847,"Barraskewda","Water",null,3],
  [848,"Toxel","Electric","Poison",1],[849,"Toxtricity","Electric","Poison",4],
  [850,"Sizzlipede","Fire","Bug",2],[851,"Centiskorch","Fire","Bug",3],
  [852,"Clobbopus","Fighting",null,2],[853,"Grapploct","Fighting",null,3],
  [854,"Sinistea","Ghost",null,2],[855,"Polteageist","Ghost",null,3],
  [856,"Hatenna","Psychic",null,2],[857,"Hattrem","Psychic",null,3],[858,"Hatterene","Psychic","Fairy",5],
  [859,"Impidimp","Dark","Fairy",2],[860,"Morgrem","Dark","Fairy",3],[861,"Grimmsnarl","Dark","Fairy",4],
  [862,"Obstagoon","Dark","Normal",4],[863,"Perrserker","Steel",null,3],[864,"Cursola","Ghost",null,4],
  [865,"Sirfetch'd","Fighting",null,4],[866,"Mr. Rime","Ice","Psychic",4],
  [867,"Runerigus","Ground","Ghost",4],[868,"Milcery","Fairy",null,2],[869,"Alcremie","Fairy",null,4],
  [870,"Falinks","Fighting",null,3],[871,"Pincurchin","Electric",null,2],
  [872,"Snom","Ice","Bug",2],[873,"Frosmoth","Ice","Bug",3],[874,"Stonjourner","Rock",null,3],
  [875,"Eiscue","Ice",null,3],[876,"Indeedee","Psychic","Normal",3],[877,"Morpeko","Electric","Dark",3],
  [878,"Cufant","Steel",null,2],[879,"Copperajah","Steel",null,3],
  [880,"Dracozolt","Electric","Dragon",4],[881,"Arctozolt","Electric","Ice",4],
  [882,"Dracovish","Water","Dragon",4],[883,"Arctovish","Water","Ice",4],
  [884,"Duraludon","Steel","Dragon",4],[885,"Dreepy","Dragon","Ghost",2],[886,"Drakloak","Dragon","Ghost",3],
  [887,"Dragapult","Dragon","Ghost",5],[888,"Zacian","Fairy",null,6],[889,"Zamazenta","Fighting",null,6],
  [890,"Eternatus","Poison","Dragon",6],[891,"Kubfu","Fighting",null,2],[892,"Urshifu","Fighting","Dark",6],
  [893,"Zarude","Dark","Grass",6],[894,"Regieleki","Electric",null,6],[895,"Regidrago","Dragon",null,6],
  [896,"Glastrier","Ice",null,6],[897,"Spectrier","Ghost",null,6],[898,"Calyrex","Psychic","Grass",6],
  [899,"Wyrdeer","Normal","Psychic",4],[900,"Kleavor","Bug","Rock",4],[901,"Ursaluna","Ground","Normal",4],
  [902,"Basculegion","Water","Ghost",4],[903,"Sneasler","Fighting","Poison",4],[904,"Overqwil","Dark","Poison",4],
  [905,"Enamorus","Fairy","Flying",6],

  // === GENERATION 9 ===
  [906,"Sprigatito","Grass",null,2],[907,"Floragato","Grass",null,3],[908,"Meowscarada","Grass","Dark",5],
  [909,"Fuecoco","Fire",null,2],[910,"Crocalor","Fire",null,3],[911,"Skeledirge","Fire","Ghost",5],
  [912,"Quaxly","Water",null,2],[913,"Quaxwell","Water",null,3],[914,"Quaquaval","Water","Fighting",4],
  [915,"Lechonk","Normal",null,2],[916,"Oinkologne","Normal",null,3],
  [917,"Tarountula","Bug",null,2],[918,"Spidops","Bug",null,3],
  [919,"Nymble","Bug",null,2],[920,"Lokix","Bug","Dark",3],
  [921,"Pawmi","Electric",null,2],[922,"Pawmo","Electric","Fighting",3],[923,"Pawmot","Electric","Fighting",4],
  [924,"Tandemaus","Normal",null,2],[925,"Maushold","Normal",null,3],
  [926,"Fidough","Fairy",null,2],[927,"Dachsbun","Fairy",null,3],
  [928,"Smoliv","Grass","Normal",2],[929,"Dolliv","Grass","Normal",3],[930,"Arboliva","Grass","Normal",4],
  [931,"Squawkabilly","Normal","Flying",3],
  [932,"Nacli","Rock",null,2],[933,"Naclstack","Rock",null,3],[934,"Garganacl","Rock",null,4],
  [935,"Charcadet","Fire",null,2],[936,"Armarouge","Fire","Psychic",4],[937,"Ceruledge","Fire","Ghost",4],
  [938,"Tadbulb","Electric",null,2],[939,"Bellibolt","Electric",null,3],
  [940,"Wattrel","Electric","Flying",2],[941,"Kilowattrel","Electric","Flying",3],
  [942,"Maschiff","Dark",null,2],[943,"Mabosstiff","Dark",null,3],
  [944,"Shroodle","Poison","Normal",2],[945,"Grafaiai","Poison","Normal",3],
  [946,"Bramblin","Grass","Ghost",2],[947,"Brambleghast","Grass","Ghost",3],
  [948,"Toedscool","Ground","Grass",2],[949,"Toedscruel","Ground","Grass",3],
  [950,"Klawf","Rock",null,3],[951,"Capsakid","Grass",null,2],[952,"Scovillain","Grass","Fire",3],
  [953,"Rellor","Bug",null,2],[954,"Rabsca","Bug","Psychic",3],
  [955,"Flittle","Psychic",null,2],[956,"Espathra","Psychic",null,3],
  [957,"Tinkatink","Fairy","Steel",2],[958,"Tinkatuff","Fairy","Steel",3],[959,"Tinkaton","Fairy","Steel",4],
  [960,"Wiglett","Water",null,2],[961,"Wugtrio","Water",null,3],
  [962,"Bombirdier","Flying","Dark",3],[963,"Finizen","Water",null,2],[964,"Palafin","Water",null,5],
  [965,"Varoom","Steel","Poison",2],[966,"Revavroom","Steel","Poison",3],[967,"Cyclizar","Dragon","Normal",3],
  [968,"Orthworm","Steel",null,3],[969,"Glimmet","Rock","Poison",2],[970,"Glimmora","Rock","Poison",4],
  [971,"Greavard","Ghost",null,2],[972,"Houndstone","Ghost",null,3],
  [973,"Flamigo","Flying","Fighting",3],[974,"Cetoddle","Ice",null,2],[975,"Cetitan","Ice",null,3],
  [976,"Veluza","Water","Psychic",3],[977,"Dondozo","Water",null,4],[978,"Tatsugiri","Dragon","Water",3],
  [979,"Annihilape","Fighting","Ghost",4],[980,"Clodsire","Poison","Ground",3],
  [981,"Farigiraf","Normal","Psychic",4],[982,"Dudunsparce","Normal",null,3],[983,"Kingambit","Dark","Steel",5],
  [984,"Great Tusk","Ground","Fighting",6],[985,"Scream Tail","Fairy","Psychic",6],
  [986,"Brute Bonnet","Grass","Dark",6],[987,"Flutter Mane","Ghost","Fairy",6],
  [988,"Slither Wing","Bug","Fighting",6],[989,"Sandy Shocks","Electric","Ground",6],
  [990,"Iron Treads","Ground","Steel",6],[991,"Iron Bundle","Ice","Water",6],
  [992,"Iron Hands","Fighting","Electric",6],[993,"Iron Jugulis","Dark","Flying",6],
  [994,"Iron Moth","Fire","Poison",6],[995,"Iron Thorns","Rock","Electric",6],
  [996,"Frigibax","Dragon","Ice",2],[997,"Arctibax","Dragon","Ice",3],[998,"Baxcalibur","Dragon","Ice",5],
  [999,"Gimmighoul","Ghost",null,2],[1000,"Gholdengo","Steel","Ghost",5],
  [1001,"Wo-Chien","Dark","Grass",6],[1002,"Chien-Pao","Dark","Ice",6],
  [1003,"Ting-Lu","Dark","Ground",6],[1004,"Chi-Yu","Dark","Fire",6],
  [1005,"Roaring Moon","Dragon","Dark",6],[1006,"Iron Valiant","Fairy","Fighting",6],
  [1007,"Koraidon","Fighting","Dragon",6],[1008,"Miraidon","Electric","Dragon",6],
  [1009,"Walking Wake","Water","Dragon",6],[1010,"Iron Leaves","Grass","Psychic",6],
  [1011,"Dipplin","Grass","Dragon",3],[1012,"Poltchageist","Grass","Ghost",2],[1013,"Sinistcha","Grass","Ghost",3],
  [1014,"Okidogi","Poison","Fighting",5],[1015,"Munkidori","Poison","Psychic",5],[1016,"Fezandipiti","Poison","Fairy",5],
  [1017,"Ogerpon","Grass",null,6],[1018,"Archaludon","Steel","Dragon",4],[1019,"Hydrapple","Grass","Dragon",4],
  [1020,"Gouging Fire","Fire","Dragon",6],[1021,"Raging Bolt","Electric","Dragon",6],
  [1022,"Iron Boulder","Rock","Psychic",6],[1023,"Iron Crown","Steel","Psychic",6],
  [1024,"Terapagos","Normal",null,6],[1025,"Pecharunt","Poison","Ghost",6]
];

// ============================================================
// TYPE EFFECTIVENESS CHART
// ============================================================
const TYPE_CHART = {
  Normal:   { Rock:0.5, Steel:0.5, Ghost:0 },
  Fire:     { Fire:0.5, Water:0.5, Rock:0.5, Dragon:0.5, Grass:2, Ice:2, Bug:2, Steel:2 },
  Water:    { Water:0.5, Grass:0.5, Dragon:0.5, Fire:2, Ground:2, Rock:2 },
  Electric: { Electric:0.5, Grass:0.5, Dragon:0.5, Ground:0, Water:2, Flying:2 },
  Grass:    { Fire:0.5, Grass:0.5, Poison:0.5, Flying:0.5, Bug:0.5, Dragon:0.5, Steel:0.5, Water:2, Ground:2, Rock:2 },
  Ice:      { Water:0.5, Ice:0.5, Steel:0.5, Fire:0.5, Grass:2, Ground:2, Flying:2, Dragon:2 },
  Fighting: { Poison:0.5, Bug:0.5, Psychic:0.5, Flying:0.5, Fairy:0.5, Ghost:0, Normal:2, Ice:2, Rock:2, Dark:2, Steel:2 },
  Poison:   { Poison:0.5, Ground:0.5, Rock:0.5, Ghost:0.5, Steel:0, Grass:2, Fairy:2 },
  Ground:   { Grass:0.5, Bug:0.5, Flying:0, Electric:2, Fire:2, Poison:2, Rock:2, Steel:2 },
  Flying:   { Electric:0.5, Rock:0.5, Steel:0.5, Ground:0, Grass:2, Fighting:2, Bug:2 },
  Psychic:  { Psychic:0.5, Steel:0.5, Dark:0, Fighting:2, Poison:2 },
  Bug:      { Fire:0.5, Fighting:0.5, Flying:0.5, Ghost:0.5, Steel:0.5, Fairy:0.5, Grass:2, Psychic:2, Dark:2 },
  Rock:     { Fighting:0.5, Ground:0.5, Steel:0.5, Fire:2, Ice:2, Flying:2, Bug:2 },
  Ghost:    { Normal:0, Dark:0.5, Ghost:2, Psychic:2 },
  Dragon:   { Steel:0.5, Fairy:0, Dragon:2 },
  Dark:     { Fighting:0.5, Dark:0.5, Fairy:0.5, Ghost:2, Psychic:2 },
  Steel:    { Fire:0.5, Water:0.5, Electric:0.5, Steel:0.5, Ice:2, Rock:2, Fairy:2 },
  Fairy:    { Fire:0.5, Poison:0.5, Steel:0.5, Fighting:2, Dragon:2, Dark:2 }
};

function getTypeEffectiveness(attackType, defType1, defType2) {
  const chart = TYPE_CHART[attackType] || {};
  let mult = 1;
  mult *= (chart[defType1] !== undefined ? chart[defType1] : 1);
  if (defType2) mult *= (chart[defType2] !== undefined ? chart[defType2] : 1);
  return mult;
}

// ============================================================
// MOVE POOLS BY TYPE
// ============================================================
const MOVE_POOLS = {
  Normal: [
    { name:"Tackle", power:40, accuracy:100, effect:null },
    { name:"Body Slam", power:85, accuracy:100, effect:"paralysis_10" },
    { name:"Hyper Beam", power:150, accuracy:90, effect:null },
    { name:"Quick Attack", power:40, accuracy:100, effect:"priority" },
    { name:"Slash", power:70, accuracy:100, effect:"crit_boost" },
    { name:"Return", power:90, accuracy:100, effect:null }
  ],
  Fire: [
    { name:"Ember", power:40, accuracy:100, effect:"burn_10" },
    { name:"Flamethrower", power:90, accuracy:100, effect:"burn_10" },
    { name:"Fire Blast", power:110, accuracy:85, effect:"burn_10" },
    { name:"Heat Wave", power:95, accuracy:90, effect:"burn_10" },
    { name:"Flame Wheel", power:60, accuracy:100, effect:"burn_10" },
    { name:"Inferno", power:100, accuracy:50, effect:"burn_100" }
  ],
  Water: [
    { name:"Water Gun", power:40, accuracy:100, effect:null },
    { name:"Bubble Beam", power:65, accuracy:100, effect:"speed_down" },
    { name:"Surf", power:90, accuracy:100, effect:null },
    { name:"Hydro Pump", power:110, accuracy:80, effect:null },
    { name:"Aqua Tail", power:90, accuracy:90, effect:null },
    { name:"Scald", power:80, accuracy:100, effect:"burn_30" }
  ],
  Grass: [
    { name:"Vine Whip", power:45, accuracy:100, effect:null },
    { name:"Razor Leaf", power:55, accuracy:95, effect:"crit_boost" },
    { name:"Solar Beam", power:120, accuracy:100, effect:null },
    { name:"Energy Ball", power:90, accuracy:100, effect:"spdef_down" },
    { name:"Leaf Blade", power:90, accuracy:100, effect:"crit_boost" },
    { name:"Power Whip", power:120, accuracy:85, effect:null }
  ],
  Electric: [
    { name:"Thunder Shock", power:40, accuracy:100, effect:"paralysis_10" },
    { name:"Thunderbolt", power:90, accuracy:100, effect:"paralysis_10" },
    { name:"Thunder", power:110, accuracy:70, effect:"paralysis_30" },
    { name:"Spark", power:65, accuracy:100, effect:"paralysis_30" },
    { name:"Wild Charge", power:90, accuracy:100, effect:"recoil" },
    { name:"Discharge", power:80, accuracy:100, effect:"paralysis_30" }
  ],
  Ice: [
    { name:"Ice Punch", power:75, accuracy:100, effect:"freeze_10" },
    { name:"Ice Beam", power:90, accuracy:100, effect:"freeze_10" },
    { name:"Blizzard", power:110, accuracy:70, effect:"freeze_10" },
    { name:"Frost Breath", power:60, accuracy:90, effect:"crit_boost" },
    { name:"Avalanche", power:60, accuracy:100, effect:"revenge_boost" },
    { name:"Aurora Beam", power:65, accuracy:100, effect:"atk_down" }
  ],
  Fighting: [
    { name:"Low Kick", power:50, accuracy:90, effect:null },
    { name:"Karate Chop", power:50, accuracy:100, effect:"crit_boost" },
    { name:"Close Combat", power:120, accuracy:100, effect:"def_down_self" },
    { name:"High Jump Kick", power:130, accuracy:90, effect:null },
    { name:"Focus Blast", power:120, accuracy:70, effect:"spdef_down" },
    { name:"Superpower", power:120, accuracy:100, effect:"stat_down_self" }
  ],
  Poison: [
    { name:"Poison Sting", power:15, accuracy:100, effect:"poison_30" },
    { name:"Sludge Bomb", power:90, accuracy:100, effect:"poison_30" },
    { name:"Sludge Wave", power:95, accuracy:100, effect:"poison_10" },
    { name:"Gunk Shot", power:120, accuracy:80, effect:"poison_30" },
    { name:"Poison Jab", power:80, accuracy:100, effect:"poison_30" },
    { name:"Cross Poison", power:70, accuracy:100, effect:"poison_10" }
  ],
  Ground: [
    { name:"Sand Attack", power:0, accuracy:100, effect:"acc_down" },
    { name:"Dig", power:80, accuracy:100, effect:null },
    { name:"Earthquake", power:100, accuracy:100, effect:null },
    { name:"Earth Power", power:90, accuracy:100, effect:"spdef_down" },
    { name:"Bulldoze", power:60, accuracy:100, effect:"speed_down" },
    { name:"Mud Shot", power:55, accuracy:95, effect:"speed_down" }
  ],
  Flying: [
    { name:"Gust", power:40, accuracy:100, effect:null },
    { name:"Wing Attack", power:60, accuracy:100, effect:null },
    { name:"Aerial Ace", power:60, accuracy:null, effect:null },
    { name:"Air Slash", power:75, accuracy:95, effect:"flinch_30" },
    { name:"Hurricane", power:110, accuracy:70, effect:"flinch_30" },
    { name:"Brave Bird", power:120, accuracy:100, effect:"recoil" }
  ],
  Psychic: [
    { name:"Confusion", power:50, accuracy:100, effect:"flinch_10" },
    { name:"Psybeam", power:65, accuracy:100, effect:"flinch_10" },
    { name:"Psychic", power:90, accuracy:100, effect:"spdef_down" },
    { name:"Psystrike", power:100, accuracy:100, effect:null },
    { name:"Future Sight", power:120, accuracy:100, effect:null },
    { name:"Zen Headbutt", power:80, accuracy:90, effect:"flinch_20" }
  ],
  Bug: [
    { name:"Bug Bite", power:60, accuracy:100, effect:null },
    { name:"Signal Beam", power:75, accuracy:100, effect:"flinch_10" },
    { name:"Bug Buzz", power:90, accuracy:100, effect:"spdef_down" },
    { name:"X-Scissor", power:80, accuracy:100, effect:null },
    { name:"Megahorn", power:120, accuracy:85, effect:null },
    { name:"Pin Missile", power:25, accuracy:95, effect:"multi_hit" }
  ],
  Rock: [
    { name:"Rock Throw", power:50, accuracy:90, effect:null },
    { name:"Rock Slide", power:75, accuracy:90, effect:"flinch_30" },
    { name:"Stone Edge", power:100, accuracy:80, effect:"crit_boost" },
    { name:"Power Gem", power:80, accuracy:100, effect:null },
    { name:"Rock Blast", power:25, accuracy:90, effect:"multi_hit" },
    { name:"Head Smash", power:150, accuracy:80, effect:"recoil" }
  ],
  Ghost: [
    { name:"Shadow Ball", power:80, accuracy:100, effect:"spdef_down" },
    { name:"Shadow Claw", power:70, accuracy:100, effect:"crit_boost" },
    { name:"Shadow Sneak", power:40, accuracy:100, effect:"priority" },
    { name:"Hex", power:65, accuracy:100, effect:null },
    { name:"Phantom Force", power:90, accuracy:100, effect:null },
    { name:"Night Shade", power:60, accuracy:100, effect:null }
  ],
  Dragon: [
    { name:"Dragon Rage", power:40, accuracy:100, effect:null },
    { name:"Dragon Claw", power:80, accuracy:100, effect:null },
    { name:"Draco Meteor", power:130, accuracy:90, effect:"spatk_down_self" },
    { name:"Dragon Pulse", power:85, accuracy:100, effect:null },
    { name:"Outrage", power:120, accuracy:100, effect:null },
    { name:"Dragon Breath", power:60, accuracy:100, effect:"paralysis_30" }
  ],
  Dark: [
    { name:"Bite", power:60, accuracy:100, effect:"flinch_30" },
    { name:"Crunch", power:80, accuracy:100, effect:"def_down" },
    { name:"Dark Pulse", power:80, accuracy:100, effect:"flinch_20" },
    { name:"Night Slash", power:70, accuracy:100, effect:"crit_boost" },
    { name:"Foul Play", power:95, accuracy:100, effect:null },
    { name:"Throat Chop", power:80, accuracy:100, effect:null }
  ],
  Steel: [
    { name:"Metal Claw", power:50, accuracy:95, effect:"atk_up" },
    { name:"Iron Tail", power:100, accuracy:75, effect:"def_down" },
    { name:"Flash Cannon", power:80, accuracy:100, effect:"spdef_down" },
    { name:"Meteor Mash", power:90, accuracy:90, effect:"atk_up" },
    { name:"Heavy Slam", power:80, accuracy:100, effect:null },
    { name:"Gyro Ball", power:70, accuracy:100, effect:null }
  ],
  Fairy: [
    { name:"Fairy Wind", power:40, accuracy:100, effect:null },
    { name:"Dazzling Gleam", power:80, accuracy:100, effect:null },
    { name:"Moonblast", power:95, accuracy:100, effect:"spatk_down" },
    { name:"Play Rough", power:90, accuracy:90, effect:"atk_down" },
    { name:"Disarming Voice", power:40, accuracy:null, effect:null },
    { name:"Draining Kiss", power:50, accuracy:100, effect:"drain" }
  ]
};

// ============================================================
// STAT GENERATION FROM TIER
// ============================================================
function generateStats(tier, id) {
  // Base stat ranges per tier
  const ranges = {
    1: { hp:[30,50],  atk:[20,40],  def:[20,40],  spd:[20,40]  },
    2: { hp:[45,75],  atk:[35,60],  def:[35,60],  spd:[35,60]  },
    3: { hp:[60,95],  atk:[55,85],  def:[55,85],  spd:[50,80]  },
    4: { hp:[75,120], atk:[70,110], def:[70,110], spd:[60,100] },
    5: { hp:[90,150], atk:[100,140],def:[90,130], spd:[75,115] },
    6: { hp:[110,180],atk:[110,165],def:[100,155],spd:[90,130] }
  };
  const r = ranges[tier] || ranges[3];
  // Pseudo-random but deterministic from ID
  const seed = (id * 7919 + 13) % 100;
  const seed2 = (id * 3571 + 7) % 100;
  const seed3 = (id * 5381 + 11) % 100;
  const seed4 = (id * 2053 + 17) % 100;
  return {
    maxHp:    r.hp[0]  + Math.floor(seed  * (r.hp[1]  - r.hp[0])  / 100),
    attack:   r.atk[0] + Math.floor(seed2 * (r.atk[1] - r.atk[0]) / 100),
    defense:  r.def[0] + Math.floor(seed3 * (r.def[1] - r.def[0]) / 100),
    speed:    r.spd[0] + Math.floor(seed4 * (r.spd[1] - r.spd[0]) / 100)
  };
}

// ============================================================
// MOVE ASSIGNMENT
// ============================================================
function getMovesForPokemon(type1, type2) {
  const pool1 = MOVE_POOLS[type1] || MOVE_POOLS.Normal;
  const pool2 = type2 ? MOVE_POOLS[type2] : null;
  const normalPool = MOVE_POOLS.Normal;

  // Shuffle pool1 and pick 2
  const shuffled1 = [...pool1].sort(() => Math.random() - 0.5);
  const move1 = shuffled1[0];
  const move2 = shuffled1[1];

  let move3, move4;
  if (pool2) {
    const shuffled2 = [...pool2].sort(() => Math.random() - 0.5);
    move3 = shuffled2[0];
    move4 = shuffled2[1] || normalPool[Math.floor(Math.random() * normalPool.length)];
  } else {
    const shuffledN = [...normalPool].sort(() => Math.random() - 0.5);
    move3 = shuffledN[0];
    move4 = shuffled1[2] || shuffledN[1];
  }

  return [move1, move2, move3, move4];
}

// ============================================================
// BUILD FULL POKEMON LIST
// ============================================================
const POKEMON_LIST = RAW_POKEMON.map(([id, name, type1, type2, tier]) => {
  const stats = generateStats(tier, id);
  return {
    id,
    name,
    type1,
    type2,
    tier,
    ...stats,
    sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    moves: getMovesForPokemon(type1, type2)
  };
});

// Helper to get Pokemon by ID
function getPokemonById(id) {
  return POKEMON_LIST.find(p => p.id === id);
}

// Type colors for UI
const TYPE_COLORS = {
  Normal:"#A8A77A", Fire:"#EE8130", Water:"#6390F0", Electric:"#F7D02C",
  Grass:"#7AC74C", Ice:"#96D9D6", Fighting:"#C22E28", Poison:"#A33EA1",
  Ground:"#E2BF65", Flying:"#A98FF3", Psychic:"#F95587", Bug:"#A6B91A",
  Rock:"#B6A136", Ghost:"#735797", Dragon:"#6F35FC", Dark:"#705746",
  Steel:"#B7B7CE", Fairy:"#D685AD"
};
