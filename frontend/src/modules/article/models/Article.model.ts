import BaseModel from "@/core/model/base";
import { Model, Param } from "@/core/model/decorator";
import NavBarComponent from "@/modules/layout/components/NavBar.component";
import { DefineComponent } from "vue";

export interface IArticle {
  component: DefineComponent,
  props?: any
}

@Model("article")
export default class Article extends BaseModel<IArticle> implements IArticle {
  @Param({
    namespace: "component",
    default: NavBarComponent
  }) component!: DefineComponent
}