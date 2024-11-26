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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageUploads = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class ImageUploads {
    constructor() {
        this.folderPath = "uploads";
    }
    multiImageUpload(link, img) {
        const imgArr = [];
        try {
            img.map((item) => {
                let name = this.multiImageUpload(link, item);
                imgArr.push(name);
            });
        }
        catch (error) {
            console.log(error);
        }
        return imgArr;
    }
    oneImageUpload(link, img) {
        return new Promise((resolve) => {
            try {
                const matches = img.match(/^data:image\/([a-zA-Z]+);base64,/);
                if (!matches) {
                    return resolve(null);
                }
                const imageType = matches[1];
                const base64Data = img.replace(/^data:image\/\w+;base64,/, "");
                const buffer = Buffer.from(base64Data, "base64");
                const imageName = `${Date.now()}-${Math.random()
                    .toString(36)
                    .substring(2, 15)}.${imageType}`;
                const uploadsDir = path.join(__dirname, `../${this.folderPath}/${link}`);
                const imagePath = path.join(uploadsDir, imageName);
                if (!fs.existsSync(uploadsDir)) {
                    fs.mkdirSync(uploadsDir, { recursive: true });
                }
                fs.writeFile(imagePath, buffer, (err) => {
                    if (err) {
                        return resolve(null);
                    }
                    resolve(imageName);
                });
            }
            catch (error) {
                resolve(null);
            }
        });
    }
    deletemultiImageUpload(link, img) { }
    deleteoneImageUpload(link, img) { }
}
exports.ImageUploads = ImageUploads;
//# sourceMappingURL=UploadImages.js.map