import { createRawSnippet } from "svelte"
import { setPopup } from "../components/utils/PopupDisplayer.svelte"
import { render } from "svelte/server"

export type WebsiteDefinition = {
    name: string,
    site: string,
    button?: string,
    onNav?: (event: Event) => void,
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
                site: "https://spax.zone/",
                name: "Spax",
                button: "spaxdotzone.gif",
            },
            {
                site: "https://thepaperpilot.org/",
                name: "The Paper Pilot",
                button: "thepaperpilot.png",
            },
            {
                site: "https://purring.fyi/",
                name: "wackbyte",
                button: "wackbyte.png",
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
                onNav(e: Event) {
                    let now = new Date();
                    now.setHours(now.getHours() - 1);
                    if (now.getDay() == 1) {
                        e.preventDefault();
                        setPopup("heads up", `
                            <span>
                                <p><i>melonking.net</i> periodically closes on Mondays (GMT+1).</p>
                                <p>Do you still wish to proceed?</p>
                            </span>
                        `, [
                            { name: "nevermind", icon: "iconoir:arrow-left" },
                            null,
                            { name: "continue", icon: "iconoir:arrow-right", href: "https://melonking.net/" },
                        ])
                    }
                }
            },
            {
                site: "https://rabbitnet.neocities.org/",
                name: "RabbitNET",
                button: "rabbitnet.png",
            },
        ],
    }
}