import { copyProperties, isObject } from "../utils";
import { IModelOption, IParamOption } from "./base";

export function Model(option: string | IModelOption) {
  return function (target: any) {
    // 命名
    if (typeof option == "string") {
      target.prototype.namespace = option;
    }

    // 复杂项
    if (isObject(option)) {
      const { namespace, dbExpires } = (option as IModelOption);

      target.prototype.namespace = namespace;
      target.prototype.dbExpires = dbExpires;
    }

    console.log("Model decorator over", target, target.prototype);

    class BaseModel {
      constructor() {
        // 拷贝所有的实例方法
        copyProperties(this, target.prototype);
      }
    }

    // 拷贝所有的静态属性
    copyProperties(BaseModel, target.prototype.constructor);
    // 拷贝原型属性
    copyProperties(BaseModel.prototype, target.prototype.constructor.prototype);

    return (BaseModel as any);
  }
}

export function Param<T>(option: string | IParamOption<T>) {
  return function (target: any, propertyName: string) {
    console.log("Param", target, target[propertyName], target.prototype);
    const paramOption: IParamOption<T> = {
      namespace: typeof option == "string" ? option : option.namespace
    };

    if (isObject(option) && (option as IParamOption<T>).default) {
      paramOption.default = (option as IParamOption<T>).default
    }

    target[propertyName] = paramOption.default || undefined;

    // 属性读取访问器
    const getter = () => {
      const dbData = target.read();

      console.log(`Get: ${propertyName} => ${(dbData && dbData[paramOption.namespace]) || paramOption.default}`);

      return (dbData && dbData[paramOption.namespace]) || paramOption.default || undefined;
    };

    // 属性写入访问器
    const setter = (newVal: T) => {
      console.log(`Set: ${propertyName} => ${newVal}`);

      const dbData = target.read() || {};

      dbData[paramOption.namespace] = newVal;
      target.save(dbData);
    };

    // 删除属性
    if (delete target[propertyName]) {
      // 创建新属性及其读取访问器、写入访问器
      Object.defineProperty(target, propertyName, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true
      });
    }
  }
}