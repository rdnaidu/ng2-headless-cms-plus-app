export class DropdownValue {
    value: any;
    label: string;
    selected: string;

    constructor(value: any, label: string, selected?: string) {
        this.value = value;
        this.label = label;
        if (selected !== undefined)
            this.selected = selected;
        else 
            this.selected = '';
    }
}
