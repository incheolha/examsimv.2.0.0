//각 툴바 옵션 선택사항

export function canEnableToolbarOptions(value: string, toolbar: any): boolean {
    if (value) {
        if(toolbar['length'] === 0) {
            return true;
        } else {
            const found = toolbar.filter(array => {
                return array.indexOf(value) != -1;
            });
            return found.length ? true : false;
        }
    } else {
        return false;
    }
}

// textarea에서 선택한 내용물 저장하기

export function saveSelection(): any {
    if (window.getSelection) {
        const selected = window.getSelection();

       
        console.log(selected.toString());
        if(selected.getRangeAt && selected.rangeCount) {
            return selected.getRangeAt(0);
        }
    } else if (document.getSelection && document.createRange) {
            return document.createRange();
    }
    return null;
}

// textarea에 저장된 값을 복원하기

export function restoreSelection(range): boolean {
    if (range) {
        if (window.getSelection) {
            const sel = window.getSelection();
            console.log(sel.toString());
            sel.removeAllRanges();
            sel.addRange(range);
            return true;
        } else if (document.getSelection && range.select) {
            range.select();
            return true;
        }
    } else {
        return false;
    }
}

