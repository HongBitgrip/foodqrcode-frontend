import _ from "lodash";

export function randomString(length) {
  return _.times(20, () => _.random(35).toString(36)).join("");
}
