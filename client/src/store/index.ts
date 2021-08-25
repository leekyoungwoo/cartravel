import { combineReducers } from "redux";
import CampReducer from './camp';

interface modulesType {
  [key: string]: any;
}

const modules:modulesType = {};
modules.camp = CampReducer

export default combineReducers(modules);
