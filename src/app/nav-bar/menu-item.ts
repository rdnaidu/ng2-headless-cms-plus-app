export class MenuItem {
    id: string;
    alias: string;
    name: string;
    iconClass: string;
    loginCheck: boolean;
    constructor(id, alias, name, iconClass?, loginCheck?) {
        this.id = id;
        this.alias = alias;
        this.name = name;
        this.iconClass = iconClass;
        if (loginCheck !== undefined) {
            this.loginCheck = loginCheck;
        } else {
            this.loginCheck = false;
        }
    }
}
