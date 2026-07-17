import { Controller, Get, Param } from '@nestjs/common';
import { GithubService } from './github.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('GitHub')
@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @ApiOperation({
    summary: 'Get GitHub user profile',
  })
  @ApiParam({
    name: 'username',
    example: 'torvalds',
  })
  @ApiResponse({
    status: 200,
    description: 'GitHub user profile retrieved successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'GitHub user not found.',
  })
  @Get('users/:username')
  async getGithubUser(@Param('username') username: string) {
    return this.githubService.getUser(username);
  }
  @ApiOperation({
    summary: 'Get user repositories',
  })
  @ApiParam({
    name: 'username',
    example: 'torvalds',
  })
  @ApiResponse({
    status: 200,
    description: 'Repositories retrieved successfully.',
  })
  @Get('users/:username/repos')
  async getAllGithubUserRepositories(@Param('username') username: string){
    return this.githubService.getUserRepositories(username);
  }
  @ApiOperation({
    summary: 'Get aggregated languages',
  })
  @ApiParam({
    name: 'username',
    example: 'torvalds',
  })
  @ApiResponse({
    status: 200,
    description: 'Languages retrieved successfully.',
  })
  @Get('users/:username/languages')
  async getAggregatedGithubUserLanguagesAcrossRepositories(@Param('username') username: string){
    return this.githubService.getUserAggregatedLanguages(username);
  }
  @ApiOperation({
    summary: 'Get dashboard statistics',
  })
  @ApiParam({
    name: 'username',
    example: 'torvalds',
  })
  @ApiResponse({
    status: 200,
    description: 'Statistics retrieved successfully.',
  })
  @Get('users/:username/stats')
  async getGithubUserDashboardStatistics(@Param('username') username: string){
    return this.githubService.getUserDashboardStats(username);
  }
  @ApiOperation({
    summary: 'Get recent public activity',
  })
  @ApiParam({
    name: 'username',
    example: 'torvalds',
  })
  @ApiResponse({
    status: 200,
    description: 'Activity retrieved successfully.',
  })
  @Get('users/:username/activity')
  async getGithubUserRecentPublicActivity(@Param('username') username: string){
    return this.githubService.getUserRecentGithubActivity(username);
  }
}
