import { INestApplication, Injectable } from '@nestjs/common';
import { TrpcService } from './trpc.service';
import { z } from 'zod';
import * as trpcExprss from '@trpc/server/adapters/express';
import { CommitsService } from 'src/commits/commits.service';

export type GetCommitResponse = Promise<{
  hasNext: boolean;
  hasPrev: boolean;
  data: {
    sha: string;
    author: {
      name: string;
      username: string;
      profile: string;
      avatar: string;
    };
    committer: {
      name: string;
      username: string;
      profile: string;
      avatar: string;
    };
    date: string;
    message: string;
    url: string;
  }[];
}>;

@Injectable()
export class TrpcRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly commitService: CommitsService,
  ) {}

  appRouter = this.trpc.router({
    getCommits: this.trpc.procedure
      .input(z.object({ page: z.number().optional() }))
      .query(async ({ input }) => {
        return this.commitService.getCommits(input.page) as GetCommitResponse;
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
