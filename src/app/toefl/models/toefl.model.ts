import { Reading } from './reading.model';
import { ImageSettingTime } from './image.model';
export class Toefl {

  public toeflNo: number;
  public toeflDesc: string;
  public toeflLevel?: string;
  public toeflCreatedDate?: Date;
  public toeflCompletionTag?: string;
  public toeflImage?: string;
  public toeflAudio?: string;
  public readingDesc?: string;
  public listeningDesc?: string;
  public writingDesc?: string;
  public speakingDesc?: string;

  public writer?: string;

  public imageSettingTimes?: ImageSettingTime[];

  constructor(
              toeflNo: number,
              toeflDesc: string,
              toeflLevel?: string,
              toeflCreatedDate?: Date,
              toeflCompletionTag?: string,
              toeflImage?: string,
              toeflAudio?: string,
              readingDesc?: string,
              listeningDesc?: string,
              writingDesc?: string,
              speakingDesc?: string,
              writer?: string,
              imageSettingTimes?: ImageSettingTime[],
              toeflPrice?: number

  ) {
        this.toeflNo = toeflNo;
        this.toeflDesc = toeflDesc;
        this.toeflLevel = toeflLevel;
        this.toeflCreatedDate = toeflCreatedDate;
        this.toeflCompletionTag = toeflCompletionTag;
        this.toeflImage = toeflImage;
        this.toeflAudio = toeflAudio;
        this.readingDesc = readingDesc;
        this.listeningDesc = listeningDesc;
        this.writingDesc = writingDesc;
        this.speakingDesc = speakingDesc;
        this.writer = writer;
        this.imageSettingTimes = imageSettingTimes;

  }
}
