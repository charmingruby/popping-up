import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common'

interface Payload {
  email: string
  username: string
}

export const ActiverUserId = createParamDecorator(
  (_, context: ExecutionContext) => {
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
      payload,
    }
  },
)
