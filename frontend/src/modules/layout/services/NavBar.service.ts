import BaseService from "@/core/service/base";
import { Api, ApiRequest, ApiResponse, Service } from "@/core/service/decorator";
import { INavBar } from "../models/NavBar.model";

export interface INavBarServices{
  getNavBarData(data: any): INavBar;
}

@Service("/nav-bar")
export default class NavBarServices extends BaseService<INavBarServices> implements INavBarServices {

  @Api({
    namespace: "/",
    backend: true,
    methods: "GET"
  })
  getNavBarData(@ApiRequest() request?: any, @ApiResponse() response?: any): INavBar {
    console.log("getNavBarData", request, response);
    if (response.status !== 200) console.log("failed to get");
    return {};
  }
}