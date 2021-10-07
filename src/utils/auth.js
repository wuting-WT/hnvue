
const Token = 'TOKEN'
const TokenType = 'TOKEN_TYPE'

export function getToken () {
  return localStorage.getItem(TokenType) + ' ' + localStorage.getItem(Token)
}

export function setToken (data) {
  localStorage.setItem(Token, data.token)
  localStorage.setItem(TokenType, data.tokenType)
}

export function removeToken () {
  localStorage.removeItem(Token)
  localStorage.removeItem(TokenType)
}
