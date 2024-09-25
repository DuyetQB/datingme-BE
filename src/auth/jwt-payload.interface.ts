import { Schema } from "mongoose"

export type JwtPayload = {
    sub: Schema.Types.ObjectId
    username: string
}