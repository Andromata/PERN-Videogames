export function filters(array, filters) {
  var filteredGames = [...array];
  if (filters.order === "az") {
    filteredGames = filteredGames.sort((a, b) =>
      a.name < b.name ? -1 : +(a.name > b.name)
    );
  }
  if (filters.order === "za") {
    filteredGames = filteredGames.sort((a, b) =>
      a.name > b.name ? -1 : +(a.name < b.name)
    );
  }
  if(filters.order === "des"){
    filteredGames = filteredGames.sort((a, b) => a.rating < b.rating ? -1 : +(a.rating > b.rating))
  }
  if(filters.order === "asc"){
    filteredGames = filteredGames.sort((a, b) => a.rating > b.rating ? -1 : +(a.rating < b.rating))
  }
  if (filters.genre !== "all" && filters.genre.length > 0) {
    filteredGames = filteredGames.map((game) => {
      var status = false;
      game.genres.forEach((genre) => {
        if (genre.name === filters.genre) {
          status = true;
        }
      });
      if (status) return game;
      return null
    });
    filteredGames = filteredGames.filter((g) => g !== undefined);
  }
  if (filters.platform !== "all"  && filters.platform.length > 0) {
    filteredGames = filteredGames.map((game) => {
      var status = false;
      game.platforms.forEach((platform) => {
        if (platform.name === filters.platform) {
          status = true;
        }
      });
      if (status) return game;
      return null
    });
    filteredGames = filteredGames.filter((g) => g !== undefined);
  }

  return filteredGames;
}
