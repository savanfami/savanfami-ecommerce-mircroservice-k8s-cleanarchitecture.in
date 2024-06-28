import { UserEntity } from "../entities";
import { UserLoginEntity } from "../entities";

export interface ILoginUserUseCase{
    execute(data:UserLoginEntity):Promise<UserEntity | null>
}
