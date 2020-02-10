import * as mobx from 'mobx';
import autoSave from 'stores/localStorageAutoSave';

/**
 * Notification store, used to display new notifications of different types.
 * Use the two main functions for this purpose: `notificationStore.set(type, message)` and `notificationStore.clear()`
 */
class notificationStore {
  constructor() {
    autoSave(this, 'i18nStore');
  }
  
  @mobx.computed get message() {
    return this.current && this.current.message;
  }

  @mobx.computed get type() {
    return this.current && this.current.type;
  }

  /**
   * Creates and displays a new notification
   * 
   * @param {string} type - one of error|warning|success
   * @param {string} message - usually a prismic translation
   * 
   * @return {notificationStore} self
   */
  @mobx.action set(type, message) {
    this.current = { type, message };

    return this;
  }

  /**
   * Clears the notification and hides it
   * Usually no need to use it directly, handled by the Notification component
   * 
   * @return {notificationStore} self
   */
  @mobx.action clear() {
    this.current = null;

    return this;
  }

  hasNotification() {
    return !!this.current;
  }

  isError() {
    return this.type === 'error';
  }

  isWarning() {
    return this.type === 'warning';
  }

  isSuccess() {
    return this.type === 'success';
  }
}

export default new notificationStore();
