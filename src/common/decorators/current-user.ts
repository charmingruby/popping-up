import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common'

interface Payload {
  email: string
  username: string
}

export interface CurrentUserPayload extends Payload {
  userId: string
}

export const CurrentUser = createParamDecorator(
  (_, context: ExecutionContext): CurrentUserPayload => {
    const request = context.switchToHttp().getRequest()

    const userId = request.userId

    if (!userId) {
      throw new UnauthorizedException()
    }

    const payload: Payload = request.payload
    if (!userId) {
      throw new UnauthorizedException()
    }

    return {
      userId,
      email: payload.email,
      username: payload.username,
    }
  },
)
