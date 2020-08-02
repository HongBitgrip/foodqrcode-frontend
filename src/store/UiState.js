import { action, decorate, observable } from "mobx";

export class UiState {
  //observable
  pageTitle = "";

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  //action
  setPageTitle(pageTitle) {
    this.pageTitle = pageTitle;
  }
}

decorate(UiState, {
  pageTitle: observable,
  setPageTitle: action,
});
