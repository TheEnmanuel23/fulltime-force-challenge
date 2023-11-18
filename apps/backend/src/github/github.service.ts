import { Injectable } from '@nestjs/common';
import { GH_RootCommit } from './dto/gh-commit.dto';
import { ConfigService } from '@nestjs/config';
import { HttpCustomService } from 'src/providers/http/http.service';

@Injectable()
export class GithubService {
  constructor(
    private readonly httpService: HttpCustomService,
    private readonly configService: ConfigService,
  ) {}

  async getAllCommits(
    page: number,
    perPage: 5,
  ): Promise<{ data: GH_RootCommit[]; hasNext: boolean; hasPrev: boolean }> {
    const { username, repository } = this.configService.get('github');

    const { data, ...rest } = await this.httpService.getAll<GH_RootCommit[]>(
      `https://api.github.com/repos/${username}/${repository}/commits?per_page=${perPage}&page=${page}`,
    );

    const linkHeader = rest.headers.link;
    const hasNext = linkHeader.includes(`rel=\"next\"`);
    const hasPrev = linkHeader.includes(`rel=\"prev\"`);

    return { data, hasNext, hasPrev };
  }
}
