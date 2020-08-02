import { action, computed, decorate, observable, runInAction } from "mobx";
import axios from "axios";

export class RestaurantStore {
  //observable
  restaurantList = [];
  editRestaurant = {};
  restaurantTypes = [];

  //computed
  get inputElements() {
    return [
      { name: "name", defaultValue: this.editRestaurant.name },
      {
        name: "address",
        type: "textarea",
        defaultValue: this.editRestaurant.address,
      },
      {
        name: "description",
        type: "textarea",
        defaultValue: this.editRestaurant.description,
      },
      {
        name: "restaurantTypes",
        type: "select",
        select: {
          multiple: true,
          options: this.restaurantTypes,
          selected: this.editRestaurant.restaurantTypes,
        },
      },
    ];
  }

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  //action
  async fetchRestaurants() {
    const url = "/restaurants/all";
    const res = await axios.get(url);
    runInAction(() => {
      // console.log(res.data);
      this.restaurantList = res.data;
    });
  }

  //action
  addRestaurant(restaurant) {
    this.restaurantList.push(restaurant);
  }

  //action
  async fetchEditRestaurant(id) {
    const url = `/restaurants/edit/${id}`;
    const res = await axios.get(url);
    runInAction(() => {
      // console.log("Edit Restaurant", res.data);
      this.editRestaurant = res.data;
    });
  }

  //action
  async fetchRestaurantTypes() {
    const getAllRestaurantTypesUrl = "/restaurant_types/all";
    const res = await axios.get(getAllRestaurantTypesUrl);

    runInAction(() => {
      // console.log("Edit Restaurant", res.data);
      this.restaurantTypes = res.data.map((type) => ({
        id: type.id,
        name: type.name,
      }));
    });
  }
}

decorate(RestaurantStore, {
  restaurantList: observable,
  fetchRestaurants: action,
  addRestaurant: action.bound,
  fetchEditRestaurant: action,
  editRestaurant: observable,
  inputElements: computed,
  fetchRestaurantTypes: action,
  restaurantTypes: observable,
});
