<script lang="ts">
    import Icon from "@iconify/svelte";

</script>

<p>
    Have a website?<br/>
    Use these buttons to link back to my website!!!
</p>
<div class="button-entries">
    <div class="button-entry links">
        <div class="button-preview">
            <img src="/index/res/buttons/duducat.svg" alt='"duducat&#39;s website" button' />
        </div>
        <div class="link-tile">
            <a class="pop-out-btn" href="/index/res/buttons/duducat.svg" aria-label="download .svg" download="duducat.svg">
                <Icon icon="iconoir:arrow-down" />
                <span>.svg</span>
            </a>
        </div>
        <div class="link-tile">
            <a class="pop-out-btn" href="/index/res/buttons/duducat.gif" aria-label="download .gif" download="duducat.gif">
                <Icon icon="iconoir:arrow-down" />
                <span>.gif</span>
            </a>
        </div>
    </div>
</div>

<style>
    .button-entries {
        display: flex;
        flex-flow: column;
        gap: 8px;
        margin-top: 0.5em;
    }
    .button-entry {
        display: flex;
        flex-flow: row;
        gap: 4px;
    }
    .button-entry > .button-preview {
        padding: 1px;
        border: 1px solid #abf;
    }
    .button-entry > .button-preview img {
        display: block;
        width: 88px;
        height: 31px;
    }
    .button-entry > .link-tile {
        flex: 0 0 70px;
        width: 70px;
        height: 35px;
    }
    .button-entry > .link-tile span {
        line-height: 1;
        bottom: .4em;
    }
    .button-entry > .link-tile a {
        --inset-border: 0px;
        display: block;
        width: 100%;
        height: 100%;
        border: none;
        background: #abf;
        color: black;
        padding: 0.5em;
    }
</style>