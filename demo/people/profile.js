var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { computed, observable } from 'mobx';
import { observer } from 'mobx-react';
import { Component, h } from 'preact';
import { store } from './store';
let Profile = class Profile extends Component {
    constructor() {
        super(...arguments);
        this.id = '';
        this.busy = false;
        this.remove = async () => {
            this.busy = true;
            await new Promise(cb => setTimeout(cb, 1500));
            store.deleteUser(this.id);
            this.busy = false;
        };
    }
    componentDidMount() {
        this.id = this.props.route;
    }
    componentWillReceiveProps(props) {
        this.id = props.route;
    }
    render() {
        const user = this.user;
        if (user == null)
            return null;
        return (h("div", { class: "profile" },
            h("img", { class: "avatar", src: user.picture.large }),
            h("h2", null,
                user.name.first,
                " ",
                user.name.last),
            h("div", { class: "details" },
                h("p", null,
                    user.gender === 'female' ? '👩' : '👨',
                    " ",
                    user.id),
                h("p", null,
                    "\uD83D\uDD82 ",
                    user.email)),
            h("p", null,
                h("button", { class: this.busy ? 'secondary busy' : 'secondary', disabled: this.busy, onClick: this.remove }, "Remove contact"))));
    }
    get user() {
        return store.users.find(u => u.id === this.id);
    }
};
__decorate([
    observable
], Profile.prototype, "id", void 0);
__decorate([
    observable
], Profile.prototype, "busy", void 0);
__decorate([
    computed
], Profile.prototype, "user", null);
Profile = __decorate([
    observer
], Profile);
export { Profile };
