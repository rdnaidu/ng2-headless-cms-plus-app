export class MenuItem {
    id: string;
    alias: string;
    name: string;
    iconClass: string;
    constructor(id, alias, name, iconClass?) {
        this.id = id;
        this.alias = alias;
        this.name = name;
        this.iconClass = iconClass;
    }
}
