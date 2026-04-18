//pet_logics.js

export const CONFIG = {
  TICK_RATE: 5000, // The rate where the stat is refreshed
  EXP_PER_LEVEL: 100,

  // Drain rates
  DRAIN: {
    HUNGER: 2,
    MOOD: 1.5,
    HEALTH_LOW_HUNGER: 3,
    HEALTH_FAILED_TASK: 15
  },

  // Caps
  CAPS: {
    STATS: 100,
    INTERACT_MOOD: 50 // interacting caps mood at 50
  },

  // Interaction effects
  INTERACTION: {
    MOOD_GAIN: 10
  }
};

export const ITEM_DATABASE = {
  Apple: { type: 'food', hungerBonus: 10, moodBonus: 1 },
  Ball: { type: 'mood', hungerBonus: 0, moodBonus: 10 }
};

// Optional helper
const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

// If you plan to use total EXP system
export function calculateLevel(totalExp) {
  return {
    level: Math.floor(totalExp / CONFIG.EXP_PER_LEVEL) + 1,
    expInLevel: totalExp % CONFIG.EXP_PER_LEVEL
  };
}

export function processTick(currentStats) {
  let { health, hunger, mood, level, exp } = { ...currentStats };

  // Hunger drain multiplier based on mood
  let hungerDrainMult = 1;
  if (mood < 25) hungerDrainMult = 2;
  else if (mood < 50) hungerDrainMult = 1.5;

  // Apply drains
  hunger = clamp(hunger - (CONFIG.DRAIN.HUNGER * hungerDrainMult), 0, CONFIG.CAPS.STATS);
  mood = clamp(mood - CONFIG.DRAIN.MOOD, 0, CONFIG.CAPS.STATS);

  // Health penalty if starving
  if (hunger < 20) {
    health = clamp(health - CONFIG.DRAIN.HEALTH_LOW_HUNGER, 0, CONFIG.CAPS.STATS);
  }

  return { health, hunger, mood, level, exp, lastTick: Date.now() };
}

export function completeAssignmentLogic(currentStats, difficulty) {
  let { health, hunger, mood, level, exp } = { ...currentStats };
  const reward = REWARDS[difficulty] || REWARDS.Easy;

  // Apply rewards
  exp += reward.exp;
  mood = clamp(mood + 5, 0, CONFIG.CAPS.STATS);
  health = clamp(health + 2, 0, CONFIG.CAPS.STATS);

  // Level up logic (using level + exp system)
  while (exp >= CONFIG.EXP_PER_LEVEL) {
    exp -= CONFIG.EXP_PER_LEVEL;
    level += 1;
  }

  return {
    updatedStats: { health, hunger, mood, level, exp, lastTick: Date.now() },
    newItems: reward.items
  };
}

export function failAssignmentLogic(currentStats) {
  let { health, hunger, mood, level, exp } = { ...currentStats };

  health = clamp(health - CONFIG.DRAIN.HEALTH_FAILED_TASK, 0, CONFIG.CAPS.STATS);
  mood = clamp(mood - 10, 0, CONFIG.CAPS.STATS);

  return { health, hunger, mood, level, exp, lastTick: Date.now() };
}

export function interactLogic(currentStats) {
  let { mood } = currentStats;

  if (mood >= CONFIG.CAPS.INTERACT_MOOD) {
    return { ...currentStats };
  }

  return {
    ...currentStats,
    mood: clamp(
      mood + CONFIG.INTERACTION.MOOD_GAIN,
      0,
      CONFIG.CAPS.INTERACT_MOOD
    )
  };
}

export function useItemLogic(currentStats, itemConfig = {}) {
  return {
    ...currentStats,
    hunger: clamp(
      currentStats.hunger + (itemConfig.hungerBonus || 0),
      0,
      CONFIG.CAPS.STATS
    ),
    mood: clamp(
      currentStats.mood + (itemConfig.moodBonus || 0),
      0,
      CONFIG.CAPS.STATS
    ),
    health: clamp(
      currentStats.health + 2,
      0,
      CONFIG.CAPS.STATS
    )
  };
}