export type GithubErrorItem = {
  resource: string;
  field: string;
  code: string;
};

export type GithubErrorResponse = {
  message: string;
  errors?: GithubErrorItem[];
  documentation_url?: string;
};
