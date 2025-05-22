import {AbilityBuilder, createMongoAbility} from "@casl/ability";
import {RoleEnum} from "./role-enum";
import {Actions} from "./actions";
import {Subjects} from "./subjects";

export const abilities = (user: any) => {
    const {can, cannot, build} = new AbilityBuilder(createMongoAbility);
    if (user.role == RoleEnum.admin) {
        can(Actions.manage, "all");
    }
    if (user.role == RoleEnum.user) {

    }
    if(user.role == RoleEnum.driver){
        can(Actions.write , Subjects.order);
    }
    return build();

}