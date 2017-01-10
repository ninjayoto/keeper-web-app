import { createAction, handleActions } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
export const INIT_AUTH = 'INIT_AUTH'

// ------------------------------------
// Actions
// ------------------------------------
export const initAuthenticationRequest = createAction(INIT_AUTH)
export const initAuthenticationFailure = createAction(INIT_AUTH, (err) => {
  return { error: err }
})
export const initAuthenticationSuccess = createAction(INIT_AUTH, (authenticated) => {
  return { authenticated }
})

export const initAuthentication = () => {
  return (dispatch, getState) => {
    dispatch(initAuthenticationRequest())
    return new Promise(function (resolve, reject) {
      window._keycloak.init({onLoad: 'check-sso'}).success((authenticated) => {
        resolve(dispatch(initAuthenticationSuccess(authenticated)))
      }).error((e) => {
        reject(dispatch(initAuthenticationFailure(e)))
      })
    })
  }
}

export const actions = {
  initAuthentication
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [INIT_AUTH]: (state, action) => {
    const update = {
      isProcessing: false
    }
    const {authenticated, error} = action.payload || {}
    if (error) {
      update.error = error
    } else if (authenticated) {
      update.authenticated = authenticated
    } else {
      update.isProcessing = true
    }
    return Object.assign({}, state, update)
  }
}, {
  isProcessing: false,
  authenticated: false
})

// Put keycloak to window scope
window._keycloak = new window.Keycloak('/keycloak.json')
