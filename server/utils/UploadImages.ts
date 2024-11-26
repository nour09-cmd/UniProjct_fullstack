// import * as fs from "fs";
// import * as path from "path";

// export class ImageUploads {
//   private folderPath: string = "uploads";

//   multiImageUpload(link: string, img: any[]) {
//     const imgArr: any = [];
//     try {
//       img.map((item) => {
//         let name = this.multiImageUpload(link, item);
//         imgArr.push(name);
//       });
//     } catch (error) {
//       console.log(error);
//     }
//     return imgArr;
//   }
//   oneImageUpload(link: string, img: any) {
//     return new Promise((resolve) => {
//       try {
//         const matches = img.match(/^data:image\/([a-zA-Z]+);base64,/);
//         if (!matches) {
//           return resolve(null);
//         }
//         const imageType = matches[1];
//         const base64Data = img.replace(/^data:image\/\w+;base64,/, "");
//         const buffer = Buffer.from(base64Data, "base64");
//         const imageName = `${Date.now()}-${Math.random()
//           .toString(36)
//           .substring(2, 15)}.${imageType}`;
//         const uploadsDir = path.join(
//           __dirname,
//           `../${this.folderPath}/${link}`
//         );
//         const imagePath = path.join(uploadsDir, imageName);
//         if (!fs.existsSync(uploadsDir)) {
//           fs.mkdirSync(uploadsDir, { recursive: true });
//         }
//         fs.writeFile(imagePath, buffer, (err) => {
//           if (err) {
//             return resolve(null);
//           }
//           resolve(imageName);
//         });
//       } catch (error) {
//         resolve(null);
//       }
//     });
//   }
//   deletemultiImageUpload(link: string, img: any) {}
//   deleteoneImageUpload(link: string, img: any) {}
// }

//    // this.imageUpload
//       // .oneImageUpload("Users", req.body.image)
//       // .then(async (imagePath: any) => {
//       //   const newUser = this.userRepository.create({
//       //     image: imagePath || "",
//       //     email: emails,
//       //     password: hashedPassword,
//       //     vorname: vornames,
//       //     nachname: nachnames,
//       //     rolle: this.rolle,
//       //     adresse: savedAddressId,
//       //     handynummer: handynummers,
//       //     geburtsdatum: geburtsdatums,
//       //     verifyToken: emailToken,
//       //     verifyStatus: false,
//       //     resetpasswordtoken: "null",
//       //     resetPasswordStatus: false,
//       //   });
//       //   await this.userRepository.save(newUser);
//       // });
