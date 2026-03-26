export const saveUserData = (username: string, money: number, pokemons: any[]) => {
  const allUsers = JSON.parse(localStorage.getItem('game_users') || '{}');
  allUsers[username] = { money, pokemons };
  localStorage.setItem('game_users', JSON.stringify(allUsers));
};

export const getUserData = (username: string) => {
  const allUsers = JSON.parse(localStorage.getItem('game_users') || '{}');
  return allUsers[username] || null;
};