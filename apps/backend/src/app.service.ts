import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

@Injectable()
export class AppService {
  async getCommits() {
    const res = await fetch(
      'https://api.github.com/repos/TheEnmanuel23/fulltime-force-challenge/commits',
      {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${process.env.GT_TOKEN}`,
          'X-GitHub-Api-Version': '2022-11-28',
        },
      },
    );

    const data = await res.json();
    return data;
  }
}
