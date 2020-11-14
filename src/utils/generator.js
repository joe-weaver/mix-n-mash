export const generateUser = () => {
    let user = {};
    let first = generateFirstName();
    let last = generateLastName();

    user.active = false;
    user.email = generateEmail(first, last);
    user.username = generateUsername(first, last);
    user.hashedPassword = "password";
    user.bio = generateBio();
    user.numFollowers = randomFromRangeInt(0, 10);
    user.mashmates = [];
    user.sentMashmateRequests = [];
    user.receivedMashmateRequests = [];
    user.mixtapes = [];
    user.following = [];
    user.genrePreferences = [];

    return user;
}

export const generateMixtape = (user) => {
    let mixtape = {};

    mixtape.title = generateMixtapeName();
    mixtape.description = generateBio();
    mixtape.genres = [randomFrom(["Jazz","Ska","Rock","Pop","Classical"])];
    mixtape.image = ["https://img.youtube.com/vi/XfR9iY5y94s/0.jpg"];
    mixtape.songs = generateSongs();
    mixtape.ownerId = user._id;
    mixtape.ownerName = user.username;
    mixtape.listens = randomFromRangeInt(0, 10000);
    mixtape.likes = randomFromRangeInt(0, 1000);
    mixtape.dislikes = randomFromRangeInt(0, 100);
    mixtape.comments = [];
    //     {
    //         commentId: "1",
    //         userId: "phony",
    //         username: "NotARealUser",
    //         content: "Here is some comment content",
    //         publishingTime: 1000000,
    //         replies: []
    //     },
    //     {
    //         commentId: "2",
    //         userId: "phony1",
    //         username: "NotReal",
    //         content: "Comment",
    //         publishingTime: 1000000,
    //         replies: [{
    //             userId: "phony2",
    //             username: "AnotherFakeUser",
    //             content: "This is a comment y'all",
    //             publishingTime: 10000001,
    //           }]
    //     }
    // ];
    mixtape.private = false;
    mixtape.collaborators = [];
    mixtape.timeCreated = 0;
    mixtape.likesPerDay = [];
    mixtape.listensPerDay = [];

    for(let i = 0; i < 7; i++){
        let likes = randomFromRangeInt(0, 100);
        let listens = randomFromRangeInt(0, 1000);
        mixtape.likesPerDay.push(likes);
        mixtape.likes += likes;
        mixtape.listensPerDay.push(listens);
        mixtape.listens += listens;
    }


    return mixtape;
}

function generateMixtapeName(username){
    let r = randomFromRangeInt(0, 100);
    let name;


    if(r < 1){
        name = randomFrom(["SKORPU DORPU", "Squeepa deep deep", "Hail the fish queen", "Songs to catJAM to"])
        return name;
    }

    name = randomFrom(["Shower", "Workout", "Grocery Shopping", "Study", "LoFi", "Modern",
            "Video Game", "Dubstep", "Classical", "Jazz", "Saturday Morning Workout", "Friday Afternoon",
            "Breakup", "Meme", "K-Pop", "Foreign", "Ska"]) + " "
            + randomFrom(["Songs", "Music", "Bops", "Vibes", "Beats", "Jams", "Tunes", "Bangers", "Tracks"]) + " "
            + randomFrom(["to Cry to", "to be Depressed to", "to Chill with", "to Vibe to", "that make you happy",
            "that actually kill you instantly", "to Study to", "your Grandma would enjoy", "that REMEMBER TO SMASH THE LIKE BUTTON ;P",
            "that will make you cry ;-;", "to program to", "to create JavaScript name generators to", "to share with friends",
            "my mother would be proud of (right?)", "for my priest", "for when it's raining", "from the 80's",
            "for when you run out of mayonnaise \u{1F629}", "to make you forget the war", "to die to",
            "for when 'rona hits you", "to browse reddit to", "that are actually only Land Down Under",
            "for Chads", "to cook spaghetti to", "to pray to", "to watch our democracy die to",
            "to witness the eventual heat death of the universe to", "to get you in the mood",
            "for your mother", "for your cat", "to make you wish you were never born",
            "that will teach you perfect pitch", "for your minecraft videos", "to dig a hole to",
            "that are better than you will ever be", "I find insulting", ("to make " + randomFrom(firstName) + " cry"),
            ("because " + randomFrom(firstName) + " asked for them"), ("for my musically inept friend " + randomFrom(firstName)),
            ("for my cat " + randomFrom([...firstName, ...catName])), "for when you're in the shower",
            "for when you're driving home", "for when you're driving to work", "to motivate you",
            "I would sell my soul for", "I would sacrifice my firstborn to listen to", "I can't stop listening to",
            "I'm not sure I enjoy anymore", "I liked in middle school", "for when you're on your yacht", 
            "to golf to", "I don't enjoy", "I agree with", "that speak to me", "that mean a lot to me",
            "that mean nothing to me", "for when you're in traffic", "for my prayer group", "to dance to",
            "to walk down the isle to"]);

    r = randomFromRangeInt(0, 1);

    if(r < 1){
        name = randomFrom(["Stinky", "Controversial", "Fire", "Sick", "The Worst", "The Best", "Popular",
        "Underrated", "Stereotypical", "Above Average", "Borderline Racist", "Offensive", 
        "Mellow", "Spooky", "Smooth", "Heavy", "Moody", "Italian", "Australian", "Top Tier",
        "My Favorite", "Rage-Filled", "Angry", "Angsty", "Mediocre"]) + " " + name
    }
    
    return name;
}

const songChoices = [
    {name: "Men At Work - Down Under (Video)", youtubeId: "XfR9iY5y94s"},
    {name: "Michael Jackson - Billie Jean (Official Video)", youtubeId: "Zi_XLOBDo_Y"},
    {name: "Bon Jovi - Livin' On A Prayer (Official Music Video)", youtubeId: "lDK9QqIzhwk"},
    {name: "Toto - Africa (Official Music Video)", youtubeId: "FTQbiNvZqaY"},
    {name: "The Police - Every Breath You Take", youtubeId: "OMOGaugKpzs"},
    {name: "George Michael - Careless Whisper (Official Video)", youtubeId: "izGwDsrQ1eQ"},
    {name: "Daryl Hall & John Oates - Maneater (Official Video)", youtubeId: "yRYFKcMa_Ek"},
    {name: "Toto - Rosanna (Official Music Video)", youtubeId: "qmOLtTGvsbM"},
    {name: "Phil Collins - In The Air Tonight (Official Music Video)", youtubeId: "YkADj0TPrJA"},
]

function generateSongs(){
    let r = randomFromRangeInt(3, 9);
    let songs = [];

    for(let i = 0; i < r; i++){
        songs.push(randomFrom(songChoices));
    }

    return songs;
}

function generateBio(){
    return "This is a dummy bio. I'll put more work into making something more entertaining for this later. For now, I just want it to be long enough to test that the word wrap works.";
}

function generateUsername(first, last){
    let r = randomFromRangeInt(0, 10);
    let username = ""

    if(r < 2){
        // Generate username from name only
        username += getChunkOfName(first);
        username += getChunkOfName(last);
    } else if (r < 5){
        // Generate username from name and a random word
        r = randomFromRangeInt(0, 10);
        if (r < 1){
            username += first;
        } else if (r < 2){
            username += last;
        } else if(r < 6){
            username += getChunkOfName(first);
            username += randomFrom([...adjectives, ...nouns]);
        } else {
            username += getChunkOfName(last);
            username += randomFrom([...adjectives, ...nouns]);
        }
    } else {
        // Generate username with random words
        username += randomFrom(adjectives) + randomFrom(nouns);
    }

    r = randomFromRangeInt(0, 4);
	for(let i = 0; i < r; i++){
		username += randomFromRangeInt(0, 9);
    }
    
    return username;
}

function generateEmail(first, last){
	let email = "";
	
	let r = randomFromRangeInt(0, 2);

	if(r < 2){
        email += getChunkOfName(first.toLowerCase())
        email += getChunkOfName(last.toLowerCase());
	} else {
		email += randomFrom(adjectives);
		email += randomFrom(nouns);
	}

	r = randomFromRangeInt(0, 4);
	for(let i = 0; i < r; i++){
		email += randomFromRangeInt(0, 9);
	}

	email += "@";
	email += randomFrom(domain);
	email += ".";
	email += randomFrom(tld);

	return email;
}

function getChunkOfName(name){
	let i = randomFromRangeInt(0, 3);
	let chunk;
	switch(i){
		case 1:
			chunk = name.charAt(0);
			break;
		case 2:
			chunk = name.substring(0, 3);
			break;
		case 3:
			chunk = name.substring(0, 4);
			break
		default:
			chunk = name;
	}
	return chunk;
}

function generateFirstName(){
	return randomFrom(firstName);
}

function generateLastName(){
	return randomFrom(lastNames);
}

/**
 * Returns a random element from an array
 * @param {Array} arr 
 */
export function randomFrom(arr){
	let index = randomFromRangeInt(0, arr.length - 1);
	return arr[index];
}

/**
 * Returns a random integer between min and max inclusively
 * @param {Number} min The minimum value
 * @param {Number} max The maximum value
 */
export function randomFromRangeInt(min, max){
	return Math.floor(Math.random()*(max - min + 1) + min);
}

const catName = [
    "Fluffy",
    "Waddles",
    "Snootles",
    "Squiggle",
    "Meow Zedong",
    "Snuggles"
]

// FIRST NAMES -----------------------------------
const firstName = [
	"Liam",
	"Noah",
	"William",
	"James",
	"Logan",
	"Benjamin",
	"Mason",
	"Elijah",
	"Oliver",
	"Jacob",
	"James",
	"John",
	"Robert",
	"Michael",
	"William",
	"David",
	"Richard",
	"Charles",
	"Joseph",
	"Thomas",
	"Emma",
	"Olivia",
	"Ava",
	"Isabella",
	"Sophia",
	"Taylor",
	"Charlotte",
	"Amelia",
	"Evelyn",
	"Abigail",
	"Mary",
	"Patricia",
	"Linda",
	"Barbara",
	"Elizabeth",
	"Jennifer",
	"Maria",
	"Susan",
	"Margaret",
	"Dorothy",
	"Gabriel",
	"Louis",
	"Jules",
	"Adam",
	"Lucas",
	"Leo",
	"Hugo",
	"Arthur",
	"Nathan",
	"Louise",
	"Jade",
	"Alice",
	"Chloe",
	"Lina",
	"Mila",
	"Lea",
	"Manon",
	"Rose"
]

// LAST NAMES
const lastNames = [
	"Martin",
	"Bernard",
	"Dubois",
	"Thomas",
	"Robert",
	"Richard",
	"Petit",
	"Durand",
	"Leroy",
	"Moreau",
	"Simon",
	"Laurent",
	"Wilson",
	"Campbell",
	"Kelly",
	"Johnston",
	"Moore",
	"Thompson",
	"Smyth",
	"Brown",
	"O’Neill ",
	"Doherty ",
	"Smith",
	"Jones",
	"Taylor",
	"Brown",
	"Williams",
	"Wilson",
	"Johnson",
	"Davies",
	"Robinson",
	"Wright",
	"Thompson",
	"Evans",
]

const adjectives = [
	"good",
    "new",
    "first",
    "last",
    "long",
    "great",
    "little",
    "own",
    "other",
    "old",
    "right",
    "big",
    "high",
    "different",
    "small",
    "large",
    "next",
    "early",
    "young",
    "important",
    "few",
    "public",
    "bad",
    "same",
	"able",
	"remarkable",
    "tremendous",
    "boring",
    "belligerent",
    "cluttered",
    "resolute",
    "complex",
    "selective",
    "opposite",
    "rhetorical",
    "faint",
    "faded",
    "therapeutic",
    "calculating",
    "telling",
    "zesty",
    "righteous",
    "normal",
    "utter",
    "conscious"
];

const nouns = [
	"time",
    "person",
    "year",
    "way",
    "day",
    "thing",
    "man",
    "world",
    "life",
    "hand",
    "part",
    "child",
    "eye",
    "woman",
    "place",
    "work",
    "week",
    "case",
    "point",
    "government",
    "company",
    "number",
    "group",
    "problem",
	"fact",
	"truck",
    "plants",
    "circle",
    "baby",
    "trick",
    "volleyball",
    "train",
    "cattle",
    "ring",
    "reading",
    "produce",
    "cub",
    "elbow",
    "interest",
    "person",
    "desire",
    "head",
    "cows",
    "whip",
    "deer"
];

let domain = [
	"neck",
    "geese",
    "scene",
    "wash",
    "dad",
    "roof",
    "crack",
    "metal",
    "selection",
    "stitch",
    "muscle",
    "noise",
    "pig",
    "squirrel",
    "story",
    "grape",
    "cactus",
    "minister",
    "eyes",
    "expansion",
    "basket",
    "camera",
    "nerve",
    "veil",
    "battle",
    "clover",
    "eye",
    "trip",
    "cake",
    "cars",
    "mist",
    "stone",
    "thumb",
    "hobbies",
    "furniture",
    "nation",
    "offer",
    "coast",
    "engine",
    "wish",
    "ray",
    "statement",
    "profit",
    "rain",
    "meeting",
    "sock",
    "sheep",
    "toy",
    "boy",
    "condition"
];

let tld = [
	"com",
	"org",
	"net"
]

// let compoundWords = [
// 	"bluebell",
//     "bellbottom",
//     "superego",
//     "woodshop",
//     "cargo",
//     "highchair",
//     "cancan",
//     "handout",
//     "together",
//     "bluegrass",
//     "warlike",
//     "thunderbird",
//     "upstairs",
//     "backtrack",
//     "tenderfoot",
//     "aircraft",
//     "alongside",
//     "sixfold",
//     "showoff",
//     "sundial",
//     "watchmaker",
//     "saucepan",
//     "anymore",
//     "wayside",
//     "backache",
//     "cardstock",
//     "backstroke",
//     "sunup",
//     "mainland",
//     "airport",
//     "superhighways",
//     "forecastle",
//     "grandmaster",
//     "underestimate",
//     "sometimes",
//     "postcard",
//     "footprints",
//     "hereby",
//     "duckbill",
//     "grandchild",
//     "someplace",
//     "throwaway",
//     "upstanding",
//     "became",
//     "courtyard",
//     "overboard",
//     "turnkey",
//     "toothpick",
//     "moonlight",
//     "silversmith",
//     "headlight",
//     "uptown",
//     "tableware",
//     "supergiant",
//     "passbook",
//     "anytime",
//     "shipbottom",
//     "popcorn",
//     "carsick",
//     "taxicab",
//     "foreknowledge",
//     "washroom",
//     "newfound",
//     "keyhole",
//     "today",
//     "moreover",
//     "newsworthy",
//     "butterflies",
//     "skintight",
//     "starfish",
//     "tailspin",
//     "fishbowl",
//     "weathercock",
//     "eyeglasses",
//     "foreclose",
//     "tenderfoot",
//     "matchbox",
//     "wheelhouse",
//     "carport",
//     "driveway",
//     "earthworm",
//     "upbeat",
//     "blueprint",
//     "ballroom",
//     "pinup",
//     "rainbow",
//     "raincoat",
//     "comeback",
//     "sundown",
//     "grandaunt",
//     "tailbone",
//     "clockwise",
//     "afterglow",
//     "wastebasket",
//     "wardroom",
//     "newsroom",
//     "wheelbase",
//     "takeoff",
//     "spacewalk",
//     "horsehair"
// ]