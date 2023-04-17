const createEnemyPrompt = (enemyType) => {
    return `Create an enemy by the provided type of the enemy. Type of the enemy: ${enemyType}.  Extend the JSON object with additional properties dependently of the enemy type and respond only with the JSON object dependently of the type of the enemy:
    {
      "type": "type of the enemy",
      "health": {random, dependently of the type of the enemy}
      "attack": {random, dependently of the type of the enemy},
      "defense": {random, dependently of the type of the enemy},
    ...extended additional properties...
}`;
  };
  const createEnemy = async (enemyType) => {
    const response = await openaiApi.createCompletion({
      model: "text-davinci-003",
      prompt: createEnemyPrompt(enemyType),
      temperature: 0.7,
      max_tokens: 300,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
    });
  };

  const purchaseItemPrompt = (item, character) => {
    return `Create a prompt to ask the player if they want to purchase ${item} for ${calculateItemPrice(
      item,
      character
    )} gold, then parse and return the player's response in the following JSON object:
  {
  "gameType": "${character.gameType}",
  "name": "${character.name}",
  "race": "${character.race}",
  "class": "${character.class}",
  "health": ${character.health},
  "mana": ${character.mana},
  "strength": ${character.strength},
  "dexterity": ${character.dexterity},
  "intelligence": ${character.intelligence},
  "wisdom": ${character.wisdom},
  "charisma": ${character.charisma},
  "inventory": ${character.inventory},
  "abilities": ${character.abilities},
  "skills": ${character.skills},
  "location": "${character.location}"
  }`;
  };

  const purchaseItem = async (item, character) => {
    const response = await openaiApi.createCompletion({
      model: "text-davinci-003",
      prompt: purchaseItemPrompt(item, character),
      temperature: 0.1,
      max_tokens: 200,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
    });

    console.log(JSON.parse(response.data.choices[0].text));
    return JSON.parse(response.data.choices[0].text);
  };

  const calculateItemPrice = (item, character) => {
    return Math.round((item.basePrice * character.charisma) / 10);
  };

  const battlePrompt = (enemy, character) => {
    return `Create a prompt to ask the player what action they want to take against ${enemy}, then parse and return the selected action in the following JSON object:
  {
  "gameType": ${character.gameType},
  "name": ${character.name},
  "race": ${character.race},
  "class": ${character.class},
  "health": ${character.health},
  "mana": ${character.mana},
  "strength": ${character.strength},
  "dexterity": ${character.dexterity},
  "intelligence": ${character.intelligence},
  "wisdom": ${character.wisdom},
  "charisma": ${character.charisma},
  "inventory": ${character.inventory},
  "abilities": ${character.abilities},
  "skills": ${character.skills},
  "location": ${character.location},
  "enemy": ${enemy},
  "enemyHealth": ${enemy.health},
  "enemyStrength": ${enemy.strength},
  "enemyDexterity": ${enemy.dexterity},
  "enemyIntelligence": ${enemy.intelligence},
  "enemyWisdom": ${enemy.wisdom},
  "enemyCharisma": ${enemy.charisma},
  "enemyInventory": ${enemy.inventory},
  "enemyAbilities": ${enemy.abilities},
  "enemySkills": ${enemy.skills},
  "enemyLocation": ${enemy.location}
  }`;
  };

  const battle = async (enemy, character) => {
    const response = await openaiApi.createCompletion({
      model: "text-davinci-003",
      prompt: battlePrompt(enemy, character),
      temperature: 0.1,
      max_tokens: 200,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
    });

    console.log(JSON.parse(response.data.choices[0].text));
    return JSON.parse(response.data.choices[0].text);
  };

  const calculateDamage = (attacker, defender, action) => {
    let damage = 0;
    if (action === "attack") {
      damage = attacker.strength - defender.strength;
    } else if (action === "spell") {
      damage = attacker.intelligence - defender.intelligence;
    } else if (action === "ability") {
      damage = attacker.dexterity - defender.dexterity;
    }
    return damage;
  };

  const fightPrompt = (character, choosenWeaponOrSpell, enemy) => {
    return `Use the provided informations (character json object, character's choosen weapon or spell, enemy json object) to create a one round fight. character: ${character}, choosen weapon or spell: ${choosenWeaponOrSpell}, enemy: ${enemy}. Use only a JSON object as response!`;
  };
  const fight = async (character, choosenWeaponOrSpell, enemy) => {
    const response = await openaiApi.createCompletion({
      model: "text-davinci-003",
      prompt: fightPrompt(character, choosenWeaponOrSpell, enemy),
      temperature: 0,
      max_tokens: 300,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
    });

    console.log(JSON.parse(response.data.choices[0].text));
    return JSON.parse(response.data.choices[0].text);
  };

  const levelUpPrompt = (character) => {
    return `Create a prompt to notify the player that they have leveled up to level ${
      character.level + 1
    } and to prompt them to choose which attribute to increase by 1 point, then parse and return the selected attribute in the following JSON object:
  {
  "gameType": ${character.gameType},
  "name": ${character.name},
  "race": ${character.race},
  "class": ${character.class},
  "health": ${character.health},
  "mana": ${character.mana},
  "strength": ${character.strength},
  "dexterity": ${character.dexterity},
  "intelligence": ${character.intelligence},
  "wisdom": ${character.wisdom},
  "charisma": ${character.charisma},
  "inventory": ${character.inventory},
  "abilities": ${character.abilities},
  "skills": ${character.skills},
  "location": ${character.location},
  "level": ${character.level + 1}
  }`;
  };

  const teleportPrompt = (character) => {
    return `Create a prompt to ask the player if they want to teleport to a new location, and if so, prompt them to select a location from the map, then parse and return the selected location in the following JSON object:
    {
    "gameType": "${character.gameType}",
    "name": "${character.name}",
    "race": "${character.race}",
    "class": "${character.class}",
    "health": ${character.health},
    "mana": ${character.mana},
    "strength": ${character.strength},
    "dexterity": ${character.dexterity},
    "intelligence": ${character.intelligence},
    "wisdom": ${character.wisdom},
    "charisma": ${character.charisma},
    "inventory": ${character.inventory},
    "abilities": ${character.abilities},
    "skills": ${character.skills},
    "location": "${character.location}"
    }`;
  };

  const teleport = async (character) => {
    const response = await openaiApi.createCompletion({
      model: "text-davinci-003",
      prompt: teleportPrompt(character),
      temperature: 0.1,
      max_tokens: 200,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
    });

    console.log(JSON.parse(response.data.choices[0].text));
    return JSON.parse(response.data.choices[0].text);
  };

  const tradePrompt = (npc, character) => {
    return `Create a prompt to initiate trade with ${npc}, display their inventory and prompt the player to select an item to trade with, then parse and return the selected item in the following JSON object:
{
"gameType": "${character.gameType}",
"name": "${character.name}",
"race": "${character.race}",
"class": "${character.class}",
"health": ${character.health},
"mana": ${character.mana},
"strength": ${character.strength},
"dexterity": ${character.dexterity},
"intelligence": ${character.intelligence},
"wisdom": ${character.wisdom},
"charisma": ${character.charisma},
"inventory": ${character.inventory},
"abilities": ${character.abilities},
"skills": ${character.skills},
"location": "${character.location}",
"npc": "${npc}"
}`;
  };

  const trade = async (npc, character) => {
    const response = await openaiApi.createCompletion({
      model: "text-davinci-003",
      prompt: tradePrompt(npc, character),
      temperature: 0.1,
      max_tokens: 200,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
    });

    console.log(JSON.parse(response.data.choices[0].text));
    return JSON.parse(response.data.choices[0].text);
  };

  const questPrompt = (npc, character) => {
    return `Create a prompt to initiate a quest from ${npc}, and parse and return the player's response in the following JSON object:
  {
  "gameType": "${character.gameType}",
  "name": "${character.name}",
  "race": "${character.race}",
  "class": "${character.class}",
  "health": ${character.health},
  "mana": ${character.mana},
  "strength": ${character.strength},
  "dexterity": ${character.dexterity},
  "intelligence": ${character.intelligence},
  "wisdom": ${character.wisdom},
  "charisma": ${character.charisma},
  "inventory": ${character.inventory},
  "abilities": ${character.abilities},
  "skills": ${character.skills},
  "location": "${character.location}",
  "npc": "${npc}"
  }`;
  };

  const getQuest = async (npc, character) => {
    const response = await openaiApi.createCompletion({
      model: "text-davinci-003",
      prompt: questPrompt(npc, character),
      temperature: 0.1,
      max_tokens: 200,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
    });

    console.log(JSON.parse(response.data.choices[0].text));
    return JSON.parse(response.data.choices[0].text);
  };

  const enemyEncounterPrompt = (character) => {
    return `Create a prompt to initiate an enemy encounter in the player's current location, display the enemy's stats and prompt the player to select an action, then parse and return the selected action in the following JSON object:
{
"gameType": "${character.gameType}",
"name": "${character.name}",
"race": "${character.race}",
"class": "${character.class}",
"health": ${character.health},
"mana": ${character.mana},
"strength": ${character.strength},
"dexterity": ${character.dexterity},
"intelligence": ${character.intelligence},
"wisdom": ${character.wisdom},
"charisma": ${character.charisma},
"inventory": ${character.inventory},
"abilities": ${character.abilities},
"skills": ${character.skills},
"location": "${character.location}",
"enemy": "random enemy",
"enemyHealth": random health,
"enemyStrength": random strength,
"enemyDexterity": random dexterity,
"enemyIntelligence": random intelligence,
"enemyWisdom": random wisdom,
"enemyCharisma": random charisma
}`;
  };

  const useItemPrompt = (character) => {
    return `Create a prompt to prompt the player to select an item from their inventory to use, then parse and return the selected item in the following JSON object:
  {
  "gameType": "${character.gameType}",
  "name": "${character.name}",
  "race": "${character.race}",
  "class": "${character.class}",
  "health": ${character.health},
  "mana": ${character.mana},
  "strength": ${character.strength},
  "dexterity": ${character.dexterity},
  "intelligence": ${character.intelligence},
  "wisdom": ${character.wisdom},
  "charisma": ${character.charisma},
  "inventory": ${character.inventory},
  "abilities": ${character.abilities},
  "skills": ${character.skills},
  "location": "${character.location}"
  }`;
  };

  const useItem = async (character) => {
    const response = await openaiApi.createCompletion({
      model: "text-davinci-003",
      prompt: useItemPrompt(character),
      temperature: 0.1,
      max_tokens: 200,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
    });

    const randomEventPrompt = (character) => {
      return `Create a prompt to initiate a random event, and parse and return the player's response in the following JSON object:
{
"gameType": ${character.gameType},
"name": ${character.name},
"race": ${character.race},
"class": ${character.class},
"health": ${character.health},
"mana": ${character.mana},
"strength": ${character.strength},
"dexterity": ${character.dexterity},
"intelligence": ${character.intelligence},
"wisdom": ${character.wisdom},
"charisma": ${character.charisma},
"inventory": ${character.inventory},
"abilities": ${character.abilities},
"skills": ${character.skills},
"location": ${character.location}
}`;
    };

    const randomEvent = async (character) => {
      const response = await openaiApi.createCompletion({
        model: "text-davinci-003",
        prompt: randomEventPrompt(character),
        temperature: 0.1,
        max_tokens: 200,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0.6,
      });

      console.log(JSON.parse(response.data.choices[0].text));
      return JSON.parse(response.data.choices[0].text);
    };

    console.log(JSON.parse(response.data.choices[0].text));
    return JSON.parse(response.data.choices[0].text);
  };