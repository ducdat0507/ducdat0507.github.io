export type WebsiteDefinition = {
    name: string,
    site: string,
    button?: string,
}

export type WebsiteCollection = {
    [section: string]: {
        [category: string]: WebsiteDefinition[]
    }
}


export const websites: WebsiteCollection = {
    "personal": {
        "affiliates (people I've met):": [
            {
                site: "https://clawrez.gay/",
                name: "Clawrez",
                button: "clawrez.gif",
            },
            {
                site: "https://demonin.com/",
                name: "Demonin",
                button: "demonin.png",
            },
            {
                site: "https://jbc.lol/",
                name: "jbcarreon123",
                button: "jbc.png",
            },
            {
                site: "https://thepaperpilot.org/",
                name: "The Paper Pilot",
                button: "!thepaperpilot.png",
            },
            {
                site: "https://yhvr.me/",
                name: "yhvr",
                button: "yhvr.gif",
            },
        ],
        "in the name of the indie web (10 megabytes worth of gifs, *go*):": [
            {
                site: "https://darkosparko.nekoweb.org/",
                name: "darkosparko",
                button: "https://darkosparko.nekoweb.org/rocket-button.gif",
            },
            {
                site: "https://melonking.net/",
                name: "Melonking",
                button: "https://melonking.net/images/badges/MELON-BADGE.GIF",
            },
            {
                site: "https://rabbitnet.neocities.org/",
                name: "RabbitNET",
                button: "rabbitnet.png",
            },
        ],
    }
}