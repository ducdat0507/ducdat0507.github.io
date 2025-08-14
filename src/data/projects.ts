export type ProjectDefinition = {
    name: string,
    description: string,
    prototype?: boolean,
    links: ({
        name: string,
        icon?: string,
        href: string
    } | null)[]
}

export type ProjectCollection = {
    [section: string]: {
        [category: string]: ProjectDefinition[]
    }
}

export const games: ProjectCollection = {
    "incremental games": {
        "flagships (a.k.a. originals)": [
            {
                name: "One Trillion Free Draws",
                description: `
                    <p>
                        The definitive idle games where you have 1,000,000,000,000 free card packs to draw. That's 1 followed by 12 zeros!
                    </p>
                `,
                links: [
                    { name: "source", icon:"iconoir:git", href: "https://github.com/ducdat0507/gacha" },
                    null,
                    { name: "play", href: "/gacha" },
                ]
            },
            {
                name: "Infinite Button Simulator",
                description: `
                    <p>
                        It's one of those button games on Roblox, but the buttons repeat to infinity and the game's on a website rather than Roblox.
                    </p>
                    <p>
                        Beware: playing this game also requires as much dedication as those Roblox button games...
                    </p>
                `,
                links: [
                    { name: "source", icon:"iconoir:git", href: "https://github.com/ducdat0507/infinite-bsim" },
                    null,
                    { name: "play", href: "/infinite-bsim" },
                ]
            },
            {
                name: "Towers of Googology",
                description: `
                    <p>
                        Defeat enemies and grow your towers, incremental game style!
                    </p>
                    <p>
                        Made for Demonin's big number incremental game jam and somehow got first place?
                    </p>
                `,
                links: [
                    { name: "source", icon:"iconoir:git", href: "https://github.com/ducdat0507/towers" },
                    null,
                    { name: "play", href: "/towers" },
                ]
            },
        ],
        "prestige tree -kind": [
            {
                name: "The Communitree!",
                description: `
                    <p>
                        A prestige-tree like game about other prestige-tree like games and the community that makes prestige-tree like games.
                    </p>
                `,
                links: [
                    { name: "source", icon:"iconoir:git", href: "https://github.com/ducdat0507/communitree" },
                    null,
                    { name: "play", href: "/communitree" },
                ]
            },
            {
                name: "The Prestreestuck",
                description: `
                    <p>
                        A prestige-tree like game loosely based on the hit web-comic Homestuck.
                    </p>
                    <p>
                        ...Not really my proudest creation.
                    </p>
                `,
                links: [
                    { name: "source", icon:"iconoir:git", href: "https://github.com/ducdat0507/prestreestuck" },
                    null,
                    { name: "retcon ver.", href: "https://raw.githack.com/ducdat0507/prestreestuck/retcon/index.html" },
                    { name: "play", href: "/prestreestuck" },
                ]
            },
            {
                name: "The Dynas Tree",
                description: `
                    <p>
                        An old prestige-tree like game about growing an empire or something.
                    </p>
                `,
                links: [
                    { name: "source", icon:"iconoir:git", href: "https://github.com/ducdat0507/thedynastree" },
                    null,
                    { name: "play", href: "/thedynastree" },
                ]
            },
        ],
        "incremental games on esoteric places": [
            {
                name: "Untitled Dice Game",
                description: `
                    <p>
                        An incremental game on Scratch, a coding platform for children.
                    </p>
                `,
                links: [
                    null,
                    { name: "play on scratch", href: "https://scratch.mit.edu/projects/898654487/" },
                    { name: "play on turbowarp", href: "https://turbowarp.org/898654487/embed?username=" },
                ]
            },
            {
                name: "Unfeaturable Game",
                description: `
                    <p>
                        An incremental game on Fancade, a UGC-based bite-sized gaming platform on phones. Beware of the ads!
                    </p>
                    <p>
                        Note: on browsers you need to exit the game via the in-game pause button for it to save your progress.
                    </p>
                `,
                links: [
                    null,
                    { name: "play on fancade", href: "https://play.fancade.com/641DC8D77EC28A3B" },
                ]
            },
            {
                name: "Sparklifer",
                prototype: true,
                description: `
                    <p>
                        A short incremental game made with Idle Game Maker, the idle game engine made by the same people who've made Cookie Clicker.
                    </p>
                `,
                links: [
                    { name: "source", icon: "iconoir:git", href: "/toys/Sparklifer.txt" },
                    null,
                    { name: "play on dashnet", href: "https://orteil.dashnet.org/igm/?g=https://ducdat0507.github.io/toys/Sparklifer.txt" },
                ]
            },
            {
                name: "MSPFA Incremental",
                prototype: true,
                description: `
                    <p>
                        A proof of concept incremental game on MS-Paint Fan Adventures, the website where you share and read web-comics on the MS-Paint Adventure format.
                    </p>
                `,
                links: [
                    null,
                    { name: "play on mspfa", href: "https://mspfa.com/?s=44700&p=1" },
                ]
            },
        ],
        "other prototypes": [
            {
                name: "Project: Incremental",
                prototype: true,
                description: `
                    <p>
                        One of my early attempts to tackle the Unity game engine, and what I imagined an ultimate incremental game is going to be. 
                    </p>
                `,
                links: [
                    null,
                    { name: "play", href: "/incremental" },
                ]
            },
        ],
        "not mine but I was involved": [
            {
                name: "Advent Incremental",
                description: `
                    <p>
                        A incremental game which also acts as an advent calendar—content are unlocked throughout the days of December leading to Christmas Eve.
                    </p>
                    <p>
                        Made by The Paper Pilot which also made the engine for the game. I helped with some of the dates' content and a bit of styling.
                    </p>
                    <p>
                        If you want to play the game while it's not December, there's an option on the game to ignore the month or disable the date-gate altogether.
                    </p>
                `,
                links: [
                    null,
                    { name: "play", href: "https://www.thepaperpilot.org/advent/" },
                ]
            },
            {
                name: `The Camellia Tree: duducat's Extremely Novel and (Almost) Completely Overhauled "I wanna be the Kamiller" Rewrite/Modification`,
                description: `
                    <p>
                        A TPT-like game loosely based on the hit EDM composer かめりあ.
                    </p>
                    <p>
                        The original author of the game, ArcanaEden, wanted me to help implement a mechanic in their game, and I came up with a whole game rewrite instead.
                    </p>
                `,
                links: [
                    null,
                    { name: "play", href: "https://duducat.nekoweb.org/The-Camellia-Tree-Rewritten/" },
                ]
            },
            {
                name: `The Longest Incremental^2`,
                prototype: true,
                description: `
                    <p>
                        An incremental game made as a collaboration between a few members of the incremental game community.
                    </p>
                    <p>
                        Contrary to the name, it's not very long.
                    </p>
                `,
                links: [
                    null,
                    { name: "play", href: "https://circle-gon.github.io/the-longest-incremental-2/" },
                ]
            },
        ],
    },
    "non-incremental games": {
        "rhythm games": [
            {
                name: "JANOARG",
                prototype: true,
                description: `
                    <p>
                        The rhythm game where everything moves. Made for phones!
                    </p>
                `,
                links: [
                    { name: "source", icon:"iconoir:git", href: "https://github.com/FFF40/JANOARG" },
                    null,
                    { name: "get", icon:"iconoir:arrow-down", href: "https://github.com/FFF40/JANOARG/releases" },
                ]
            },
        ],
        "puzzle games": [
            {
                name: "Yet Another Match-3 Clone",
                description: `
                    <p>
                        It's like Bejeweled but free, and on the internet, just like Bejeweled!
                    </p>
                `,
                links: [
                    { name: "source", icon:"iconoir:git", href: "https://github.com/ducdat0507/match-3" },
                    null,
                    { name: "play", href: "/match-3" },
                ]
            },
            {
                name: "Painteract",
                prototype: true,
                description: `
                    <p>
                        A paint-the-wall type puzzle game with a third dimension.
                    </p>
                    <p>
                        It's also a really short prototype (only 8 levels long) and also has lost the source code so I can't create more levels.
                    </p>
                `,
                links: [
                    null,
                    { name: "play", href: "/painteract" },
                ]
            },
        ],
        "roblox grinding simulators (ewww)": [
            {
                name: "Browser Mining",
                prototype: true,
                description: `
                    <p>
                        REx but on a browser. Sol's RNG but auras are changed into ores and the roll button is changed into this open-world mine.
                    </p>
                    <p>
                        Yes, I was into these games at one point in my life.
                    </p>
                `,
                links: [
                    { name: "source", icon:"iconoir:git", href: "https://github.com/ducdat0507/browser-mining" },
                    null,
                    { name: "play", href: "/browser-mining" },
                ]
            },
        ],
    }
}

export const nongames: ProjectCollection = {
    "apps & websites": {
        "the modding tools": [
            {
                name: "The Modding Tree Docs",
                description: `
                    <p>
                        The documentation of TMT made into a website.
                    </p>
                `,
                links: [
                    { name: "source", icon:"iconoir:git", href: "https://github.com/ducdat0507/tmt-docs" },
                    null,
                    { name: "launch", href: "/tmt-docs" },
                ]
            },
            {
                name: "ducdat0507's The Prestige Tree Modfinder™",
                description: `
                    <p>
                        A website that fetches all forks of the TMT repository and display them into a grid with links to play them.
                    </p>
                `,
                links: [
                    { name: "source", icon:"iconoir:git", href: "https://github.com/ducdat0507/prestreestuck/tree/master/finder.html" },
                    null,
                    { name: "launch", href: "/prestreestuck/finder.html" },
                ]
            },
        ],
        "the small/indie web tools": [
            {
                name: "the stampbook",
                prototype: true,
                description: `
                    <p>
                        A proof-of-concept website that makes it easy to collect 88x31 buttons on the internet (only 88x31 buttons are supported at the moment.)
                    </p>
                    <p>
                        Originally hosted on Neocities, but with their latest update breaking things I've decided to also upload it to my GitHub Pages site.
                    </p>
                `,
                links: [
                    { name: "source", icon:"iconoir:git", href: "https://github.com/ducdat0507/stampbook" },
                    null,
                    { name: "neocities mirror", href: "https://stampbook.neocities.org/" },
                    { name: "launch", href: "/stampbook" },
                ]
            },
            {
                name: "Grandfather",
                prototype: true,
                description: `
                    <p>
                        A terminal-based web browser for the small web (Gemini, Gopher, etc.). You'll need to compile the app yourself, it's for my personal uses.
                    </p>
                `,
                links: [
                    { name: "source", icon:"iconoir:git", href: "https://github.com/ducdat0507/grandfather" },
                ]
            },
        ],
        "not mine but I was involved": [
            {
                name: "galaxy.click",
                description: `
                    <p>
                        A website for discovering and playing incremental games, with features reminiscent of old game portals like Kongregate such as a forum and live chat rooms.
                    </p>
                    <p>
                        Owned by yhvr, with my help on basically the entire interface design.
                    </p>
                `,
                links: [
                    { name: "source", icon:"iconoir:git", href: "https://gitlab.com/yhvr/galaxy-astro" },
                    null,
                    { name: "launch", href: "https://galaxy.click" },
                ]
            },
        ],
    },
    "fun stuff": {
        "instant toys": [
            {
                name: "totally real robux generator chat",
                description: `
                    <p>
                        The documentation of TMT made into a website.
                    </p>
                `,
                links: [
                    null,
                    { name: "launch", href: "/toys/realgenchat.html" },
                ]
            },
        ],
    },
    "developer resources": {
        "libraries": [
            {
                name: "lootalot",
                description: `
                    <p>
                        A JS library for handling loot drops/gacha pulls/other random events of arbitrary counts.
                    </p>
                    <p>
                        Do you ever find yourself having to simulate doing a random event one trillion times? Then this library is for you!
                    </p>
                `,
                links: [
                    { name: "source", icon:"iconoir:git", href: "https://github.com/ducdat0507/lootalot" },
                    null,
                    { name: "landing page", href: "/lootalot" },
                ]
            },
        ],
        "widgets": [
            {
                name: "Custom Discord embeds",
                description: `
                    <p>
                        Make your own stylable Discord invite widgets!
                    </p>
                    <p>
                        Choose the default ones or bring your own CSS file!
                    </p>
                `,
                links: [
                    { name: "source / how to", icon:"iconoir:git", href: "https://github.com/ducdat0507/custom-discord-embeds" },
                ]
            },
        ],
    },
}