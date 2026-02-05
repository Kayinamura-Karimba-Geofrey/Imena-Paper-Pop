"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvitationService = void 0;
const common_1 = require("@nestjs/common");
const pdfkit_1 = __importDefault(require("pdfkit"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
let InvitationService = class InvitationService {
    async generatePdf(createInvitationDto, res) {
        const doc = new pdfkit_1.default({
            size: 'A4',
            margin: 0,
        });
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=invitation.pdf`);
        doc.pipe(res);
        const colors = {
            primary: '#007bff',
            text: '#000000',
            textLight: '#444444',
            white: '#ffffff',
            border: '#007bff'
        };
        const margin = 50;
        const pageWidth = doc.page.width;
        const pageHeight = doc.page.height;
        const logoPath = path.join(process.cwd(), 'assets', 'logo.png');
        console.log('Checking logo at:', logoPath);
        const logoExists = fs.existsSync(logoPath);
        console.log('Logo exists:', logoExists);
        if (logoExists) {
            doc.save();
            doc.opacity(0.1);
            const watermarkSize = 400;
            const watermarkX = (pageWidth - watermarkSize) / 2;
            const watermarkY = (pageHeight - watermarkSize) / 2 + 50;
            try {
                doc.image(logoPath, watermarkX, watermarkY, { width: watermarkSize });
            }
            catch (error) {
                console.error('Error adding watermark:', error);
            }
            doc.restore();
        }
        doc.rect(20, 20, pageWidth - 40, pageHeight - 40)
            .lineWidth(2)
            .strokeColor(colors.border)
            .stroke();
        doc.rect(25, 25, pageWidth - 50, pageHeight - 50)
            .lineWidth(0.5)
            .strokeColor(colors.border)
            .stroke();
        const bannerHeight = 160;
        doc.rect(20, 20, pageWidth - 40, bannerHeight)
            .fill(colors.primary);
        let textStartY = 45;
        if (logoExists) {
            const logoHeaderSize = 80;
            const logoHeaderX = (pageWidth - logoHeaderSize) / 2;
            try {
                doc.image(logoPath, logoHeaderX, 35, { width: logoHeaderSize });
                textStartY = 125;
            }
            catch (error) {
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
        let yPos = bannerHeight + 60;
        doc.fillColor(colors.primary)
            .fontSize(24)
            .font('Helvetica-Bold')
            .text('OFFICIAL INVITATION', margin, yPos, { align: 'center' });
        yPos += 40;
        doc.fillColor(colors.text)
            .fontSize(20)
            .font('Helvetica-Bold')
            .text(createInvitationDto.title, margin, yPos, { align: 'center' });
        yPos += 50;
        this.drawSeparator(doc, yPos, margin, pageWidth);
        yPos += 30;
        this.addDetailRow(doc, 'Date:', createInvitationDto.date, yPos, margin);
        yPos += 25;
        this.addDetailRow(doc, 'Time:', createInvitationDto.time, yPos, margin);
        yPos += 25;
        this.addDetailRow(doc, 'Location:', createInvitationDto.location, yPos, margin);
        yPos += 40;
        this.drawSeparator(doc, yPos, margin, pageWidth);
        yPos += 30;
        doc.fillColor(colors.primary)
            .fontSize(16)
            .font('Helvetica-Bold')
            .text('AGENDA', margin, yPos);
        yPos += 25;
        doc.fillColor(colors.textLight)
            .fontSize(12)
            .font('Helvetica')
            .text(createInvitationDto.agenda, margin, yPos, { width: pageWidth - (margin * 2), align: 'left' });
        const agendaHeight = doc.heightOfString(createInvitationDto.agenda, { width: pageWidth - (margin * 2) });
        yPos += agendaHeight + 30;
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
        const footerY = pageHeight - 60;
        doc.fontSize(10)
            .fillColor(colors.textLight)
            .font('Helvetica')
            .text('Generated by Imena Paper Pop', 0, footerY, { align: 'center', width: pageWidth });
        doc.end();
    }
    drawSeparator(doc, y, margin, pageWidth) {
        doc.moveTo(margin + 50, y)
            .lineTo(pageWidth - margin - 50, y)
            .lineWidth(1)
            .strokeColor('#e0e0e0')
            .stroke();
    }
    addDetailRow(doc, label, value, y, margin) {
        doc.fillColor('#007bff')
            .fontSize(12)
            .font('Helvetica-Bold')
            .text(label, margin + 20, y);
        doc.fillColor('#000000')
            .fontSize(12)
            .font('Helvetica')
            .text(value, margin + 100, y);
    }
};
exports.InvitationService = InvitationService;
exports.InvitationService = InvitationService = __decorate([
    (0, common_1.Injectable)()
], InvitationService);
//# sourceMappingURL=invitation.service.js.map