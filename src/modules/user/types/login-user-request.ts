import { Request } from 'express';
import { RequestBody, RequestParams } from '../../../rest/index.js';
import { LoginUserDto } from '../dto/login-user.dto.js';

export type LoginUserRequest = Request<RequestParams, RequestBody, LoginUserDto>;
