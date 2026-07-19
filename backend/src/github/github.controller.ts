import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

import { GithubService } from './github.service';

@ApiTags('GitHub')
@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get('users/:username/dashboard')
  @ApiOperation({
    summary: 'Get a GitHub user dashboard',
    description:
      'Retrieves a GitHub user profile, repositories, language statistics, repository statistics, and recent public activity.',
  })
  @ApiParam({
    name: 'username',
    description: 'GitHub username',
    example: 'techrook',
  })
  @ApiOkResponse({
    description: 'GitHub dashboard retrieved successfully.',
  })
  @ApiNotFoundResponse({
    description: 'GitHub user not found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Unexpected server error.',
  })
  async getGithubDashboard(
    @Param('username') username: string,
  ) {
    return this.githubService.getGithubDashboard(username);
  }
}