// pet_logic.js

import { consumeItem } from './StudyPetManager.js';

export const CONFIG = {
	TICK_RATE: 10000, /*The rate where the stat is refresh*/
	EXP_PER_LEVEL: 100,

	/*The drain rate for different stat*/
	Drain: {
		Hunger: 1,
		Mood: 1,
		Health_Low_hunger: 3,
		Health_Failed_task: 15
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

	let hungerDrainMult = 1;

	if (mood < 25) hungerDrainMult = 2;
	else if (mood < 50) hungerDrainMult = 1.5;

	hunger = clamp(
		hunger - (CONFIG.Drain.Hunger * hungerDrainMult),
		0,
		CONFIG.Caps.Stats
	);

	mood = clamp(
		mood - CONFIG.Drain.Mood,
		0,
		CONFIG.Caps.Stats
	);

	if (hunger < 20) {
		health = clamp(
			health - CONFIG.Drain.Health_Low_hunger,
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