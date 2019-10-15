import {Arg, Mutation, Query, Resolver} from 'type-graphql'
import {hash} from "bcryptjs";
import {User} from "./entity/User";

@Resolver()
export class UserResolver{
    @Query(() => String)
    hello() {
        return 'HI!'
    }

    @Query(() => [User])
    users() {
        return User.find()
    }

    @Mutation(()=> Boolean)
    async register(
        @Arg('email') email: string,
        @Arg('password') password:string
    ){
        const hashedPassword = await hash(password, 12)
        try {
            await User.insert({email, password: hashedPassword})
        }
        catch (e) {
            return false
        }
        return true
    }
}