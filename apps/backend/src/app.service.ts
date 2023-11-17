import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { Commit } from './commit.dto';
import { GH_RootCommit } from './gh-commit.dto';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  getCommits() {
    return this.startPipeline();
  }

  private async startPipeline(): Promise<Commit[]> {
    // Extract commits
    const githubCommits = await this.getAllCommitsFromGithub();
    // Transform commit records
    return githubCommits.map((ghCommit) => this.transformCommit(ghCommit));
  }

  private async getAllCommitsFromGithub(): Promise<GH_RootCommit[]> {
    const token = process.env.GT_TOKEN;
    const ghUsername = process.env.GT_USERNAME;
    const ghRepository = process.env.GT_REPOSITORY;

    const { data } = await firstValueFrom(
      this.httpService
        .get<GH_RootCommit[]>(
          `https://api.github.com/repos/${ghUsername}/${ghRepository}/commits`,
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

    return data;
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
