import {Arg, Field, Mutation, ObjectType, Query, Resolver} from 'type-graphql'
import {compare, hash} from "bcryptjs";
import {User} from "./entity/User";
import {sign} from 'jsonwebtoken'

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
}


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

    @Mutation(()=> LoginResponse)
    async login(
        @Arg('email') email: string,
        @Arg('password') password:string
    ): Promise<LoginResponse>{

        const user = await User.findOne({where:{email}})

        if(!user){
            throw new Error('Invalid Login')
        }
        const isValid = await compare(password, user.password)

        if(!isValid){
            throw new Error('Invalid Login')
        }

        return {accessToken: sign({userId: user.id}, 'randomString!',{expiresIn:'15m'})}
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