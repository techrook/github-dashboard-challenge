import { Controller, Get, Param } from '@nestjs/common';
import { GithubService } from './github.service';

@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get('users/:username')
  async getGithubUser(@Param('username') username: string) {
    return this.githubService.getUser(username);
  }
  @Get('users/:username/repos')
  async getAllGithubUserRepositories(@Param('username') username: string){
    return this.githubService.getUserRepositories(username);
  }
  @Get('users/:username/languages')
  async getAggregatedGithubUserLanguagesAcrossRepositories(@Param('username') username: string){
    return this.githubService.getUserAggregatedLanguages(username);
  }
  @Get('users/:username/stats')
  async getGithubUserDashboardStatistics(@Param('username') username: string){
    return this.githubService.getUserDashboardStats(username);
  }
  @Get('users/:username/activity')
  async getGithubUserRecentPublicActivity(@Param('username') username: string){
    return this.githubService.getUserRecentGithubActivity(username);
  }
}
