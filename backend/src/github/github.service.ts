import { HttpService } from '@nestjs/axios';
import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';

@Injectable()
export class GithubService {
  constructor(
    private readonly http: HttpService,
    private readonly configService: ConfigService,
  ) {}
  async getGithubDashboard(username: string) {
    try {
      const [profileResponse, reposResponse, activityResponse] =
        await Promise.all([
          firstValueFrom(
            this.http.get(`https://api.github.com/users/${username}`),
          ),
          firstValueFrom(
            this.http.get(`https://api.github.com/users/${username}/repos`),
          ),
          firstValueFrom(
            this.http.get(
              `https://api.github.com/users/${username}/events/public`,
            ),
          ),
        ]);

      const profile = profileResponse.data;
      const repos = reposResponse.data;
      const activity = activityResponse.data.slice(0, 6);
      const languages: Record<string, number> = {};

      repos.forEach((repo: any) => {
        if (!repo.language) return;

        languages[repo.language] = (languages[repo.language] || 0) + 1;
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
    } catch (error) {
      if (error.response?.status === 404) {
        throw new NotFoundException(`GitHub user '${username}' not found`);
      }

      if (error.response?.status === 403) {
        throw new HttpException(
          {
            message: 'GitHub API rate limit exceeded',
          },
          HttpStatus.TOO_MANY_REQUESTS,
        );
      }

      throw new InternalServerErrorException(
        'Unable to communicate with GitHub',
      );
    }
  }

  private getMostUsedLanguage(
    languages: Record<string, number>,
  ): string | null {
    const entries = Object.entries(languages);

    if (entries.length === 0) {
      return null;
    }

    return entries.sort((a, b) => b[1] - a[1])[0][0];
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
