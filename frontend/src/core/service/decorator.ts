import { AxiosRequestConfig } from "axios";
import { deepMerge, isObject } from "../utils";
import request from "../utils/request";
import { IApiOption, IServiceOption } from "./base";

export function Service(option: string | IServiceOption) {
  return function(target: { prototype: IServiceOption; }) {
    // 命名
		if (typeof option == "string") {
			target.prototype.namespace = option;
		}

    // 复杂项
		if (isObject(option)) {
      const { namespace, apiMap } = (option as IServiceOption);

      target.prototype.namespace = namespace;
      target.prototype.apiMap = apiMap;
    }
  }
}

export function Api(option: string | IApiOption) {
  return function (target: IServiceOption, key: string, descriptor: PropertyDescriptor) {
    if (!target.apiMap) {
			target.apiMap = {};
		}
  
    // 命名
		if (typeof option == "string") {
			target.apiMap[key] = {
        namespace: option,
        backend: false
      };
		}

    // 复杂项
		if (isObject(option)) {
      const { namespace, backend, methods, requestParamIndex, responseParamIndex } = (option as IApiOption);

      target.apiMap[key] = {
        namespace,
        backend,
        methods
      };

      if (backend) {
        const apiFunction = descriptor.value;
        descriptor.value = async (...args: Array<any>) => {
          console.log("descriptor arguments", args);
          if (!args[requestParamIndex || 0]) args[requestParamIndex || 0] = {};
          if (!args[responseParamIndex || 1]) args[responseParamIndex || 1] = {};

          if (!isObject(args[requestParamIndex || 0])) {
            throw new Error("request param 必须是对象类型，request param 可以通过 requestParamIndex 参数指定，也可以通过 ApiRequest 装饰器指定，如果未指定，默认将是第一个参数。");
          }

          if (!isObject(args[responseParamIndex || 1])) {
            throw new Error("response param 必须是对象类型，response param 可以通过 responseParamIndex 参数指定，也可以通过 ApiResponse 装饰器指定，如果未指定，默认将是第二个参数。");
          }

          const requestOption: AxiosRequestConfig = {
            url: (target.namespace === "/" ? "" : target.namespace) + (target.apiMap[key].namespace === "/" ? "" : target.apiMap[key].namespace),
            method: target.apiMap[key].methods
          }

          if (args.length > 0) {
            deepMerge(requestOption, args[requestParamIndex || 0]);
          }

          const result = await request(requestOption);

          deepMerge(args[responseParamIndex || 1], result);

          apiFunction(...args);
        };
      }
    }

    return descriptor;
  }
}

export function ApiRequest() {
  return function (target: IServiceOption, propertyName: string, index: number) {
    setTimeout(() => {
      console.log("ApiRequest", target, propertyName, index);
      if (!target.apiMap[propertyName] || !isObject(target.apiMap[propertyName])) {
        throw new Error("ApiRequest装饰器需要在带有Api装饰器的方法中使用。");
      }
      target.apiMap[propertyName].requestParamIndex = index;
    }, 0);
  }
}

export function ApiResponse() {
  return function (target: IServiceOption, propertyName: string, index: number) {
    setTimeout(() => {
      console.log("ApiResponse", target, propertyName, index);
      if (!target.apiMap[propertyName] || !isObject(target.apiMap[propertyName])) {
        throw new Error("ApiResponse装饰器需要在带有Api装饰器的方法中使用。");
      }
      target.apiMap[propertyName].responseParamIndex = index;
    }, 0);
  }
}