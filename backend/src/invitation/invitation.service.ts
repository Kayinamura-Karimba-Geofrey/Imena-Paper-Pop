import { Injectable } from '@nestjs/common';
import PDFDocument from 'pdfkit';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class InvitationService {
    async generatePdf(createInvitationDto: CreateInvitationDto, res: Response) {
        const doc = new PDFDocument({
            size: 'A4',
            margin: 0,
        });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=invitation.pdf`);

        doc.pipe(res);

        // --- Design Constants ---
        const colors = {
            primary: '#007bff', // Blue
            text: '#000000',    // Black
            textLight: '#444444',
            white: '#ffffff',
            border: '#007bff'
        };

        const margin = 50;
        const pageWidth = doc.page.width;
        const pageHeight = doc.page.height;

        // Resolve logo path - ensure it works in both dev and prod
        const logoPath = path.join(process.cwd(), 'assets', 'logo.png');
        console.log('Checking logo at:', logoPath);
        const logoExists = fs.existsSync(logoPath);
        console.log('Logo exists:', logoExists);

        // --- 1. Watermark (Background) ---
        if (logoExists) {
            doc.save();
            doc.opacity(0.1);
            const watermarkSize = 400;
            const watermarkX = (pageWidth - watermarkSize) / 2;
            const watermarkY = (pageHeight - watermarkSize) / 2 + 50;
            try {
                doc.image(logoPath, watermarkX, watermarkY, { width: watermarkSize });
            } catch (error) {
                console.error('Error adding watermark:', error);
            }
            doc.restore();
        }

        // --- 2. Page Border ---
        doc.rect(20, 20, pageWidth - 40, pageHeight - 40)
            .lineWidth(2)
            .strokeColor(colors.border)
            .stroke();

        doc.rect(25, 25, pageWidth - 50, pageHeight - 50)
            .lineWidth(0.5)
            .strokeColor(colors.border)
            .stroke();

        // --- 3. Header Banner ---
        const bannerHeight = 160;
        doc.rect(20, 20, pageWidth - 40, bannerHeight)
            .fill(colors.primary);

        let textStartY = 45;

        // Logo in Header
        if (logoExists) {
            const logoHeaderSize = 80;
            const logoHeaderX = (pageWidth - logoHeaderSize) / 2;
            try {
                doc.image(logoPath, logoHeaderX, 35, { width: logoHeaderSize });
                textStartY = 125; // Push text down
            } catch (error) {
                console.error('Error adding header logo:', error);
            }
        }

        doc.fillColor(colors.white)
            .fontSize(28)
            .font('Helvetica-Bold')
            .text('IMENA FAMILY', 0, textStartY, { align: 'center', width: pageWidth });

        doc.fillColor(colors.white)
            .fontSize(14)
            .font('Helvetica')
            .text('Celebrating Our Legacy', 0, textStartY + 35, { align: 'center', width: pageWidth });

        // --- 4. Content Body ---
        let yPos = bannerHeight + 60;

        // Title
        doc.fillColor(colors.primary)
            .fontSize(24)
            .font('Helvetica-Bold')
            .text('OFFICIAL INVITATION', margin, yPos, { align: 'center' });

        yPos += 40;

        // Event Name
        doc.fillColor(colors.text)
            .fontSize(20)
            .font('Helvetica-Bold')
            .text(createInvitationDto.title, margin, yPos, { align: 'center' });

        yPos += 50;

        // Separator
        this.drawSeparator(doc, yPos, margin, pageWidth);
        yPos += 30;

        // Details Section
        this.addDetailRow(doc, 'Date:', createInvitationDto.date, yPos, margin);
        yPos += 25;
        this.addDetailRow(doc, 'Time:', createInvitationDto.time, yPos, margin);
        yPos += 25;
        this.addDetailRow(doc, 'Location:', createInvitationDto.location, yPos, margin);

        yPos += 40;
        this.drawSeparator(doc, yPos, margin, pageWidth);
        yPos += 30;

        // Agenda Section
        doc.fillColor(colors.primary)
            .fontSize(16)
            .font('Helvetica-Bold')
            .text('AGENDA', margin, yPos);

        yPos += 25;
        doc.fillColor(colors.textLight)
            .fontSize(12)
            .font('Helvetica')
            .text(createInvitationDto.agenda, margin, yPos, { width: pageWidth - (margin * 2), align: 'left' });

        // Calculate height of agenda text to spacing
        const agendaHeight = doc.heightOfString(createInvitationDto.agenda, { width: pageWidth - (margin * 2) });
        yPos += agendaHeight + 30;

        // Notes Section (if available)
        if (createInvitationDto.notes) {
            doc.fillColor(colors.primary)
                .fontSize(16)
                .font('Helvetica-Bold')
                .text('NOTES', margin, yPos);

            yPos += 25;
            doc.fillColor(colors.textLight)
                .fontSize(12)
                .font('Helvetica-Oblique')
                .text(createInvitationDto.notes, margin, yPos, { width: pageWidth - (margin * 2), align: 'left' });
        }

        // --- 5. Footer ---
        const footerY = pageHeight - 60;
        doc.fontSize(10)
            .fillColor(colors.textLight)
            .font('Helvetica')
            .text('Generated by Imena Paper Pop', 0, footerY, { align: 'center', width: pageWidth });

        doc.end();
    }

    private drawSeparator(doc: any, y: number, margin: number, pageWidth: number) {
        doc.moveTo(margin + 50, y)
            .lineTo(pageWidth - margin - 50, y)
            .lineWidth(1)
            .strokeColor('#e0e0e0')
            .stroke();
    }

    private addDetailRow(doc: any, label: string, value: string, y: number, margin: number) {
        doc.fillColor('#007bff')
            .fontSize(12)
            .font('Helvetica-Bold')
            .text(label, margin + 20, y);

        doc.fillColor('#000000')
            .fontSize(12)
            .font('Helvetica')
            .text(value, margin + 100, y);
    }
}
