import { Response } from 'superagent';

export type ApiResponse<BodyType> = Response & { body: BodyType };
