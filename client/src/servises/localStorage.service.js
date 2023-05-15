const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";
const USERID_KEY = "user-local-id";
const TEAM_ID = 'teamId'


const setTokens = ({refreshToken, accessToken, userId, expiresIn = 3600}) => {
    const expiresDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(USERID_KEY, userId);
    localStorage.setItem(TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.setItem(EXPIRES_KEY, expiresDate);
}

const getAccessToken = () => {
    return localStorage.getItem(TOKEN_KEY);
}

const getRefreshToken = () => {
    return localStorage.getItem(REFRESH_KEY);
}

const removeAuthData = () => {
    localStorage.removeItem(USERID_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(EXPIRES_KEY);
    localStorage.removeItem(TEAM_ID);
}

const getTokenExpiresDate = () => {
    return localStorage.getItem(EXPIRES_KEY);
}

// Берём ID пользователя (который ещё записан в таблице регистрации)
const getUserId = () => {
    return localStorage.getItem(USERID_KEY);
}

const getTeamId = () => {
    return localStorage.getItem(TEAM_ID);
}

const setTeamId = (teamId) => {
    localStorage.setItem(TEAM_ID, teamId);
}

const removeTeamId = () => {
    localStorage.removeItem(TEAM_ID);
}


const localStorageService = {
    setTokens,
    getAccessToken,
    getRefreshToken,
    getTokenExpiresDate,
    getUserId,
    removeAuthData,
    getTeamId,
    setTeamId,
    removeTeamId,
};
export default localStorageService;
