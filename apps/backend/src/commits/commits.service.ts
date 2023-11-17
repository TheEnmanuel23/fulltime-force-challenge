import { Injectable } from '@nestjs/common';
import { ICommit } from './interfaces/ICommit';
import { GH_RootCommit } from './dto/gh-commit.dto';
import { HttpCustomService } from 'src/providers/http/http.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CommitsService {
  constructor(
    private readonly httpService: HttpCustomService,
    private readonly configService: ConfigService,
  ) {}

  getCommits(page: number) {
    return this.startPipeline(page);
  }

  private async startPipeline(
    page: number,
  ): Promise<{ data: ICommit[]; hasNext: boolean; hasPrev: boolean }> {
    // Extract commits
    const { data: githubCommits, ...rest } =
      await this.getAllCommitsFromGithub(page);

    // Transform commit records
    const transformedCommits = githubCommits.map((ghCommit) =>
      this.transformCommit(ghCommit),
    );

    return { data: transformedCommits, ...rest };
  }

  private async getAllCommitsFromGithub(
    page: number,
  ): Promise<{ data: GH_RootCommit[]; hasNext: boolean; hasPrev: boolean }> {
    const { username, repository } = this.configService.get('github');

    const { data, ...rest } = await this.httpService.getAll<GH_RootCommit[]>(
      `https://api.github.com/repos/${username}/${repository}/commits?per_page=2&page=${page}`,
    );

    const linkHeader = rest.headers.link;
    const hasNext = linkHeader.includes(`rel=\"next\"`);
    const hasPrev = linkHeader.includes(`rel=\"prev\"`);

    return { data, hasNext, hasPrev };
  }

  private transformCommit(ghCommit: GH_RootCommit): ICommit {
    return {
      sha: ghCommit.sha,
      author: {
        name: ghCommit.commit.author.name,
        username: ghCommit.author.login,
        profile: ghCommit.author.html_url,
        avatar: ghCommit.author.avatar_url,
      },
      committer: {
        name: ghCommit.commit.committer.name,
        username: ghCommit.committer.login,
        profile: ghCommit.committer.html_url,
        avatar: ghCommit.committer.avatar_url,
      },
      date: ghCommit.commit.committer.date,
      message: ghCommit.commit.message,
      url: ghCommit.html_url,
    };
  }
}
