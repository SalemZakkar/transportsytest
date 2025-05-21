import {AbilityBuilder, createMongoAbility} from "@casl/ability";
import {RoleEnum} from "./role-enum";
import {Actions} from "./actions";

export const abilities = (user: any) => {
    const {can, cannot, build} = new AbilityBuilder(createMongoAbility);
    if (user.role == RoleEnum.admin) {
        can(Actions.manage, "all");
    }
    if (user.role == RoleEnum.user) {

    }
    return build();

}