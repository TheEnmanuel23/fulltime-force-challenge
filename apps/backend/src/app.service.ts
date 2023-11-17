import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { Commit } from './commit.dto';
import { GH_RootCommit } from './gh-commit.dto';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  getCommits(page: number) {
    return this.startPipeline(page);
  }

  private async startPipeline(
    page: number,
  ): Promise<{ data: Commit[]; hasNext: boolean; hasPrev: boolean }> {
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
    const token = process.env.GT_TOKEN;
    const ghUsername = process.env.GT_USERNAME;
    const ghRepository = process.env.GT_REPOSITORY;

    const { data, ...rest } = await firstValueFrom(
      this.httpService
        .get<GH_RootCommit[]>(
          `https://api.github.com/repos/${ghUsername}/${ghRepository}/commits?per_page=2&page=${page}`,
          {
            headers: {
              Accept: 'application/vnd.github+json',
              Authorization: `Bearer ${token}`,
              'X-GitHub-Api-Version': '2022-11-28',
            },
          },
        )
        .pipe(
          catchError((error: AxiosError) => {
            console.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    const linkHeader = rest.headers.link;
    const hasNext = linkHeader.includes(`rel=\"next\"`);
    const hasPrev = linkHeader.includes(`rel=\"prev\"`);

    return { data, hasNext, hasPrev };
  }

  private transformCommit(ghCommit: GH_RootCommit): Commit {
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
