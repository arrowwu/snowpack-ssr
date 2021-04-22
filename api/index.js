import fetch from "node-fetch";

const api = {
  getChampions() {
    return fetch(`http://ddragon.leagueoflegends.com/cdn/11.8.1/data/en_US/champion.json`);
  },
  
  getChampionInfo(name) {
    return fetch(`http://ddragon.leagueoflegends.com/cdn/11.8.1/data/en_US/champion/${name}.json`);
  }
};

export default api;
