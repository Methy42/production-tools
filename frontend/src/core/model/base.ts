import { storage } from "../utils";

/**
 * 数据模型配置项
 * @param {string} namespace 名称，用来区分db
 * @param {number} dbExpires 数据过期时间
 */
export interface IModelOption {
  namespace: string;
  dbExpires: number;
}

export interface IParamOption<T> {
  namespace: string;
  default?: T;
}

export default class BaseModel<T> {
  namespace!: string;

  dbExpires!: number;

  save(saveDate: T) {
    if (this.namespace) {
      storage.set(this.namespace, saveDate, this.dbExpires);
    } else {
      throw new Error("no namespace");
    }
  }

  read() {
    console.log("read", this);
    if (this.namespace) {
      return storage.get(this.namespace) as T;
    } else {
      throw new Error("no namespace");
    }
  }

  clean() {
    if (this.namespace) {
      storage.remove(this.namespace);
    } else {
      throw new Error("no namespace");
    }
  }
}