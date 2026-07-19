import { HttpService } from '@nestjs/axios';
import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GithubService {
  private readonly baseUrl: string;
  private readonly headers: Record<string, string>;

  constructor(
    private readonly http: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl =
      this.configService.get<string>('base_url') ??
      'https://api.github.com';

    const token = this.configService.get<string>('github_token');

    this.headers = {
      Accept: 'application/vnd.github+json',
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  async getGithubDashboard(username: string) {
    try {
      const [profileResponse, reposResponse, activityResponse] =
        await Promise.all([
          firstValueFrom(
            this.http.get(`${this.baseUrl}/users/${username}`, {
              headers: this.headers,
            }),
          ),

          firstValueFrom(
            this.http.get(`${this.baseUrl}/users/${username}/repos`, {
              headers: this.headers,
            }),
          ),

          firstValueFrom(
            this.http.get(
              `${this.baseUrl}/users/${username}/events/public`,
              {
                headers: this.headers,
              },
            ),
          ),
        ]);

      const profile = profileResponse.data;
      const repos = reposResponse.data;
      const activity = activityResponse.data.slice(0, 6);

      const languages: Record<string, number> = {};

      repos.forEach((repo: any) => {
        if (!repo.language) return;

        languages[repo.language] =
          (languages[repo.language] || 0) + 1;
      });

      const stats = {
        totalRepos: repos.length,

        totalStars: repos.reduce(
          (sum: number, repo: any) => sum + repo.stargazers_count,
          0,
        ),

        totalForks: repos.reduce(
          (sum: number, repo: any) => sum + repo.forks_count,
          0,
        ),

        languageCount: Object.keys(languages).length,

        mostUsedLanguage: this.getMostUsedLanguage(languages),
      };

      return {
        profile,
        repositories: repos,
        languages,
        stats,
        activity,
      };
    } catch (error: any) {
      const status = error?.response?.status;

      if (status === 404) {
        throw new NotFoundException(
          `GitHub user '${username}' not found`,
        );
      }

      if (status === 403) {
        throw new HttpException(
          {
            message:
              'GitHub API rate limit exceeded. Please try again later.',
          },
          HttpStatus.TOO_MANY_REQUESTS,
        );
      }

      throw new InternalServerErrorException(
        'Unable to communicate with GitHub.',
      );
    }
  }

  private getMostUsedLanguage(
    languages: Record<string, number>,
  ): string | null {
    const entries = Object.entries(languages);

    if (!entries.length) {
      return null;
    }

    return entries.sort((a, b) => b[1] - a[1])[0][0];
  }
}