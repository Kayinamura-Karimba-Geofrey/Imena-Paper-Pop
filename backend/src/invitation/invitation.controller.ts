import { Controller, Post, Body, Res, UseGuards } from '@nestjs/common';
import { InvitationService } from './invitation.service.js';
import { CreateInvitationDto } from './dto/create-invitation.dto.js';
import type { Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@ApiTags('invitations')
@Controller('invitations')
export class InvitationController {
    constructor(private readonly invitationService: InvitationService) { }

    @Post('generate')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Generate a PDF invitation' })
    @ApiResponse({ status: 201, description: 'PDF generated successfully' })
    async generate(@Body() createInvitationDto: CreateInvitationDto, @Res() res: any) {
        return this.invitationService.generatePdf(createInvitationDto, res);
    }

    @Post('preview')
    @ApiOperation({ summary: 'Preview invitation data (No Auth)' })
    @ApiResponse({ status: 200, description: 'Returns the data as received' })
    async preview(@Body() createInvitationDto: CreateInvitationDto) {
        return createInvitationDto;
    }
}
