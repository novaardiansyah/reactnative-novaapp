type LogoutCallback = () => void;

let logoutCallback: LogoutCallback | null = null;

export function setLogoutCallback(cb: LogoutCallback) {
  logoutCallback = cb;
}

let isLoggingOut = false

export function triggerLogout() {
  if (!isLoggingOut && logoutCallback) {
    isLoggingOut = true
    logoutCallback()
    setTimeout(() => { isLoggingOut = false }, 1000)
  }
}