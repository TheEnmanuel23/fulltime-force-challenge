export class ICommitParticipant {
  name: string;
  username: string;
  profile: string;
  avatar: string;
}

export class ICommit {
  sha: string;
  author: ICommitParticipant;
  committer: ICommitParticipant;
  date: string;
  message: string;
  url: string;
}
