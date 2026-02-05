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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvitationController = void 0;
const common_1 = require("@nestjs/common");
const invitation_service_js_1 = require("./invitation.service.js");
const create_invitation_dto_js_1 = require("./dto/create-invitation.dto.js");
const swagger_1 = require("@nestjs/swagger");
let InvitationController = class InvitationController {
    invitationService;
    constructor(invitationService) {
        this.invitationService = invitationService;
    }
    async generate(createInvitationDto, res) {
        return this.invitationService.generatePdf(createInvitationDto, res);
    }
    async preview(createInvitationDto) {
        return createInvitationDto;
    }
};
exports.InvitationController = InvitationController;
__decorate([
    (0, common_1.Post)('generate'),
    (0, swagger_1.ApiOperation)({ summary: 'Generate a PDF invitation' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'PDF generated successfully' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_invitation_dto_js_1.CreateInvitationDto, Object]),
    __metadata("design:returntype", Promise)
], InvitationController.prototype, "generate", null);
__decorate([
    (0, common_1.Post)('preview'),
    (0, swagger_1.ApiOperation)({ summary: 'Preview invitation data (No Auth)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns the data as received' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_invitation_dto_js_1.CreateInvitationDto]),
    __metadata("design:returntype", Promise)
], InvitationController.prototype, "preview", null);
exports.InvitationController = InvitationController = __decorate([
    (0, swagger_1.ApiTags)('invitations'),
    (0, common_1.Controller)('invitations'),
    __metadata("design:paramtypes", [invitation_service_js_1.InvitationService])
], InvitationController);
//# sourceMappingURL=invitation.controller.js.map