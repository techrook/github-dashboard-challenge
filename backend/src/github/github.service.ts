import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';

@Injectable()
export class GithubService {
  constructor(
    private readonly http: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getUser(username: string) {
    try {
      const profile = await firstValueFrom(
        this.http.get(`https://api.github.com/users/${username}`),
      );

      const user = profile.data;
      return user;
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 404) {
        throw new HttpException(
          {
            message: `GitHub user '${username}' not found`,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      if (error.response?.status === 403) {
        throw new HttpException(
          {
            message: 'GitHub API rate limit exceeded',
          },
          HttpStatus.TOO_MANY_REQUESTS,
        );
      }
      throw new HttpException(
        {
          message: 'Unable to communicate with GitHub',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getUserRepositories(username: string) {
    try {
      const repositories = await this.fetchRepositories(username);
      return repositories;
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 404) {
        throw new HttpException(
          {
            message: `GitHub user '${username}' not found`,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      if (error.response?.status === 403) {
        throw new HttpException(
          {
            message: 'GitHub API rate limit exceeded',
          },
          HttpStatus.TOO_MANY_REQUESTS,
        );
      }
      throw new HttpException(
        {
          message: 'Unable to communicate with GitHub',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUserAggregatedLanguages(username: string) {
    try {
      const repos = await this.fetchRepositories(username);

      const languages: Record<string, number> = {};
      repos.forEach((repo) => {
        if (!repo.language) return;

        languages[repo.language] = (languages[repo.language] || 0) + 1;
      });
      return languages;
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 404) {
        throw new HttpException(
          {
            message: `GitHub user '${username}' not found`,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      if (error.response?.status === 403) {
        throw new HttpException(
          {
            message: 'GitHub API rate limit exceeded',
          },
          HttpStatus.TOO_MANY_REQUESTS,
        );
      }
      throw new HttpException(
        {
          message: 'Unable to communicate with GitHub',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUserDashboardStats(username: string) {
    try {
      const repos = await this.getUserRepositories(username);

      let totalStars = 0;
      let totalForks = 0;

      const languageMap: Record<string, number> = {};

      repos.forEach((repo: any) => {
        totalStars += repo.stargazers_count;
        totalForks += repo.forks_count;

        if (repo.language) {
          languageMap[repo.language] = (languageMap[repo.language] || 0) + 1;
        }
      });

      const mostUsedLanguage =
        Object.entries(languageMap).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;

      return {
        totalRepos: repos.length,
        totalStars,
        totalForks,
        languageCount: Object.keys(languageMap).length,
        mostUsedLanguage,
      };
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 404) {
        throw new HttpException(
          {
            message: `GitHub user '${username}' not found`,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      if (error.response?.status === 403) {
        throw new HttpException(
          {
            message: 'GitHub API rate limit exceeded',
          },
          HttpStatus.TOO_MANY_REQUESTS,
        );
      }
      throw new HttpException(
        {
          message: 'Unable to communicate with GitHub',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getUserRecentGithubActivity(username: string) {
    try {
      const response = await firstValueFrom(
        this.http.get(
          `${this.configService.get('base_url')}/users/${username}/events/public`,
        ),
      );

      return response.data.map((event: any) => ({
        id: event.id,
        type: event.type,
        repo: event.repo.name,
        createdAt: event.created_at,
      }));
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 404) {
        throw new HttpException(
          {
            message: `GitHub user '${username}' not found`,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      if (error.response?.status === 403) {
        throw new HttpException(
          {
            message: 'GitHub API rate limit exceeded',
          },
          HttpStatus.TOO_MANY_REQUESTS,
        );
      }
      throw new HttpException(
        {
          message: 'Unable to communicate with GitHub',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  private async fetchRepositories(username: string) {
    const response = await firstValueFrom(
      this.http.get(
        `${this.configService.get('base_url')}/users/${username}/repos`,
      ),
    );

    return response.data;
  }
}
