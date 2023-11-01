package main

const MAX_ROUNDS = 100

const HARBOUR_DAMAGE_RADIUS = 8
const HARBOUR_DAMAGE = 1

const BASE_DAMAGE_RADIUS = 4
const BASE_DAMAGE = 1

const SHIP_SEE_RANGE = 1.5
const NEW_PLAYER_GOLD = 40

const MOVE = "MOVE"
const TRADE = "TRADE"
const LOOT = "LOOT"
const SHOOT = "SHOOT"
const BUY = "BUY"
const STORE = "STORE"

var BASE_PRODUCTION = [...]int{10, 5, 2, 1, 3, 2, 5, 3, 0}
var BASE_PRICE = [...]int{1, 2, 5, 10, 3, 5, 2, 3, 1}
