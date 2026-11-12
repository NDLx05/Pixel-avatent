# PixelWorld design / implementation notes

## Chosen direction

The user delegated product/technical choices. This delivery is a landscape-first, single-player action RPG/PWA for Safari iPhone, with an MMORPG-inspired HUD. Native iOS was not chosen because the requested handoff is portable source for GitHub; multiplayer was not chosen because it requires a separate authoritative server and account infrastructure. No multiplayer experience is implied by decorative UI.

## Loop

Explore → fight → collect gold/EXP → claim quest → unlock next region → upgrade → defeat boss. Quest rewards must be claimed, and persistent progress is versioned. The player can use free village healing or consumables and loses no resources on revival.

## Architecture

Buildless ES modules; Canvas 2D world renderer, HTML/CSS overlay UI; deterministic terrain generator; all art/audio local or generated with code. Logical world units independent of the device's pixel ratio; screen canvas DPR capped at 2. One ground canvas retained for the current region. Entities update while gameplay is active and pause for menus. Input is reset on modal/blur/visibility changes to avoid stuck movement.

Original sprite atlases are addressed by manifest rows and rendered nearest-neighbour. The five source states are preserved. Heroes/monsters use left/right flip; no fictional eight-direction sprite set is claimed. Two decorative pets use code-native pixel rectangles, with time-based standing, walking, attacking, hurt and fallen states available in the gallery.

## Persistence

Only hero stats, region, quest index/count, selected companion and opened chests persist. Monsters reset on entering a region or resuming. Local storage saves periodically, on meaningful progression, and on page hide. Restore sanitizes numeric bounds and allowed identifiers; imported files are size-limited. Cloud storage and accounts are deliberately outside this version.

## Expansion points

Add maps/spawns in world.js, balance/quests in core.js, effects in render.js, UI actions in game.js. For true multiplayer, move combat/loot/quests to a server-authoritative model; client localStorage cannot be trusted for shared economy or rankings.
