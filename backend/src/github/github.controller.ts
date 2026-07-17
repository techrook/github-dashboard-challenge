import { Controller, Get, Param } from '@nestjs/common';
import { GithubService } from './github.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('GitHub')
@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}
  @Get('users/:username/dashboard')
  async getGithubDashboard(
    @Param('username') username: string,
  ) {
    return this.githubService.getGithubDashboard(username);
  }
}
