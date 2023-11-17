export class CommitParticipant {
  name: string;
  username: string;
  profile: string;
  avatar: string;
}

export class Commit {
  sha: string;
  author: CommitParticipant;
  committer: CommitParticipant;
  date: string;
  message: string;
  url: string;
}
