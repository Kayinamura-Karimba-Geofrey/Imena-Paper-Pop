"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateInvitationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateInvitationDto {
    title;
    date;
    time;
    location;
    agenda;
    notes;
}
exports.CreateInvitationDto = CreateInvitationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Wihogora Family Gathering' }),
    __metadata("design:type", String)
], CreateInvitationDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-02-14' }),
    __metadata("design:type", String)
], CreateInvitationDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '10:00 AM' }),
    __metadata("design:type", String)
], CreateInvitationDto.prototype, "time", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Kigali, Rwanda' }),
    __metadata("design:type", String)
], CreateInvitationDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1. Welcome Note\n2. Family Discussion\n3. Lunch' }),
    __metadata("design:type", String)
], CreateInvitationDto.prototype, "agenda", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Please wear traditional attire.' }),
    __metadata("design:type", String)
], CreateInvitationDto.prototype, "notes", void 0);
//# sourceMappingURL=create-invitation.dto.js.map