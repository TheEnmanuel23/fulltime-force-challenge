import { INestApplication, Injectable } from '@nestjs/common';
import { TrpcService } from './trpc.service';
import { z } from 'zod';
import * as trpcExprss from '@trpc/server/adapters/express';

@Injectable()
export class TrpcRouter {
  constructor(private readonly trpc: TrpcService) {}

  appRouter = this.trpc.router({
    hello: this.trpc.procedure
      .input(z.object({ name: z.string() }))
      .query(({ input }) => {
        return `Hello ${input.name || 'Bilbo'}`;
      }),
  });

  async applyMiddleware(app: INestApplication) {
    app.use(
      '/trpc',
      trpcExprss.createExpressMiddleware({ router: this.appRouter }),
    );
  }
}

export type AppRouter = TrpcRouter['appRouter'];
