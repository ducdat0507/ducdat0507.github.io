<script lang="ts">
  import Icon from "@iconify/svelte";
    import { Body, Box, Edge, Vec2, World } from "planck";
    import { onMount } from "svelte";
  import Tooltip from "../utils/Tooltip.svelte";

    export type TechStackItem = {
        name: string,
        color?: string,
        boxStyle?: string,
        iconName?: string,
        iconURL?: string,
        iconColor?: string,
        iconStyle?: string,
        priority: number,
    }

    let {
        items = []
    }: {
        items: TechStackItem[]
    } = $props();

    let canvas: HTMLCanvasElement;

    let world: World;
    let interval: number;
    let data: {
        leftWall: Body | null,
        rightWall: Body | null,
        boxes: Body[],
        counter: number
    } = $state({
        leftWall: null,
        rightWall: null,
        boxes: [],
        counter: 1,
    });
    let divHolder: HTMLDivElement;

    onMount(() => {
        world = new World({
            gravity: {x: 0, y: -9.81},
        });

        // Add bounds
        let ground = world.createBody({
            type: "static",
            position: new Vec2(0, 0),
        })
        ground.createFixture({ shape: new Edge(new Vec2(-20, 0), new Vec2(20, 0)) });
        // Add walls
        data.leftWall = world.createBody({
            type: "kinematic",
            position: new Vec2(-5, 0),
        })
        data.leftWall.createFixture({ shape: new Box(10, 100, new Vec2(-10, 0)) });
        data.rightWall = world.createBody({
            type: "kinematic",
            position: new Vec2(5, 0),
        })
        data.rightWall.createFixture({ shape: new Box(10, 100, new Vec2(10, 0)) });
Box
        // Add boxes
        let yPos = 12;
        for (let item of items) {
            let box = world.createDynamicBody({
                position: new Vec2(Math.random(), yPos + item.priority / 4 + 0.5),
            })
            box.createFixture({ shape: new Box(item.priority / 4, item.priority / 4), density: 1 })
            yPos += item.priority / 2 + 1;
            data.boxes.push(box);
        }

        interval = setInterval(onTick, 33);
        return onUnmount;
    })

    function onTick() {
        let divStyle = window.getComputedStyle(divHolder);
        let currentWidth = data.rightWall!.getPosition().x;
        let halfWidth = divHolder.clientWidth / parseFloat(divStyle.fontSize) / 4;
        halfWidth = Math.min(Math.max(halfWidth, currentWidth - .5), currentWidth + .5);
        data.leftWall!.setPosition(new Vec2(-halfWidth, 0));
        data.rightWall!.setPosition(new Vec2(halfWidth, 0));
        world.step(0.05);
        data.counter++;
    }

    function onUnmount() {
        clearInterval(interval);
        data.boxes = []
    }
</script>

<div class="tech-stack" bind:this={divHolder}>
    {#each data.boxes as box, index}
        <div class="tech-stack-box" 
            style:transform={(data.counter, `translate(${box.getPosition().x * 2}em, ${-box.getPosition().y * 2}em) rotate(${-box.getAngle()}rad)`)}
            style:--bg-color={items[index].color}
            style:--size={`${items[index].priority}em`}
            style={items[index].boxStyle}
            aria-label={items[index].name}>
            <Tooltip>{items[index].name}</Tooltip>
            {#if items[index].iconURL}
                <img src={items[index].iconURL} alt="" aria-hidden={true} />
            {:else}
                <Icon style={items[index].iconStyle} icon={items[index].iconName!} color={items[index].iconColor} />
            {/if}
        </div> 
    {/each}
</div>

<style>
    .tech-stack {
        position: relative;
    }
    .tech-stack-box {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        bottom: calc(var(--size, 1em) / -2);
        right: calc(50% - var(--size, 1em) / 2);
        width: var(--size, 1em);
        height: var(--size, 1em);
        background: var(--bg-color, black);
        border: 2px solid white;
        transition: transform 50ms;
    }
    .tech-stack-box :global(:is(img, svg)) {
        width: 80%;
        height: 80%;
    }
</style>