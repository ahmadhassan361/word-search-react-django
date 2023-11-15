import { MAIN_BASE_URL } from "./contants";

class APIClient {
    static BASE_URL = MAIN_BASE_URL+'/api/v1'; // Replace with your Django server URL
  
    static async getCategories() {
      const response = await fetch(`${this.BASE_URL}/categories/`);
      const data = await response.json();
      return data;
    }
  
    static async createGame(gameData) {
      const response = await fetch(`${this.BASE_URL}/games/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gameData),
      });
      const data = await response.json();
      return data;
    }
    static async updateGame(gameData,key,id) {
      console.log("aiwdhaiwdhiawu")
      console.log(`${this.BASE_URL}/games/${key}/${id}/`)
      const response = await fetch(`${this.BASE_URL}/games/${key}/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gameData),
      });
      const data = await response.json();
      return data;
    }
  
    static async getGamesByCategory(categoryTitle) {
      const response = await fetch(`${this.BASE_URL}/games-by-category/${categoryTitle}/`);
      const data = await response.json();
      return data;
    }
  
    // static async updateGame(key, game_id, gameData) {
    //   const response = await fetch(`${this.BASE_URL}/games/${key}/${game_id}/`, {
    //     method: 'PATCH',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(gameData),
    //   });
    //   const data = await response.json();
    //   return data;
    // }
  
    static async getGameByGameId(game_id) {
      const response = await fetch(`${this.BASE_URL}/games-get/${game_id}/`);
      const data = await response.json();
      return data;
    }
  }
  
  export default APIClient;
  