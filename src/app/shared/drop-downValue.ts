export class DropdownValue {
    value: any;
    label: string;
    selected: string;

    constructor(value: any, label: string, selected?: string) {
        this.value = value;
        this.label = label;
        this.selected = '';
        if (selected !== undefined)
            this.selected = selected;

    }
}
