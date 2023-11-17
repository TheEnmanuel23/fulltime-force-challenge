import { Injectable } from '@nestjs/common';
import { ICommit } from './interfaces/ICommit';
import { GithubService } from 'src/github/github.service';
import { GH_RootCommit } from 'src/github/dto/gh-commit.dto';

@Injectable()
export class CommitsService {
  constructor(private readonly githubService: GithubService) {}

  getCommits(page: number) {
    return this.startPipeline(page);
  }

  private async startPipeline(
    page: number,
  ): Promise<{ data: ICommit[]; hasNext: boolean; hasPrev: boolean }> {
    // Extract commits
    const { data: githubCommits, ...rest } =
      await this.githubService.getAllCommits(page);

    // Transform commit records
    const transformedCommits = githubCommits.map((ghCommit) =>
      this.transformCommit(ghCommit),
    );

    return { data: transformedCommits, ...rest };
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
