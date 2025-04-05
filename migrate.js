(() => {
    // if (!window.location.href.toLowerCase().includes("ducdat0507.github.io")) return;

    async function migrateAll(iframe, status) {
        let index = 0;
        let key = "";
        while ((key = localStorage.key(index)) != null) {
            index++;
            status.textContent = "Status: migrating (" + index + " / " + localStorage.length + ")";
            await migrateOne(iframe, key);
        }
        status.textContent = "Status: complete";
        // localStorage.setItem("duducat-migrated", true);
        setTimeout(() => iframe.parentElement.remove(), 5000);
    }

    function migrateOne(iframe, key) {
        console.log("Migrating " + key);
        requestAnimationFrame(() => {
            iframe.contentWindow.postMessage({
                type: "duducat-set-local-storage",
                key: key,
                value: localStorage.getItem(key)
            }, {
                targetOrigin: "https://duducat.moe"
            });
        })
        let promise = new Promise(((resolve, reject) => {
            let eventHandler = (e) => {
                if (
                    e.origin != "https://duducat.moe"
                    || e.data?.type != "duducat-set-local-storage"
                    || e.data.key != key
                ) return;
                window.removeEventListener("message", eventHandler);
                if (e.data.success) resolve();
                else reject();
            }
            window.addEventListener("message", eventHandler);
        }));
        return promise;
    }

    window.addEventListener("DOMContentLoaded", () => {
    
        console.log("adding banner");
        let style = document.createElement("style");
        let status = null;
        style.innerHTML = `
            .__migrate-banner {
                z-index: 2147483647;
                transform: translateX(-50%);
                position: fixed;
                background: #000;
                color: white;
                border: 2px solid white;
                bottom: 10px;
                left: 50%;
                width: max-content;
                max-width: calc(100% - 20px);
                padding: 10px 12px;
                box-sizing: border-box;
                font-family: Arial, Helvetica, FreeSans, sans-serif;
                font-size: 16px;
                line-height: 1.3;
                text-align: center;
            }

            .__migrate-banner a {
                color: #ccf;
                text-decoration: 1px underline dashed;
            }
            .__migrate-banner a:hover {
                color: white;
                text-shadow: 0 0 4px #ccfc;
                text-decoration: 1px underline solid;
            }

            .__migrate-banner hr {
                border: none;
                border-bottom: 2px solid white;
                margin-block: 10px;
            }

            .__migrate-banner iframe {
                position: absolute;
                width: 0;
                height: 0;
                opacity: 0;
                pointer-events: none;
            }
        `
        document.head.append(style);

        let banner = document.createElement("div");
        banner.classList.add("__migrate-banner");
        banner.innerHTML = `
            <div>
                <strong>
                    <i style="text-decoration: 1px solid underline">PUBLIC ANNOUNCEMENT:</i> 
                    I'm moving all my stuff from <del>ducdat0507.github.io</del> to <a href="//duducat.moe">duducat.moe</a>!
                </strong><br/>
                I'll now transfer all of your save data to the new domain to prepare for the migration.
                <hr>
                <div class="__migration-status"></div>
            </div>
        `
        document.body.append(banner);
        status = banner.querySelector(".__migration-status");
        status.textContent = "Status: loading iframe...";

        let iframe = document.createElement("iframe");
        iframe.src = "//duducat.moe";
        iframe.onload = () => {
            if (!localStorage.getItem("duducat-migrated"))
                migrateAll(iframe, status);
            else {
                status.textContent = "Status: completed";
                setTimeout(() => banner.remove(), 5000);
            }
        }
        banner.append(iframe);
    })
})()