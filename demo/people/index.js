var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { observer } from 'mobx-react';
import { Component, h } from 'preact';
import { Profile } from './profile';
import { Link, Route, Router } from './router';
import { store } from './store';
import './styles/index.scss';
let App = class App extends Component {
    componentDidMount() {
        store.loadUsers().catch(console.error);
    }
    render() {
        return (h(Router, null,
            h("div", { id: "people-app" },
                h("nav", null,
                    h("div", { style: { margin: 16, textAlign: 'center' } },
                        "Sort by",
                        ' ',
                        h("select", { value: store.usersOrder, onChange: (ev) => {
                                store.setUsersOrder(ev.target.value);
                            } },
                            h("option", { value: "name" }, "Name"),
                            h("option", { value: "id" }, "ID"))),
                    h("ul", null, store.getSortedUsers().map((user, i) => (h("li", { key: user.id, style: {
                            animationDelay: `${i * 20}ms`,
                            top: `calc(var(--menu-item-height) * ${i})`,
                            transitionDelay: `${i * 20}ms`
                        } },
                        h(Link, { href: `people/${user.id}`, active: true },
                            h("img", { class: "avatar", src: user.picture.large }),
                            user.name.first,
                            " ",
                            user.name.last)))))),
                h("section", { id: "people-main" },
                    h(Route, { match: "people" },
                        h(Route, { match: "*", component: Profile }))))));
    }
};
App = __decorate([
    observer
], App);
export default App;
