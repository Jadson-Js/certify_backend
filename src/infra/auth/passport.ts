import { ExtractJwt, Strategy, type StrategyOptions } from "passport-jwt";
import type { IUserRepository } from "../../domain/repositories/IUserRepository.js";
import { env } from "../../shared/environments/const.js";
import { InternalServerError } from "../../shared/error/AppError.js";
import passport from "passport";
import { inject, injectable } from "inversify";
import { TYPES } from "../container/types.js";

interface TokenPayload {
  sub: string;
  iat: number;
  exp: number;
}

@injectable()
export class ConfigurePassport {
  constructor(
    @inject(TYPES.IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  execute() {
    if (!env.JWT_SECRET) {
      throw new InternalServerError("JWT_SECRET is not defined");
    }

    const options: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: env.JWT_SECRET,
      algorithms: ["HS256"],
    };

    passport.use(
      new Strategy(options, async (payload: TokenPayload, done) => {
        try {
          const user = await this.userRepository.findUserById(payload.sub);

          if (!user) {
            return done(null, false);
          }

          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      }),
    );
  }
}
