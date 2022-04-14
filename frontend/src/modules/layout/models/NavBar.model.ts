import BaseModel from "@/core/model/base";
import { Model, Param } from "@/core/model/decorator";

export interface INavItem {
  name: string;
  path: string;
  meta: { [key: string]: unknown };
}

export interface INavList {
  navItems: Array<INavItem>;
  isDropDown: boolean;
}

export interface INavLogo {
  src: string;
  alt: string;
}

export interface INavBar {
  navLogo?: INavLogo,
  rightNavList?: INavList
}

@Model("nav_bar")
export default class NavBar extends BaseModel<INavBar> implements INavBar {
  @Param<INavLogo>({
    namespace: "nav_logo",
    default: {
      src: "",
      alt: ""
    }
  }) navLogo!: INavLogo;

  @Param<INavList>({
    namespace: "right_nav_list",
    default: {
      navItems: [],
      isDropDown: false
    }
  }) rightNavList!: INavList;

  @Param<INavLogo>({
    namespace: "nav_logo",
    default: {
      src: "",
      alt: ""
    }
  }) navLogo1!: INavLogo;

  @Param<INavList>({
    namespace: "right_nav_list",
    default: {
      navItems: [],
      isDropDown: false
    }
  }) rightNavList1!: INavList;

  @Param<INavLogo>({
    namespace: "nav_logo",
    default: {
      src: "",
      alt: ""
    }
  }) navLogo2!: INavLogo;

  @Param<INavList>({
    namespace: "right_nav_list",
    default: {
      navItems: [],
      isDropDown: false
    }
  }) rightNavList2!: INavList;

  @Param<INavLogo>({
    namespace: "nav_logo",
    default: {
      src: "",
      alt: ""
    }
  }) navLogo3!: INavLogo;

  @Param<INavList>({
    namespace: "right_nav_list",
    default: {
      navItems: [],
      isDropDown: false
    }
  }) rightNavList3!: INavList;

  @Param<INavLogo>({
    namespace: "nav_logo",
    default: {
      src: "",
      alt: ""
    }
  }) navLogo4!: INavLogo;

  @Param<INavList>({
    namespace: "right_nav_list",
    default: {
      navItems: [],
      isDropDown: false
    }
  }) rightNavList4!: INavList;
}