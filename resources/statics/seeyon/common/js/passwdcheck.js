var kNoCanonicalCounterpart = 0;
var kCapitalLetter = 0;
var kSmallLetter = 1;
var kDigit = 2;
var kPunctuation = 3;
var kAlpha =  4;
var kCanonicalizeLettersOnly = true;
var kCananicalizeEverything = false;
var gDebugOutput = null;
var kDebugTraceLevelNone = 0;
var kDebugTraceLevelSuperDetail = 120;
var kDebugTraceLevelRealDetail = 100;
var kDebugTraceLevelAll = 80;
var kDebugTraceLevelMost = 60;
var kDebugTraceLevelFew = 40;
var kDebugTraceLevelRare = 20;
var gDebugTraceLevel = kDebugTraceLevelNone;

function DebugPrint(){
	var string = "";
	if (gDebugTraceLevel && gDebugOutput && DebugPrint.arguments && (DebugPrint.arguments.length > 1) && (DebugPrint.arguments[0] <= gDebugTraceLevel)){
		for(var index = 1; index < DebugPrint.arguments.length; index++){
			string += DebugPrint.arguments[index] + " ";
		}

	string += "<br>\n";
	gDebugOutput(string);
	}
}

function CSimilarityMap(){
	this.m_elements = "";
	this.m_canonicalCounterparts = "";
}

function SimilarityMap_Add(element, canonicalCounterpart){
	this.m_elements += element;
	this.m_canonicalCounterparts += canonicalCounterpart;
}

function SimilarityMap_Lookup(element){
	var canonicalCounterpart = kNoCanonicalCounterpart;
	var index = this.m_elements.indexOf(element);
	if (index >= 0){
		canonicalCounterpart = this.m_canonicalCounterparts.charAt(index);
	}
	else{
	}
	return canonicalCounterpart;
}

function SimilarityMap_GetCount(){
	return this.m_elements.length;
}

CSimilarityMap.prototype.Add = SimilarityMap_Add;
CSimilarityMap.prototype.Lookup = SimilarityMap_Lookup;
CSimilarityMap.prototype.GetCount = SimilarityMap_GetCount;

function CDictionaryEntry(length, wordList){
	this.m_length = length;
	this.m_wordList = wordList;
}

function DictionaryEntry_Lookup(strWord){
	var fFound = false;
	if (strWord.length == this.m_length){
		var nFirst = 0;
		var nLast = this.m_wordList.length - 1;
		while( nFirst <= nLast ){
			var nCurrent = Math.floor((nFirst + nLast)/2);
			if( strWord == this.m_wordList[nCurrent]){
				fFound = true;
				break;
			}
			else if ( strWord > this.m_wordList[nCurrent]){
				nLast = nCurrent - 1;
			}
			else{
				nFirst = nCurrent + 1;
			}
		}
	}

	return fFound;
}

CDictionaryEntry.prototype.Lookup = DictionaryEntry_Lookup;

function CDictionary(){
	this.m_entries = new Array()
	}

function Dictionary_Lookup(strWord){
	for (var index = 0; index < this.m_entries.length; index++){
		if (this.m_entries[index].Lookup(strWord)){
			return true;
		}
	}
}

function Dictionary_Add(length, wordList){
	var iL=this.m_entries.length;
	var cD=new CDictionaryEntry(length, wordList)
	this.m_entries[iL]=cD;
}

CDictionary.prototype.Lookup = Dictionary_Lookup;
CDictionary.prototype.Add = Dictionary_Add;
var gSimilarityMap = new CSimilarityMap();
var gDictionary = new CDictionary();

function CharacterSetChecks(type, fResult){
	this.type = type;
	this.fResult = fResult;
}

function isctype(character, type, nDebugLevel){
	var fResult = false;
	switch(type){
		case kCapitalLetter:
		if((character >= 'A') && (character <= 'Z')){
			fResult = true;
		}
		break;
		case kSmallLetter:
		if ((character >= 'a') && (character <= 'z')){
			fResult = true;
		}
		break;
		case kDigit:
		if ((character >= '0') && (character <= '9')){
			fResult = true;
		}
		break;
		case kPunctuation:
		if ("!@#$%^&*()_+-='\";:[{]}\|.>,</?`~".indexOf(character) >= 0){
			fResult = true;
		}
		break;
		case kAlpha:
		if (isctype(character, kCapitalLetter) || isctype(character, kSmallLetter)){
			fResult = true;
		}
		break;
		default:
		break;
	}
	return fResult;
}

function CanonicalizeWord(strWord, similarityMap, fLettersOnly){
	var canonicalCounterpart = kNoCanonicalCounterpart;
	var strCanonicalizedWord = "";
	var nStringLength = 0;
	if ((strWord != null) && (strWord.length > 0)){
		strCanonicalizedWord = strWord;
		strCanonicalizedWord = strCanonicalizedWord.toLowerCase();
		if (similarityMap.GetCount() > 0){
			nStringLength = strCanonicalizedWord.length;
			for(var index = 0; index < nStringLength; index++){
				if (fLettersOnly && !isctype(strCanonicalizedWord.charAt(index), kSmallLetter, kDebugTraceLevelSuperDetail)){
					continue;
				}
				canonicalCounterpart = similarityMap.Lookup(strCanonicalizedWord.charAt(index));
				if (canonicalCounterpart != kNoCanonicalCounterpart){
					strCanonicalizedWord = strCanonicalizedWord.substring(0, index) + canonicalCounterpart +
					strCanonicalizedWord.substring(index + 1, nStringLength);
				}
			}
		}
	}
	return strCanonicalizedWord;
}

function IsLongEnough(strWord, nAtLeastThisLong){
	if ((strWord == null) || isNaN(nAtLeastThisLong)){
		return false;
	}
	else if (strWord.length < nAtLeastThisLong){
		return false;
	}
	return true;
}

function SpansEnoughCharacterSets(strWord, nAtLeastThisMany){
	var nCharSets = 0;
	var characterSetChecks = new Array(
	new CharacterSetChecks(kCapitalLetter, false),
	new CharacterSetChecks(kSmallLetter, false),
	new CharacterSetChecks(kDigit, false),
	new CharacterSetChecks(kPunctuation, false)
	);
	if ((strWord == null) || isNaN(nAtLeastThisMany)){
		return false;
	}
	for(var index = 0; index < strWord.length; index++){
		for(var nCharSet = 0; nCharSet < characterSetChecks.length;nCharSet++){
			if (!characterSetChecks[nCharSet].fResult && isctype(strWord.charAt(index), characterSetChecks[nCharSet].type, kDebugTraceLevelAll)){
				characterSetChecks[nCharSet].fResult = true;
				break;
			}
		}
	}
	for(var nCharSet = 0; nCharSet < characterSetChecks.length;nCharSet++){
		if (characterSetChecks[nCharSet].fResult){
			nCharSets++;
		}	
	}
	if (nCharSets < nAtLeastThisMany){
		return false;
	}
	return true;
}

function FoundInDictionary(strWord, similarityMap, dictionary){
	var strCanonicalizedWord = "";
	if((strWord == null) || (similarityMap == null) || (dictionary == null)){
		return true;
	}
	strCanonicalizedWord = CanonicalizeWord(strWord, similarityMap, kCanonicalizeLettersOnly);
	if (dictionary.Lookup(strCanonicalizedWord)){
		return true;
	}
	return false;
}

function IsCloseVariationOfAWordInDictionary(strWord, threshold, similarityMap, dictionary){
	var strCanonicalizedWord = "";
	var nMinimumMeaningfulMatchLength = 0;
	if((strWord == null) || isNaN(threshold) || (similarityMap == null) || (dictionary == null)){
		return true;
	}
	strCanonicalizedWord = CanonicalizeWord(strWord, similarityMap, kCananicalizeEverything);
	nMinimumMeaningfulMatchLength = Math.floor((threshold) * strCanonicalizedWord.length);
	for (var nSubStringLength = strCanonicalizedWord.length; nSubStringLength >= nMinimumMeaningfulMatchLength; nSubStringLength--){
		for(var nSubStringStart = 0; (nSubStringStart + nMinimumMeaningfulMatchLength) < strCanonicalizedWord.length; nSubStringStart++){
			var strSubWord = strCanonicalizedWord.substr(nSubStringStart, nSubStringLength);
			if (dictionary.Lookup(strSubWord)){
				return true;
			}
		}
	}
	return false;
}

function Init(){
gSimilarityMap.Add('3', 'e');
gSimilarityMap.Add('x', 'k');
gSimilarityMap.Add('5', 's');
gSimilarityMap.Add('$', 's');
gSimilarityMap.Add('6', 'g');
gSimilarityMap.Add('7', 't');
gSimilarityMap.Add('8', 'b');
gSimilarityMap.Add('|', 'l');
gSimilarityMap.Add('9', 'g');
gSimilarityMap.Add('+', 't');
gSimilarityMap.Add('@', 'a');
gSimilarityMap.Add('0', 'o');
gSimilarityMap.Add('1', 'l');
gSimilarityMap.Add('2', 'z');
gSimilarityMap.Add('!', 'i');
gDictionary.Add(3, 
"oat|not|ken|keg|ham|hal|gas|cpu|cit|bop|bah".split("|"));
gDictionary.Add(4, 
"zeus|ymca|yang|yaco|work|word|wool|will|viva|vito|vita|visa|vent|vain|uucp|util|utah|unix|trek|town|torn|tina|time|tier|tied|tidy|tide|thud|test|tess|tech|tara|tape|tapa|taos|tami|tall|tale|spit|sole|sold|soil|soft|sofa|soap|slav|slat|slap|slam|shit|sean|saud|sash|sara|sand|sail|said|sago|sage|saga|safe|ruth|russ|rusk|rush|ruse|runt|rung|rune|rove|rose|root|rick|rich|rice|reap|ream|rata|rare|ramp|prod|pork|pete|penn|penh|pend|pass|pang|pane|pale|orca|open|olin|olga|oldy|olav|olaf|okra|okay|ohio|oath|numb|null|nude|note|nosy|nose|nita|next|news|ness|nasa|mike|mets|mess|math|mash|mary|mars|mark|mara|mail|maid|mack|lyre|lyra|lyon|lynx|lynn|lucy|love|lose|lori|lois|lock|lisp|lisa|leah|lass|lash|lara|lank|lane|lana|kink|keri|kemp|kelp|keep|keen|kate|karl|june|judy|judo|judd|jody|jill|jean|jane|isis|iowa|inna|holm|help|hast|half|hale|hack|gust|gush|guru|gosh|gory|golf|glee|gina|germ|gatt|gash|gary|game|fred|fowl|ford|flea|flax|flaw|finn|fink|film|fill|file|erin|emit|elmo|easy|done|disk|disc|diet|dial|dawn|dave|data|derek|damn|dame|crab|cozy|coke|city|cite|chem|chat|cats|burl|bred|bill|bilk|bile|bike|beth|beta|benz|beau|bath|bass|bart|bank|bake|bait|bail|aria|anne|anna|andy|alex|abcd".split("|"));
gDictionary.Add(5, 
"yacht|xerox|wilma|willy|wendy|wendi|water|warez|vitro|vital|vitae|vista|visor|vicky|venus|venom|value|ultra|u.s.a|tubas|tress|tramp|trait|tracy|traci|toxic|tiger|tidal|thumb|texas|test2|test1|terse|terry|tardy|tappa|tapis|tapir|taper|tanya|tansy|tammy|tamie|taint|sybil|suzie|susie|susan|super|steph|stacy|staci|spark|sonya|sonia|solar|soggy|sofia|smile|slave|slate|slash|slant|slang|simon|shiva|shell|shark|sharc|shack|scrim|screw|scott|scorn|score|scoot|scoop|scold|scoff|saxon|saucy|satan|sasha|sarah|sandy|sable|rural|rupee|runty|runny|runic|runge|rules|ruben|royal|route|rouse|roses|rolex|robyn|robot|robin|ridge|rhode|revel|renee|ranch|rally|radio|quark|quake|quail|power|polly|polis|polio|pluto|plane|pizza|photo|phone|peter|perry|penna|penis|paula|patty|parse|paris|parch|paper|panic|panel|olive|olden|okapi|oasis|oaken|nurse|notre|notch|nancy|nagel|mouse|moose|mogul|modem|merry|megan|mckee|mckay|mcgee|mccoy|marty|marni|mario|maria|marcy|marci|maint|maine|magog|magic|lyric|lyons|lynne|lynch|louis|lorry|loris|lorin|loren|linda|light|lewis|leroy|laura|later|lasso|laser|larry|ladle|kinky|keyes|kerry|kerri|kelly|keith|kazoo|kayla|kathy|karie|karen|julie|julia|joyce|jenny|jenni|japan|janie|janet|james|irene|inane|impel|idaho|horus|horse|honey|honda|holly|hello|heidi|hasty|haste|hamal|halve|haley|hague|hager|hagen|hades|guest|guess|gucci|group|grahm|gouge|gorse|gorky|glean|gleam|glaze|ghoul|ghost|gauss|gauge|gaudy|gator|gases|games|freer|fovea|float|fiona|finny|filly|field|erika|erica|enter|enemy|empty|emily|email|elmer|ellis|ellen|eight|eerie|edwin|edges|eatme|earth|eager|dulce|donor|donna|diane|diana|delay|defoe|david|danny|daisy|cuzco|cubit|cozen|coypu|coyly|cowry|condo|class|cindy|cigar|chess|cathy|carry|carol|carla|caret|caren|candy|candi|burma|burly|burke|brian|breed|borax|booze|booty|bloom|blood|bitch|bilge|bilbo|betty|beryl|becky|beach|bathe|batch|basic|bantu|banks|banjo|baird|baggy|azure|arrow|array|april|anita|angie|amber|amaze|alpha|alisa|alike|align|alice|alias|album|alamo|aires|admin|adept|adele|addle|addis|added|acura|abyss|abcde|1701d|123go|!@#$%".split("|"));
gDictionary.Add(6, 
"yankee|yamaha|yakima|y7u8i9|xyzxyz|wombat|wizard|wilson|willie|weenie|warren|visual|virgin|viking|venous|venice|venial|vasant|vagina|ursula|urchin|uranus|uphill|umpire|u.s.a.|tuttle|trisha|trails|tracie|toyota|tomato|toggle|tidbit|thorny|thomas|terror|tennis|taylor|target|tardis|tappet|taoist|tannin|tanner|tanker|tamara|system|surfer|summer|subway|stacie|stacey|spring|sondra|solemn|soleil|solder|solace|soiree|soften|soffit|sodium|sodden|snoopy|snatch|smooch|smiles|slavic|slater|single|singer|simple|sherri|sharon|sharks|sesame|sensor|secret|second|season|search|scroll|scribe|scotty|scooby|schulz|school|scheme|saturn|sandra|sandal|saliva|saigon|sahara|safety|safari|sadism|saddle|sacral|russel|runyon|runway|runoff|runner|ronald|romano|rodent|ripple|riddle|ridden|reveal|return|remote|recess|recent|realty|really|reagan|raster|rascal|random|radish|radial|racoon|racket|racial|rachel|rabbit|qwerty|qawsed|puppet|puneet|public|prince|presto|praise|poster|polite|polish|policy|police|plover|pierre|phrase|photon|philip|persia|peoria|penmen|penman|pencil|peanut|parrot|parent|pardon|papers|pander|pamela|pallet|palace|oxford|outlaw|osiris|orwell|oregon|oracle|olivia|oliver|olefin|office|notion|notify|notice|notate|notary|noreen|nobody|nicole|newton|nevada|mutant|mozart|morley|monica|moguls|minsky|mickey|merlin|memory|mellon|meagan|mcneil|mcleod|mclean|mckeon|mchugh|mcgraw|mcgill|mccann|mccall|mccabe|mayfly|maxine|master|massif|maseru|marvin|markus|malcom|mailer|maiden|magpie|magnum|magnet|maggot|lorenz|lisbon|limpid|leslie|leland|latest|latera|latent|lascar|larkin|langur|landis|landau|lambda|kristy|kristi|krista|knight|kitten|kinney|kerrie|kernel|kermit|kennan|kelvin|kelsey|kelley|keller|keenan|katina|karina|kansas|juggle|judith|jsbach|joshua|joseph|johnny|joanne|joanna|jixian|jimmie|jimbob|jester|jeanne|jasmin|janice|jaguar|jackie|island|invest|instar|ingrid|ingres|impute|holmes|holman|hockey|hidden|hawaii|hasten|harvey|harold|hamlin|hamlet|halite|halide|haggle|haggis|hadron|hadley|hacker|gustav|gusset|gurkha|gurgle|guntis|guitar|gamlyn|gospel|gorton|gorham|gorges|golfer|glassy|ginger|gibson|ghetto|german|george|gauche|gasify|gambol|gamble|gambit|friend|freest|fourth|format|flower|flaxen|flaunt|flakes|finley|finite|fillip|fillet|filler|filled|fermat|fender|fatten|fatima|fathom|father|evelyn|euclid|estate|enzyme|engine|employ|emboss|elanor|elaine|eileen|eighty|eighth|effect|efface|eeyore|eerily|edwina|easier|durkin|durkee|during|durham|duress|duncan|donner|donkey|donate|donald|domino|disney|dieter|device|denise|deluge|delete|debbie|deaden|ddurer|dapper|daniel|dancer|damask|dakota|daemon|cuvier|cuddly|cuddle|cuckoo|cretin|create|cozier|coyote|cowpox|cooper|cookie|connie|coneck|condom|coffee|citrus|citron|citric|circus|charon|change|censor|cement|celtic|cecily|cayuga|catnip|catkin|cation|castle|carson|carrot|carrie|carole|carmen|caress|cantor|burley|burlap|buried|burial|brenda|bremen|breezy|breeze|breech|brandy|brandi|border|borden|borate|bloody|bishop|bilbao|bikini|bigred|betsie|berman|berlin|bedbug|became|beavis|beaver|beauty|beater|batman|bathos|barony|barber|baobab|bantus|banter|bantam|banish|bangui|bangor|bangle|bandit|banana|bakery|bailey|bahama|bagley|badass|aztecs|azsxdc|athena|asylum|arthur|arrest|arrear|arrack|arlene|anvils|answer|angela|andrea|anchor|analog|amazon|amanda|alison|alight|alicia|albino|albert|albeit|albany|alaska|adrian|adelia|adduce|addict|addend|accrue|access|abcdef|abcabc|abc123|a1b2c3|a12345|@#$%^&|7y8u9i|1qw23e|1q2w3e|1p2o3i|1a2b3c|123abc|10sne1|0p9o8i|!@#$%^".split("|"));
gDictionary.Add(7, 
"yolanda|wyoming|winston|william|whitney|whiting|whatnot|vitriol|vitrify|vitiate|vitamin|visitor|village|vertigo|vermont|venturi|venture|ventral|venison|valerie|utility|upgrade|unknown|unicorn|unhappy|trivial|torrent|tinfoil|tiffany|tidings|thunder|thistle|theresa|test123|terrify|teleost|tarbell|taproot|tapping|tapioca|tantrum|tantric|tanning|takeoff|swearer|suzanne|susanne|support|success|student|squires|sossina|soldier|sojourn|soignee|sodding|smother|slavish|slavery|slander|shuttle|shivers|shirley|sheldon|shannon|service|seattle|scooter|scissor|science|scholar|scamper|satisfy|sarcasm|salerno|sailing|saguaro|saginaw|sagging|saffron|sabrina|russell|rupture|running|runneth|rosebud|receipt|rebecca|realtor|raleigh|rainbow|quarrel|quality|qualify|pumpkin|protect|program|profile|profess|profane|private|prelude|porsche|politic|playboy|phoenix|persona|persian|perseus|perseid|perplex|penguin|pendant|parapet|panoply|panning|panicle|panicky|pangaea|pandora|palette|pacific|olivier|olduvai|oldster|okinawa|oakwood|nyquist|nursery|numeric|number1|nullify|nucleus|nuclear|notused|nothing|newyork|network|neptune|montana|minimum|michele|michael|merriam|mercury|melissa|mcnulty|mcnally|mcmahon|mckenna|mcguire|mcgrath|mcgowan|mcelroy|mcclure|mcclain|mccarty|mcbride|mcadams|mbabane|mayoral|maurice|marimba|manhole|manager|mammoth|malcolm|malaria|mailbox|magnify|magneto|losable|lorinda|loretta|lorelei|lockout|lioness|limpkin|library|lazarus|lathrop|lateran|lateral|kristin|kristie|kristen|kinsman|kingdom|kennedy|kendall|kellogg|keelson|katrina|jupiter|judaism|judaica|jessica|janeiro|inspire|inspect|insofar|ingress|indiana|include|impetus|imperil|holmium|holmdel|herbert|heather|headmen|headman|harmony|handily|hamburg|halifax|halibut|halfway|haggard|hafnium|hadrian|gustave|gunther|gunshot|gryphon|gosling|goshawk|gorilla|gleason|glacier|ghostly|germane|georgia|geology|gaseous|gascony|gardner|gabriel|freeway|fourier|flowers|florida|fishers|finnish|finland|ferrari|felicia|feather|fatigue|fairway|express|expound|emulate|empress|empower|emitted|emerald|embrace|embower|ellwood|ellison|egghead|durward|durrell|drought|donning|donahue|digital|develop|desiree|default|deborah|damming|cynthia|cyanate|cutworm|cutting|cuddles|cubicle|crystal|coxcomb|cowslip|cowpony|cowpoke|console|conquer|connect|comrade|compton|collins|cluster|claudia|classic|citroen|citrate|citizen|citadel|cistern|christy|chester|charles|charity|celtics|celsius|catlike|cathode|carroll|carrion|careful|carbine|carbide|caraway|caravan|camille|burmese|burgess|bridget|breccia|bradley|bopping|blondie|bilayer|beverly|bernard|bermuda|berlitz|berlioz|beowulf|beloved|because|beatnik|beatles|beatify|bassoon|bartman|baroque|barbara|baptism|banshee|banquet|bannock|banning|bananas|bainite|bailiff|bahrein|bagpipe|baghdad|bagging|bacchus|asshole|arrange|arraign|arragon|arizona|ariadne|annette|animals|anatomy|anatole|amatory|amateur|amadeus|allison|alimony|aliases|algebra|albumin|alberto|alberta|albania|alameda|aladdin|alabama|airport|airpark|airfoil|airflow|airfare|airdrop|adenoma|adenine|address|addison|accrual|acclaim|academy|abcdefg|!@#$%^&".split("|"));
gDictionary.Add(8, 
"yosemite|y7u8i9o0|wormwood|woodwind|whistler|whatever|warcraft|vitreous|virginia|veronica|venomous|trombone|transfer|tortoise|tientsin|tideland|ticklish|thailand|testtest|tertiary|terrific|terminal|telegram|tarragon|tapeworm|tapestry|tanzania|tantalus|tantalum|sysadmin|symmetry|sunshine|strangle|startrek|springer|sparrows|somebody|solecism|soldiery|softwood|software|softball|socrates|slatting|slapping|slapdash|slamming|simpsons|serenity|security|schwartz|sanctity|sanctify|samantha|salesman|sailfish|sailboat|sagittal|sagacity|sabotage|rushmore|rosemary|rochelle|robotics|reverend|regional|raindrop|rachelle|qwertyui|qwerasdf|qawsedrf|q1w2e3r4|protozoa|prodding|princess|precious|politics|politico|plymouth|pershing|penitent|penelope|pendulum|patricia|password|passport|paranoia|panorama|panicked|pandemic|pandanus|pakistan|painless|operator|olivetti|oleander|oklahoma|notocord|notebook|notarize|nebraska|napoleon|missouri|michigan|michelle|mesmeric|mercedes|mcmullen|mcmillan|mcknight|mckinney|mckinley|mckesson|mckenzie|mcintyre|mcintosh|mcgregor|mcgovern|mcginnis|mcfadden|mcdowell|mcdonald|mcdaniel|mcconnel|mccauley|mccarthy|mccallum|mayapple|masonite|maryland|marjoram|marinate|marietta|maneuver|mandamus|maledict|maladapt|magnuson|magnolia|magnetic|lyrebird|lymphoma|lorraine|lionking|linoleum|limitate|limerick|laterite|landmass|landmark|landlord|landlady|landhold|landfill|kristine|kirkland|kingston|kimberly|khartoum|keystone|kentucky|keeshond|kathrine|kathleen|jubilant|joystick|jennifer|jacobsen|irishman|interpol|internet|insulate|instinct|instable|insomnia|insolent|insolate|inactive|imperial|iloveyou|illinois|hydrogen|hutchins|homework|hologram|holocene|hibernia|hiawatha|heinlein|hebrides|headlong|headline|headland|hastings|hamilton|halftone|halfback|hagstrom|gunsling|gunpoint|gumption|gorgeous|glaucous|glaucoma|glassine|ginnegan|ghoulish|gertrude|geometry|geometer|garfield|gamesman|gamecock|fungible|function|frighten|freetown|foxglove|fourteen|foursome|forsythe|football|flaxseed|flautist|flatworm|flatware|fidelity|exposure|eternity|enthrone|enthrall|enthalpy|entendre|entangle|engineer|emulsion|emulsify|emporium|employer|employee|employed|emmanuel|elliptic|elephant|einstein|eighteen|duration|donnelly|dominion|dlmhurst|delegate|delaware|december|deadwood|deadlock|deadline|deadhead|danielle|cyanamid|cucumber|cristina|criminal|creosote|creation|cowpunch|couscous|conquest|comrades|computer|comprise|compress|colorado|clusters|citation|charming|cerulean|cenozoic|cemetery|cellular|catskill|cationic|catholic|cathodic|catheter|cascades|carriage|caroline|carolina|carefree|cardinal|burgundy|burglary|bumbling|broadway|breeches|bordello|bordeaux|bilinear|bilabial|bernardo|berliner|berkeley|bedazzle|beaumont|beatrice|beatific|bathrobe|baronial|baritone|bankrupt|banister|bakelite|azsxdcfv|asdfqwer|arkansas|appraise|apposite|anything|angerine|ancestry|ancestor|anatomic|anathema|ambiance|alphabet|albright|albrecht|alberich|albacore|alastair|alacrity|airspace|airplane|airfield|airedale|aircraft|airbrush|airborne|aerobics|adrianna|adelaide|additive|addition|addendum|accouter|academic|academia|abcdefgh|abcd1234|a1b2c3d4|7y8u9i0o|7890yuio|1234qwer|0p9o8i7u|0987poiu|!@#$%^&*".split("|"));
gDictionary.Add(9, 
"zimmerman|worldwide|wisconsin|wholesale|vitriolic|ventricle|ventilate|valentine|tidewater|testament|territory|tennessee|telephone|telepathy|teleology|telemetry|telemeter|telegraph|tarantula|tarantara|tangerine|supported|superuser|stuttgart|stratford|stephanie|solemnity|softcover|slaughter|slapstick|signature|sheffield|sarcastic|sanctuary|sagebrush|sagacious|runnymede|rochester|receptive|reception|racketeer|professor|princeton|pondering|politburo|policemen|policeman|persimmon|persevere|persecute|percolate|peninsula|penetrate|pendulous|paralytic|panoramic|panicking|panhandle|oligopoly|oligocene|oligarchy|olfactory|oldenburg|nutrition|nurturant|notorious|notoriety|minnesota|microsoft|mcpherson|mcfarland|mcdougall|mcdonnell|mcdermott|mccracken|mccormick|mcconnell|mccluskey|mcclellan|marijuana|malicious|magnitude|magnetron|magnetite|macintosh|lynchburg|louisiana|lissajous|limousine|limnology|landscape|landowner|kinshasha|kingsbury|kibbutzim|kennecott|jamestown|ironstone|invisible|invention|intuitive|intervene|intersect|inspector|insomniac|insolvent|insoluble|impetuous|imperious|imperfect|holocaust|hollywood|hollyhock|headphone|headlight|headdress|headcount|headboard|happening|hamburger|halverson|gustafson|gunpowder|glasswort|glassware|ghostlike|geometric|gaucherie|freewheel|freethink|freestone|foresight|foolproof|extension|expositor|establish|entertain|employing|emittance|ellsworth|elizabeth|eightieth|eightfold|eiderdown|dusenbury|dusenberg|donaldson|dominique|discovery|desperate|delegable|delectate|decompose|decompile|damnation|cutthroat|crabapple|cornelius|conqueror|connubial|commrades|citizenry|christine|christina|chemistry|cellulose|celluloid|catherine|carryover|burlesque|bloodshot|bloodshed|bloodroot|bloodline|bloodbath|bilingual|bilateral|bijective|bijection|bernadine|berkshire|beethoven|beatitude|bakhtiari|asymptote|asymmetry|apprehend|appraisal|apportion|ancestral|anatomist|alexander|albatross|alabaster|alabamian|adenosine|abcabcabc".split("|"));
gDictionary.Add(10, 
"washington|volkswagen|topography|tessellate|temptation|telephonic|telepathic|telemetric|telegraphy|tantamount|superstage|slanderous|salamander|qwertyuiop|polynomial|politician|phrasemake|photometry|photolytic|photolysis|photogenic|phosphorus|phosphoric|persiflage|persephone|perquisite|peninsular|penicillin|penetrable|panjandrum|oligoclase|oligarchic|oldsmobile|nottingham|noticeable|noteworthy|mcnaughton|mclaughlin|mccullough|mcallister|malconduct|maidenhair|limitation|lascivious|landowning|landlubber|landlocked|lamination|khrushchev|juggernaut|irrational|invariable|insouciant|insolvable|incomplete|impervious|impersonal|headmaster|glaswegian|geopolitic|geophysics|fourteenth|foursquare|expressive|expression|expository|exposition|enterprise|eightyfold|eighteenth|effaceable|donnybrook|delectable|decolonize|cuttlefish|cuttlebone|compromise|compressor|comprehend|cellophane|carruthers|california|burlington|burgundian|borderline|borderland|bloodstone|bloodstain|bloodhound|bijouterie|biharmonic|bernardino|beaujolais|basketball|bankruptcy|bangladesh|atmosphere|asymptotic|asymmetric|appreciate|apposition|ambassador|amateurish|alimentary|additional|accomplish|1q2w3e4r5t".split("|"));
gDictionary.Add(11, 
"yellowstone|venturesome|territorial|telekinesis|sagittarius|safekeeping|politicking|policewoman|photometric|photography|phosphorous|perseverant|persecutory|persecution|penitential|pandemonium|mississippi|marketplace|magnificent|irremovable|interrogate|institution|inspiration|incompetent|impertinent|impersonate|impermeable|headquarter|hamiltonian|halfhearted|hagiography|geophysical|expressible|emptyhanded|eigenvector|deleterious|decollimate|decolletage|connecticut|comptroller|compressive|compression|catholicism|bloodstream|bakersfield|arrangeable|appreciable|anastomotic|albuquerque".split("|"));
gDictionary.Add(12, 
"williamsburg|testamentary|qwerasdfzxcv|q1w2e3r4t5y6|perseverance|pennsylvania|penitentiary|malformation|liquefaction|interstitial|inconclusive|incomputable|incompletion|incompatible|incomparable|imperishable|impenetrable|headquarters|geometrician|ellipsometry|decomposable|decommission|compressible|burglarproof|bloodletting|bilharziasis|asynchronous|asymptomatic|ambidextrous|1q2w3e4r5t6y".split("|"));
gDictionary.Add(13, 
"ventriloquist|ventriloquism|poliomyelitis|phosphorylate|oleomargarine|massachusetts|jitterbugging|interpolatory|inconceivable|imperturbable|impermissible|decomposition|comprehensive|comprehension".split("|"));
gDictionary.Add(14, 
"slaughterhouse|irreproducible|incompressible|comprehensible|bremsstrahlung".split("|"));
gDictionary.Add(15, 
"irreconciliable|instrumentation|incomprehension".split("|"));
gDictionary.Add(16, 
"incomprehensible".split("|"));}

function ClientSideStrongPassword(){
	return (IsLongEnough(ClientSideStrongPassword.arguments[0], "8") && SpansEnoughCharacterSets(ClientSideStrongPassword.arguments[0], "3") && (!(IsCloseVariationOfAWordInDictionary(ClientSideStrongPassword.arguments[0], "0.6", ClientSideStrongPassword.arguments[1], ClientSideStrongPassword.arguments[2]))));
}

function ClientSideBestPassword(){
	return (IsLongEnough(ClientSideBestPassword.arguments[0], "14") && SpansEnoughCharacterSets(ClientSideBestPassword.arguments[0], "3") && (!(IsCloseVariationOfAWordInDictionary(ClientSideBestPassword.arguments[0], "0.6", ClientSideBestPassword.arguments[1], ClientSideBestPassword.arguments[2]))));
}

function ClientSideMediumPassword(){
	return (IsLongEnough(ClientSideMediumPassword.arguments[0], "8") && SpansEnoughCharacterSets(ClientSideMediumPassword.arguments[0], "2") && (!(FoundInDictionary(ClientSideMediumPassword.arguments[0], ClientSideMediumPassword.arguments[1], ClientSideMediumPassword.arguments[2]))));
}

function ClientSideWeakPassword(){
	return (IsLongEnough(ClientSideWeakPassword.arguments[0], "1") || (!(IsLongEnough(ClientSideWeakPassword.arguments[0], "0"))));
}

function GEId(sID){
	return document.getElementById(sID);
}

function EvalPwdStrength(oF,sP){
	if(ClientSideBestPassword(sP,gSimilarityMap,gDictionary)){
		DispPwdStrength(4,'pwdChkCon4');
	}
	else if(ClientSideStrongPassword(sP,gSimilarityMap,gDictionary)){
		DispPwdStrength(3,'pwdChkCon3');
	}
	else if(ClientSideMediumPassword(sP,gSimilarityMap,gDictionary)){
		DispPwdStrength(2,'pwdChkCon2');
	}
	else if(ClientSideWeakPassword(sP,gSimilarityMap,gDictionary)){
		DispPwdStrength(1,'pwdChkCon1');
	}
	else{
		DispPwdStrength(0,'pwdChkCon0');
	}
}

function PadPasswd(oF,lPwd){
	if(typeof oF.PwdPad=="object"){
		var sPad="djg";
		var lPad=sPad.length-lPwd;
		oF.PwdPad.value=sPad.substr(0,(lPad<0)?0:lPad);
	}
}

function DispPwdStrength(iN,sHL){
	if(GEId("idSMT0")){
		if(iN==0){
			GEId("idSMT0").style.display="block";
		}else{
			GEId("idSMT0").style.display="none";
		}
	}
	if(iN>4){ iN=4;
	}
	for(var i=0;i<5;i++){
		if(i != 0){
			if(i!=iN){
				if(i<iN){
					GEId("idSM"+i).className="pwdChkCon" + i;
				}else{
					GEId("idSM"+i).className="pwdChkCon0";
				}
			}else{
				GEId("idSM"+i).className="pwdChkCon" + i;
			}
			
			if(GEId("idSMT"+i)){
				GEId("idSMT"+i).style.display=((i==iN)?"inline":"none");
			}
			if(GEId("idSMD"+i)){
				GEId("idSMD"+i).style.display=((i==iN)?"block":"none");
			}
		}
	}
}


//密碼強度必須在系统设置的密码强度以上
function validatePwdStrong(strongLevel,nowpassword) {
	if(strongLevel=='medium'){
		if (!ClientSideMediumPassword(nowpassword, gSimilarityMap,gDictionary)
				&& !ClientSideStrongPassword(nowpassword, gSimilarityMap,gDictionary)
				&& !ClientSideBestPassword(nowpassword, gSimilarityMap, gDictionary)){
			alert(mediumMsg);
			return false;
		}
	}else if(strongLevel=='strong'){
		if (!ClientSideStrongPassword(nowpassword, gSimilarityMap,gDictionary)
				&& !ClientSideBestPassword(nowpassword, gSimilarityMap, gDictionary)){
			alert(strongMsg);
			return false;
		}
	}else if(strongLevel=='best'){
		if (!ClientSideBestPassword(nowpassword, gSimilarityMap, gDictionary)){
			alert(bestMsg);
			return false;
		}
	}
	return true;
}

//密碼強度必須在系统设置的密码强度以上
function getPwdStrongForLoginPage(nowpassword) {	
	if (ClientSideWeakPassword(nowpassword, gSimilarityMap,gDictionary)
			&&!ClientSideMediumPassword(nowpassword, gSimilarityMap,gDictionary)
			&& !ClientSideStrongPassword(nowpassword, gSimilarityMap,gDictionary)
			&& !ClientSideBestPassword(nowpassword, gSimilarityMap, gDictionary)){
		return 1;
	}else if (ClientSideMediumPassword(nowpassword, gSimilarityMap,gDictionary)
			&& !ClientSideStrongPassword(nowpassword, gSimilarityMap,gDictionary)
			&& !ClientSideBestPassword(nowpassword, gSimilarityMap, gDictionary)){
		return 2;
	}else if (ClientSideStrongPassword(nowpassword, gSimilarityMap,gDictionary)
			&& !ClientSideBestPassword(nowpassword, gSimilarityMap, gDictionary)){
		return 3;
	}else if (ClientSideBestPassword(nowpassword, gSimilarityMap, gDictionary)){
		return 4;
	}
	
	return 1;
}

//修改前后密码不能相同
function validatePwdEqual(oldPassword,nowpassword) {
	if (oldPassword == nowpassword) {
		alert(notequalMsg);
		return false;
	}
	return true;

}