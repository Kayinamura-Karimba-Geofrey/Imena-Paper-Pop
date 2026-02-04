import { ApiProperty } from '@nestjs/swagger';

export class CreateInvitationDto {
    @ApiProperty({ example: 'Wihogora Family Gathering' })
    title: string;

    @ApiProperty({ example: '2026-02-14' })
    date: string;

    @ApiProperty({ example: '10:00 AM' })
    time: string;

    @ApiProperty({ example: 'Kigali, Rwanda' })
    location: string;

    @ApiProperty({ example: '1. Welcome Note\n2. Family Discussion\n3. Lunch' })
    agenda: string;

    @ApiProperty({ example: 'Please wear traditional attire.' })
    notes: string;
}
