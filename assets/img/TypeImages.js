const images = {
  logos: {
    bug: require('./types/bug.png'),
    dark: require('./types/dark.png'),
    dragon: require('./types/dragon.png'),
    electricity: require('./types/electricity.png'),
    fairy: require('./types/fairy.png'),
    fight: require('./types/fight.png'),
    fire: require('./types/fire.png'),
    flying: require('./types/flying.png'),
    ghost: require('./types/ghost.png'),
    grass: require('./types/grass.png'),
    ground: require('./types/ground.png'),
    ice: require('./types/ice.png'),
    normal: require('./types/normal.png'),
    poison: require('./types/poison.png'),
    psychic: require('./types/psychic.png'),
    rock: require('./types/rock.png'),
    steel: require('./types/steel.png'),
    water: require('./types/water.png'),
  },
  logos_color: {
    bug: '#9FB119',
    dark: '#644D3D',
    dragon: '#7138F8',
    electric: '#F9D030',
    fairy: '#F58ABE',
    fighting: '#B92720',
    fire: '#EF7528',
    flying: '#A087EE',
    ghost: '#654E8E',
    grass: '#6DC245',
    ground: '#DCB95D',
    ice: '#8ED4D4',
    normal: '#A8A978',
    poison: '#9F41A0',
    psychic: '#F74D7E',
    rock: '#B2972E',
    steel: '#B1B2CB',
    water: '#5E87EE',
  },

  GetImage: (name) => {
    return images.logos_static[name] || null;
  },
  GetColor: (name) => {
    return images.logos_color[name] || null;
  },
};

export default images;
