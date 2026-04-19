// pet_logic.js

import { consumeItem } from './StudyPetManager.js';

export const CONFIG = {
	TICK_RATE: 10000, /*The rate where the stat is refresh*/
	EXP_PER_LEVEL: 100,

	/*The drain rate for different stat - varies by mood*/
	Drain: {
		// High mood (> 50%) - 48 hour drain
		Hunger_High: 0.006,
		Mood_High: 0.004,
		Health_Low_hunger_High: 0.006,
		
		// Low mood (<= 50%) - 12 hour drain
		Hunger_Low: 0.025,
		Mood_Low: 0.015,
		Health_Low_hunger_Low: 0.025,
		
		Health_Failed_task: 0.05
	},

	Caps: {
		Stats: 100,
		Interact_Mood: 50
	}
};

export const ITEM_DATABASE = {
	Apple: { type: 'food', hungerBonus: 10, moodBonus: 1 },
	Ball: { type: 'mood', hungerBonus: 0, moodBonus: 10 }
};


const SAVE_KEY = "pet_save_data";

export function saveGame(stats) {
	localStorage.setItem(SAVE_KEY, JSON.stringify(stats));
}

export function loadGame() {
	const data = localStorage.getItem(SAVE_KEY);
	return data ? JSON.parse(data) : null;
}

//
// Utility
//
const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

//
// Level calculation
//
export function calculateLevel(totalExp) {
	return {
		level: Math.floor(totalExp / CONFIG.EXP_PER_LEVEL) + 1,
		expInLevel: totalExp % CONFIG.EXP_PER_LEVEL
	};
}

//
// Process stat decay over time
//
export function processTick(currentStats) {
	let { health, hunger, mood, level, exp } = { ...currentStats };

	// Determine drain rates based on mood level
	const isLowMood = mood <= 50;
	const hungerDrain = isLowMood ? CONFIG.Drain.Hunger_Low : CONFIG.Drain.Hunger_High;
	const moodDrain = isLowMood ? CONFIG.Drain.Mood_Low : CONFIG.Drain.Mood_High;
	const healthDrain = isLowMood ? CONFIG.Drain.Health_Low_hunger_Low : CONFIG.Drain.Health_Low_hunger_High;

	hunger = clamp(
		hunger - hungerDrain,
		0,
		CONFIG.Caps.Stats
	);

	mood = clamp(
		mood - moodDrain,
		0,
		CONFIG.Caps.Stats
	);

	if (hunger < 20) {
		health = clamp(
			health - healthDrain,
			0,
			CONFIG.Caps.Stats
		);
	}

	const updatedStats = {
		health,
		hunger,
		mood,
		level,
		exp,
		lastTick: Date.now()
	};

	
	saveGame(updatedStats);

	return updatedStats;
}

//
// Assignment completion logic
//
export function completeAssignmentLogic(currentStats, difficulty, REWARDS) {
	let { health, hunger, mood, level, exp } = { ...currentStats };

	const reward = REWARDS[difficulty] || REWARDS.Easy;

	exp += reward.exp;
	mood = clamp(mood + 5, 0, CONFIG.Caps.Stats);
	health = clamp(health + 2, 0, CONFIG.Caps.Stats);

	while (exp >= CONFIG.EXP_PER_LEVEL) {
		exp -= CONFIG.EXP_PER_LEVEL;
		level += 1;
	}

	const updatedStats = {
		health,
		hunger,
		mood,
		level,
		exp,
		lastTick: Date.now()
	};

	
	saveGame(updatedStats);

	return updatedStats;
}

//
// Death check logic
//
export function checkPetDeath(currentStats) {
	return currentStats.health <= 0;
}

//
// Get initial stats
//
export function getInitialStats() {
	return {
		health: 100,
		hunger: 100,
		mood: 100,
		level: 1,
		exp: 0,
		lastTick: Date.now()
	};
}

//
// Reset game to initial state
//
export function resetGame() {
	const initialStats = getInitialStats();
	saveGame(initialStats);
	return initialStats;
}