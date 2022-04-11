export const TOKEN_KEY = "stock-token"

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null

export const getToken = () => localStorage.getItem(TOKEN_KEY)

export const login = token => {
	localStorage.setItem(TOKEN_KEY, token)
}

export const logout = () => {
	localStorage.removeItem(TOKEN_KEY)
	localStorage.removeItem('@name-stock')
	localStorage.removeItem('@user-stock')
}