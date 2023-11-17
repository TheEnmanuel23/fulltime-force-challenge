import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class HttpCustomService {
  headers = {};
  constructor(private readonly httpService: HttpService) {
    this.headers = {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${process.env.GT_TOKEN}`,
      'X-GitHub-Api-Version': '2022-11-28',
    };
  }

  public getAll<T>(url: string) {
    return firstValueFrom(
      this.httpService
        .get<T>(url, {
          headers: this.headers,
        })
        .pipe(
          catchError((error: AxiosError) => {
            console.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
  }
}
