import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";
export class Validierunges {
  private validierunges: string[];
  private arrCleanData: string[];
  constructor(validierunges: string[]) {
    this.validierunges = validierunges;
    this.arrCleanData = [];
  }
  filterSQL(input): Boolean {
    const sqlPattern =
      /\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|TRUNCATE|EXEC|MERGE|CALL|DESCRIBE)\b/i;
    return sqlPattern.test(input);
  }
  removeHtmlTags(input): string {
    return input.replace(/<\/?[^>]+(>|$)/g, "");
  }

  async filterHtmlScrpitsSQL() {
    const validierunges = this.validierunges;
    validierunges.forEach((validierung) => {
      const window = new JSDOM("").window;
      const DOMPurify = createDOMPurify(window);
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
  }

  async filterHtmlScrpits() {
    const validierunges = this.validierunges;
    validierunges.forEach((validierung) => {
      const window = new JSDOM("").window;
      const DOMPurify = createDOMPurify(window);
      const cleanData = DOMPurify.sanitize(validierung);
      let cleanDataHTML = this.removeHtmlTags(cleanData);
      this.arrCleanData.push(cleanDataHTML);
    });
    return this.arrCleanData;
  }
}
