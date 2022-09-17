import { maxBy } from 'lodash';

type GithubData = {
  githubStars: number;
  githubRepos: number;
  mostUsedLanguage: string;
};

interface RepoInfo {
  stargazers_count: number;
  languages_url: string;
}

const requestHeaders = {
  Accept: 'application/vnd.github+json',
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
};

const fetchLanguageData = async (url: string): Promise<Object> => {
  // Fetch language data from url
  const dataResponse = await fetch(url, {
    headers: { ...requestHeaders },
  });
  const languageData = await dataResponse.json();

  return languageData;
};

const fetchGithubData = async (): Promise<GithubData> => {
  const response = await fetch('https://api.github.com/user/repos', {
    headers: { ...requestHeaders },
  });
  const repos = (await response.json()) as RepoInfo[];

  const totalStars = repos.reduce((prev, current) => prev + current.stargazers_count, 0);

  const allLanguages = await Promise.all(
    repos.map(async (repoData) => fetchLanguageData(repoData.languages_url))
  );
  const languageData: Object = allLanguages.reduce(
    (prev: { [key: string]: number }, current) => {
      for (const [key, value] of Object.entries(current)) {
        if (key in prev) {
          prev[key] += value;
        } else {
          prev[key] = value;
        }
      }

      return prev;
    },
    {}
  );
  const mostUsedLanguage = maxBy(Object.entries(languageData), (item) => item[1]);

  return {
    githubStars: totalStars,
    githubRepos: repos.length,
    mostUsedLanguage: mostUsedLanguage ? mostUsedLanguage[0] : '',
  };
};

export default fetchGithubData;
