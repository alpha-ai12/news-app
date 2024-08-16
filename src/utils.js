import EventEmitter from "eventemitter3";
import { Dimensions } from "react-native";
export const customScreenWidth = Dimensions.get("screen").width;
export const customScreenHeight = Dimensions.get("screen").height;
export const customWidth = Dimensions.get("window").width;
export const customHeight = Dimensions.get("window").height;
const eventEmitter = new EventEmitter();
const Emitter = {
  on: (event, fn) => eventEmitter.on(event, fn),
  once: (event, fn) => eventEmitter.once(event, fn),
  off: (event, fn) => eventEmitter.off(event, fn),
  emit: (event, payload) => eventEmitter.emit(event, payload),
};
Object.freeze(Emitter);
export default Emitter;
