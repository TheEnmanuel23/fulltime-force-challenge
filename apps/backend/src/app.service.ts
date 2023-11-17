import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async getCommits() {
    const token = process.env.GT_TOKEN;
    const ghUsername = process.env.GT_USERNAME;
    const ghRepository = process.env.GT_REPOSITORY;
    const res = await firstValueFrom(
      this.httpService
        .get(
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

    return res.data;
  }
}
