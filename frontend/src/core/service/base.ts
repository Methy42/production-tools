export interface IApiOption {
  namespace: string;
  backend: boolean;
  methods?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  requestParamIndex?: number;
  responseParamIndex?: number;
}

export interface IServiceOption {
  namespace: string;
  apiMap: { [namespace: string]: IApiOption }
}

export default class BaseService<T> implements IServiceOption {
  constructor() {
    this.apiMap = {};
  }

  namespace!: string;

  apiMap: { [name: string]: IApiOption };
}