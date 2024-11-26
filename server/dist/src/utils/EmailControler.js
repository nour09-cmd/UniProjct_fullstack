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
exports.EmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const conifg_1 = require("./conifg");
const date_fns_1 = require("date-fns");
class EmailService {
    constructor() {
        this.year = (0, date_fns_1.format)(new Date(), "yyyy");
        this.transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: conifg_1.EMAIL,
                pass: conifg_1.PASSEWD,
            },
        });
    }
    sendEmail(from, to, subject, htmlLayout) {
        return __awaiter(this, void 0, void 0, function* () {
            const mailOptions = {
                from: `Your Team Barber Finder <${from}>`,
                to,
                subject,
                html: htmlLayout,
            };
            try {
                const info = yield this.transporter.sendMail(mailOptions);
                console.log("Email sent:", info.response);
            }
            catch (error) {
                console.error("Error sending email:", error);
            }
        });
    }
    firstRegisterEmail(to_1, userData_1) {
        return __awaiter(this, arguments, void 0, function* (to, userData, other = "") {
            const htmlLayout = `
    <!DOCTYPE html>
      <html lang="de">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>E-Mail-Verifizierung</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              border: 1px solid #dddddd;
              border-radius: 8px;
            }
            .header {
              text-align: center;
              padding-bottom: 20px;
            }
            .button {
              display: inline-block;
              background-color: #4caf50;
              color: #ffffff;
              padding: 15px 25px;
              text-decoration: none;
              border-radius: 5px;
              font-size: 16px;
            }
            .footer {
              text-align: center;
              color: #777777;
              font-size: 12px;
              padding-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Willkommen bei Barber Finder</h2>
              <p>Bitte bestätigen Sie Ihre E-Mail-Adresse</p>
            </div>
            <p>Hallo ${userData.name},</p>
            <p>
              Vielen Dank für Ihre Registrierung bei uns. Bitte klicken Sie auf den
              folgenden Button, um Ihre E-Mail-Adresse zu verifizieren und Ihre
              Anmeldung abzuschließen.
            </p>
            <p style="text-align: center">
              <a href="${other.link}" class="button">E-Mail verifizieren</a>
            </p>
            <p>
              Falls Sie diese Anfrage nicht gestellt haben, ignorieren Sie bitte diese
              E-Mail.
            </p>
            <div class="footer">
              <p>&copy; ${this.year} ${conifg_1.SHOPNAME}. Alle Rechte vorbehalten.</p>
            </div>
          </div>
        </body>
      </html>
    `;
            yield this.sendEmail("info@barber-finder-team.de", userData.email, other.subject, htmlLayout);
            return true;
        });
    }
    AcceptedUserEmail(to_1, userData_1) {
        return __awaiter(this, arguments, void 0, function* (to, userData, other = "") {
            const htmlLayout = `
      <!DOCTYPE html>
        <html lang="de">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>E-Mail Bestätigt</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border: 1px solid #dddddd;
                border-radius: 8px;
              }
              .header {
                text-align: center;
                padding-bottom: 20px;
              }
              .button {
                display: inline-block;
                background-color: #4caf50;
                color: #ffffff;
                padding: 15px 25px;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
              }
              .footer {
                text-align: center;
                color: #777777;
                font-size: 12px;
                padding-top: 20px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>Ihre E-Mail-Adresse wurde erfolgreich verifiziert!</h2>
              </div>
              <p>Hallo ${userData.vorname + " " + userData.nachname},</p>
              <p>
                Herzlichen Glückwunsch! Ihre E-Mail-Adresse wurde erfolgreich
                verifiziert und akzeptiert. Sie können nun alle Funktionen und Vorteile
                unseres Dienstes nutzen.
              </p>
              <p style="text-align: center">
                <a href="${conifg_1.FRONDENDLOGIN}" class="button">Jetzt starten</a>
              </p>
              <p>
                Falls Sie Fragen haben, können Sie uns jederzeit kontaktieren.
                <a href="${conifg_1.SUPPORT}">SUPPORT</a>
              </p>
              <div class="footer">
                <p>&copy; ${this.year} ${conifg_1.SHOPNAME}. Alle Rechte vorbehalten.</p>
              </div>
            </div>
          </body>
        </html>
    `;
            yield this.sendEmail("info@barber-finder-team.de", userData.email, other.subject, htmlLayout);
            return true;
        });
    }
    ResetPasswordEmail(to_1, userData_1) {
        return __awaiter(this, arguments, void 0, function* (to, userData, other = "") {
            const htmlLayout = `<!DOCTYPE html>
                        <html lang="de">
                          <head>
                            <meta charset="UTF-8" />
                            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                            <title>Passwort zurücksetzen</title>
                            <style>
                              body {
                                font-family: Arial, sans-serif;
                                background-color: #f4f4f4;
                                margin: 0;
                                padding: 0;
                              }
                              .container {
                                max-width: 600px;
                                margin: 0 auto;
                                background-color: #ffffff;
                                padding: 20px;
                                border: 1px solid #dddddd;
                                border-radius: 8px;
                              }
                              .header {
                                text-align: center;
                                padding-bottom: 20px;
                              }
                              .button {
                                display: inline-block;
                                background-color: #007bff;
                                color: #ffffff;
                                padding: 15px 25px;
                                text-decoration: none;
                                border-radius: 5px;
                                font-size: 16px;
                              }
                              .footer {
                                text-align: center;
                                color: #777777;
                                font-size: 12px;
                                padding-top: 20px;
                              }
                            </style>
                          </head>
                          <body>
                            <div class="container">
                              <div class="header">
                                <h2>Passwort zurücksetzen</h2>
                              </div>
                              <p>Hallo ${userData.vorname + " " + userData.nachname},</p>
                              <p>
                                Wir haben eine Anfrage zum Zurücksetzen Ihres Passworts erhalten.
                                Klicken Sie auf den Button unten, um Ihr Passwort zurückzusetzen. Dieser
                                Link ist aus Sicherheitsgründen nur für eine begrenzte Zeit gültig.
                              </p>
                              <p style="text-align: center">
                                <a href="${other.link}" class="button">Passwort zurücksetzen</a>
                              </p>
                              <p>
                                Falls Sie diese Anfrage nicht gestellt haben, ignorieren Sie bitte diese
                                E-Mail oder kontaktieren Sie unseren <a href="${conifg_1.SUPPORT}">Support</a>.
                              </p>
                              <div class="footer">
                                <p>&copy; ${this.year} ${conifg_1.SHOPNAME}. Alle Rechte vorbehalten.</p>
                              </div>
                            </div>
                          </body>
                        </html>
                      `;
            yield this.sendEmail("info@barber-finder-team.de", userData.email, other.subject, htmlLayout);
            return true;
        });
    }
    passwordChangedEmail(to_1, userData_1) {
        return __awaiter(this, arguments, void 0, function* (to, userData, other = "") {
            const htmlLayout = `<!DOCTYPE html>
                          <html lang="de">
                            <head>
                              <meta charset="UTF-8" />
                              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                              <title>Passwortänderung bestätigt</title>
                              <style>
                                body {
                                  font-family: Arial, sans-serif;
                                  background-color: #f4f4f4;
                                  margin: 0;
                                  padding: 0;
                                }
                                .container {
                                  max-width: 600px;
                                  margin: 0 auto;
                                  background-color: #ffffff;
                                  padding: 20px;
                                  border: 1px solid #dddddd;
                                  border-radius: 8px;
                                }
                                .header {
                                  text-align: center;
                                  padding-bottom: 20px;
                                }
                                .footer {
                                  text-align: center;
                                  color: #777777;
                                  font-size: 12px;
                                  padding-top: 20px;
                                }
                                .button {
                                  display: inline-block;
                                  background-color: #4caf50;
                                  color: #ffffff;
                                  padding: 10px 20px;
                                  text-decoration: none;
                                  border-radius: 5px;
                                  font-size: 16px;
                                }
                              </style>
                            </head>
                            <body>
                              <div class="container">
                                <div class="header">
                                  <h2>Passwortänderung erfolgreich</h2>
                                </div>
                                <p>Hallo ${userData.vorname + " " + userData.nachname},</p>
                                <p>
                                  Ihr Passwort wurde erfolgreich geändert. Sie können sich nun mit Ihrem
                                  neuen Passwort anmelden.
                                </p>
                                <p style="text-align: center">
                                  <a href="${conifg_1.FRONDENDLOGIN}" class="button">Zur Anmeldung</a>
                                </p>
                                <p>
                                  Falls Sie diese Änderung nicht vorgenommen haben, setzen Sie sich bitte
                                  umgehend mit unserem <a href="${conifg_1.SUPPORT}">Support-Team</a> in Verbindung.
                                </p>
                                <div class="footer">
                                  <p>&copy; ${this.year} ${conifg_1.SHOPNAME}. Alle Rechte vorbehalten.</p>
                                </div>
                              </div>
                            </body>
                          </html>
                      `;
            yield this.sendEmail("info@barber-finder-team.de", userData.email, other.subject, htmlLayout);
            return true;
        });
    }
    BarberReqEmail(to, ladenData = "", userData, other = "", subjekt) { }
    PendingApprovalBarberEmail(to, ladenData = "", userData, other = "", subjekt) { }
    AcceptedBarberEmail(to, ladenData = "", userData, other = "", subjekt) { }
    CancelBarberEmail(to, ladenData = "", userData, other = "", subjekt) { }
    CancelBarberEmailAnAdmin(to, ladenData = "", userData, other = "", subjekt) { }
    youhaveToPayBarber(to, ladenData = "", userData, other = "", subjekt) { }
    youhaveToPayBarberAnAdmin(to, ladenData = "", userData, other = "", subjekt) { }
    payAccepte(to, ladenData = "", userData, other = "") { }
    payAccepteAnAdmin(to, ladenData = "", userData, other = "", subjekt) { }
    barberAppointmentResEmailAnBaber(to_1) {
        return __awaiter(this, arguments, void 0, function* (to, ladenData = "", userData, other = "") {
            const htmlLayout = `
      <!DOCTYPE html>
        <html lang="de">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Neuer Termin gebucht</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border: 1px solid #dddddd;
                border-radius: 8px;
              }
              .header {
                text-align: center;
                padding-bottom: 20px;
              }
              .footer {
                text-align: center;
                color: #777777;
                font-size: 12px;
                padding-top: 20px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>Neuer Termin bei Ihnen gebucht</h2>
              </div>
              <p>Hallo Team der ${ladenData.Laden_name},</p>
              <p>
                Ein Nutzer hat einen Termin bei Ihnen gebucht. Hier sind die Details:
              </p>
              <ul>
                <li><strong>Kunde:</strong> ${userData.vorname + " " + userData.nachname}</li>
              <li><strong>Datum:</strong> ${other.apo.date}</li>
              <li><strong>Uhrzeit:</strong> ${other.apo.time}</li>
                <li><strong>Tel:</strong> ${userData.handynummer}</li>
                <li>
                  <strong>Adresse:</strong> ${ladenData.Laden_adress.plz +
                " " +
                ladenData.Laden_adress.ort +
                "," +
                ladenData.Laden_adress.strasse}
                </li>
              </ul>
              <p>
                Bitte bereiten Sie sich entsprechend auf den Termin vor. Falls Sie den
                Termin ändern oder absagen müssen, kontaktieren Sie bitte den Kunden
                rechtzeitig.
              </p>
              <div class="footer">
                <p>&copy; ${this.year} ${conifg_1.SHOPNAME}. Alle Rechte vorbehalten.</p>
              </div>
            </div>
          </body>
        </html>
    `;
            yield this.sendEmail(ladenData.barber_email, to, other.subject, htmlLayout);
            return true;
        });
    }
    UserAppointmentResEmailAnUser(to_1) {
        return __awaiter(this, arguments, void 0, function* (to, ladenData = "", userData, other = "") {
            const htmlLayout = `
      <!DOCTYPE html>
        <html lang="de">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Terminbestätigung</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border: 1px solid #dddddd;
                border-radius: 8px;
              }
              .header {
                text-align: center;
                padding-bottom: 20px;
              }
              .button {
                display: inline-block;
                background-color: #4285f4;
                color: #ffffff;
                padding: 15px 25px;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
              }
              .footer {
                text-align: center;
                color: #777777;
                font-size: 12px;
                padding-top: 20px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>Ihr Termin wurde erfolgreich gebucht</h2>
              </div>
              <p>Hallo ${userData.vorname + " " + userData.nachname},</p>
              <p>Ihr Termin wurde erfolgreich gebucht! Hier sind die Details:</p>
              <ul>
                <li><strong>Barber:</strong> ${ladenData.Laden_name}</li>
                <li><strong>Datum:</strong> ${other.apo.date}</li>
                <li><strong>Uhrzeit:</strong> ${other.apo.time}</li>
                <li><strong>Telefonnummer:</strong> ${ladenData.tel || "000"}</li>
                <li><strong>Adresse:</strong> ${ladenData.Laden_adress.plz +
                " " +
                ladenData.Laden_adress.ort +
                "," +
                ladenData.Laden_adress.strasse}</li>
              </ul>
              <p>
                Um diesen Termin nicht zu verpassen, können Sie ihn direkt zu Ihrem
                Google Kalender hinzufügen:
              </p>
              <p style="text-align: center">
                <a href="${other.googleKalnderLink}" class="button">Zum Google Kalender hinzufügen</a>
              </p>
              <p>
                Falls Sie den Termin ändern oder absagen möchten, können Sie uns gerne
                kontaktieren. <a href="${conifg_1.SUPPORT}">Support</a>
              </p>
              <div class="footer">
                <p>&copy; ${this.year} ${conifg_1.SHOPNAME}. Alle Rechte vorbehalten.</p>
              </div>
            </div>
          </body>
        </html>
    `;
            yield this.sendEmail(ladenData.barber_email, to, other.subject, htmlLayout);
            return true;
        });
    }
    barberAppointmentDeletionEmailAnUser(to_1) {
        return __awaiter(this, arguments, void 0, function* (to, ladenData = "", userData, other = "") {
            const htmlLayout = `
    <!DOCTYPE html>
        <html lang="de">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Termin abgesagt</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border: 1px solid #dddddd;
                border-radius: 8px;
              }
              .header {
                text-align: center;
                padding-bottom: 20px;
              }
              .footer {
                text-align: center;
                color: #777777;
                font-size: 12px;
                padding-top: 20px;
              }
              .button {
                display: inline-block;
                background-color: #007bff;
                color: #ffffff;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>Ihr Termin wurde abgesagt</h2>
              </div>
              <p>Hallo ${userData.vorname + " " + userData.nachname},</p>
              <p>
                Ihr Termin bei ${ladenData.Laden_name} am ${other.apoData.date} um ${other.apoData.time} wurde leider vom Barber abgesagt. Wir
                bedauern die Unannehmlichkeiten und hoffen, Ihnen bald einen neuen
                Termin anbieten zu können.
              </p>
              <p>
                Sie können jederzeit einen neuen Termin buchen oder sich bei Fragen an
                uns wenden.
              </p>
              <p style="text-align: center">
                <a href="${conifg_1.FRONDENDLOGIN}" class="button">Neuen Termin buchen</a>
              </p>
              <div class="footer">
                <p>&copy; ${this.year} ${conifg_1.SHOPNAME}. Alle Rechte vorbehalten.</p>
              </div>
            </div>
          </body>
        </html>`;
            yield this.sendEmail(ladenData.barber_email, to, other.subject, htmlLayout);
            return true;
        });
    }
    barberAppointmentDeletionEmailAnBarber(to_1) {
        return __awaiter(this, arguments, void 0, function* (to, ladenData = "", userData, other = "") {
            const htmlLayout = `
    <!DOCTYPE html>
      <html lang="de">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Terminlöschung bestätigt</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              border: 1px solid #dddddd;
              border-radius: 8px;
            }
            .header {
              text-align: center;
              padding-bottom: 20px;
            }
            .footer {
              text-align: center;
              color: #777777;
              font-size: 12px;
              padding-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Terminlöschung erfolgreich</h2>
            </div>
            <p>Hallo Team der ${ladenData.Laden_name},</p>
            <p>
              Der Termin mit ${userData.vorname + " " + userData.nachname} am ${other.apoData.date} um ${other.apoData.time}  wurde erfolgreich aus Ihrem Kalender
              entfernt. Falls Sie Unterstützung benötigen oder weitere Informationen
              benötigen, stehen wir Ihnen gerne zur Verfügung.
            </p>
            <div class="footer">
              <p>&copy; ${this.year} ${conifg_1.SHOPNAME}. Alle Rechte vorbehalten.</p>
            </div>
          </div>
        </body>
      </html>
`;
            yield this.sendEmail(ladenData.barber_email, to, other.subject, htmlLayout);
            return true;
        });
    }
    UserAppointmentDeletionEmailAnBarber(to_1) {
        return __awaiter(this, arguments, void 0, function* (to, ladenData = "", userData, other = "") {
            const htmlLayout = `
    <!DOCTYPE html>
      <html lang="de">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Termin vom Nutzer storniert</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              border: 1px solid #dddddd;
              border-radius: 8px;
            }
            .header {
              text-align: center;
              padding-bottom: 20px;
            }
            .footer {
              text-align: center;
              color: #777777;
              font-size: 12px;
              padding-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Ein Termin wurde vom Nutzer storniert</h2>
            </div>
            <p>Hallo Team der ${ladenData.Laden_name},</p>
            <p>Der folgende Termin wurde vom Nutzer abgesagt:</p>
            <ul>
              <li><strong>Kunde:</strong> ${userData.vorname + " " + userData.nachname}</li>
                <li><strong>tel:</strong> ${userData.handynummer}</li>
              <li><strong>Datum:</strong> ${other.apoData.date}</li>
              <li><strong>Uhrzeit:</strong> ${other.apoData.time}</li>
            </ul>
            <p>
              Falls Sie den Nutzer bezüglich eines neuen Termins kontaktieren möchten,
              können Sie dies gerne tun.
            </p>
            <div class="footer">
              <p>&copy; ${this.year} ${conifg_1.SHOPNAME}. Alle Rechte vorbehalten.</p>
            </div>
          </div>
        </body>
      </html>
    `;
            yield this.sendEmail(ladenData.barber_email, to, other.subject, htmlLayout);
            return true;
        });
    }
    UserAppointmentDeletionEmailAnUser(to_1) {
        return __awaiter(this, arguments, void 0, function* (to, ladenData = "", userData, other = "") {
            const htmlLayout = `
     <!DOCTYPE html>
        <html lang="de">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Terminabsage bestätigt</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border: 1px solid #dddddd;
                border-radius: 8px;
              }
              .header {
                text-align: center;
                padding-bottom: 20px;
              }
              .footer {
                text-align: center;
                color: #777777;
                font-size: 12px;
                padding-top: 20px;
              }
              .button {
                display: inline-block;
                background-color: #007bff;
                color: #ffffff;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>Ihre Terminabsage wurde bestätigt</h2>
              </div>
              <p>Hallo ${userData.vorname + " " + userData.nachname},</p>
              <p>
                Ihr Termin bei ${ladenData.Laden_name} am ${other.apoData.date} um ${other.apoData.time} wurde
                erfolgreich storniert. Wir hoffen, Sie bald wieder begrüßen zu dürfen.
              </p>
              <p style="text-align: center">
                <a href="${conifg_1.FRONDENDLOGIN}" class="button"
                  >Neuen Termin buchen</a
                >
              </p>
              <div class="footer">
                <p>&copy; ${this.year} ${conifg_1.SHOPNAME}. Alle Rechte vorbehalten.</p>
              </div>
            </div>
          </body>
        </html>`;
            yield this.sendEmail(ladenData.barber_email, to, other.subject, htmlLayout);
            return true;
        });
    }
}
exports.EmailService = EmailService;
//# sourceMappingURL=EmailControler.js.map