import { TokenPayload } from './src/modules/auth/types/token-payload.ts';

declare module 'express-serve-static-core' {

    export interface Request {
        tokenPayload: TokenPayload;
    }
}
