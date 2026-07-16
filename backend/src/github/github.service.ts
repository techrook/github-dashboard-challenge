import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GithubService {
  constructor(
    private readonly http: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getUser(username: string) {
    const profile = await firstValueFrom(
      this.http.get(`https://api.github.com/users/${username}`),
    );

    const user = profile.data;
    return user
  }
  async getUserRepositories(username: string) {
    const repositories = await this.fetchRepositories(username);
    return repositories
  }

  async getUserAggregatedLanguages(username: string) {
    const repos = await this.fetchRepositories(username);

    const languages: Record<string, number> = {};
    repos.forEach((repo) => {
      if (!repo.language) return;

      languages[repo.language] = (languages[repo.language] || 0) + 1;
    });
    return languages
  }

  async getUserDashboardStats(username: string) {
    const repos = await this.getUserRepositories(username);
  
    let totalStars = 0;
    let totalForks = 0;
  
    const languageMap: Record<string, number> = {};
  
    repos.forEach((repo: any) => {
      totalStars += repo.stargazers_count;
      totalForks += repo.forks_count;
  
      if (repo.language) {
        languageMap[repo.language] =
          (languageMap[repo.language] || 0) + 1;
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
  }
  async getUserRecentGithubActivity(username: string) {
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
