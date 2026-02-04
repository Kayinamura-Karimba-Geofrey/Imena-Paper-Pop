import { InvitationService } from './invitation.service.js';
import { CreateInvitationDto } from './dto/create-invitation.dto.js';
export declare class InvitationController {
    private readonly invitationService;
    constructor(invitationService: InvitationService);
    generate(createInvitationDto: CreateInvitationDto, res: any): Promise<void>;
    preview(createInvitationDto: CreateInvitationDto): Promise<CreateInvitationDto>;
}
