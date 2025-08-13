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
                // button: "none",
            },
            {
                site: "https://jbc.lol/",
                name: "jbcarreon123",
                button: "jbc.png",
            },
            {
                site: "https://thepaperpilot.org/",
                name: "The Paper Pilot",
                // button: "none",
            },
            {
                site: "https://yhvr.me/",
                name: "yhvr",
                button: "yhvr.gif",
            },
        ],
        "in the name of the indie web (10MB worth of gifs, let's go):": [
            {
                site: "https://darkosparko.nekoweb.org/",
                name: "darkosparko",
                button: "https://darkosparko.nekoweb.org/rocket-button.gif",
            },
        ],
    }
}