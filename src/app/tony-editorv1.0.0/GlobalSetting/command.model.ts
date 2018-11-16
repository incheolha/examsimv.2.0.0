//각종 document.execcomand()에서 작동한 명령어와 parameter값을 저장하기 위한 model

export class CommandModel{
    public commandName: string;
    public value: string;
    constructor(commandName: string, value: string) {
        this.commandName = commandName;
        this.value = value;
    }
}