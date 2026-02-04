import { CreateInvitationDto } from './dto/create-invitation.dto';
import { Response } from 'express';
export declare class InvitationService {
    generatePdf(createInvitationDto: CreateInvitationDto, res: Response): Promise<void>;
    private addDetail;
}
