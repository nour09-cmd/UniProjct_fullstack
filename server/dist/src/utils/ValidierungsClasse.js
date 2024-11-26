"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validierunges = void 0;
const dompurify_1 = __importDefault(require("dompurify"));
const jsdom_1 = require("jsdom");
class Validierunges {
    constructor(validierunges) {
        this.validierunges = validierunges;
        this.arrCleanData = [];
    }
    filterSQL(input) {
        const sqlPattern = /\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|TRUNCATE|EXEC|MERGE|CALL|DESCRIBE)\b/i;
        return sqlPattern.test(input);
    }
    removeHtmlTags(input) {
        return input.replace(/<\/?[^>]+(>|$)/g, "");
    }
    filterHtmlScrpitsSQL() {
        return __awaiter(this, void 0, void 0, function* () {
            const validierunges = this.validierunges;
            validierunges.forEach((validierung) => {
                const window = new jsdom_1.JSDOM("").window;
                const DOMPurify = (0, dompurify_1.default)(window);
                const cleanData = DOMPurify.sanitize(validierung);
                let cleanDataHTML = this.removeHtmlTags(cleanData);
                const cleanDataSql = this.filterSQL(cleanDataHTML);
                if (cleanDataSql === true) {
                    console.log("sql injections deleted");
                    cleanDataHTML = "";
                }
                this.arrCleanData.push(cleanDataHTML);
            });
            return this.arrCleanData;
        });
    }
    filterHtmlScrpits() {
        return __awaiter(this, void 0, void 0, function* () {
            const validierunges = this.validierunges;
            validierunges.forEach((validierung) => {
                const window = new jsdom_1.JSDOM("").window;
                const DOMPurify = (0, dompurify_1.default)(window);
                const cleanData = DOMPurify.sanitize(validierung);
                let cleanDataHTML = this.removeHtmlTags(cleanData);
                this.arrCleanData.push(cleanDataHTML);
            });
            return this.arrCleanData;
        });
    }
}
exports.Validierunges = Validierunges;
//# sourceMappingURL=ValidierungsClasse.js.map