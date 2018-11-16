import { ReadingProblems } from './reading.problems.model';
export class Reading {

        public toeflNo: number;
        public readingCreatedDate?: Date;
        public section1Title?: string;
        public section1Script?: string;
        public section1Problem?: ReadingProblems[];
        public section2Title?: string;
        public section2Script?: string;
        public section2Problem?: ReadingProblems[];
        public section3Title?: string;
        public section3Script?: string;
        public section3Problem?: ReadingProblems[];
        public section4Title?: string;
        public section4Script?: string;
        public section4Problem?: ReadingProblems[];

          constructor(
                      toeflNo: number,
                      readingCreatedDate?: Date,
                      section1Title?: string,
                      section1Script?: string,
                      section1Problem?: ReadingProblems[],
                      section2Title?: string,
                      section2Script?: string,
                      section2Problem?: ReadingProblems[],
                      section3Title?: string,
                      section3Script?: string,
                      section3Problem?: ReadingProblems[],
                      section4Title?: string,
                      section4Script?: string,
                      section4Problem?: ReadingProblems[]
          )
          {
            this.toeflNo = toeflNo;
            this.readingCreatedDate = readingCreatedDate;
            this.section1Title = section1Title;
            this.section1Script = section1Script;
            this.section1Problem = section1Problem;
            this.section2Title = section2Title;
            this.section2Script = section2Script;
            this.section2Problem = section2Problem;
            this.section3Title = section3Title;
            this.section3Script = section3Script;
            this.section3Problem = section3Problem;
            this.section4Title = section4Title;
            this.section4Script = section4Script;
            this.section4Problem = section4Problem;
          }
}
