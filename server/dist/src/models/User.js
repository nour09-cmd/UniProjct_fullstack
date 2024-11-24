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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const Adresse_1 = require("./Adresse");
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100 }),
    __metadata("design:type", String)
], User.prototype, "vorname", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100 }),
    __metadata("design:type", String)
], User.prototype, "nachname", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 150, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100 }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 15, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "handynummer", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", Date)
], User.prototype, "geburtsdatum", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], User.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Adresse_1.Adresse, { nullable: true, onDelete: "SET NULL" }),
    (0, typeorm_1.JoinColumn)({ name: "adresse_id" }),
    __metadata("design:type", Adresse_1.Adresse)
], User.prototype, "adresse", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 6,
        default: "USER",
    }),
    __metadata("design:type", String)
], User.prototype, "rolle", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 150, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "verifyToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 6, nullable: true }),
    __metadata("design:type", Boolean)
], User.prototype, "verifyStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 150, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "resetpasswordtoken", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 6, nullable: true }),
    __metadata("design:type", Boolean)
], User.prototype, "resetPasswordStatus", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)("users")
], User);
//# sourceMappingURL=User.js.map